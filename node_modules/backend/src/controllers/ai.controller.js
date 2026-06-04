const { asyncHandler } = require("../utils/asyncHandler");
const { HttpError }    = require("../utils/httpError");

// ─── Real Groq model IDs ──────────────────────────────────────────────────────
const GROQ_MODELS = {
  "llama-3.3-70b-versatile":                   "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant":                      "llama-3.1-8b-instant",
  "openai/gpt-oss-20b":                        "llama-3.1-8b-instant",     // fast fallback
  "openai/gpt-oss-120b":                       "llama-3.3-70b-versatile",  // powerful fallback
  "qwen/qwen3-32b":                            "llama-3.3-70b-versatile",  // powerful fallback
  "meta-llama/llama-4-scout-17b-16e-instruct": "llama-3.3-70b-versatile",  // powerful fallback
};
const DEFAULT_MODEL = "llama-3.3-70b-versatile";
const resolveModel  = (req) => GROQ_MODELS[req] || DEFAULT_MODEL;

// ─── Core caller ─────────────────────────────────────────────────────────────
const callGroq = async (messages, model = DEFAULT_MODEL) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new HttpError(500, "GROQ_API_KEY not set in .env");
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method:  "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({ model: resolveModel(model), max_tokens: 1500, messages }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new HttpError(502, err?.error?.message || "Groq API request failed");
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || "No response";
};
const callGroqPrompt = (prompt, model) =>
  callGroq([{ role: "user", content: prompt }], model);

// Helpers
const desc      = (d)         => (d?.trim()) ? `\nProblem context:\n${d.slice(0, 900)}` : "";
const codeBlock = (lang, c)   => c?.trim()   ? `\n\`\`\`${lang}\n${c.trim()}\n\`\`\`` : "";

// ─── INPUT HANDLING RULES (injected into every prompt) ───────────────────────
// This ensures AI always generates competitive-programming-style stdin code
const INPUT_RULES = (language) => {
  const rules = {
    javascript: `
STRICT INPUT RULES for JavaScript (Judge0 / competitive programming):
- ALWAYS use: const fs = require('fs'); const input = fs.readFileSync(0,'utf8').trim(); const lines = input.split('\\n');
- NEVER use readline, prompt(), or process.stdin
- Parse values: const n = parseInt(lines[0]); const arr = lines[1].split(' ').map(Number);
- Print output: console.log(answer)
- No hardcoded test values. Program must read from stdin.`,

    python: `
STRICT INPUT RULES for Python (Judge0 / competitive programming):
- ALWAYS use: import sys; input_data = sys.stdin.read().split(); or input() for single line
- Parse: n = int(input()); arr = list(map(int, input().split()))
- Print: print(answer)
- No hardcoded test values. Program must read from stdin.`,

    java: `
STRICT INPUT RULES for Java (Judge0 / competitive programming):
- ALWAYS use: import java.util.Scanner; Scanner sc = new Scanner(System.in);
- Parse: int n = sc.nextInt(); or sc.nextLine()
- Print: System.out.println(answer)
- No hardcoded test values. Program must read from stdin.`,

    c: `
STRICT INPUT RULES for C (Judge0 / competitive programming):
- ALWAYS use: scanf("%d", &n); for reading input
- Print: printf("%d\\n", answer)
- No hardcoded test values. Program must read from stdin.`,

    cpp: `
STRICT INPUT RULES for C++ (Judge0 / competitive programming):
- ALWAYS use: #include<bits/stdc++.h>; using namespace std; cin >> n;
- Print: cout << answer << endl;
- No hardcoded test values. Program must read from stdin.`,
  };
  return rules[language] || rules["javascript"];
};

// ─── ROUTES ──────────────────────────────────────────────────────────────────

// POST /api/ai/hint
const getHint = asyncHandler(async (req, res) => {
  const { code, language, problemTitle, problemDesc, model } = req.body;
  if (!code?.trim())         throw new HttpError(400, "code is required");
  if (!language)             throw new HttpError(400, "language is required");
  if (!problemTitle?.trim()) throw new HttpError(400, "problemTitle is required");

  const prompt = `You are a helpful coding tutor. A student is solving "${problemTitle}" in ${language}.${desc(problemDesc)}

Their current code:${codeBlock(language, code)}

Give 2-3 helpful hints to guide them without revealing the full solution.
- Focus on LOGIC errors, not style
- Be specific about what line/part is wrong
- Do NOT rewrite their code
- Be encouraging and beginner-friendly`;

  res.json({ ok: true, result: await callGroqPrompt(prompt, model) });
});

