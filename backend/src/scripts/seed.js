require("dotenv").config();

const bcrypt = require("bcryptjs");
const { connectDb } = require("../config/db");
const { User } = require("../models/User");
const { Lesson } = require("../models/Lesson");
const { Problem } = require("../models/Problem");

async function run() {
  await connectDb(process.env.MONGO_URI);

  const adminEmail = "admin@mernlearn.local";
  const adminPassword = "Admin12345!";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: "Admin",
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: "admin",
    });
    // eslint-disable-next-line no-console
    console.log(`Seeded admin: ${adminEmail} / ${adminPassword}`);
  }

  const hasLessons = await Lesson.exists({});
  if (!hasLessons) {
    await Lesson.insertMany([
      {
        language: "javascript",
        topic: "basics",
        title: "JS Basics: Variables",
        contentMarkdown:
          "Variables store values. Use `const` for constants and `let` for reassignable variables.",
        codeExample: 'const name = "Ada";\nlet count = 1;\ncount += 1;\nconsole.log(name, count);\n',
        order: 1,
      },
      {
        language: "python",
        topic: "loops",
        title: "Python Loops: for",
        contentMarkdown:
          "Use `for` loops to iterate over ranges or collections.",
        codeExample: "for i in range(3):\n    print(i)\n",
        order: 1,
      },
    ]);
    // eslint-disable-next-line no-console
    console.log("Seeded sample lessons");
  }

  const hasProblems = await Problem.exists({});
  if (!hasProblems) {
    await Problem.create({
      slug: "sum-two-numbers",
      title: "Sum Two Numbers",
      difficulty: "easy",
      descriptionMarkdown:
        "Read two integers \(a, b\) and print their sum.",
      inputDescription: "Two integers `a b`.",
      outputDescription: "Print `a + b`.",
      examples: [{ input: "1 2\n", output: "3\n", explanation: "" }],
      testCases: [
        { input: "1 2\n", expectedOutput: "3\n", isHidden: false },
        { input: "10 20\n", expectedOutput: "30\n", isHidden: true },
      ],
      starterCode: {
        javascript:
          "const input = (() => { const b = new Uint8Array(65536); const n = Deno.stdin.readSync(b); return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\"; })().trim().split(/\\s+/).map(Number);\nconst a=input[0]||0,b=input[1]||0;\nconsole.log(a+b);\n",
        python:
          "import sys\nnums=list(map(int,sys.stdin.read().split()))\na=nums[0] if len(nums)>0 else 0\nb=nums[1] if len(nums)>1 else 0\nprint(a+b)\n",
        java:
          "import java.util.*;\npublic class Main{public static void main(String[] args){Scanner sc=new Scanner(System.in);long a=sc.hasNextLong()?sc.nextLong():0;long b=sc.hasNextLong()?sc.nextLong():0;System.out.println(a+b);}}\n",
        c: "#include <stdio.h>\nint main(){ long a=0,b=0; if(scanf(\"%ld %ld\",&a,&b)!=2){a=0;b=0;} printf(\"%ld\\n\",a+b); return 0; }\n",
        cpp: "#include <bits/stdc++.h>\nusing namespace std;\nint main(){ long long a=0,b=0; if(!(cin>>a>>b)){a=0;b=0;} cout<<a+b<<\"\\n\"; }\n",
      },
      tags: ["io", "math"],
      isPublished: true,
    });
    // eslint-disable-next-line no-console
    console.log("Seeded sample problem");
  }

  // eslint-disable-next-line no-console
  console.log("Seed complete");
  process.exit(0);
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});

