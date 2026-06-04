const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { getProgress } = require("../controllers/streak.controller");

const router = express.Router();

router.get("/progress", requireAuth, getProgress);

module.exports = router;
