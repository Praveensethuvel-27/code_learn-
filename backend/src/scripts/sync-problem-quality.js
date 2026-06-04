/**
 * Fixes problems that still have the default "sum two numbers" test template.
 * Run: node src/scripts/sync-problem-quality.js
 */
require("dotenv").config();
const { connectDb } = require("../config/db");
const { Problem } = require("../models/Problem");
const {
  isSumTwoNumbersTemplate,
  starterTemplates,
  PROBLEM_FIXES,
} = require("../utils/problemTemplates");

async function run() {
  await connectDb(process.env.MONGO_URI);
  const problems = await Problem.find({ isPublished: true });
  const starters = starterTemplates();
  let fixed = 0;

  for (const p of problems) {
    const fix = PROBLEM_FIXES[p.slug];
    let changed = false;

    if (fix) {
      if (fix.testCases) p.testCases = fix.testCases;
      if (fix.inputDescription) p.inputDescription = fix.inputDescription;
      if (fix.outputDescription) p.outputDescription = fix.outputDescription;
      if (fix.starterCode) {
        p.starterCode = { ...p.starterCode?.toObject?.() ?? p.starterCode, ...fix.starterCode };
      }
      changed = true;
    } else if (isSumTwoNumbersTemplate(p.testCases) && !p.slug.includes("sum")) {
      console.warn(
        `[WARN] ${p.slug} has sum-template test cases — clear them in Admin and set correct I/O`,
      );
    }

    const js = p.starterCode?.javascript || "";
    if (js.includes("readFileSync(0") || (js.includes("a+b") && js.includes("input[1]"))) {
      p.starterCode = { ...p.starterCode?.toObject?.() ?? p.starterCode, ...starters };
      changed = true;
      console.log(`[FIX] ${p.slug} starter code reset to skeleton`);
    }

    if (changed) {
      await p.save();
      fixed += 1;
      console.log(`[OK] Updated ${p.slug}`);
    }
  }

  console.log(`Done. Updated ${fixed} problem(s).`);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
