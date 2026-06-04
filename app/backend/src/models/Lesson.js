const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
      enum: ["c", "cpp", "java", "python", "javascript"],
      index: true,
    },
    topic: {
      type: String,
      required: true,
      enum: ["basics", "loops", "functions", "oop"],
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    contentMarkdown: { type: String, required: true },
    codeExample: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

LessonSchema.index({ language: 1, topic: 1, order: 1 });

const Lesson = mongoose.model("Lesson", LessonSchema);

module.exports = { Lesson };

