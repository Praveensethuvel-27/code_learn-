const mongoose = require("mongoose");

const dailyAiLearnSchema = new mongoose.Schema(
  {
    date: { type: String, required: true, unique: true, index: true },
    topic: { type: String, required: true },
    moduleId: { type: String, default: "" },
    moduleTitle: { type: String, default: "" },
    moduleOrder: { type: Number, default: 0 },
    lessonIndex: { type: Number, default: 0 },
    lessonInModule: { type: Number, default: 0 },
    lessonsInModule: { type: Number, default: 0 },
    totalLessons: { type: Number, default: 0 },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    concept: { type: String, required: true },
    miniChallenge: { type: String, required: true },
    codeTip: { type: String, required: true },
    highlights: { type: [String], default: [] },
    imageUrl: { type: String, default: "" },
    imageCaption: { type: String, default: "" },
    readTimeMin: { type: Number, default: 6 },
    practiceTag: { type: String, default: "" },
    source: { type: String, enum: ["curated", "ai"], default: "curated" },
  },
  { timestamps: true },
);

const DailyAiLearn = mongoose.model("DailyAiLearn", dailyAiLearnSchema);

module.exports = { DailyAiLearn };
