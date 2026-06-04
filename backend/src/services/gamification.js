const { Problem } = require("../models/Problem");
const { Submission } = require("../models/Submission");
const { User } = require("../models/User");
const { getStreakStats } = require("./streakStats");
const {
  XP_BY_DIFFICULTY,
  DAILY_CHALLENGE_BONUS_XP,
  BADGE_DEFS,
  xpToNextLevel,
} = require("../config/gamification");

function dateKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function startOfWeek(d = new Date()) {
  const x = new Date(d);
  const day = x.getDay();
  const diff = day === 0 ? 6 : day - 1;
  x.setDate(x.getDate() - diff);
  x.setHours(0, 0, 0, 0);
  return x;
}

async function getPublishedPracticeSlugs() {
  const rows = await Problem.find({
    isPublished: true,
    $or: [{ problemType: "practice_problem" }, { problemType: { $exists: false } }],
  })
    .select("slug")
    .sort({ slug: 1 })
    .lean();
  return rows.map((p) => p.slug);
}

async function getDailyChallenge(date = new Date()) {
  const slugs = await getPublishedPracticeSlugs();
  if (!slugs.length) return null;

  const key = dateKey(date);
  const dayNum = Math.floor(new Date(key).getTime() / 86400000);
  const slug = slugs[dayNum % slugs.length];
  const problem = await Problem.findOne({ slug, isPublished: true })
    .select("slug title difficulty tags")
    .lean();
  if (!problem) return null;

  const todayStart = new Date(key);
  const tomorrow = new Date(todayStart);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const solverCount = await Submission.countDocuments({
    status: "accepted",
    problem: problem._id,
    createdAt: { $gte: todayStart, $lt: tomorrow },
  });

  return {
    date: key,
    slug: problem.slug,
    title: problem.title,
    difficulty: problem.difficulty,
    tags: problem.tags || [],
    solverCount,
  };
}

async function countUniqueSolved(userId) {
  const rows = await Submission.distinct("problem", {
    user: userId,
    status: "accepted",
  });
  return rows.length;
}

async function countDailyChallengesCompleted(userId) {
  const user = await User.findById(userId).select("dailyChallenges").lean();
  return user?.dailyChallenges?.length ?? 0;
}

function evaluateBadges({ uniqueSolved, dailyStreak, streakDays, xp, badges }) {
  const earned = new Set(badges || []);
  const tryAward = (id, cond) => {
    if (cond) earned.add(id);
  };

  tryAward("first_solve", uniqueSolved >= 1);
  tryAward("solve_5", uniqueSolved >= 5);
  tryAward("solve_10", uniqueSolved >= 10);
  tryAward("solve_25", uniqueSolved >= 25);
  tryAward("solve_50", uniqueSolved >= 50);
  tryAward("streak_3", streakDays >= 3);
  tryAward("streak_7", streakDays >= 7);
  tryAward("daily_first", dailyStreak >= 1);
  tryAward("daily_7", dailyStreak >= 7);
  tryAward("xp_1000", xp >= 1000);

  return [...earned];
}

async function getGamificationProfile(userId) {
  let user = await User.findById(userId);
  if (!user) return null;

  if (user.xp == null) {
    const accepted = await Submission.find({ user: userId, status: "accepted" })
      .populate("problem", "difficulty slug")
      .lean();
    const seen = new Set();
    let xp = 0;
    for (const s of accepted) {
      const slug = s.problem?.slug;
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      const diff = s.problem?.difficulty || "easy";
      xp += XP_BY_DIFFICULTY[diff] ?? 50;
    }
    user.xp = xp;
    user.uniqueSolved = seen.size;
    await user.save();
  }

  const uniqueSolved = user.uniqueSolved ?? (await countUniqueSolved(userId));
  const streak = await getStreakStats(userId);
  const dailyCount = user.dailyChallenges?.length ?? 0;
  const badges = evaluateBadges({
    uniqueSolved,
    dailyStreak: dailyCount,
    streakDays: streak.dailyStreak ?? 0,
    xp: user.xp ?? 0,
    badges: user.badges,
  });

  if (badges.length !== (user.badges?.length ?? 0)) {
    user.badges = badges;
    await user.save();
  }

  const levelInfo = xpToNextLevel(user.xp ?? 0);
  const badgeDetails = BADGE_DEFS.map((b) => ({
    ...b,
    earned: badges.includes(b.id),
  }));

  const today = dateKey();
  const solvedTodayChallenge = (user.dailyChallenges || []).some((d) => d.date === today);

  return {
    xp: user.xp ?? 0,
    level: levelInfo.level,
    levelProgress: levelInfo,
    uniqueSolved,
    badges: badgeDetails,
    earnedBadgeCount: badges.length,
    dailyChallengesCompleted: dailyCount,
    solvedTodayChallenge,
    streak: streak.displayStreak ?? 0,
  };
}

