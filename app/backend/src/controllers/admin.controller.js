const { z } = require("zod");
const { User } = require("../models/User");
const { Lesson } = require("../models/Lesson");
const { Problem } = require("../models/Problem");
const { Submission } = require("../models/Submission");
const { SavedCode } = require("../models/SavedCode");
const { asyncHandler } = require("../utils/asyncHandler");
const { HttpError } = require("../utils/httpError");

const upsertLessonSchema = z.object({
  language: z.enum(["c", "cpp", "java", "python", "javascript"]),
  topic: z.enum(["basics", "loops", "functions", "oop"]),
  title: z.string().min(1).max(160),
  contentMarkdown: z.string().min(1),
  codeExample: z.string().optional().default(""),
  order: z.number().int().optional().default(0),
  isPublished: z.boolean().optional().default(true),
});

const upsertProblemSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]{3,80}$/),
  title: z.string().min(1).max(200),
  difficulty: z.enum(["easy", "medium", "hard"]),
  descriptionMarkdown: z.string().min(1),
  inputDescription: z.string().optional().default(""),
  outputDescription: z.string().optional().default(""),
  constraints: z.string().optional().default(""),
  examples: z
    .array(
      z.object({
        input: z.string(),
        output: z.string(),
        explanation: z.string().optional().default(""),
      }),
    )
    .optional()
    .default([]),
  starterCode: z
    .object({
      c: z.string().optional().default(""),
      cpp: z.string().optional().default(""),
      java: z.string().optional().default(""),
      python: z.string().optional().default(""),
      javascript: z.string().optional().default(""),
    })
    .optional()
    .default({}),
  testCases: z
    .array(
      z.object({
        input: z.string(),
        expectedOutput: z.string(),
        isHidden: z.boolean().optional().default(false),
      }),
    )
    .optional()
    .default([]),
  tags: z.array(z.string()).optional().default([]),
  isPublished: z.boolean().optional().default(true),
});

const listUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().select("name email role createdAt").sort({ createdAt: -1 });
  res.json({ ok: true, users });
});

const listLessons = asyncHandler(async (_req, res) => {
  const lessons = await Lesson.find().sort({ language: 1, topic: 1, order: 1, createdAt: 1 });
  res.json({ ok: true, lessons });
});

const listProblems = asyncHandler(async (_req, res) => {
  const problems = await Problem.find().sort({ createdAt: -1 });
  res.json({ ok: true, problems });
});

const setUserRole = asyncHandler(async (req, res) => {
  const schema = z.object({ role: z.enum(["user", "admin"]) });
  const body = schema.parse(req.body);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: body.role },
    { new: true },
  ).select("name email role createdAt");
  if (!user) throw new HttpError(404, "User not found");
  res.json({ ok: true, user });
});

const createLesson = asyncHandler(async (req, res) => {
  const body = upsertLessonSchema.parse(req.body);
  const lesson = await Lesson.create(body);
  res.status(201).json({ ok: true, lesson });
});

const updateLesson = asyncHandler(async (req, res) => {
  const body = upsertLessonSchema.partial().parse(req.body);
  const lesson = await Lesson.findByIdAndUpdate(req.params.id, body, { new: true });
  if (!lesson) throw new HttpError(404, "Lesson not found");
  res.json({ ok: true, lesson });
});

const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.id);
  if (!lesson) throw new HttpError(404, "Lesson not found");
  res.json({ ok: true });
});

const createProblem = asyncHandler(async (req, res) => {
  const body = upsertProblemSchema.parse(req.body);
  const exists = await Problem.exists({ slug: body.slug });
  if (exists) throw new HttpError(409, "Slug already exists");
  const problem = await Problem.create(body);
  res.status(201).json({ ok: true, problem });
});

const updateProblem = asyncHandler(async (req, res) => {
  const body = upsertProblemSchema.partial().parse(req.body);
  const problem = await Problem.findByIdAndUpdate(req.params.id, body, { new: true });
  if (!problem) throw new HttpError(404, "Problem not found");
  res.json({ ok: true, problem });
});

const deleteProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findByIdAndDelete(req.params.id);
  if (!problem) throw new HttpError(404, "Problem not found");
  res.json({ ok: true });
});

const getAllSubmissions = asyncHandler(async (_req, res) => {
  const submissions = await Submission.find()
    .populate("user", "name email")
    .populate("problem", "slug title difficulty")
    .sort({ createdAt: -1 })
    .limit(200);
  res.json({ ok: true, submissions });
});

const getAllSavedCodes = asyncHandler(async (_req, res) => {
  const savedCodes = await SavedCode.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(200);
  res.json({ ok: true, savedCodes });
});

module.exports = {
  listUsers,
  listLessons,
  listProblems,
  setUserRole,
  createLesson,
  updateLesson,
  deleteLesson,
  createProblem,
  updateProblem,
  deleteProblem,
  getAllSubmissions,
  getAllSavedCodes,
};

