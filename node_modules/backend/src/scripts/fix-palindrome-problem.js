/**
 * Fixes palindrome-number-check when test cases were copied from sum-two-numbers.
 * Run: node src/scripts/fix-palindrome-problem.js
 */
require("dotenv").config();
const { connectDb } = require("../config/db");
const { Problem } = require("../models/Problem");

const JS_STARTER = `const input = (() => {
  const b = new Uint8Array(65536);
  const n = Deno.stdin.readSync(b);
  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : "";
})().trim();
const s = input.split(/\\s+/)[0] ?? "";

// TODO: print "Palindrome" or "Not Palindrome"
console.log("Palindrome");
`;

const FIX = {
  slug: "palindrome-number-check",
  title: "Palindrome Number Check",
  difficulty: "easy",
  descriptionMarkdown:
    "Write a program to check whether the given number is a palindrome or not.\n\n" +
    "A number is called a **palindrome** if it reads the same forward and backward.\n\n" +
    "Read one integer and print exactly `Palindrome` or `Not Palindrome` (case-sensitive).",
  inputDescription: "A single integer `n`.",
  outputDescription: 'Print `Palindrome` or `Not Palindrome`.',
  examples: [
    { input: "121\n", output: "Palindrome\n", explanation: "121 reads the same both ways." },
    { input: "123\n", output: "Not Palindrome\n", explanation: "123 reversed is 321." },
  ],
  testCases: [
    { input: "121\n", expectedOutput: "Palindrome\n", isHidden: false },
    { input: "123\n", expectedOutput: "Not Palindrome\n", isHidden: false },
    { input: "1\n", expectedOutput: "Palindrome\n", isHidden: true },
    { input: "1001\n", expectedOutput: "Palindrome\n", isHidden: true },
  ],
  starterCode: {
    javascript: JS_STARTER,
    python:
      'import sys\ns = sys.stdin.read().strip().split()[0]\n\n# TODO: print Palindrome or Not Palindrome\nprint("Palindrome")\n',
    java:
      'import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String s = sc.hasNext() ? sc.next() : "";\n    // TODO: print Palindrome or Not Palindrome\n    System.out.println("Palindrome");\n  }\n}\n',
    c:
      '#include <stdio.h>\n#include <string.h>\nint main() {\n  char s[32] = {0};\n  scanf("%31s", s);\n  /* TODO: print Palindrome or Not Palindrome */\n  printf("Palindrome\\n");\n  return 0;\n}\n',
    cpp:
      '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n  string s;\n  cin >> s;\n  // TODO: print Palindrome or Not Palindrome\n  cout << "Palindrome" << "\\n";\n}\n',
  },
  tags: ["io", "strings", "math"],
  isPublished: true,
};

async function run() {
  await connectDb(process.env.MONGO_URI);
  const existing = await Problem.findOne({ slug: FIX.slug });
  if (!existing) {
    await Problem.create({ ...FIX, problemType: "practice_problem" });
    console.log("Created", FIX.slug);
  } else {
    const before = existing.testCases?.map((t) => ({ in: t.input, out: t.expectedOutput }));
    Object.assign(existing, {
      title: FIX.title,
      descriptionMarkdown: FIX.descriptionMarkdown,
      inputDescription: FIX.inputDescription,
      outputDescription: FIX.outputDescription,
      examples: FIX.examples,
      testCases: FIX.testCases,
      tags: FIX.tags,
    });
    existing.starterCode = { ...existing.starterCode?.toObject?.() ?? existing.starterCode, ...FIX.starterCode };
    await existing.save();
    console.log("Updated", FIX.slug);
    console.log("Before:", JSON.stringify(before, null, 2));
    console.log("After:", JSON.stringify(FIX.testCases, null, 2));
  }
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
