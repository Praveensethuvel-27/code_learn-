const express = require("express");
const {
  getToday,
  getRecent,
  getPath,
  getBrowse,
  getLesson,
  getProgress,
  postProgress,
} = require("../controllers/aiLearn.controller");
const { optionalAuth, requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/today", optionalAuth, getToday);
router.get("/recent", optionalAuth, getRecent);
router.get("/path", optionalAuth, getPath);
router.get("/browse", optionalAuth, getBrowse);
router.get("/lesson", optionalAuth, getLesson);
router.get("/progress", requireAuth, getProgress);
router.post("/progress", requireAuth, postProgress);

module.exports = router;
