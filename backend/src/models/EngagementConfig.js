const mongoose = require("mongoose");

const MilestoneSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    target: { type: Number, required: true, min: 1 },
    type: { type: String, enum: ["lessons", "solved", "streak", "saved", "problem"], required: true },
    problemSlug: { type: String, default: "" },
    badge: { type: String, default: "🏆" },
    color: { type: String, default: "#4f46e5" },
    bg: { type: String, default: "#eef2ff" },
    border: { type: String, default: "#c7d2fe" },
  },
  { _id: false },
);

const EngagementConfigSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    streakTips: { type: [String], default: [] },
    milestones: { type: [MilestoneSchema], default: [] },
  },
  { timestamps: true },
);

const EngagementConfig = mongoose.model("EngagementConfig", EngagementConfigSchema);

module.exports = { EngagementConfig };