// POST /api/ai/explain
const explainCode = asyncHandler(async (req, res) => {
  const { code, language, problemTitle, model } = req.body;
  if (!code?.trim()) throw new HttpError(400, "code is required");
  if (!language)     throw new HttpError(400, "language is required");

  const prompt = `You are a coding tutor. Explain this ${language} code clearly for a beginner:${codeBlock(language, code)}
${problemTitle ? `Context: solving "${problemTitle}".` : ""}

Explain line-by-line using numbered points. Be clear and simple. Mention what each section does.`;

  res.json({ ok: true, result: await callGroqPrompt(prompt, model) });
});

// POST /api/ai/fix  ← most important — must be accurate
const fixError = asyncHandler(async (req, res) => {
  const { code, language, problemTitle, problemDesc, errorMessage, errorStatus, model } = req.body;
  if (!code?.trim())         throw new HttpError(400, "code is required");
  if (!language)             throw new HttpError(400, "language is required");
  if (!problemTitle?.trim()) throw new HttpError(400, "problemTitle is required");

  // Build error context section
  const errorSection = errorMessage?.trim()
    ? `
ACTUAL ERROR FROM JUDGE0:
Status: ${errorStatus || "Runtime Error"}
Error message: ${errorMessage.trim()}`
    : `
Status: Runtime Error (no stderr captured)`;

  const prompt = `You are an expert competitive programming debugger. A student's ${language} code for "${problemTitle}" is FAILING on a Judge0 online judge.${desc(problemDesc)}
${errorSection}

${INPUT_RULES(language)}

Their current (failing) code:${codeBlock(language, code)}

YOUR TASK:
1. **Identify the exact bug(s)** — look at the actual error message above first, be specific
2. **Explain why it fails** in simple terms (1-2 sentences per bug)
3. **Show the FIXED code** — keep the SAME logic/structure, fix ONLY what is broken

STRICT RULES:
- Use stdin input rules above — NEVER readline, NEVER hardcode values
- Do NOT change correct parts of the code
- Output MUST exactly match the expected format (e.g. "Palindrome"/"Not Palindrome" NOT "Yes"/"No")
- If error is "Internal error: code execution failed" → likely wrong input method (readline used instead of fs.readFileSync)
- Read Output format from problem description and match it EXACTLY`;

  res.json({ ok: true, result: await callGroqPrompt(prompt, model) });
});

// POST /api/ai/review
const reviewCode = asyncHandler(async (req, res) => {
  const { code, language, problemTitle, model } = req.body;
  if (!code?.trim()) throw new HttpError(400, "code is required");
  if (!language)     throw new HttpError(400, "language is required");

  const prompt = `You are a senior code reviewer. Review this ${language} code${problemTitle ? ` for "${problemTitle}"` : ""}:${codeBlock(language, code)}

Review on:
1. **Correctness** — does the logic solve the problem correctly?
2. **Input/Output handling** — is stdin/stdout handled properly for competitive programming?
3. **Code quality** — naming, readability, structure
4. **Performance** — time & space complexity (Big O)
5. **Suggestions** — 2-3 specific improvements

End with overall rating: ⭐ to ⭐⭐⭐⭐⭐`;

  res.json({ ok: true, result: await callGroqPrompt(prompt, model) });
});

// POST /api/ai/testcases
const generateTestCases = asyncHandler(async (req, res) => {
  const { code, language, problemTitle, problemDesc, count = 6, model } = req.body;
  if (!problemTitle?.trim()) throw new HttpError(400, "problemTitle is required");

  const n = Math.min(Math.max(parseInt(count) || 6, 1), 12);

  const prompt = `You are a test case generator. Output ONLY a raw JSON array. No markdown. No explanation. No backticks. No text before or after.

Problem: "${problemTitle}"
${problemDesc || ""}
${code?.trim() ? `Solution code (${language}):
${code.trim()}` : ""}

Generate exactly ${n} test cases. Return ONLY this JSON structure:
[{"id":1,"name":"test name","input":"exact stdin","expectedOutput":"exact stdout","category":"normal","reason":"why"},...]

Categories: normal, edge, boundary, stress, tricky
Output format must match problem exactly (e.g. "Palindrome"/"Not Palindrome" NOT "Yes"/"No").
Input is raw stdin text. Output is raw stdout text.
RETURN ONLY THE JSON ARRAY. START WITH [ END WITH ].`;

  const raw = await callGroqPrompt(prompt, model);
  
  // Parse JSON from AI response
  let testCases;
  try {
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    testCases = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
  } catch {
    // fallback: return raw text if JSON parse fails
    return res.json({ ok: true, result: raw, parsed: false });
  }

  res.json({ ok: true, testCases, parsed: true });
});

