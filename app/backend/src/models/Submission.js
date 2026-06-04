const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
      index: true,
    },
    language: {
      type: String,
      required: true,
      enum: ["c", "cpp", "java", "python", "javascript"],
      index: true,
    },
    sourceCode: { type: String, required: true },
    status: {
      type: String,
      enum: ["accepted", "wrong_answer", "runtime_error", "compile_error", "error"],
      required: true,
      index: true,
    },
    summary: {
      passed: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
      stderr: { type: String, default: "" },
      compileOutput: { type: String, default: "" },
    },
    judge0: {
      submissions: { type: [Object], default: [] },
    },
  },
  { timestamps: true },
);

SubmissionSchema.index({ user: 1, createdAt: -1 });

const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = { Submission };

