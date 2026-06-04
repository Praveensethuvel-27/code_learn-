const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { runCode, runOnProblem, submitToProblem, mySubmissions } = require("../controllers/submissions.controller");

const router = express.Router();

router.post("/run/:slug", requireAuth, runOnProblem);
router.post("/run", requireAuth, runCode);
router.get("/me", requireAuth, mySubmissions);
router.post("/problem/:slug", requireAuth, submitToProblem);

module.exports = router;

