const { asyncHandler } = require("../utils/asyncHandler");
const { HttpError } = require("../utils/httpError");
const {
  getTodayLesson,
  getRecentLessons,
  getCurriculum,
  getFullCurriculum,
  getLessonByModule,
  getAdjacentLesson,
  getUserProgress,
  markLessonComplete,
} = require("../services/dailyAiLearn");

const getToday = asyncHandler(async (_req, res) => {
  const lesson = await getTodayLesson();
  const curriculum = getCurriculum();
  res.json({ ok: true, lesson, curriculum, date: lesson.date });
});

const getRecent = asyncHandler(async (req, res) => {
  const limit = Math.min(14, Math.max(1, Number(req.query.limit) || 7));
  const lessons = await getRecentLessons(limit);
  res.json({ ok: true, lessons, curriculum: getCurriculum() });
});

const getPath = asyncHandler(async (_req, res) => {
  res.json({ ok: true, curriculum: getCurriculum() });
});

/** Full path — all modules & lessons for reading in any order */
const getBrowse = asyncHandler(async (req, res) => {
  const curriculum = getFullCurriculum();
  const today = await getTodayLesson();
  res.json({
    ok: true,
    curriculum,
    suggestedToday: {
      moduleId: today.moduleId || today.topic,
      lessonInModule: today.lessonInModule || 1,
      title: today.title,
      moduleTitle: today.moduleTitle,
      lessonIndex: today.lessonIndex,
      totalLessons: today.totalLessons,
      source: today.source,
    },
    dailyRotation: {
      totalLessons: curriculum.totalLessons,
      moduleCount: curriculum.modules?.length || curriculum.moduleCount || 10,
      note: "Each new day gets the next lesson in the path — never the same as yesterday. After 30 days the path cycles. Browse any lesson anytime.",
    },
  });
});

const getLesson = asyncHandler(async (req, res) => {
  const { moduleId, lesson } = req.query;
  if (!moduleId) throw new HttpError(400, "moduleId required");
  const lessonInModule = Number(lesson) || 1;
  const content = getLessonByModule(moduleId, lessonInModule);
  if (!content) throw new HttpError(404, "Lesson not found");
  const prev = getAdjacentLesson(moduleId, lessonInModule, "prev");
  const next = getAdjacentLesson(moduleId, lessonInModule, "next");
  res.json({ ok: true, lesson: content, prev, next });
});

const getProgress = asyncHandler(async (req, res) => {
  const progress = await getUserProgress(req.user._id);
  res.json({ ok: true, progress });
});

const postProgress = asyncHandler(async (req, res) => {
  const { moduleId, lessonInModule } = req.body;
  if (!moduleId) throw new HttpError(400, "moduleId required");
  const progress = await markLessonComplete(req.user._id, moduleId, Number(lessonInModule) || 1);
  res.json({ ok: true, progress });
});

module.exports = {
  getToday,
  getRecent,
  getPath,
  getBrowse,
  getLesson,
  getProgress,
  postProgress,
};
