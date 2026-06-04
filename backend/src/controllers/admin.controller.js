const { z } = require("zod");
const { User } = require("../models/User");
const { Lesson } = require("../models/Lesson");
const { Problem } = require("../models/Problem");
const { Submission } = require("../models/Submission");
const { SavedCode } = require("../models/SavedCode");
const { EngagementConfig } = require("../models/EngagementConfig");
const { DEFAULT_TIPS, DEFAULT_MILESTONES } = require("./engagement.controller");
const { asyncHandler } = require("../utils/asyncHandler");
const { HttpError } = require("../utils/httpError");
const { SUPPORTED_LANGUAGES } = require("../config/languages");
const { isSumTwoNumbersTemplate } = require("../utils/problemTemplates");

const languageEnum = z.enum(SUPPORTED_LANGUAGES);

const PRIMARY_ADMIN_EMAIL = "admin@mernlearn.local";

const upsertLessonSchema = z.object({
  language: languageEnum,
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
  problemType: z.enum(["practice_problem", "milestone_problem", "lesson_problem"]).optional().default("practice_problem"),
});

const upsertEngagementSchema = z.object({
  streakTips: z.array(z.string().min(1)).min(1),
  milestones: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      desc: z.string().min(1),
      target: z.number().int().positive(),
      type: z.enum(["lessons", "solved", "streak", "saved", "problem"]),
      problemSlug: z.string().optional().default(""),
      badge: z.string().optional().default("🏆"),
      color: z.string().optional().default("#4f46e5"),
      bg: z.string().optional().default("#eef2ff"),
      border: z.string().optional().default("#c7d2fe"),
    }),
  ).min(1),
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

  const userToUpdate = await User.findById(req.params.id).select("name email role createdAt");
  if (!userToUpdate) throw new HttpError(404, "User not found");

  const isPrimaryAdmin = userToUpdate.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL;

  if (body.role === "admin" && !isPrimaryAdmin) {
    throw new HttpError(403, `Only ${PRIMARY_ADMIN_EMAIL} can have admin role`);
  }
  if (body.role === "user" && isPrimaryAdmin) {
    throw new HttpError(403, `${PRIMARY_ADMIN_EMAIL} must remain admin`);
  }

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

function assertProblemTestCases(slug, testCases) {
  if (!testCases?.length) throw new HttpError(400, "Add at least one test case");
  if (isSumTwoNumbersTemplate(testCases) && !String(slug).includes("sum")) {
    throw new HttpError(
      400,
      "Test cases match the default Sum Two Numbers template (1 2→3). Set correct input/output for this problem.",
    );
  }
  for (const tc of testCases) {
    if (!String(tc.input ?? "").length || !String(tc.expectedOutput ?? "").length) {
      throw new HttpError(400, "Each test case needs non-empty input and expected output");
    }
  }
}

const createProblem = asyncHandler(async (req, res) => {
  const body = upsertProblemSchema.parse(req.body);
  assertProblemTestCases(body.slug, body.testCases);
  const exists = await Problem.exists({ slug: body.slug });
  if (exists) throw new HttpError(409, "Slug already exists");
  const problem = await Problem.create(body);
  res.status(201).json({ ok: true, problem });
});

