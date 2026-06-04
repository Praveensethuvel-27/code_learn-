const express = require("express");
const { listProblems, getProblem } = require("../controllers/problems.controller");

const router = express.Router();

router.get("/", listProblems);
router.get("/:slug", getProblem);

module.exports = router;

