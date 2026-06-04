const express = require("express");
const { requireAuth, optionalAuth } = require("../middleware/auth");
const {
  getMyGamification,
  getTodayChallenge,
  listLeaderboard,
} = require("../controllers/gamification.controller");

const router = express.Router();

router.get("/me", requireAuth, getMyGamification);
router.get("/challenge/today", optionalAuth, getTodayChallenge);
router.get("/leaderboard", optionalAuth, listLeaderboard);

module.exports = router;
