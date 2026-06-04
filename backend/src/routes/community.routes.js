const express = require("express");
const { getStats } = require("../controllers/community.controller");

const router = express.Router();

router.get("/stats", getStats);

module.exports = router;