// POST /api/ai/alternative
const alternativeSolution = asyncHandler(async (req, res) => {
  const { code, language, problemTitle, problemDesc, model } = req.body;
  if (!problemTitle?.trim()) throw new HttpError(400, "problemTitle is required");
  if (!language)             throw new HttpError(400, "language is required");

  const prompt = `You are a competitive programming expert. Provide an alternative solution for "${problemTitle}" in ${language}.${desc(problemDesc)}
${code?.trim() ? `Current solution (use a DIFFERENT approach):${codeBlock(language, code)}` : ""}

${INPUT_RULES(language)}

Provide:
1. Brief explanation of the alternative approach (different algorithm/data structure)
2. Complete working ${language} code that reads from stdin
3. Time & space complexity comparison with the original`;

  res.json({ ok: true, result: await callGroqPrompt(prompt, model) });
});

// POST /api/ai/translate
const translateCode = asyncHandler(async (req, res) => {
  const { code, language, targetLanguage, problemTitle, model } = req.body;
  if (!code?.trim())   throw new HttpError(400, "code is required");
  if (!language)       throw new HttpError(400, "language is required");
  if (!targetLanguage) throw new HttpError(400, "targetLanguage is required");
  if (language === targetLanguage)
    return res.json({ ok: true, result: "Source and target language are the same!" });

  const prompt = `Translate this ${language} code to ${targetLanguage}:${codeBlock(language, code)}
${problemTitle ? `Context: "${problemTitle}"` : ""}

${INPUT_RULES(targetLanguage)}

Provide:
1. Complete translated ${targetLanguage} code (must read from stdin, not hardcoded)
2. 2-3 key syntax/style differences between ${language} and ${targetLanguage}`;

  res.json({ ok: true, result: await callGroqPrompt(prompt, model) });
});

// POST /api/ai/chat
const chatWithAI = asyncHandler(async (req, res) => {
  const { messages, language, problemTitle, problemDesc, model, tutorMode } = req.body;
  if (!Array.isArray(messages) || messages.length === 0)
    throw new HttpError(400, "messages array is required");

  if (tutorMode === "ai-learn" || tutorMode === "codelearn") {
    const isGeneral = tutorMode === "codelearn";
    const system = isGeneral
      ? `You are CodeLearn's friendly AI tutor — students use you anytime on the platform.
${problemDesc ? `Context: ${problemDesc}` : ""}

You help with:
- Coding doubts (Python, Java, C++, JavaScript, etc.)
- Bugs, errors, logic, algorithms, DSA, and practice problems
- Explaining code line-by-line and debugging hints
- AI / ML / LLM concepts when asked (optional — not required)

Rules:
- Be clear, encouraging, and beginner-friendly
- When giving code, use proper stdin/stdout if it's for competitive programming style problems
- Guide thinking first; give full solutions when the student asks or is stuck
- Never be rude; say when unsure
- Keep answers concise unless they want more detail`
      : `You are a friendly AI/ML study tutor on CodeLearn's "AI Learn" reading path.
${problemDesc ? `Context: ${problemDesc}` : ""}

Rules:
- Explain AI, ML, deep learning, transformers, and LLMs in clear, beginner-friendly language
- Use short paragraphs and examples; optional simple analogies
- Also help with general coding doubts if the student asks
- Be accurate; say when unsure
- Keep replies concise unless the student asks for more detail`;

    const groqMessages = [
      { role: "system", content: system },
      ...messages.slice(-12).map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    ];
    return res.json({ ok: true, result: await callGroq(groqMessages, model) });
  }

  const system = `You are an expert competitive programming tutor helping a student solve "${problemTitle || "a coding problem"}" in ${language || "any language"}.${desc(problemDesc)}

${INPUT_RULES(language || "javascript")}

Rules:
- Be accurate, concise, and beginner-friendly
- When showing code, ALWAYS follow the stdin input rules above
- Never hardcode test values in solutions
- If student asks for a solution, provide complete working code with proper input handling
- CRITICAL: Output format must EXACTLY match what the problem specifies (e.g. if problem says "Palindrome"/"Not Palindrome", do NOT use "Yes"/"No")
- Always check the "Output format" in the problem context before writing print/console.log statements
- Correct any misconceptions kindly but firmly
- Keep explanations short unless asked for detail`;

  const groqMessages = [
    { role: "system", content: system },
    ...messages.slice(-12).map(m => ({
      role:    m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    })),
  ];

  res.json({ ok: true, result: await callGroq(groqMessages, model) });
});

module.exports = {
  getHint, explainCode, fixError, reviewCode,
  generateTestCases, alternativeSolution, translateCode, chatWithAI,
};