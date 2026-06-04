const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    purpose: { type: String, enum: ["reset_password"], required: true },
    otpHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
  },
  { _id: false },
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 120,
      index: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    otp: { type: OtpSchema, default: null },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };

