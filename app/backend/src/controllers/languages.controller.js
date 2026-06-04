const { asyncHandler } = require("../utils/asyncHandler");

const LANGUAGES = [
  { key: "c", label: "C" },
  { key: "cpp", label: "C++" },
  { key: "java", label: "Java" },
  { key: "python", label: "Python" },
  { key: "javascript", label: "JavaScript" },
];

const TOPICS = [
  { key: "basics", label: "Basics" },
  { key: "loops", label: "Loops" },
  { key: "functions", label: "Functions" },
  { key: "oop", label: "OOP" },
];

const listLanguages = asyncHandler(async (_req, res) => {
  res.json({ ok: true, languages: LANGUAGES, topics: TOPICS });
});

module.exports = { listLanguages };

