const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const { User } = require("../models/User");
const { HttpError } = require("../utils/httpError");
const { asyncHandler } = require("../utils/asyncHandler");
const { sendEmail } = require("../services/email");

function signToken(userId) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is required");
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign({ sub: userId }, secret, { expiresIn });
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

const signupSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  password: z.string().min(8).max(200),
});

const loginSchema = z.object({
  email: z.string().email().max(120),
  password: z.string().min(1).max(200),
});

const forgotSchema = z.object({
  email: z.string().email().max(120),
});

const resetSchema = z.object({
  email: z.string().email().max(120),
  otp: z.string().regex(/^\d{6}$/),
  newPassword: z.string().min(8).max(200),
});

const me = asyncHandler(async (req, res) => {
  res.json({ ok: true, user: req.user });
});

const signup = asyncHandler(async (req, res) => {
  const body = signupSchema.parse(req.body);
  const existing = await User.findOne({ email: body.email });
  if (existing) throw new HttpError(409, "Email already in use");

  const passwordHash = await bcrypt.hash(body.password, 12);
  const user = await User.create({
    name: body.name,
    email: body.email,
    passwordHash,
    role: "user",
  });

  const token = signToken(user._id.toString());
  res.status(201).json({
    ok: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

const login = asyncHandler(async (req, res) => {
  const body = loginSchema.parse(req.body);
  const user = await User.findOne({ email: body.email });
  if (!user) throw new HttpError(401, "Invalid credentials");

  const ok = await bcrypt.compare(body.password, user.passwordHash);
  if (!ok) throw new HttpError(401, "Invalid credentials");

  const token = signToken(user._id.toString());
  res.json({
    ok: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const body = forgotSchema.parse(req.body);
  const user = await User.findOne({ email: body.email });

  // Always return success to avoid email enumeration.
  if (!user) return res.json({ ok: true });

  const otp = generateOtp();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  user.otp = {
    purpose: "reset_password",
    otpHash,
    expiresAt,
    attempts: 0,
  };
  await user.save();

  const subject = "Your password reset OTP";
  const text = `Your OTP is ${otp}. It expires in 10 minutes.`;
  const html = `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`;

  await sendEmail({ to: user.email, subject, text, html });

  res.json({ ok: true });
});

const resetPassword = asyncHandler(async (req, res) => {
  const body = resetSchema.parse(req.body);
  const user = await User.findOne({ email: body.email });
  if (!user || !user.otp || user.otp.purpose !== "reset_password") {
    throw new HttpError(400, "Invalid OTP");
  }

  if (user.otp.expiresAt.getTime() < Date.now()) {
    user.otp = null;
    await user.save();
    throw new HttpError(400, "OTP expired");
  }

  if (user.otp.attempts >= 5) {
    user.otp = null;
    await user.save();
    throw new HttpError(429, "Too many attempts. Request a new OTP.");
  }

  const ok = await bcrypt.compare(body.otp, user.otp.otpHash);
  if (!ok) {
    user.otp.attempts += 1;
    await user.save();
    throw new HttpError(400, "Invalid OTP");
  }

  user.passwordHash = await bcrypt.hash(body.newPassword, 12);
  user.otp = null;
  await user.save();

  res.json({ ok: true });
});

module.exports = { me, signup, login, forgotPassword, resetPassword };

