require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { connectDb } = require("../config/db");
const { Problem } = require("../models/Problem");

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.error("Error: GROQ_API_KEY is not defined in the environment or .env file.");
  process.exit(1);
}

// Target counts
const TARGETS = {
  easy: 100,
  medium: 50,
  hard: 50,
};

async function callGroq(prompt) {
  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a software engineer specialized in creating high-quality coding problems for a coding platform like LeetCode. You must return ONLY raw valid JSON, strictly conforming to the requested schema. Do not output explanations, do not wrap in markdown blocks, do not say anything else.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content.trim();
  return JSON.parse(content);
}

function formatProblemToJS(p) {
  const escapeStr = (s) => JSON.stringify(s).slice(1, -1);
  
  const formattedTestCases = p.testCases.map((tc) => {
    const input = String(tc.input ?? "").replace(/\r\n/g, "\n");
    const output = String(tc.expectedOutput ?? "").replace(/\r\n/g, "\n");
    return `      tc(${JSON.stringify(input.trimEnd())}, ${JSON.stringify(output.trimEnd())}${tc.isHidden ? ", true" : ""})`;
  }).join(",\n");

  return `  problem({
    slug: "${escapeStr(p.slug)}",
    title: "${escapeStr(p.title)}",
    difficulty: "${escapeStr(p.difficulty)}",
    descriptionMarkdown: "${escapeStr(p.descriptionMarkdown)}",
    inputDescription: "${escapeStr(p.inputDescription)}",
    outputDescription: "${escapeStr(p.outputDescription)}",
    constraints: "${escapeStr(p.constraints || "")}",
    tags: ${JSON.stringify(p.tags)},
    testCases: [
\n${formattedTestCases}
    ]
  })`;
}

async function saveAndSync(allProblems) {
  const fileContent = `const { starterTemplates } = require("../utils/problemTemplates");

const S = starterTemplates();

function tc(input, expectedOutput, isHidden = false) {
  return { input: input.endsWith("\\n") ? input : \`\${input}\\n\`, expectedOutput: expectedOutput.endsWith("\\n") ? expectedOutput : \`\${expectedOutput}\\n\`, isHidden };
}

function problem({
  slug,
  title,
  difficulty,
  descriptionMarkdown,
  inputDescription,
  outputDescription,
  constraints = "",
  tags,
  testCases,
}) {
  const visible = testCases.filter((t) => !t.isHidden);
  return {
    slug,
    title,
    difficulty,
    descriptionMarkdown,
    inputDescription,
    outputDescription,
    constraints,
    tags,
    testCases,
    examples: visible.slice(0, 2).map((t) => ({
      input: t.input.trimEnd(),
      output: t.expectedOutput.trimEnd(),
      explanation: "",
    })),
    starterCode: {
      javascript: S.javascript,
      python: S.python,
      java: S.java,
      c: S.c,
      cpp: S.cpp,
    },
    isPublished: true,
    problemType: "practice_problem",
  };
}

const PRACTICE_BANK = [
${allProblems.map(formatProblemToJS).join(",\n")}
];

module.exports = { PRACTICE_BANK };
`;

  const dataFilePath = path.join(__dirname, "seed-practice-bank.data.js");
  fs.writeFileSync(dataFilePath, fileContent, "utf8");
  console.log(`    [Saved] Updated local seed file ${dataFilePath}`);

  const updatedList = allProblems.map((p) => {
    const visible = p.testCases.filter((t) => !t.isHidden);
    return {
      ...p,
      testCases: p.testCases.map((tc) => ({
        input: String(tc.input ?? "").replace(/\r\n/g, "\n"),
        expectedOutput: String(tc.expectedOutput ?? "").replace(/\r\n/g, "\n"),
        isHidden: Boolean(tc.isHidden),
      })),
      isPublished: true,
      problemType: "practice_problem",
      examples: visible.slice(0, 2).map((t) => ({
        input: String(t.input ?? "").trimEnd(),
        output: String(t.expectedOutput ?? "").trimEnd(),
        explanation: "",
      })),
      starterCode: {
        javascript: `const input = (() => {
  const b = new Uint8Array(65536);
  const n = Deno.stdin.readSync(b);
  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : "";
})().trim();\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: solve the problem\nconsole.log(n);\n`,
        python: "import sys\nn = int(sys.stdin.read().strip().split()[0] or 0)\n\n# TODO: solve the problem\nprint(n)\n",
        java: "import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    long n = sc.hasNextLong() ? sc.nextLong() : 0;\n    // TODO\n    System.out.println(n);\n  }\n}\n",
        c: '#include <stdio.h>\nint main() {\n  long n = 0;\n  scanf("%ld", &n);\n  /* TODO */\n  printf("%ld\\n", n);\n  return 0;\n}\n',
        cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n  long long n = 0;\n  cin >> n;\n  // TODO\n  cout << n << "\\n";\n}\n',
      },
    };
  });

  let dbCreated = 0;
  let dbUpdated = 0;
  for (const doc of updatedList) {
    const existing = await Problem.findOne({ slug: doc.slug }).select("_id");
    await Problem.findOneAndUpdate({ slug: doc.slug }, { $set: doc }, { upsert: true });
    if (existing) dbUpdated++;
    else dbCreated++;
  }
  console.log(`    [Database Sync] ${updatedList.length} problems synced (${dbCreated} new, ${dbUpdated} updated).`);
}

