const { z } = require("zod");
const { Problem } = require("../models/Problem");
const { Submission } = require("../models/Submission");
const { asyncHandler } = require("../utils/asyncHandler");
const { HttpError } = require("../utils/httpError");
const { runAgainstTestCases } = require("../services/judge0");

const runSchema = z.object({
  language: z.enum(["c", "cpp", "java", "python", "javascript"]),
  sourceCode: z.string().min(1).max(200000),
  stdin: z.string().max(200000).optional(),
});

const submitSchema = z.object({
  language: z.enum(["c", "cpp", "java", "python", "javascript"]),
  sourceCode: z.string().min(1).max(200000),
});

function normalizeOutput(s) {
  return String(s ?? "").replace(/\r\n/g, "\n").trimEnd();
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

const submitToProblem = asyncHandler(async (req, res) => {
  const body = submitSchema.parse(req.body);
  const problem = await Problem.findOne({ slug: req.params.slug, isPublished: true });
  if (!problem) throw new HttpError(404, "Problem not found");
  if (!problem.testCases.length) throw new HttpError(400, "Problem has no test cases");

  const judgeResults = await runAgainstTestCases({
    language: body.language,
    sourceCode: body.sourceCode,
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
        : "runtime_error";

  const submission = await Submission.create({
    user: req.user._id,
    problem: problem._id,
    language: body.language,
    sourceCode: body.sourceCode,
    status,
    summary: {
      passed,
      total,
      stderr: judgeResults.find((r) => r?.stderr)?.stderr ?? "",
      compileOutput: judgeResults.find((r) => r?.compile_output)?.compile_output ?? "",
    },
    judge0: { submissions: judgeResults },
  });

  res.status(201).json({
    ok: true,
    submission: {
      id: submission._id,
      status: submission.status,
      summary: submission.summary,
      createdAt: submission.createdAt,
    },
  });
});

const mySubmissions = asyncHandler(async (req, res) => {
  const items = await Submission.find({ user: req.user._id })
    .populate("problem", "slug title difficulty")
    .sort({ createdAt: -1 })
    .limit(100);
  res.json({ ok: true, submissions: items });
});

module.exports = { runCode, submitToProblem, mySubmissions };

