const { asyncHandler } = require("../utils/asyncHandler");
const { EngagementConfig } = require("../models/EngagementConfig");
const { getStreakStats } = require("../services/streakStats");

const DEFAULT_TIPS = [
  "Solve at least 1 problem every day to keep your streak alive.",
  "Complete all practice problems for a +1 streak bonus!",
  "Even 15 minutes of practice daily beats hours once a week.",
];

const getProgress = asyncHandler(async (req, res) => {
  const [stats, cfg] = await Promise.all([
    getStreakStats(req.user._id),
    EngagementConfig.findOne().lean(),
  ]);

  res.json({
    ok: true,
    ...stats,
    streakTips: cfg?.streakTips?.length ? cfg.streakTips : DEFAULT_TIPS,
  });
});

module.exports = { getProgress };
