const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { listLessons, getLesson, markCompleted } = require("../controllers/lessons.controller");

const router = express.Router();

router.get("/", listLessons);
router.get("/:id", getLesson);
router.post("/:id/complete", requireAuth, markCompleted);

module.exports = router;

