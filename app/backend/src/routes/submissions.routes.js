const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { runCode, submitToProblem, mySubmissions } = require("../controllers/submissions.controller");

const router = express.Router();

router.post("/run", requireAuth, runCode);
router.get("/me", requireAuth, mySubmissions);
router.post("/problem/:slug", requireAuth, submitToProblem);

module.exports = router;

