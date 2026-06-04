/** Keep in sync with backend src/config/gamification.js */
export const XP_BY_DIFFICULTY = { easy: 50, medium: 100, hard: 200 };
export const DAILY_CHALLENGE_BONUS_XP = 75;
export const LEVEL_XP_STEP = 200;

export function xpForDifficulty(difficulty) {
  return XP_BY_DIFFICULTY[difficulty] ?? 50;
}

export function levelFromXp(xp) {
  return Math.max(1, Math.floor(xp / LEVEL_XP_STEP) + 1);
}
