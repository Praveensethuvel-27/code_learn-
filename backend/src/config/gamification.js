/** XP awarded on first accepted submit per problem (by difficulty). */
const XP_BY_DIFFICULTY = { easy: 50, medium: 100, hard: 200 };
const DAILY_CHALLENGE_BONUS_XP = 75;
const LEVEL_XP_STEP = 200;

const BADGE_DEFS = [
  { id: "first_solve", title: "First Blood", desc: "Solve your first problem", icon: "⚡", color: "#d97706", bg: "#fef3c7" },
  { id: "solve_5", title: "Getting Warm", desc: "Solve 5 problems", icon: "🌱", color: "#16a34a", bg: "#f0fdf4" },
  { id: "solve_10", title: "Code Warrior", desc: "Solve 10 problems", icon: "🏆", color: "#b45309", bg: "#fef9c3" },
  { id: "solve_25", title: "Algorithm Ace", desc: "Solve 25 problems", icon: "🔥", color: "#dc2626", bg: "#fef2f2" },
  { id: "solve_50", title: "Legend", desc: "Solve 50 problems", icon: "👑", color: "#7c3aed", bg: "#f5f3ff" },
  { id: "streak_3", title: "On Fire", desc: "3-day coding streak", icon: "🔥", color: "#f97316", bg: "#fff7ed" },
  { id: "streak_7", title: "Week Warrior", desc: "7-day coding streak", icon: "💪", color: "#ea580c", bg: "#fff7ed" },
  { id: "daily_first", title: "Daily Starter", desc: "Complete your first daily challenge", icon: "☀️", color: "#0284c7", bg: "#e0f2fe" },
  { id: "daily_7", title: "Daily Grinder", desc: "7 daily challenges completed", icon: "📅", color: "#4f46e5", bg: "#eef2ff" },
  { id: "xp_1000", title: "XP Hunter", desc: "Earn 1000 total XP", icon: "💎", color: "#0891b2", bg: "#ecfeff" },
];

function levelFromXp(xp) {
  return Math.max(1, Math.floor(xp / LEVEL_XP_STEP) + 1);
}

function xpToNextLevel(xp) {
  const level = levelFromXp(xp);
  const nextThreshold = level * LEVEL_XP_STEP;
  return { level, current: xp, next: nextThreshold, remaining: Math.max(0, nextThreshold - xp) };
}

module.exports = {
  XP_BY_DIFFICULTY,
  DAILY_CHALLENGE_BONUS_XP,
  LEVEL_XP_STEP,
  BADGE_DEFS,
  levelFromXp,
  xpToNextLevel,
};