async function run() {
  console.log("Connecting to MongoDB...");
  await connectDb(process.env.MONGO_URI);

  const TOPICS = [
    "matrix operations (e.g. rotation, diagonal traversal, searching in 2D)",
    "array formatting (e.g. padding, run-length encoding, merging, partitioning)",
    "math and divisibility (e.g. gcd, prime factorization, digit sums, base conversion)",
    "string searching and replacement (e.g. word count, parsing, subsegment checks)",
    "two pointers (e.g. subarray count, pairs, window searches)",
    "sorting and ranking (e.g. relative sorting, selection, rank arrays)",
    "stack and parentheses (e.g. syntax check, postfix eval, reverse stack)",
    "greedy algorithms (e.g. interval scheduling, gas station, min operations)",
    "dynamic programming basics (e.g. grid paths, climb stairs, subset sum)",
    "hash tables and frequency maps (e.g. most frequent, target diff, duplicates)",
    "recursion and backtracking (e.g. subsets, combinations, maze solver)",
  ];

  const difficulties = ["easy", "medium", "hard"];

  for (const diff of difficulties) {
    // Dynamically clear node cache and reload seed data in every loop iteration
    delete require.cache[require.resolve("./seed-practice-bank.data")];
    const { PRACTICE_BANK: currentBank } = require("./seed-practice-bank.data");
    let currentProblems = [...currentBank];

    let countByDifficulty = currentProblems.filter((p) => p.difficulty === diff).length;
    let needed = TARGETS[diff] - countByDifficulty;

    if (needed <= 0) {
      console.log(`Difficulty '${diff}' already has ${countByDifficulty} problems. No more needed.`);
      continue;
    }

    console.log(`Generating ${needed} more '${diff}' problems...`);

    while (needed > 0) {
      const batchSize = Math.min(needed, 5);
      const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
      console.log(`  Requesting batch of ${batchSize} '${diff}' problems from Groq (Topic: ${topic})...`);

      const existingSlugs = currentProblems.map((p) => p.slug);

      const prompt = `Generate exactly ${batchSize} coding practice problems for a learning platform.
Difficulty: "${diff}"
Focus area/Topic: "${topic}"
CRITICAL: You MUST NOT generate any problems that have the same title or slug as these existing ones (strictly exclude them): ${JSON.stringify(existingSlugs)}

Be creative and invent fresh, specific problems. Do not generate standard/trivial problems (like "find maximum element in array", "reverse string", "check palindrome").
Ensure each problem has realistic inputs and outputs.
Ensure that the inputs are easy to parse (e.g. space-separated numbers, single numbers, strings) and the expected outputs match the logic exactly.

Return a JSON object with a single key "problems" containing an array of objects.
Each object must have the following schema:
{
  "slug": "string-kebab-case",
  "title": "Problem Title In Title Case",
  "difficulty": "${diff}",
  "descriptionMarkdown": "Clear markdown description of the problem",
  "inputDescription": "Description of input format",
  "outputDescription": "Description of output format",
  "constraints": "Constraints, e.g. 1 <= N <= 10^5",
  "tags": ["tag1", "tag2"],
  "testCases": [
    {
      "input": "test input content",
      "expectedOutput": "expected output content matching the description",
      "isHidden": false
    },
    {
      "input": "another test input content",
      "expectedOutput": "expected output content matching description",
      "isHidden": true
    }
  ]
}

Provide 3 test cases for each problem (2 visible, 1 hidden).
Ensure "input" and "expectedOutput" are strings. If multiple lines, use \\n.
Return ONLY valid JSON. No other text.`;

      try {
        const result = await callGroq(prompt);
        if (!result.problems || !Array.isArray(result.problems)) {
          console.warn("Invalid response format received from Groq. Retrying...");
          continue;
        }

        console.log(`  Received ${result.problems.length} problems from Groq.`);
        let newAdded = 0;

        for (const p of result.problems) {
          if (currentProblems.some((x) => x.slug === p.slug)) {
            console.warn(`    Slug ${p.slug} already exists, skipping.`);
            continue;
          }
          currentProblems.push(p);
          newAdded++;
        }

        if (newAdded > 0) {
          await saveAndSync(currentProblems);
          needed -= newAdded;
          console.log(`  Successfully added and saved ${newAdded} problems. Remaining needed: ${needed}`);
        }

        console.log("  Waiting 12 seconds to prevent rate limits...");
        await new Promise((resolve) => setTimeout(resolve, 12000));
      } catch (err) {
        console.error("  Error in batch generation:", err.message);
        const waitTime = err.message.includes("429") ? 25000 : 5000;
        console.log(`  Waiting ${waitTime / 1000} seconds before retrying...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  console.log("ALL TARGETS COMPLETED SUCCESSFULLY!");
  process.exit(0);
}

run().catch((e) => {
  console.error("Unhandled execution error:", e);
  process.exit(1);
});
