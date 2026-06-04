const { z } = require("zod");
const { Problem } = require("../models/Problem");
const { asyncHandler } = require("../utils/asyncHandler");
const { HttpError } = require("../utils/httpError");

const listSchema = z.object({
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  q: z.string().max(100).optional(),
});

const listProblems = asyncHandler(async (req, res) => {
  const q = listSchema.parse(req.query);
  const filter = { isPublished: true };
  if (q.difficulty) filter.difficulty = q.difficulty;
  if (q.q) filter.title = { $regex: q.q, $options: "i" };

  const problems = await Problem.find(filter)
    .select("slug title difficulty tags createdAt")
    .sort({ createdAt: -1 });

  res.json({ ok: true, problems });
});

const getProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findOne({ slug: req.params.slug, isPublished: true });
  if (!problem) throw new HttpError(404, "Problem not found");
  res.json({ ok: true, problem });
});

module.exports = { listProblems, getProblem };

