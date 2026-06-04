const { asyncHandler } = require("../utils/asyncHandler");
const {
  getDailyChallenge,
  getGamificationProfile,
  getLeaderboard,
} = require("../services/gamification");

const getMyGamification = asyncHandler(async (req, res) => {
  const profile = await getGamificationProfile(req.user._id);
  res.json({ ok: true, profile });
});

const getTodayChallenge = asyncHandler(async (req, res) => {
  const challenge = await getDailyChallenge();
  let solvedToday = false;
  if (req.user && challenge) {
    const profile = await getGamificationProfile(req.user._id);
    solvedToday = profile?.solvedTodayChallenge ?? false;
  }
  res.json({ ok: true, challenge, solvedToday });
});

const listLeaderboard = asyncHandler(async (req, res) => {
  const period = req.query.period === "weekly" ? "weekly" : "alltime";
  const limit = Number(req.query.limit) || 50;
  const rows = await getLeaderboard({ period, limit });
  let myRank = null;
  if (req.user) {
    const idx = rows.findIndex((r) => String(r.userId) === String(req.user._id));
    if (idx >= 0) myRank = rows[idx];
  }
  res.json({ ok: true, period, leaderboard: rows, myRank });
});

module.exports = { getMyGamification, getTodayChallenge, listLeaderboard };
