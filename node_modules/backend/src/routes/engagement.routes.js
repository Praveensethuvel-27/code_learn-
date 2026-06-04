const express = require("express");
const { getEngagementConfig } = require("../controllers/engagement.controller");

const router = express.Router();
router.get("/", getEngagementConfig);

module.exports = router;
