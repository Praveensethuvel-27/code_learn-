const express = require("express");
const {
  getHint, explainCode, fixError,
  reviewCode, generateTestCases, alternativeSolution, translateCode, chatWithAI,
} = require("../controllers/ai.controller");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/hint",        requireAuth, getHint);
router.post("/explain",     requireAuth, explainCode);
router.post("/fix",         requireAuth, fixError);
router.post("/review",      requireAuth, reviewCode);
router.post("/testcases",   requireAuth, generateTestCases);
router.post("/alternative", requireAuth, alternativeSolution);
router.post("/translate",   requireAuth, translateCode);
router.post("/chat",        requireAuth, chatWithAI);

module.exports = router;