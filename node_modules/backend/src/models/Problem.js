const mongoose = require("mongoose");

const ExampleSchema = new mongoose.Schema(
  {
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String, default: "" },
  },
  { _id: false },
);

const TestCaseSchema = new mongoose.Schema(
  {
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    isHidden: { type: Boolean, default: false },
  },
  { _id: false },
);

const StarterCodeSchema = new mongoose.Schema(
  {
    c: { type: String, default: "" },
    cpp: { type: String, default: "" },
    java: { type: String, default: "" },
    python: { type: String, default: "" },
    javascript: { type: String, default: "" },
  },
  { _id: false },
);

const ProblemSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
      index: true,
    },
    descriptionMarkdown: { type: String, required: true },
    inputDescription: { type: String, default: "" },
    outputDescription: { type: String, default: "" },
    constraints: { type: String, default: "" },
    examples: { type: [ExampleSchema], default: [] },
    starterCode: { type: StarterCodeSchema, default: () => ({}) },
    testCases: { type: [TestCaseSchema], default: [] },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: true, index: true },
    problemType: { type: String, enum: ["practice_problem", "milestone_problem", "lesson_problem"], default: "practice_problem", index: true },
  },
  { timestamps: true },
);

const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = { Problem };