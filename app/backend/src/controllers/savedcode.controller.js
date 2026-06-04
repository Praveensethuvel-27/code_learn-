const { z } = require("zod");
const { SavedCode } = require("../models/SavedCode");
const { asyncHandler } = require("../utils/asyncHandler");
const { HttpError } = require("../utils/httpError");

const saveSchema = z.object({
  title: z.string().min(1).max(200).default("Untitled"),
  language: z.enum(["c", "cpp", "java", "python", "javascript"]),
  sourceCode: z.string().min(1).max(200000),
});

const saveCode = asyncHandler(async (req, res) => {
  const body = saveSchema.parse(req.body);
  const saved = await SavedCode.create({ user: req.user._id, ...body });
  res.status(201).json({ ok: true, savedCode: saved });
});

const getMySavedCodes = asyncHandler(async (req, res) => {
  const items = await SavedCode.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);
  res.json({ ok: true, savedCodes: items });
});

const deleteSavedCode = asyncHandler(async (req, res) => {
  const item = await SavedCode.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!item) throw new HttpError(404, "Saved code not found");
  res.json({ ok: true });
});

module.exports = { saveCode, getMySavedCodes, deleteSavedCode };
