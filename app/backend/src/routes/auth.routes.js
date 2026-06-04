const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  me,
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", requireAuth, me);

module.exports = router;