const updateProblem = asyncHandler(async (req, res) => {
  const body = upsertProblemSchema.partial().parse(req.body);
  const existing = await Problem.findById(req.params.id);
  if (!existing) throw new HttpError(404, "Problem not found");
  if (body.testCases) {
    assertProblemTestCases(body.slug || existing.slug, body.testCases);
  }
  const problem = await Problem.findByIdAndUpdate(req.params.id, body, { new: true });
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

const getEngagementConfigAdmin = asyncHandler(async (_req, res) => {
  const cfg = await EngagementConfig.findOne({ key: "main" }).lean();
  res.json({
    ok: true,
    config: {
      streakTips: cfg?.streakTips?.length ? cfg.streakTips : DEFAULT_TIPS,
      milestones: Array.isArray(cfg?.milestones) ? cfg.milestones : DEFAULT_MILESTONES,
    },
  });
});

const upsertEngagementConfigAdmin = asyncHandler(async (req, res) => {
  const body = upsertEngagementSchema.parse(req.body);
  let doc = await EngagementConfig.findOne({ key: "main" });
  if (!doc) {
    doc = new EngagementConfig({
      key: "main",
      streakTips: body.streakTips,
      milestones: body.milestones,
    });
  } else {
    doc.streakTips = body.streakTips;
    doc.milestones = body.milestones;
    doc.markModified("streakTips");
    doc.markModified("milestones");
  }
  await doc.save();
  const lean = doc.toObject();
  res.json({
    ok: true,
    config: {
      streakTips: lean.streakTips,
      milestones: lean.milestones,
    },
  });
});

const getDashboardStats = asyncHandler(async (_req, res) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDaysAgo = new Date(startOfToday);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [totalUsers, usersCreatedToday, usersCreated7Days, recentUsers] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ createdAt: { $gte: startOfToday } }),
    User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    User.find().select("name email role createdAt").sort({ createdAt: -1 }).limit(6),
  ]);

  const [totalLessons, publishedLessons] = await Promise.all([
    Lesson.countDocuments(),
    Lesson.countDocuments({ isPublished: true }),
  ]);

  const totalProblems = await Problem.countDocuments();

  const [totalSubmissions, submissionsToday, submissionsLast7Days, acceptedSubmissions] = await Promise.all([
    Submission.countDocuments(),
    Submission.countDocuments({ createdAt: { $gte: startOfToday } }),
    Submission.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    Submission.countDocuments({ status: "accepted" }),
  ]);

  const totalSavedCodes = await SavedCode.countDocuments();

  const topActiveUsers = await Submission.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo } } },
    {
      $group: {
        _id: "$user",
        submissions: { $sum: 1 },
        accepted: { $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] } },
      },
    },
    { $sort: { submissions: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 1,
        name: "$user.name",
        email: "$user.email",
        submissions: 1,
        accepted: 1,
      },
    },
  ]);

  const topProblems = await Submission.aggregate([
    {
      $group: {
        _id: "$problem",
        attempts: { $sum: 1 },
        accepted: { $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] } },
      },
    },
    { $sort: { attempts: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "problems",
        localField: "_id",
        foreignField: "_id",
        as: "problem",
      },
    },
    { $unwind: "$problem" },
    {
      $project: {
        _id: "$problem._id",
        title: "$problem.title",
        difficulty: "$problem.difficulty",
        attempts: 1,
        accepted: 1,
      },
    },
  ]);

  const recentSubmissions = await Submission.find()
    .populate("user", "name email")
    .populate("problem", "slug title difficulty")
    .sort({ createdAt: -1 })
    .limit(20);

  const recentSavedCodes = await SavedCode.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(20);

  const submissionsPerDayRaw = await Submission.aggregate([
    { $match: { createdAt: { $gte: sevenDaysAgo } } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
        accepted: { $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] } },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
  ]);

  const submissionsPerDay = submissionsPerDayRaw.map((d) => ({
    _id: `${d._id.year}-${String(d._id.month).padStart(2, "0")}-${String(d._id.day).padStart(2, "0")}`,
    count: d.count,
    accepted: d.accepted,
  }));

  const submissionsByLanguage = await Submission.aggregate([
    { $group: { _id: "$language", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const submissionsByStatus = await Submission.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const acceptanceRate = totalSubmissions
    ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
    : 0;

  res.json({
    ok: true,
    stats: {
      users: {
        total: totalUsers,
        newToday: usersCreatedToday,
        new7Days: usersCreated7Days,
      },
      lessons: {
        total: totalLessons,
        published: publishedLessons,
      },
      problems: {
        total: totalProblems,
      },
      submissions: {
        total: totalSubmissions,
        today: submissionsToday,
        last7Days: submissionsLast7Days,
        accepted: acceptedSubmissions,
        acceptanceRate,
      },
      savedCodes: {
        total: totalSavedCodes,
      },
    },
    charts: {
      submissionsPerDay,
      submissionsByLanguage,
      submissionsByStatus,
    },
    topActiveUsers,
    topProblems,
    recentSubmissions,
    recentSavedCodes,
    recentUsers,
  });
});

module.exports = {
  getDashboardStats,
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
  getEngagementConfigAdmin,
  upsertEngagementConfigAdmin,
};