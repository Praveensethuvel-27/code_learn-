/**
 * Fixes check-even-or-odd when test cases were copied from sum-two-numbers.
 * Run: node src/scripts/fix-even-odd-problem.js
 */
require("dotenv").config();
const { connectDb } = require("../config/db");
const { Problem } = require("../models/Problem");

const JS_STARTER = `const input = (() => {
  const b = new Uint8Array(65536);
  const n = Deno.stdin.readSync(b);
  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : "";
})().trim().split(/\\s+/).map(Number);
const n = input[0] ?? 0;

// TODO: print "Even" if n is even, otherwise print "Odd"
console.log("Odd");
`;

const FIX = {
  slug: "check-even-or-odd",
  title: "Check Even or Odd",
  difficulty: "easy",
  descriptionMarkdown:
    "Read an integer `n` and print `Even` if `n` is even, otherwise print `Odd`.",
  inputDescription: "A single integer `n`.",
  outputDescription: 'Print exactly `Even` or `Odd` (case-sensitive).',
  examples: [
    { input: "1\n", output: "Odd\n", explanation: "1 is odd." },
    { input: "2\n", output: "Even\n", explanation: "2 is even." },
  ],
  testCases: [
    { input: "1\n", expectedOutput: "Odd\n", isHidden: false },
    { input: "2\n", expectedOutput: "Even\n", isHidden: false },
    { input: "10\n", expectedOutput: "Even\n", isHidden: true },
    { input: "7\n", expectedOutput: "Odd\n", isHidden: true },
  ],
  starterCode: {
    javascript: JS_STARTER,
    python:
      "import sys\nn = int(sys.stdin.read().strip() or 0)\n\n# TODO: print Even or Odd\nprint(\"Odd\")\n",
    java:
      'import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    long n = sc.hasNextLong() ? sc.nextLong() : 0;\n    // TODO: print Even or Odd\n    System.out.println("Odd");\n  }\n}\n',
    c:
      '#include <stdio.h>\nint main() {\n  long n = 0;\n  scanf("%ld", &n);\n  /* TODO: print Even or Odd */\n  printf("Odd\\n");\n  return 0;\n}\n',
    cpp:
      '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n  long long n = 0;\n  cin >> n;\n  // TODO: print Even or Odd\n  cout << "Odd" << "\\n";\n}\n',
  },
  tags: ["io", "conditionals"],
  isPublished: true,
};

async function run() {
  await connectDb(process.env.MONGO_URI);
  const existing = await Problem.findOne({ slug: FIX.slug });
  if (!existing) {
    await Problem.create({ ...FIX, problemType: "practice_problem" });
    console.log("Created", FIX.slug);
  } else {
    const before = existing.testCases?.map((t) => ({
      in: t.input,
      out: t.expectedOutput,
    }));
    existing.title = FIX.title;
    existing.descriptionMarkdown = FIX.descriptionMarkdown;
    existing.inputDescription = FIX.inputDescription;
    existing.outputDescription = FIX.outputDescription;
    existing.examples = FIX.examples;
    existing.testCases = FIX.testCases;
    existing.starterCode = { ...existing.starterCode?.toObject?.() ?? existing.starterCode, ...FIX.starterCode };
    await existing.save();
    console.log("Updated", FIX.slug);
    console.log("Before test cases:", JSON.stringify(before, null, 2));
    console.log("After test cases:", JSON.stringify(FIX.testCases, null, 2));
  }
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
