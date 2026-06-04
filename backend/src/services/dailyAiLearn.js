const { DailyAiLearn } = require("../models/DailyAiLearn");
const {
  getLessonForDay,
  getLessonByFlatIndex,
  getCurriculum,
  getFullCurriculum,
  getLessonByModule,
  getAdjacentLesson,
  FLAT_LESSONS,
} = require("../data/aiCurriculum");
const { User } = require("../models/User");

function dateKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function yesterdayDateKey(date = new Date()) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() - 1);
  return dateKey(d);
}

/**
 * Daily lesson: always different from yesterday (next in path).
 * Falls back to calendar index if no yesterday record.
 */
async function pickCuratedForDate(date = new Date()) {
  const key = dateKey(date);
  const total = FLAT_LESSONS.length;
  if (!total) return getLessonForDay(date);

  const yKey = yesterdayDateKey(date);
  const yDoc = await DailyAiLearn.findOne({ date: yKey }).select("lessonIndex").lean();

  if (yDoc?.lessonIndex >= 1) {
    const nextIdx = yDoc.lessonIndex % total;
    return getLessonByFlatIndex(nextIdx, key);
  }

  return getLessonForDay(date);
}

async function callGroqDaily(lessonHint, date = new Date()) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const prompt = `You teach college students an AI learning path (${lessonHint.totalLessons || 30} lessons, 10 modules).
Module ${lessonHint.moduleOrder || "?"}: "${lessonHint.moduleTitle}" (id: ${lessonHint.topic})
Lesson ${lessonHint.lessonInModule || 1} of ${lessonHint.lessonsInModule || 3}: "${lessonHint.title}"
Summary hint: ${lessonHint.summary || ""}

Return ONLY valid JSON (no markdown):
{
  "title": "engaging lesson title",
  "summary": "one clear sentence",
  "concept": "4 short paragraphs, plain text, max 220 words total. Use real examples.",
  "highlights": ["3 bullet key points", "each under 12 words"],
  "miniChallenge": "one reflection question",
  "codeTip": "one memorable takeaway"
}

Stay beginner-friendly. Focus on AI/ML concepts NOT competitive programming.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      max_tokens: 900,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content || "";
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  try {
    const parsed = JSON.parse(jsonMatch[0]);
    const highlights = Array.isArray(parsed.highlights) ? parsed.highlights.slice(0, 5) : lessonHint.highlights;
    return {
      ...lessonHint,
      title: parsed.title || lessonHint.title,
      summary: parsed.summary || lessonHint.summary,
      concept: parsed.concept || lessonHint.concept,
      miniChallenge: parsed.miniChallenge || lessonHint.miniChallenge,
      codeTip: parsed.codeTip || lessonHint.codeTip,
      highlights: highlights?.length ? highlights : lessonHint.highlights || [],
      source: "ai",
    };
  } catch {
    return null;
  }
}

async function ensureTodayLesson() {
  const key = dateKey();
  let doc = await DailyAiLearn.findOne({ date: key }).lean();
  if (doc) return doc;

  const today = new Date();
  const curated = await pickCuratedForDate(today);
  let payload = await callGroqDaily(curated, today);
  if (!payload) payload = curated;

  doc = await DailyAiLearn.create({
    date: key,
    topic: payload.topic,
    moduleId: payload.moduleId || payload.topic,
    moduleTitle: payload.moduleTitle || "",
    moduleOrder: payload.moduleOrder || 0,
    lessonIndex: payload.lessonIndex || 0,
    lessonInModule: payload.lessonInModule || 0,
    lessonsInModule: payload.lessonsInModule || 0,
    totalLessons: payload.totalLessons || FLAT_LESSONS.length,
    title: payload.title,
    summary: payload.summary,
    concept: payload.concept,
    miniChallenge: payload.miniChallenge,
    codeTip: payload.codeTip,
    highlights: payload.highlights || [],
    imageUrl: payload.imageUrl || "",
    imageCaption: payload.imageCaption || "",
    readTimeMin: payload.readTimeMin || 6,
    practiceTag: payload.practiceTag || "",
    source: payload.source || "curated",
  });

  return doc.toObject ? doc.toObject() : doc;
}

async function getTodayLesson() {
  return ensureTodayLesson();
}

async function getRecentLessons(limit = 7) {
  await ensureTodayLesson();
  return DailyAiLearn.find().sort({ date: -1 }).limit(limit).lean();
}

function progressKey(moduleId, lessonInModule) {
  return `${moduleId}:${lessonInModule}`;
}

async function getUserProgress(userId) {
  if (!userId) return { completed: [], completedCount: 0 };
  const user = await User.findById(userId).select("aiLearnProgress").lean();
  const completed = user?.aiLearnProgress || [];
  return {
    completed,
    completedCount: completed.length,
    completedSet: new Set(completed.map((c) => progressKey(c.moduleId, c.lessonInModule))),
  };
}

async function markLessonComplete(userId, moduleId, lessonInModule) {
  const user = await User.findById(userId);
  if (!user) return null;
  const li = Number(lessonInModule) || 1;
  const exists = (user.aiLearnProgress || []).some(
    (c) => c.moduleId === moduleId && c.lessonInModule === li,
  );
  if (!exists) {
    user.aiLearnProgress = [...(user.aiLearnProgress || []), { moduleId, lessonInModule: li }];
    await user.save();
  }
  return getUserProgress(userId);
}

module.exports = {
  getTodayLesson,
  getRecentLessons,
  getCurriculum,
  getFullCurriculum,
  getLessonByModule,
  getAdjacentLesson,
  getUserProgress,
  markLessonComplete,
  dateKey,
};
