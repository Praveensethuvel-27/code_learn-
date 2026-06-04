const { z } = require("zod");
const { Problem } = require("../models/Problem");
const { Submission } = require("../models/Submission");
const { asyncHandler } = require("../utils/asyncHandler");
const { HttpError } = require("../utils/httpError");
const { runAgainstTestCases } = require("../services/judge0");
const { getStreakStats } = require("../services/streakStats");
const { onAcceptedSubmission } = require("../services/gamification");

const { COMPILER_LANGUAGES } = require("../config/languages");

const languageEnum = z.enum(COMPILER_LANGUAGES);

const runSchema = z.object({
  language: languageEnum,
  sourceCode: z.string().min(1).max(200000),
  stdin: z.string().max(200000).optional(),
});

const submitSchema = z.object({
  language: languageEnum,
  sourceCode: z.string().min(1).max(200000),
});

function normalizeOutput(s) {
  return String(s ?? "").replace(/\r\n/g, "\n").trimEnd();
}

const STATUS_LABEL = {
  accepted: "Accepted",
  wrong_answer: "Wrong Answer",
  compile_error: "Compilation Error",
  runtime_error: "Runtime Error",
  time_limit: "Time Limit Exceeded",
};

async function judgeProblemCode(problem, language, sourceCode) {
  const judgeResults = await runAgainstTestCases({
    language,
    sourceCode,
    testCases: problem.testCases,
  });

  let passed = 0;
  let firstErr = null;

  for (let i = 0; i < problem.testCases.length; i += 1) {
    const tc = problem.testCases[i];
    const r = judgeResults[i];
    const statusId = r?.status?.id;

    if (statusId === 3) {
      const out = normalizeOutput(r.stdout);
      const expected = normalizeOutput(tc.expectedOutput);
      if (out === expected) passed += 1;
      else if (!firstErr) firstErr = { kind: "wrong_answer", index: i };
    } else if (statusId === 6) {
      if (!firstErr) firstErr = { kind: "compile_error", index: i };
    } else if (statusId === 5) {
      if (!firstErr) firstErr = { kind: "time_limit", index: i };
    } else {
      if (!firstErr) firstErr = { kind: "runtime_error", index: i };
    }
  }

  const total = problem.testCases.length;
  const accepted = passed === total;

  const status = accepted
    ? "accepted"
    : firstErr?.kind === "compile_error"
      ? "compile_error"
      : firstErr?.kind === "wrong_answer"
        ? "wrong_answer"
        : firstErr?.kind === "time_limit"
          ? "time_limit"
          : "runtime_error";

  const testResults = problem.testCases.map((tc, i) => {
    const r = judgeResults[i];
    const statusId = r?.status?.id;
    const tcPassed =
      statusId === 3 && normalizeOutput(r.stdout) === normalizeOutput(tc.expectedOutput);
    let rowStatus = "Accepted";
    if (!tcPassed) {
      if (statusId === 6) rowStatus = "Compilation Error";
      else if (statusId === 5) rowStatus = "Time Limit Exceeded";
      else if (statusId === 3) rowStatus = "Wrong Answer";
      else rowStatus = r?.status?.description || "Runtime Error";
    }
    return {
      passed: tcPassed,
      status: rowStatus,
      stdout: r?.stdout ?? "",
      stderr: r?.stderr ?? r?.compile_output ?? "",
      input: tc.input,
      expected: tc.expectedOutput,
      time: r?.time ?? null,
      memory: r?.memory ?? null,
    };
  });

  return {
    status,
    passed,
    total,
    judgeResults,
    testResults,
    stderr: judgeResults.find((r) => r?.stderr)?.stderr ?? "",
    compileOutput: judgeResults.find((r) => r?.compile_output)?.compile_output ?? "",
    stdout: judgeResults[0]?.stdout ?? "",
  };
}

const runCode = asyncHandler(async (req, res) => {
  const body = runSchema.parse(req.body);

  const results = await runAgainstTestCases({
    language: body.language,
    sourceCode: body.sourceCode,
    testCases: [{ input: body.stdin ?? "", expectedOutput: "" }],
  });

  const r = results[0];
  res.json({
    ok: true,
    result: {
      stdout: r.stdout ?? "",
      stderr: r.stderr ?? "",
      compile_output: r.compile_output ?? "",
      message: r.message ?? "",
      status: r.status ?? null,
      time: r.time ?? null,
      memory: r.memory ?? null,
    },
  });
});

const runOnProblem = asyncHandler(async (req, res) => {
  const body = submitSchema.parse(req.body);
  const problem = await Problem.findOne({ slug: req.params.slug, isPublished: true });
  if (!problem) throw new HttpError(404, "Problem not found");
  if (!problem.testCases.length) throw new HttpError(400, "Problem has no test cases");

  const judged = await judgeProblemCode(problem, body.language, body.sourceCode);

  res.json({
    ok: true,
    result: {
      status: { description: STATUS_LABEL[judged.status] || judged.status },
      summary: { passed: judged.passed, total: judged.total },
      testResults: judged.testResults,
      stdout: judged.stdout,
      stderr: judged.stderr || judged.compileOutput,
      compile_output: judged.compileOutput,
    },
  });
});

const submitToProblem = asyncHandler(async (req, res) => {
  const body = submitSchema.parse(req.body);
  const problem = await Problem.findOne({ slug: req.params.slug, isPublished: true });
  if (!problem) throw new HttpError(404, "Problem not found");
  if (!problem.testCases.length) throw new HttpError(400, "Problem has no test cases");

  const judged = await judgeProblemCode(problem, body.language, body.sourceCode);

  const submission = await Submission.create({
    user: req.user._id,
    problem: problem._id,
    language: body.language,
    sourceCode: body.sourceCode,
    status: judged.status,
    summary: {
      passed: judged.passed,
      total: judged.total,
      stderr: judged.stderr,
      compileOutput: judged.compileOutput,
    },
    judge0: { submissions: judged.judgeResults },
  });

  let streak = null;
  let rewards = null;
  if (judged.status === "accepted") {
    rewards = await onAcceptedSubmission(req.user._id, problem);
    streak = await getStreakStats(req.user._id);
  }

  res.status(201).json({
    ok: true,
    submission: {
      id: submission._id,
      status: submission.status,
      summary: submission.summary,
      createdAt: submission.createdAt,
    },
    result: {
      status: { description: STATUS_LABEL[judged.status] || judged.status },
      summary: { passed: judged.passed, total: judged.total },
      testResults: judged.testResults,
      stdout: judged.stdout,
      stderr: judged.stderr || judged.compileOutput,
    },
    streak,
    rewards,
  });
});

const mySubmissions = asyncHandler(async (req, res) => {
  const items = await Submission.find({ user: req.user._id })
    .populate("problem", "slug title difficulty")
    .sort({ createdAt: -1 })
    .limit(100);
  res.json({ ok: true, submissions: items });
});

module.exports = { runCode, runOnProblem, submitToProblem, mySubmissions };

