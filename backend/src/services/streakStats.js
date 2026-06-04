const { Problem } = require("../models/Problem");
const { Submission } = require("../models/Submission");

function computeDayStreak(submissions) {
  const today = new Date();
  const activeDays = new Set(
    submissions.map((s) => new Date(s.createdAt).toDateString()),
  );
  let streak = 0;
  for (let i = 0; i < 365; i += 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (activeDays.has(d.toDateString())) streak += 1;
    else break;
  }
  return streak;
}

async function getStreakStats(userId) {
  const [practiceProblems, submissions] = await Promise.all([
    Problem.find({
      isPublished: true,
      $or: [
        { problemType: "practice_problem" },
        { problemType: { $exists: false } },
      ],
    }).select("slug"),
    Submission.find({ user: userId })
      .populate("problem", "slug problemType")
      .sort({ createdAt: -1 })
      .limit(500),
  ]);

  const practiceSlugs = new Set(practiceProblems.map((p) => p.slug));
  const practiceTotal = practiceSlugs.size;

  const solvedPracticeSlugs = new Set();
  for (const s of submissions) {
    if (s.status !== "accepted") continue;
    const slug = s.problem?.slug;
    if (!slug || !practiceSlugs.has(slug)) continue;
    solvedPracticeSlugs.add(slug);
  }

  const practiceSolved = solvedPracticeSlugs.size;
  const allPracticeComplete =
    practiceTotal > 0 && practiceSolved >= practiceTotal;

  const dailyStreak = computeDayStreak(submissions);
  const completionBonus = allPracticeComplete ? 1 : 0;
  const displayStreak = dailyStreak + completionBonus;

  return {
    dailyStreak,
    completionBonus,
    displayStreak,
    practiceTotal,
    practiceSolved,
    allPracticeComplete,
    totalSubmissions: submissions.length,
    activeDays: new Set(
      submissions.map((s) => new Date(s.createdAt).toDateString()),
    ).size,
  };
}

module.exports = { getStreakStats, computeDayStreak };
