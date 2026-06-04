const mongoose = require("mongoose");

const SavedCodeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 200, default: "Untitled" },
    language: {
      type: String,
      required: true,
      enum: require("../config/languages").SUPPORTED_LANGUAGES,
    },
    sourceCode: { type: String, required: true, maxlength: 200000 },
  },
  { timestamps: true },
);

SavedCodeSchema.index({ user: 1, createdAt: -1 });

const SavedCode = mongoose.model("SavedCode", SavedCodeSchema);

module.exports = { SavedCode };
