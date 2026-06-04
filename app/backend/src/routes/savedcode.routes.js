const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { saveCode, getMySavedCodes, deleteSavedCode } = require("../controllers/savedcode.controller");

const router = express.Router();

router.post("/", requireAuth, saveCode);
router.get("/me", requireAuth, getMySavedCodes);
router.delete("/:id", requireAuth, deleteSavedCode);

module.exports = router;
