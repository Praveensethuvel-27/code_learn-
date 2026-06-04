const { HttpError } = require("../utils/httpError");

const JUDGE0_LANGUAGE_IDS = {
  c:          50,
  cpp:        54,
  java:       62,
  python:     71,
  javascript: 63,
};

const COMPILER_MAP = {
  c:          "gcc-15",
  cpp:        "g++-15",
  java:       "openjdk-25",
  python:     "python-3.14",
  javascript: "typescript-deno",
};

async function createSubmission({ language, source_code, stdin }) {
  const compiler = COMPILER_MAP[language];
  if (!compiler) throw new HttpError(400, "Unsupported language");

  const apiKey = process.env.ONLINECOMPILER_KEY;
  if (!apiKey) throw new Error("ONLINECOMPILER_KEY is required");

  const res = await fetch("https://api.onlinecompiler.io/api/run-code-sync/", {
    method: "POST",
    headers: {
      "Authorization": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      compiler,
      code:  source_code,
      input: stdin ?? "",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new HttpError(502, "OnlineCompiler request failed", { status: res.status, body });
  }

  return await res.json();
}

async function runAgainstTestCases({ language, sourceCode, testCases }) {
  if (!COMPILER_MAP[language]) throw new HttpError(400, "Unsupported language");

  const results = [];
  for (const tc of testCases) {
    // eslint-disable-next-line no-await-in-loop
    const r = await createSubmission({
      language,
      source_code: sourceCode,
      stdin: tc.input,
    });

    results.push({
      stdout: r.output,
      stderr: r.error,
      output: r.output,
      status: { description: r.status === "success" ? "Accepted" : "Runtime Error" },
      time:   r.time,
      memory: r.memory,
    });
  }
  return results;
}

module.exports = { JUDGE0_LANGUAGE_IDS, runAgainstTestCases };