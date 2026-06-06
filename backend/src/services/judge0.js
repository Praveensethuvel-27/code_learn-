const { HttpError } = require("../utils/httpError");
const {
  COMPILER_MAP,
  JUDGE0_LANGUAGE_IDS,
} = require("../config/languages");

const DENO_STDIN_HELPER = `function __readStdin() {
  const b = new Uint8Array(65536);
  const n = Deno.stdin.readSync(b);
  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : "";
}`;

/** Sleep helper for rate-limit delays */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** OnlineCompiler fails when input is "" but code reads stdin — omit empty input. */
function buildRunBody(compiler, code, stdin) {
  const body = { compiler, code };
  if (stdin != null && String(stdin).length > 0) body.input = String(stdin);
  return body;
}

/** Node-style starter code → Deno (typescript-deno compiler). */
function prepareJavaScriptForDeno(source) {
  let code = String(source);
  const hadNodeStdin =
    /readFileSync\s*\(\s*0/.test(code) ||
    /require\s*\(\s*['"]fs['"]\s*\)/.test(code) ||
    /readline/.test(code);

  code = code.replace(/const\s+readline\s*=\s*require\(["']readline["']\);?\r?\n?/g, "");
  code = code.replace(/const\s+rl\s*=\s*readline\.createInterface\([\s\S]*?\}\);?\r?\n?/g, "");
  code = code.replace(/const\s+fs\s*=\s*require\(["']fs["']\);?\r?\n?/g, "");
  code = code.replace(/fs\.readFileSync\s*\(\s*0\s*,\s*["']utf8["']\s*\)/g, "__readStdin()");
  code = code.replace(
    /new\s+TextDecoder\(\)\.decode\s*\(\s*Deno\.readAllSync\s*\(\s*Deno\.stdin\s*\)\s*\)/g,
    "__readStdin()",
  );

  if ((hadNodeStdin || /__readStdin\s*\(/.test(code)) && !/function\s+__readStdin/.test(code)) {
    code = `${DENO_STDIN_HELPER}\n\n${code}`;
  }
  return code;
}

function prepareSourceForCompiler(language, sourceCode) {
  if (language === "javascript" || language === "typescript") {
    return prepareJavaScriptForDeno(sourceCode);
  }
  return sourceCode;
}

function mapCompilerStatus(r) {
  const err = String(r.error || "");
  const errLower = err.toLowerCase();

  if (r.status === "success" && !err) {
    return { id: 3, description: "Accepted" };
  }

  if (errLower.includes("internal error")) {
    return { id: 13, description: "Internal Error" };
  }

  const isCompileError =
    errLower.includes("compile") ||
    errLower.includes("syntaxerror") ||
    errLower.includes("cannot find symbol") ||
    (errLower.includes("error:") && !errLower.includes("internal error"));

  if (r.status !== "success" || err) {
    return isCompileError
      ? { id: 6, description: "Compilation Error" }
      : { id: 11, description: "Runtime Error" };
  }

  return { id: 3, description: "Accepted" };
}

/**
 * Submit code to OnlineCompiler with retry support.
 * Retries up to `maxRetries` times on "Internal error: code execution failed".
 */
async function createSubmission({ language, source_code, stdin }, maxRetries = 3) {
  const compiler = COMPILER_MAP[language];
  if (!compiler) throw new HttpError(400, "Unsupported language");

  const apiKey = process.env.ONLINECOMPILER_KEY;
  if (!apiKey) throw new Error("ONLINECOMPILER_KEY is required");

  const code = prepareSourceForCompiler(language, source_code);
  const body = buildRunBody(compiler, code, stdin);

  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Add a small delay before each retry (not the first attempt)
      if (attempt > 1) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(attempt * 600); // 1.2s, 1.8s for retries 2 and 3
        // eslint-disable-next-line no-console
        console.log(`[ONLINECOMPILER] Retrying attempt ${attempt}/${maxRetries}...`);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      let res;
      try {
        // eslint-disable-next-line no-await-in-loop
        res = await fetch("https://api.onlinecompiler.io/api/run-code-sync/", {
          method: "POST",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new HttpError(502, "OnlineCompiler request failed", { status: res.status, body: text });
      }

      const result = await res.json();

      // If it's an "internal error" from the API, retry
      const errMsg = String(result.error || "").toLowerCase();
      if (errMsg.includes("internal error") && attempt < maxRetries) {
        // eslint-disable-next-line no-console
        console.warn(`[ONLINECOMPILER] Internal error on attempt ${attempt}, will retry...`);
        lastError = result;
        continue;
      }

      return result;
    } catch (err) {
      if (err instanceof HttpError) throw err;
      lastError = err;
      // eslint-disable-next-line no-console
      console.warn(`[ONLINECOMPILER] Attempt ${attempt} failed:`, err.message);
      if (attempt === maxRetries) throw err;
    }
  }

  // All retries exhausted — return the last result (even if it's an internal error)
  return lastError;
}

async function runAgainstTestCases({ language, sourceCode, testCases }) {
  if (!COMPILER_MAP[language]) throw new HttpError(400, "Unsupported language");

  const results = [];
  for (let i = 0; i < testCases.length; i += 1) {
    const tc = testCases[i];

    // Add a small delay between test cases to avoid rate limiting
    // eslint-disable-next-line no-await-in-loop
    if (i > 0) await sleep(300);

    // eslint-disable-next-line no-await-in-loop
    const r = await createSubmission({
      language,
      source_code: sourceCode,
      stdin: tc.input,
    });

    const status = mapCompilerStatus(r);

    // eslint-disable-next-line no-console
    console.log("[ONLINECOMPILER RUN] Response:", JSON.stringify(r, null, 2));

    results.push({
      stdout: r.output,
      stderr: r.error,
      compile_output: status.id === 6 ? r.error : "",
      output: r.output,
      status,
      time:   r.time,
      memory: r.memory,
    });
  }
  return results;
}

module.exports = {
  JUDGE0_LANGUAGE_IDS,
  runAgainstTestCases,
  prepareSourceForCompiler,
  prepareJavaScriptForDeno,
};