/**
 * Call after a new accepted submission. Returns XP gained + newly earned badge ids.
 */
async function onAcceptedSubmission(userId, problem) {
  const user = await User.findById(userId);
  if (!user) return { xpGained: 0, newBadges: [], dailyBonus: false };

  const acceptedOnProblem = await Submission.countDocuments({
    user: userId,
    problem: problem._id,
    status: "accepted",
  });
  const isFirstOnProblem = acceptedOnProblem === 1;

  let xpGained = 0;
  if (isFirstOnProblem) {
    xpGained += XP_BY_DIFFICULTY[problem.difficulty] ?? 50;
  }
  user.uniqueSolved = await countUniqueSolved(userId);

  const challenge = await getDailyChallenge();
  let dailyBonus = false;
  const today = dateKey();
  if (
    challenge &&
    challenge.slug === problem.slug &&
    !(user.dailyChallenges || []).some((d) => d.date === today)
  ) {
    xpGained += DAILY_CHALLENGE_BONUS_XP;
    dailyBonus = true;
    user.dailyChallenges = [...(user.dailyChallenges || []), { date: today, slug: problem.slug }];
  }

  const oldBadges = new Set(user.badges || []);
  user.xp = (user.xp ?? 0) + xpGained;

  const streak = await getStreakStats(userId);
  user.badges = evaluateBadges({
    uniqueSolved: user.uniqueSolved ?? 0,
    dailyStreak: user.dailyChallenges?.length ?? 0,
    streakDays: streak.dailyStreak ?? 0,
    xp: user.xp,
    badges: user.badges,
  });

  const newBadges = user.badges.filter((id) => !oldBadges.has(id));
  await user.save();

  const badgeTitles = newBadges.map(
    (id) => BADGE_DEFS.find((b) => b.id === id)?.title || id,
  );

  const baseXp = isFirstOnProblem
    ? (XP_BY_DIFFICULTY[problem.difficulty] ?? 50)
    : 0;
  const dailyBonusXp = dailyBonus ? DAILY_CHALLENGE_BONUS_XP : 0;
  const levelProgress = xpToNextLevel(user.xp);

  return {
    xpGained,
    baseXp,
    dailyBonusXp,
    isFirstSolve: isFirstOnProblem,
    newBadges,
    newBadgeTitles: badgeTitles,
    dailyBonus,
    totalXp: user.xp,
    previousXp: (user.xp ?? 0) - xpGained,
    level: levelProgress.level,
    levelProgress,
  };
}

async function getLeaderboard({ period = "alltime", limit = 50 }) {
  const cap = Math.min(100, Math.max(1, limit));

  if (period === "weekly") {
    const since = startOfWeek();
    const rows = await Submission.aggregate([
      { $match: { status: "accepted", createdAt: { $gte: since } } },
      { $group: { _id: "$user", weeklySolved: { $sum: 1 } } },
      { $sort: { weeklySolved: -1 } },
      { $limit: cap },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          userId: "$_id",
          name: "$user.name",
          score: "$weeklySolved",
          xp: { $ifNull: ["$user.xp", 0] },
          level: 1,
        },
      },
    ]);

    return rows.map((r, i) => ({
      rank: i + 1,
      userId: r.userId,
      name: r.name,
      score: r.score,
      xp: r.xp,
      level: xpToNextLevel(r.xp).level,
      label: `${r.score} this week`,
    }));
  }

  const users = await User.find({ role: "user" })
    .sort({ xp: -1, uniqueSolved: -1 })
    .limit(cap)
    .select("name xp uniqueSolved badges")
    .lean();

  return users.map((u, i) => ({
    rank: i + 1,
    userId: u._id,
    name: u.name,
    score: u.xp ?? 0,
    xp: u.xp ?? 0,
    uniqueSolved: u.uniqueSolved ?? 0,
    level: xpToNextLevel(u.xp ?? 0).level,
    label: `${u.uniqueSolved ?? 0} solved · ${u.xp ?? 0} XP`,
  }));
}

module.exports = {
  getDailyChallenge,
  getGamificationProfile,
  onAcceptedSubmission,
  getLeaderboard,
  BADGE_DEFS,
};
