const { EngagementConfig } = require("../models/EngagementConfig");
const { asyncHandler } = require("../utils/asyncHandler");

const DEFAULT_TIPS = [
  "Solve at least 1 problem every day to keep your streak alive.",
  "Even 15 minutes of practice daily beats hours once a week.",
  "Consistency builds muscle memory for coding patterns.",
  "Morning practice sets a productive tone for the rest of the day.",
];

const DEFAULT_MILESTONES = [
  { id: "first_lesson", title: "First Step", desc: "Complete your first lesson", target: 1, type: "lessons", badge: "🎓", color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe" },
  { id: "five_lessons", title: "Knowledge Seeker", desc: "Complete 5 lessons", target: 5, type: "lessons", badge: "📚", color: "#7c3aed", bg: "#ede9fe", border: "#ddd6fe" },
  { id: "first_solve", title: "Problem Solver", desc: "Solve your first problem", target: 1, type: "solved", badge: "⚡", color: "#d97706", bg: "#fef3c7", border: "#fde68a" },
  { id: "ten_solved", title: "Code Warrior", desc: "Solve 10 problems", target: 10, type: "solved", badge: "🏆", color: "#b45309", bg: "#fef9c3", border: "#fde68a" },
  { id: "twenty_five_solved", title: "Algorithm Master", desc: "Solve 25 problems", target: 25, type: "solved", badge: "🔥", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  { id: "streak_3", title: "On Fire", desc: "Maintain a 3-day streak", target: 3, type: "streak", badge: "🔥", color: "#f97316", bg: "#fff7ed", border: "#fed7aa" },
  { id: "streak_7", title: "Week Warrior", desc: "Maintain a 7-day streak", target: 7, type: "streak", badge: "💪", color: "#ea580c", bg: "#fff7ed", border: "#fdba74" },
  { id: "first_save", title: "Code Saver", desc: "Save your first code snippet", target: 1, type: "saved", badge: "💾", color: "#0284c7", bg: "#e0f2fe", border: "#bae6fd" },
];

const getEngagementConfig = asyncHandler(async (_req, res) => {
  const cfg = await EngagementConfig.findOne({ key: "main" }).lean();
  res.json({
    ok: true,
    config: {
      streakTips: cfg?.streakTips?.length ? cfg.streakTips : DEFAULT_TIPS,
      milestones: Array.isArray(cfg?.milestones) ? cfg.milestones : DEFAULT_MILESTONES,
    },
  });
});

module.exports = { getEngagementConfig, DEFAULT_TIPS, DEFAULT_MILESTONES };
