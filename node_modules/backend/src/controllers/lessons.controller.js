const { z } = require("zod");
const { Lesson } = require("../models/Lesson");
const { asyncHandler } = require("../utils/asyncHandler");
const { HttpError } = require("../utils/httpError");

const listSchema = z.object({
  language: z.enum(require("../config/languages").SUPPORTED_LANGUAGES).optional(),
  topic: z.enum(["basics", "loops", "functions", "oop"]).optional(),
});

const listLessons = asyncHandler(async (req, res) => {
  const q = listSchema.parse(req.query);
  const filter = { isPublished: true };
  if (q.language) filter.language = q.language;
  if (q.topic) filter.topic = q.topic;
  const lessons = await Lesson.find(filter).sort({ order: 1, createdAt: 1 });
  res.json({ ok: true, lessons });
});

const getLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findOne({
    _id: req.params.id,
    isPublished: true,
  });
  if (!lesson) throw new HttpError(404, "Lesson not found");
  res.json({ ok: true, lesson });
});

const markCompleted = asyncHandler(async (req, res) => {
  const lessonId = req.params.id;
  const exists = await Lesson.exists({ _id: lessonId, isPublished: true });
  if (!exists) throw new HttpError(404, "Lesson not found");

  const user = req.user;
  const already = user.completedLessons.some((id) => id.toString() === lessonId);
  if (!already) {
    user.completedLessons.push(lessonId);
    await user.save();
  }
  res.json({ ok: true });
});

module.exports = { listLessons, getLesson, markCompleted };

