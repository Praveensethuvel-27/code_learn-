const { starterTemplates } = require("../utils/problemTemplates");

const S = starterTemplates();

function tc(input, expectedOutput, isHidden = false) {
  return { input: input.endsWith("\n") ? input : `${input}\n`, expectedOutput: expectedOutput.endsWith("\n") ? expectedOutput : `${expectedOutput}\n`, isHidden };
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
  starterCode,
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
    starterCode: starterCode || {
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
  problem({
    slug: "sum-two-numbers",
    title: "Sum Two Numbers",
    difficulty: "easy",
    descriptionMarkdown: "Read two integers and print their sum.",
    inputDescription: "Two integers `a` and `b` on one line.",
    outputDescription: "Print `a + b`.",
    constraints: "",
    tags: ["math","basics"],
    testCases: [

      tc("1 2", "3"),
      tc("10 20", "30", true),
      tc("-5 8", "3")
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "difference-two-numbers",
    title: "Difference Two Numbers",
    difficulty: "easy",
    descriptionMarkdown: "Read two integers and print `a - b`.",
    inputDescription: "Two integers on one line.",
    outputDescription: "Print the difference.",
    constraints: "",
    tags: ["math","basics"],
    testCases: [

      tc("10 3", "7"),
      tc("3 10", "-7", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "product-two-numbers",
    title: "Product Two Numbers",
    difficulty: "easy",
    descriptionMarkdown: "Read two integers and print their product.",
    inputDescription: "Two integers on one line.",
    outputDescription: "Print the product.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("6 7", "42"),
      tc("-3 4", "-12", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "maximum-of-two-numbers",
    title: "Maximum of Two Numbers",
    difficulty: "easy",
    descriptionMarkdown: "Print the larger of two integers.",
    inputDescription: "Two integers on one line.",
    outputDescription: "Print the maximum.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("10 25", "25"),
      tc("25 10", "25", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "minimum-of-two-numbers",
    title: "Minimum of Two Numbers",
    difficulty: "easy",
    descriptionMarkdown: "Print the smaller of two integers.",
    inputDescription: "Two integers on one line.",
    outputDescription: "Print the minimum.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("10 25", "10"),
      tc("-1 -5", "-5", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "check-even-or-odd",
    title: "Check Even or Odd",
    difficulty: "easy",
    descriptionMarkdown: "Print `Even` if the number is even, otherwise `Odd`.",
    inputDescription: "One integer `n`.",
    outputDescription: "`Even` or `Odd`.",
    constraints: "",
    tags: ["basics"],
    testCases: [

      tc("4", "Even"),
      tc("7", "Odd"),
      tc("0", "Even", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "absolute-value",
    title: "Absolute Value",
    difficulty: "easy",
    descriptionMarkdown: "Print the absolute value of `n`.",
    inputDescription: "One integer.",
    outputDescription: "Print `|n|`.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("-15", "15"),
      tc("9", "9", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "square-of-a-number",
    title: "Square of a Number",
    difficulty: "easy",
    descriptionMarkdown: "Print `n * n`.",
    inputDescription: "One integer `n`.",
    outputDescription: "Print the square.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("12", "144"),
      tc("-5", "25", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "sum-of-natural-numbers",
    title: "Sum of Natural Numbers",
    difficulty: "easy",
    descriptionMarkdown: "Print sum `1 + 2 + ... + n`.",
    inputDescription: "One integer `n` (n ≥ 1).",
    outputDescription: "Print the sum.",
    constraints: "",
    tags: ["math","loops"],
    testCases: [

      tc("5", "15"),
      tc("10", "55", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "factorial-of-a-number",
    title: "Factorial of a Number",
    difficulty: "easy",
    descriptionMarkdown: "Print `n!` for `0 ≤ n ≤ 12`.",
    inputDescription: "One integer `n`.",
    outputDescription: "Print factorial.",
    constraints: "",
    tags: ["math","loops"],
    testCases: [

      tc("0", "1"),
      tc("5", "120"),
      tc("10", "3628800", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "reverse-a-number",
    title: "Reverse a Number",
    difficulty: "easy",
    descriptionMarkdown: "Reverse the digits of `n` and print the result.",
    inputDescription: "One integer `n`.",
    outputDescription: "Reversed number.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("123", "321"),
      tc("1000", "1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "count-digits-in-number",
    title: "Count Digits in a Number",
    difficulty: "easy",
    descriptionMarkdown: "Count digits in `n` (ignore sign).",
    inputDescription: "One integer.",
    outputDescription: "Digit count.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("12345", "5"),
      tc("0", "1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "sum-of-digits",
    title: "Sum of Digits",
    difficulty: "easy",
    descriptionMarkdown: "Print sum of digits of `n`.",
    inputDescription: "One integer.",
    outputDescription: "Digit sum.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("123", "6"),
      tc("999", "27", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "largest-of-three-numbers",
    title: "Largest of Three Numbers",
    difficulty: "easy",
    descriptionMarkdown: "Print the largest of three integers.",
    inputDescription: "Three integers on one line.",
    outputDescription: "Maximum value.",
    constraints: "",
    tags: ["basics"],
    testCases: [

      tc("1 9 3", "9"),
      tc("-1 -2 -3", "-1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "smallest-of-three-numbers",
    title: "Smallest of Three Numbers",
    difficulty: "easy",
    descriptionMarkdown: "Print the smallest of three integers.",
    inputDescription: "Three integers on one line.",
    outputDescription: "Minimum value.",
    constraints: "",
    tags: ["basics"],
    testCases: [

      tc("1 9 3", "1"),
      tc("5 5 1", "1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "check-leap-year",
    title: "Check Leap Year",
    difficulty: "easy",
    descriptionMarkdown: "Print `Yes` if year is leap, else `No`.",
    inputDescription: "One integer year.",
    outputDescription: "`Yes` or `No`.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("2024", "Yes"),
      tc("1900", "No"),
      tc("2000", "Yes", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "gcd-of-two-numbers",
    title: "GCD of Two Numbers",
    difficulty: "easy",
    descriptionMarkdown: "Print greatest common divisor of `a` and `b`.",
    inputDescription: "Two positive integers.",
    outputDescription: "GCD.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("12 18", "6"),
      tc("7 13", "1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst nums = input.split(/\\s+/).map(Number);\nif (nums.length > 0 && !isNaN(nums[0])) {\n  // TODO: Solve the problem using 'nums' array\n  console.log(nums[0]);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    nums = [int(x) for x in input_data]\n    \n    # TODO: Solve the problem using 'nums'\n    print(nums[0])\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Long> nums = new ArrayList<>();\n        while (sc.hasNextLong()) {\n            nums.add(sc.nextLong());\n        }\n        \n        // TODO: Solve the problem using 'nums' list\n        if (!nums.isEmpty()) {\n            System.out.println(nums.get(0));\n        }\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long a = 0, b = 0, c = 0;\n    int count = scanf(\"%lld %lld %lld\", &a, &b, &c);\n    // TODO: Solve the problem using the inputs read\n    if (count >= 1) {\n        printf(\"%lld\\n\", a);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    vector<long long> nums;\n    long long val;\n    while (cin >> val) {\n        nums.push_back(val);\n    }\n    \n    // TODO: Solve the problem using 'nums'\n    if (!nums.empty()) {\n        cout << nums[0] << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "lcm-of-two-numbers",
    title: "LCM of Two Numbers",
    difficulty: "easy",
    descriptionMarkdown: "Print least common multiple of `a` and `b`.",
    inputDescription: "Two positive integers.",
    outputDescription: "LCM.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("12 18", "36"),
      tc("4 6", "12", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst nums = input.split(/\\s+/).map(Number);\nif (nums.length > 0 && !isNaN(nums[0])) {\n  // TODO: Solve the problem using 'nums' array\n  console.log(nums[0]);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    nums = [int(x) for x in input_data]\n    \n    # TODO: Solve the problem using 'nums'\n    print(nums[0])\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Long> nums = new ArrayList<>();\n        while (sc.hasNextLong()) {\n            nums.add(sc.nextLong());\n        }\n        \n        // TODO: Solve the problem using 'nums' list\n        if (!nums.isEmpty()) {\n            System.out.println(nums.get(0));\n        }\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long a = 0, b = 0, c = 0;\n    int count = scanf(\"%lld %lld %lld\", &a, &b, &c);\n    // TODO: Solve the problem using the inputs read\n    if (count >= 1) {\n        printf(\"%lld\\n\", a);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    vector<long long> nums;\n    long long val;\n    while (cin >> val) {\n        nums.push_back(val);\n    }\n    \n    // TODO: Solve the problem using 'nums'\n    if (!nums.empty()) {\n        cout << nums[0] << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "check-prime-number",
    title: "Check Prime Number",
    difficulty: "easy",
    descriptionMarkdown: "Print `Yes` if prime, else `No`.",
    inputDescription: "One integer `n` (n ≥ 2).",
    outputDescription: "`Yes` or `No`.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("7", "Yes"),
      tc("9", "No"),
      tc("2", "Yes", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "nth-fibonacci-number",
    title: "Nth Fibonacci Number",
    difficulty: "easy",
    descriptionMarkdown: "Print F(n) where F(0)=0, F(1)=1.",
    inputDescription: "One integer `n` (0 ≤ n ≤ 30).",
    outputDescription: "Fibonacci value.",
    constraints: "",
    tags: ["math","dp"],
    testCases: [

      tc("0", "0"),
      tc("7", "13"),
      tc("10", "55", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "palindrome-number-check",
    title: "Palindrome Number Check",
    difficulty: "easy",
    descriptionMarkdown: "Print `Yes` if number reads same forwards/backwards.",
    inputDescription: "One integer.",
    outputDescription: "`Yes` or `No`.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("121", "Yes"),
      tc("123", "No"),
      tc("1221", "Yes", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "count-vowels-in-string",
    title: "Count Vowels in String",
    difficulty: "easy",
    descriptionMarkdown: "Count vowels (a,e,i,o,u) in a lowercase string.",
    inputDescription: "One lowercase word.",
    outputDescription: "Vowel count.",
    constraints: "",
    tags: ["strings"],
    testCases: [

      tc("hello", "2"),
      tc("sky", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "reverse-a-string",
    title: "Reverse a String",
    difficulty: "easy",
    descriptionMarkdown: "Print the reverse of the given string.",
    inputDescription: "One word (no spaces).",
    outputDescription: "Reversed string.",
    constraints: "",
    tags: ["strings"],
    testCases: [

      tc("code", "edoc"),
      tc("a", "a", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "sum-of-array-elements",
    title: "Sum of Array Elements",
    difficulty: "easy",
    descriptionMarkdown: "First line: `n`. Second line: `n` integers. Print their sum.",
    inputDescription: "Count then space-separated array.",
    outputDescription: "Sum.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("3\n1 2 3", "6"),
      tc("5\n1 1 1 1 1", "5", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "maximum-in-array",
    title: "Maximum in Array",
    difficulty: "easy",
    descriptionMarkdown: "Print the maximum element in the array.",
    inputDescription: "Count then array elements.",
    outputDescription: "Maximum value.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("4\n3 9 1 7", "9"),
      tc("1\n-5", "-5", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "minimum-in-array",
    title: "Minimum in Array",
    difficulty: "easy",
    descriptionMarkdown: "Print the minimum element in the array.",
    inputDescription: "Count then array elements.",
    outputDescription: "Minimum value.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("4\n3 9 1 7", "1"),
      tc("2\n-1 -2", "-2", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "count-even-numbers-in-array",
    title: "Count Even Numbers in Array",
    difficulty: "easy",
    descriptionMarkdown: "Count how many elements are even.",
    inputDescription: "Count then array.",
    outputDescription: "Even count.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("5\n1 2 3 4 5", "2"),
      tc("3\n2 4 6", "3", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "linear-search-index",
    title: "Linear Search Index",
    difficulty: "easy",
    descriptionMarkdown: "Line1: n. Line2: array. Line3: target. Print index (0-based) or `-1`.",
    inputDescription: "Array size, elements, target.",
    outputDescription: "Index or -1.",
    constraints: "",
    tags: ["arrays","search"],
    testCases: [

      tc("5\n1 3 5 7 9\n5", "2"),
      tc("3\n1 2 3\n4", "-1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "celsius-to-fahrenheit",
    title: "Celsius to Fahrenheit",
    difficulty: "easy",
    descriptionMarkdown: "Convert C to F using `F = C * 9/5 + 32`. Print integer (rounded).",
    inputDescription: "One integer Celsius.",
    outputDescription: "Fahrenheit (rounded).",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("0", "32"),
      tc("100", "212", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "simple-interest",
    title: "Simple Interest",
    difficulty: "easy",
    descriptionMarkdown: "SI = P*R*T/100. Print integer SI.",
    inputDescription: "Principal, rate, time on one line.",
    outputDescription: "Simple interest.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("1000 5 2", "100"),
      tc("500 10 1", "50", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "second-largest-in-array",
    title: "Second Largest in Array",
    difficulty: "medium",
    descriptionMarkdown: "Print second largest distinct value (array has ≥2 elements).",
    inputDescription: "Count then distinct-friendly array.",
    outputDescription: "Second largest.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("5\n10 20 30 40 50", "40"),
      tc("4\n7 7 5 9", "7", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "remove-duplicates-sorted-length",
    title: "Unique Count in Sorted Array",
    difficulty: "medium",
    descriptionMarkdown: "Array is sorted ascending. Print number of unique elements.",
    inputDescription: "Count then sorted array.",
    outputDescription: "Unique count.",
    constraints: "",
    tags: ["arrays","two-pointers"],
    testCases: [

      tc("6\n1 1 2 2 3 4", "4"),
      tc("3\n5 5 5", "1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "bubble-sort-array",
    title: "Sort Array Ascending",
    difficulty: "medium",
    descriptionMarkdown: "Sort array in ascending order. Print space-separated values.",
    inputDescription: "Count then array.",
    outputDescription: "Sorted array on one line.",
    constraints: "",
    tags: ["sorting","arrays"],
    testCases: [

      tc("5\n5 1 4 2 3", "1 2 3 4 5"),
      tc("1\n9", "9", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "binary-search-position",
    title: "Binary Search Position",
    difficulty: "medium",
    descriptionMarkdown: "Sorted array. Print index of target or `-1`.",
    inputDescription: "n, sorted array, target.",
    outputDescription: "Index or -1.",
    constraints: "",
    tags: ["search","arrays"],
    testCases: [

      tc("5\n1 3 5 7 9\n7", "3"),
      tc("4\n2 4 6 8\n1", "-1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "kadanes-maximum-subarray-sum",
    title: "Maximum Subarray Sum",
    difficulty: "medium",
    descriptionMarkdown: "Print maximum sum of any contiguous subarray (Kadane).",
    inputDescription: "Count then array (may include negatives).",
    outputDescription: "Maximum subarray sum.",
    constraints: "",
    tags: ["dp","arrays"],
    testCases: [

      tc("9\n-2 1 -3 4 -1 2 1 -5 4", "6"),
      tc("3\n-1 -2 -3", "-1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "stock-max-profit",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "medium",
    descriptionMarkdown: "One transaction max. Print maximum profit.",
    inputDescription: "Count then daily prices.",
    outputDescription: "Max profit.",
    constraints: "",
    tags: ["arrays","greedy"],
    testCases: [

      tc("6\n7 1 5 3 6 4", "5"),
      tc("2\n7 6", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "leaders-in-array",
    title: "Leaders in Array",
    difficulty: "medium",
    descriptionMarkdown: "Print leaders (greater than all elements to the right), space-separated in order.",
    inputDescription: "Count then array.",
    outputDescription: "Leaders separated by spaces.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("6\n16 17 4 3 5 2", "17 5 2"),
      tc("3\n10 9 8", "10 9 8", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "merge-two-sorted-arrays",
    title: "Merge Two Sorted Arrays",
    difficulty: "medium",
    descriptionMarkdown: "Line1: n m. Line2: sorted A. Line3: sorted B. Print merged sorted array.",
    inputDescription: "Sizes and two sorted arrays.",
    outputDescription: "Merged sorted output.",
    constraints: "",
    tags: ["arrays","two-pointers"],
    testCases: [

      tc("3 3\n1 3 5\n2 4 6", "1 2 3 4 5 6"),
      tc("1 1\n1\n2", "1 2", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "find-missing-number-1-to-n",
    title: "Missing Number 1 to N",
    difficulty: "medium",
    descriptionMarkdown: "Array contains n distinct numbers from 1..n+1 except one missing. Print missing.",
    inputDescription: "Count n, then n numbers.",
    outputDescription: "Missing number.",
    constraints: "",
    tags: ["math","arrays"],
    testCases: [

      tc("3\n1 2 4", "3"),
      tc("4\n1 2 3 5", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "anagram-check",
    title: "Anagram Check",
    difficulty: "medium",
    descriptionMarkdown: "Two lowercase words. Print `Yes` if anagrams.",
    inputDescription: "Two lines, words without spaces.",
    outputDescription: "`Yes` or `No`.",
    constraints: "",
    tags: ["strings"],
    testCases: [

      tc("listen\ntsilent", "Yes"),
      tc("abc\ndef", "No", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "medium",
    descriptionMarkdown: "String of `()[]{}` only. Print `Yes` if valid.",
    inputDescription: "One bracket string.",
    outputDescription: "`Yes` or `No`.",
    constraints: "",
    tags: ["stack","strings"],
    testCases: [

      tc("()[]{}", "Yes"),
      tc("(]", "No"),
      tc("([)]", "No", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "integer-square-root",
    title: "Integer Square Root",
    difficulty: "medium",
    descriptionMarkdown: "Print floor(sqrt(n)) for non-negative n.",
    inputDescription: "One non-negative integer.",
    outputDescription: "Floor square root.",
    constraints: "",
    tags: ["math","binary-search"],
    testCases: [

      tc("16", "4"),
      tc("20", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "power-of-a-number",
    title: "Power of a Number",
    difficulty: "medium",
    descriptionMarkdown: "Print `a^b` (b ≥ 0, fits in 64-bit).",
    inputDescription: "Base and exponent on one line.",
    outputDescription: "Power result.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("2 10", "1024"),
      tc("5 0", "1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "count-occurrences-in-array",
    title: "Count Occurrences in Array",
    difficulty: "medium",
    descriptionMarkdown: "Count how many times `x` appears.",
    inputDescription: "n, array, then x.",
    outputDescription: "Count.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("6\n1 2 2 3 2 4\n2", "3"),
      tc("3\n1 1 1\n2", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "rotate-array-right-by-one",
    title: "Rotate Array Right by One",
    difficulty: "medium",
    descriptionMarkdown: "Rotate array right by 1. Print result space-separated.",
    inputDescription: "Count then array.",
    outputDescription: "Rotated array.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("5\n1 2 3 4 5", "5 1 2 3 4"),
      tc("1\n9", "9", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "count-pairs-with-given-sum",
    title: "Count Pairs With Given Sum",
    difficulty: "medium",
    descriptionMarkdown: "Count unordered pairs (i<j) with sum equal to `k`.",
    inputDescription: "n, array, k.",
    outputDescription: "Pair count.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("5\n1 5 7 1 5\n6", "3"),
      tc("3\n1 2 3\n10", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "longest-word-length",
    title: "Longest Word Length",
    difficulty: "medium",
    descriptionMarkdown: "Sentence of lowercase words separated by spaces. Print length of longest word.",
    inputDescription: "One line sentence.",
    outputDescription: "Max word length.",
    constraints: "",
    tags: ["strings"],
    testCases: [

      tc("code learn is fun", "5"),
      tc("a bb ccc", "3", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "armstrong-number-check",
    title: "Armstrong Number Check",
    difficulty: "medium",
    descriptionMarkdown: "Print `Yes` if number equals sum of digits^digitCount.",
    inputDescription: "One integer.",
    outputDescription: "`Yes` or `No`.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("153", "Yes"),
      tc("123", "No", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "perfect-square-check",
    title: "Perfect Square Check",
    difficulty: "medium",
    descriptionMarkdown: "Print `Yes` if n is a perfect square.",
    inputDescription: "One non-negative integer.",
    outputDescription: "`Yes` or `No`.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("16", "Yes"),
      tc("15", "No", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "trailing-zeros-in-factorial",
    title: "Trailing Zeros in Factorial",
    difficulty: "medium",
    descriptionMarkdown: "Count trailing zeros in `n!`.",
    inputDescription: "One integer n (n ≤ 100000).",
    outputDescription: "Trailing zero count.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("5", "1"),
      tc("25", "6", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "digit-sum-until-single",
    title: "Digital Root",
    difficulty: "medium",
    descriptionMarkdown: "Repeatedly sum digits until one digit remains.",
    inputDescription: "One positive integer.",
    outputDescription: "Single digit result.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("9875", "2"),
      tc("9", "9", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "max-consecutive-ones",
    title: "Max Consecutive Ones",
    difficulty: "medium",
    descriptionMarkdown: "Binary array (0/1). Print longest run of 1s.",
    inputDescription: "Count then 0/1 array.",
    outputDescription: "Max consecutive ones.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("6\n1 1 0 1 1 1", "3"),
      tc("4\n0 0 0 0", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "longest-increasing-subsequence-length",
    title: "Longest Increasing Subsequence Length",
    difficulty: "hard",
    descriptionMarkdown: "Print length of longest strictly increasing subsequence.",
    inputDescription: "Count then array (n ≤ 25).",
    outputDescription: "LIS length.",
    constraints: "",
    tags: ["dp","arrays"],
    testCases: [

      tc("6\n10 9 2 5 3 7", "3"),
      tc("5\n1 2 3 4 5", "5", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "coin-change-minimum-coins-v1",
    title: "Coin Change Minimum Coins",
    difficulty: "hard",
    descriptionMarkdown: "Line1: amount. Line2: k and k coin values. Print min coins or `-1`.",
    inputDescription: "Amount and coin list.",
    outputDescription: "Minimum coins.",
    constraints: "",
    tags: ["dp"],
    testCases: [

      tc("11\n3 1 2 5", "3"),
      tc("3\n1 2", "-1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "longest-common-subsequence-length",
    title: "Longest Common Subsequence Length",
    difficulty: "hard",
    descriptionMarkdown: "Two strings (lowercase). Print LCS length.",
    inputDescription: "Two lines, strings.",
    outputDescription: "LCS length.",
    constraints: "",
    tags: ["dp","strings"],
    testCases: [

      tc("abcde\nace", "3"),
      tc("abc\ndef", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "edit-distance",
    title: "Edit Distance",
    difficulty: "hard",
    descriptionMarkdown: "Minimum insert/delete/replace ops to convert word1 to word2.",
    inputDescription: "Two lowercase words.",
    outputDescription: "Edit distance.",
    constraints: "",
    tags: ["dp","strings"],
    testCases: [

      tc("horse\nros", "3"),
      tc("abc\nabc", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "jump-game-reachable",
    title: "Jump Game Reachable",
    difficulty: "hard",
    descriptionMarkdown: "Each element is max jump length from that index. Print `Yes` if last index reachable.",
    inputDescription: "Count then jump array.",
    outputDescription: "`Yes` or `No`.",
    constraints: "",
    tags: ["greedy","arrays"],
    testCases: [

      tc("5\n2 3 1 1 4", "Yes"),
      tc("3\n3 2 1", "No", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "hard",
    descriptionMarkdown: "Elevation map (non-negative heights). Print total trapped water units.",
    inputDescription: "Count then heights.",
    outputDescription: "Water units.",
    constraints: "",
    tags: ["arrays","two-pointers"],
    testCases: [

      tc("6\n0 1 0 2 1 0", "1"),
      tc("12\n0 1 0 2 1 0 1 3 2 1 2 1", "6", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "matrix-diagonal-sum",
    title: "Matrix Diagonal Sum",
    difficulty: "easy",
    descriptionMarkdown: "Square matrix n×n. Print sum of primary diagonal.",
    inputDescription: "n then n lines of n integers.",
    outputDescription: "Diagonal sum.",
    constraints: "",
    tags: ["matrix"],
    testCases: [

      tc("3\n1 2 3\n4 5 6\n7 8 9", "15"),
      tc("2\n1 0\n0 1", "2", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "count-primes-up-to-n",
    title: "Count Primes Up To N",
    difficulty: "medium",
    descriptionMarkdown: "Count primes strictly less than `n` (n ≤ 1000000).",
    inputDescription: "One integer n.",
    outputDescription: "Prime count.",
    constraints: "",
    tags: ["math"],
    testCases: [

      tc("10", "4"),
      tc("2", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "majority-element",
    title: "Majority Element",
    difficulty: "medium",
    descriptionMarkdown: "Array has a majority element (> n/2). Print it.",
    inputDescription: "Count then array.",
    outputDescription: "Majority value.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("3\n3 3 2", "3"),
      tc("7\n2 2 2 2 3 3 3", "2", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "product-array-sign",
    title: "Sign of Product of Array",
    difficulty: "easy",
    descriptionMarkdown: "Print `positive`, `negative`, or `zero` for product sign (no overflow).",
    inputDescription: "Count then non-zero ints (may include zero).",
    outputDescription: "Sign label.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("3\n-1 -2 -3", "negative"),
      tc("2\n0 5", "zero", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "find-duplicate-number",
    title: "Find Duplicate Number",
    difficulty: "medium",
    descriptionMarkdown: "Array of n+1 integers in range 1..n with one duplicate. Print duplicate.",
    inputDescription: "Count n, then n+1 numbers.",
    outputDescription: "Duplicate value.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("3\n1 3 4 2 2", "2"),
      tc("1\n1 1", "1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "longest-palindrome-substring-length",
    title: "Longest Palindrome Substring Length",
    difficulty: "hard",
    descriptionMarkdown: "Print length of longest palindromic substring.",
    inputDescription: "One lowercase string (length ≤ 100).",
    outputDescription: "Maximum palindrome length.",
    constraints: "",
    tags: ["strings","dp"],
    testCases: [

      tc("babad", "3"),
      tc("cbbd", "2", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "subarray-with-zero-sum",
    title: "Subarray With Zero Sum Exists",
    difficulty: "medium",
    descriptionMarkdown: "Print `Yes` if any contiguous subarray sums to 0.",
    inputDescription: "Count then array.",
    outputDescription: "`Yes` or `No`.",
    constraints: "",
    tags: ["arrays","hash"],
    testCases: [

      tc("5\n4 2 -3 1 6", "Yes"),
      tc("3\n1 2 3", "No", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    difficulty: "hard",
    descriptionMarkdown: "Print maximum product of any contiguous subarray.",
    inputDescription: "Count then array.",
    outputDescription: "Maximum product.",
    constraints: "",
    tags: ["dp","arrays"],
    testCases: [

      tc("4\n2 3 -2 4", "6"),
      tc("3\n-2 0 -1", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "rotate-matrix-90-degrees-sum",
    title: "Sum After Matrix Transpose",
    difficulty: "medium",
    descriptionMarkdown: "Square matrix. Transpose then print sum of all elements.",
    inputDescription: "n and n×n matrix.",
    outputDescription: "Sum after transpose.",
    constraints: "",
    tags: ["matrix"],
    testCases: [

      tc("2\n1 2\n3 4", "10"),
      tc("1\n5", "5", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "intersection-of-two-arrays-count",
    title: "Intersection Count of Two Arrays",
    difficulty: "easy",
    descriptionMarkdown: "Count distinct values present in both arrays.",
    inputDescription: "n, array A, m, array B.",
    outputDescription: "Intersection size.",
    constraints: "",
    tags: ["arrays","hash"],
    testCases: [

      tc("3\n1 2 2\n4\n3 2 2 4", "2"),
      tc("2\n1 2\n2\n3 4", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "check-sorted-array",
    title: "Check Sorted Array",
    difficulty: "easy",
    descriptionMarkdown: "Print `Yes` if array is non-decreasing.",
    inputDescription: "Count then array.",
    outputDescription: "`Yes` or `No`.",
    constraints: "",
    tags: ["arrays"],
    testCases: [

      tc("4\n1 2 2 5", "Yes"),
      tc("3\n3 2 1", "No", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "first-non-repeating-character-index",
    title: "First Non-Repeating Character Index",
    difficulty: "medium",
    descriptionMarkdown: "Lowercase string. Print 0-based index of first non-repeating char, or `-1`.",
    inputDescription: "One string.",
    outputDescription: "Index or -1.",
    constraints: "",
    tags: ["strings","hash"],
    testCases: [

      tc("leetcode", "0"),
      tc("aabb", "-1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "valid-parentheses-balanced",
    title: "Valid Parentheses Balanced",
    difficulty: "easy",
    descriptionMarkdown: "Given a string containing only three types of parentheses: round, square, and curly, determine if it is valid. A string of parentheses is valid if the following conditions are met: It contains no unmatched opening brackets. It contains no unmatched closing brackets. If a closing bracket has a corresponding opening bracket, the corresponding opening bracket must come before the closing bracket. For example, \"()\" and \"()[]{}\" are valid, while \"(}\" and \"[)\" are not valid.",
    inputDescription: "A string containing only three types of parentheses: round, square, and curly.",
    outputDescription: "A boolean indicating whether the string is valid.",
    constraints: "1 <= S.length <= 10^5",
    tags: ["stack","parentheses"],
    testCases: [

      tc("()", "true"),
      tc("()[]{}", "true"),
      tc("(]", "false", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "postfix-evaluation",
    title: "Postfix Evaluation",
    difficulty: "easy",
    descriptionMarkdown: "Given a postfix expression, evaluate it and return the result. A postfix expression is a string of space-separated tokens. Each token is either a number or an operator. The operators are +, -, *, /. The evaluation of the expression is done from left to right. For example, \"2 3 +\" is evaluated as 2 + 3 = 5, and \"3 4 *\" is evaluated as 3 * 4 = 12.",
    inputDescription: "A string containing a postfix expression.",
    outputDescription: "The result of the postfix expression.",
    constraints: "1 <= S.length <= 10^5",
    tags: ["stack","postfix"],
    testCases: [

      tc("2 3 +", "5"),
      tc("3 4 *", "12"),
      tc("10 2 /", "5", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "reverse-stack",
    title: "Reverse Stack",
    difficulty: "easy",
    descriptionMarkdown: "Given a stack of integers, reverse the stack. For example, if the stack is [1, 2, 3, 4, 5], the reversed stack should be [5, 4, 3, 2, 1].",
    inputDescription: "A list of integers representing the stack.",
    outputDescription: "The reversed stack.",
    constraints: "1 <= S.length <= 10^5",
    tags: ["stack","reverse"],
    testCases: [

      tc("[1, 2, 3, 4, 5]", "[5, 4, 3, 2, 1]"),
      tc("[10, 20, 30, 40, 50]", "[50, 40, 30, 20, 10]"),
      tc("[100, 200, 300, 400, 500]", "[500, 400, 300, 200, 100]", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "valid-expression",
    title: "Valid Expression",
    difficulty: "easy",
    descriptionMarkdown: "Given a string containing only three types of parentheses: round, square, and curly, determine if it is a valid expression. A string is a valid expression if it contains no unmatched opening brackets and the closing brackets have corresponding opening brackets. For example, \"(1+2)*3\" and \"(1+2)*(3-4)\" are valid expressions, while \"(1+2\" and \"(1+2)*3\" are not valid expressions.",
    inputDescription: "A string containing only three types of parentheses: round, square, and curly.",
    outputDescription: "A boolean indicating whether the string is a valid expression.",
    constraints: "1 <= S.length <= 10^5",
    tags: ["stack","parentheses"],
    testCases: [

      tc("(1+2)*3", "true"),
      tc("(1+2)*(3-4)", "true"),
      tc("(1+2", "false", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "evaluate-postfix",
    title: "Evaluate Postfix",
    difficulty: "easy",
    descriptionMarkdown: "Given a postfix expression, evaluate it and return the result. A postfix expression is a string of space-separated tokens. Each token is either a number or an operator. The operators are +, -, *, /. The evaluation of the expression is done from left to right. For example, \"2 3 +\" is evaluated as 2 + 3 = 5, and \"3 4 *\" is evaluated as 3 * 4 = 12.",
    inputDescription: "A string containing a postfix expression.",
    outputDescription: "The result of the postfix expression.",
    constraints: "1 <= S.length <= 10^5",
    tags: ["stack","postfix"],
    testCases: [

      tc("2 3 +", "5"),
      tc("3 4 *", "12"),
      tc("10 2 /", "5", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-pair-merging",
    title: "Merging Array Pairs",
    difficulty: "easy",
    descriptionMarkdown: "Given two arrays of integers, merge them into a single array where each pair of elements from the original arrays is combined into a single element. The resulting array should be sorted in ascending order.",
    inputDescription: "Two space-separated integers representing the sizes of the two input arrays, followed by the two arrays themselves, each on a new line.",
    outputDescription: "A space-separated list of merged array elements.",
    constraints: "1 <= N, M <= 10^5",
    tags: ["array","merging"],
    testCases: [

      tc("5 3\n1 2 3\n4 5 6", "1 2 3 4 5 6"),
      tc("7 2\n1 2 3 4 5 6 7\n8 9", "1 2 3 4 5 6 7 8 9"),
      tc("10 1\n1 2 3 4 5 6 7 8 9 10", "1 2 3 4 5 6 7 8 9 10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-pair-padding",
    title: "Padding Array Pairs",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers, pad each pair of elements with a specified value and return the resulting array.",
    inputDescription: "A space-separated list of integers representing the array, followed by a space-separated list of two integers representing the padding value and the number of pairs to pad.",
    outputDescription: "A space-separated list of padded array elements.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","padding"],
    testCases: [

      tc("1 2 3 4 5 2 2", "1 2 3 4 5 2 2"),
      tc("1 2 3 4 5 6 7 8 9 10 3 3", "1 2 3 4 5 6 7 8 9 10 3 3"),
      tc("1 2 3 4 5 6 7 8 9 10 11 12 2 2", "1 2 3 4 5 6 7 8 9 10 11 12 2 2", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-partitioning",
    title: "Array Partitioning",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers, partition it into two subarrays such that the sum of elements in the first subarray is equal to the sum of elements in the second subarray.",
    inputDescription: "A space-separated list of integers representing the array.",
    outputDescription: "A space-separated list of two subarrays, each representing the partitioned array.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","partitioning"],
    testCases: [

      tc("1 2 3 4 5", "1 2 3 4 5"),
      tc("1 2 3 4 5 6", "1 2 3 4 5 6"),
      tc("1 2 3 4 5 6 7 8 9", "1 2 3 4 5 6 7 8 9", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-run-length-encoding",
    title: "Array Run-Length Encoding",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers, apply run-length encoding to it and return the resulting array.",
    inputDescription: "A space-separated list of integers representing the array.",
    outputDescription: "A space-separated list of encoded array elements.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","run-length encoding"],
    testCases: [

      tc("1 1 2 2 3 3 3", "2 1 2 2 3 3"),
      tc("1 2 2 3 3 3 3 4 4 4 4", "1 2 2 3 3 3 3 4 4 4 4"),
      tc("1 2 3 4 5 6 7 8 9 10", "1 2 3 4 5 6 7 8 9 10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-segment-merging",
    title: "Array Segment Merging",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers and a list of segments, merge the segments into the array and return the resulting array.",
    inputDescription: "A space-separated list of integers representing the array, followed by a space-separated list of integers representing the segments.",
    outputDescription: "A space-separated list of merged array elements.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","merging"],
    testCases: [

      tc("1 2 3 4 5 1 2 3 4 5", "1 2 3 4 5"),
      tc("1 2 3 4 5 6 7 8 9 10 1 2 3 4 5 6 7 8 9 10", "1 2 3 4 5 6 7 8 9 10"),
      tc("1 2 3 4 5 6 7 8 9 10 11 12 1 2 3 4 5 6 7 8 9 10 11 12", "1 2 3 4 5 6 7 8 9 10 11 12", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "maze-exit",
    title: "Maze Exit",
    difficulty: "easy",
    descriptionMarkdown: "Given a maze represented as a 2D grid of characters, find the exit. The maze has a start point at the top-left corner and an exit at the bottom-right corner. The maze contains walls (#), empty spaces (.), and a path to the exit (*).",
    inputDescription: "A 2D grid of characters representing the maze, with each row separated by a newline character.",
    outputDescription: "The coordinates of the exit point in the format 'x y'.",
    constraints: "The maze is a rectangle with at least 2 rows and 2 columns.",
    tags: ["recursion","backtracking"],
    testCases: [

      tc("...\n#..\n*..\n...", "3 3"),
      tc("##..\n#...\n*...\n...", "3 3"),
      tc("...\n...\n...\n...", "3 3", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "inorder-traversal-bst",
    title: "Inorder Traversal of BST",
    difficulty: "easy",
    descriptionMarkdown: "Given N integers that form a Binary Search Tree (inserted left-to-right), print the inorder traversal (sorted order) space-separated.",
    inputDescription: "Line 1: N. Line 2: N space-separated integers (insertion order).",
    outputDescription: "Space-separated integers in sorted (inorder) order.",
    constraints: "1 <= N <= 100, values are distinct integers.",
    tags: ["trees","bst"],
    testCases: [

      tc("5\n5 3 7 1 4", "1 3 4 5 7"),
      tc("3\n10 5 15", "5 10 15"),
      tc("7\n4 2 6 1 3 5 7", "1 2 3 4 5 6 7", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "subset-sum",
    title: "Subset Sum",
    difficulty: "easy",
    descriptionMarkdown: "Given a set of integers and a target sum, find a subset of the integers that sums up to the target.",
    inputDescription: "A list of integers and a target sum, separated by a space.",
    outputDescription: "A list of integers representing the subset that sums up to the target, or an empty list if no such subset exists.",
    constraints: "The target sum is a non-negative integer.",
    tags: ["recursion","backtracking"],
    testCases: [

      tc("1 2 3 4 5 10", "[5]"),
      tc("1 2 3 4 5 11", ""),
      tc("1 2 3 4 5 20", "", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "permutations",
    title: "Permutations",
    difficulty: "easy",
    descriptionMarkdown: "Given a string, generate all possible permutations of its characters.",
    inputDescription: "A string.",
    outputDescription: "A list of strings representing the permutations.",
    constraints: "The string is not empty.",
    tags: ["recursion","backtracking"],
    testCases: [

      tc("abc", "abc,acb,bac,bca,cab,cba"),
      tc("xyz", "xyz,xzy,yzx,zxy,zyx"),
      tc("123", "123,132,213,231,312,321", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "n-queens",
    title: "N-Queens",
    difficulty: "easy",
    descriptionMarkdown: "Given an integer n, place n queens on an n x n chessboard such that no two queens attack each other.",
    inputDescription: "An integer n.",
    outputDescription: "A list of lists representing the positions of the queens, where each inner list contains two integers representing the row and column of a queen.",
    constraints: "The integer n is a positive integer.",
    tags: ["recursion","backtracking"],
    testCases: [

      tc("4", "[[0, 1], [1, 2], [2, 3], [3, 0]]"),
      tc("5", "[[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]"),
      tc("6", "", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "grid-path-with-minimum-steps",
    title: "Grid Path with Minimum Steps",
    difficulty: "easy",
    descriptionMarkdown: "Given a grid of size m x n and a target cell (x, y), find the minimum number of steps required to reach the target cell from the top-left cell.",
    inputDescription: "Input: m, n, x, y (space-separated integers)",
    outputDescription: "Output: Minimum number of steps required to reach the target cell",
    constraints: "1 <= m, n <= 10^5",
    tags: ["dynamic-programming","grid"],
    testCases: [

      tc("3 3 2 2", "2"),
      tc("4 4 3 3", "4"),
      tc("5 5 4 4", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "minimize-rectangle-perimeter",
    title: "Minimize Rectangle Perimeter",
    difficulty: "easy",
    descriptionMarkdown: "Given a rectangle with a fixed area, find the minimum perimeter by adjusting the length and width.",
    inputDescription: "Input: area (single integer)",
    outputDescription: "Output: Minimum perimeter of the rectangle",
    constraints: "1 <= area <= 10^6",
    tags: ["dynamic-programming","geometry"],
    testCases: [

      tc("10", "16"),
      tc("20", "24"),
      tc("30", "32", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "max-sum-of-subarray-with-constraints",
    title: "Max Sum of Subarray with Constraints",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers and a constraint on the sum of the subarray, find the maximum sum of a subarray that does not exceed the constraint.",
    inputDescription: "Input: arr, constraint (space-separated integers)",
    outputDescription: "Output: Maximum sum of a subarray that does not exceed the constraint",
    constraints: "1 <= arr.length <= 10^5, 1 <= constraint <= 10^6",
    tags: ["dynamic-programming","array"],
    testCases: [

      tc("1 2 3 4 5 6 7 8 9 10 100", "15"),
      tc("-1 1 2 3 4 5 6 7 8 9 10 100", "10"),
      tc("1 2 3 4 5 6 7 8 9 10 1000", "10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "minimize-coin-change",
    title: "Minimize Coin Change",
    difficulty: "easy",
    descriptionMarkdown: "Given a set of coins and a target amount, find the minimum number of coins required to reach the target amount.",
    inputDescription: "Input: coins, target (space-separated integers)",
    outputDescription: "Output: Minimum number of coins required to reach the target amount",
    constraints: "1 <= coins.length <= 10^5, 1 <= target <= 10^6",
    tags: ["dynamic-programming","coin-change"],
    testCases: [

      tc("1 2 5 10 20 50 100 200 500 1000 2000 5000 10000 20000 50000 100000 200000 500000 1000000 2000000 5000000 10000000 20000000 50000000 100000000 200000000 500000000 1000000000 2000000000 5000000000 10000000000 20000000000 50000000000 100000000000 200000000000 500000000000 1000000000000 2000000000000 5000000000000", "3"),
      tc("1 2 5 10 20 50 100 200 500 1000 2000 5000 10000 20000 50000 100000 200000 500000 1000000 2000000 5000000 10000000 20000000 50000000 100000000 200000000 500000000 1000000000 2000000000 5000000000 10000000000 20000000000 50000000000 100000000000 200000000000 500000000000 1000000000000 2000000000000 5000000000000", "4"),
      tc("1 2 5 10 20 50 100 200 500 1000 2000 5000 10000 20000 50000 100000 200000 500000 1000000 2000000 5000000 10000000 20000000 50000000 100000000 200000000 500000000 1000000000 2000000000 5000000000 10000000000 20000000000 50000000000 100000000000 200000000000 500000000000 1000000000000 2000000000000 5000000000000", "5", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "max-sum-of-subarray-with-max-length",
    title: "Max Sum of Subarray with Max Length",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers, find the maximum sum of a subarray with the maximum length.",
    inputDescription: "Input: arr (single integer)",
    outputDescription: "Output: Maximum sum of a subarray with the maximum length",
    constraints: "1 <= arr.length <= 10^5",
    tags: ["dynamic-programming","array"],
    testCases: [

      tc("1 2 3 4 5 6 7 8 9 10", "55"),
      tc("-1 1 2 3 4 5 6 7 8 9 10", "45"),
      tc("1 2 3 4 5 6 7 8 9 10 100", "55", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-segment-merging-with-gaps",
    title: "Merging Array Segments with Gaps",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers with gaps, merge the segments into a single array without gaps. For example, merging [1, 3, 5, 7, 9] and [2, 4, 6, 8, 10] should result in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].",
    inputDescription: "Two space-separated arrays of integers.",
    outputDescription: "A single space-separated array of integers.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","merging"],
    testCases: [

      tc("1 3 5 7 9\n2 4 6 8 10", "1 2 3 4 5 6 7 8 9 10"),
      tc("10 20 30 40 50\n5 15 25 35 45", "5 10 15 20 25 30 35 40 45 50"),
      tc("1 3 5 7 9\n2 4 6 8 10 11 12", "1 2 3 4 5 6 7 8 9 10 11 12", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-pair-padding-with-zeros",
    title: "Pair Padding with Zeros in Array",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers, pair each element with the next one and pad the last element with a zero. For example, pairing [1, 2, 3, 4] should result in [1, 2, 3, 4, 0].",
    inputDescription: "A space-separated array of integers.",
    outputDescription: "A space-separated array of integers.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","pairing"],
    testCases: [

      tc("1 2 3 4", "1 2 3 4 0"),
      tc("10 20 30 40 50", "10 20 30 40 50 0"),
      tc("1 2 3 4 5", "1 2 3 4 5 0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-partitioning-by-parity",
    title: "Partitioning Array by Parity",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers, partition the array into two subarrays: one with even numbers and the other with odd numbers. For example, partitioning [1, 2, 3, 4, 5] should result in [2, 4] and [1, 3, 5].",
    inputDescription: "A space-separated array of integers.",
    outputDescription: "Two space-separated arrays of integers.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","partitioning"],
    testCases: [

      tc("1 2 3 4 5", "2 4\n1 3 5"),
      tc("10 20 30 40 50", "20 40 50\n10 30"),
      tc("1 2 3 4 5 6", "2 4 6\n1 3 5", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-run-length-encoding-with-gaps",
    title: "Run-Length Encoding with Gaps in Array",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers with gaps, apply run-length encoding to the array. For example, encoding [1, 3, 5, 7, 9] should result in [1, 3, 2, 1, 2, 1].",
    inputDescription: "A space-separated array of integers.",
    outputDescription: "A space-separated array of integers.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","run-length encoding"],
    testCases: [

      tc("1 3 5 7 9", "1 3 2 1 2 1"),
      tc("10 20 30 40 50", "10 20 2 10 2 1"),
      tc("1 2 3 4 5 6", "1 2 1 1 2 1 1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-segment-merging-with-sorted-subarrays",
    title: "Merging Array Segments with Sorted Subarrays",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers with sorted subarrays, merge the segments into a single array. For example, merging [1, 3, 5] and [2, 4, 6] should result in [1, 2, 3, 4, 5, 6].",
    inputDescription: "Two space-separated arrays of integers.",
    outputDescription: "A space-separated array of integers.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","merging"],
    testCases: [

      tc("1 3 5\n2 4 6", "1 2 3 4 5 6"),
      tc("10 20 30\n5 15 25", "5 10 15 20 25 30"),
      tc("1 3 5\n2 4 6 7 8", "1 2 3 4 5 6 7 8", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "string-replace-words",
    title: "Replace Words in a String",
    difficulty: "easy",
    descriptionMarkdown: "Given a string and a list of words, replace all occurrences of the words in the string with their corresponding lengths.",
    inputDescription: "Input is a string and a list of words separated by spaces.",
    outputDescription: "Output is the modified string with words replaced by their lengths.",
    constraints: "1 <= string.length <= 100, 1 <= words.length <= 100",
    tags: ["string","replacement"],
    testCases: [

      tc("Hello world world\nworld hello", "Hello 5 5\n5 5"),
      tc("This is a test test\n test this", "This is a 4 4\n4 4"),
      tc("This is a very long string with many words\nwords words words words words", "This is a 4 4\n4 4 4 4 4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "string-find-longest-substring",
    title: "Find the Longest Substring Without Repeating Characters",
    difficulty: "easy",
    descriptionMarkdown: "Given a string, find the length of the longest substring without repeating characters.",
    inputDescription: "Input is a string.",
    outputDescription: "Output is the length of the longest substring without repeating characters.",
    constraints: "1 <= string.length <= 100",
    tags: ["string","substring"],
    testCases: [

      tc("abcabcbb", "3"),
      tc("bbbbb", "1"),
      tc("pwwkew", "3", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "string-count-substrings",
    title: "Count the Number of Substrings",
    difficulty: "easy",
    descriptionMarkdown: "Given a string and a substring, count the number of occurrences of the substring in the string.",
    inputDescription: "Input is a string and a substring separated by spaces.",
    outputDescription: "Output is the count of occurrences of the substring.",
    constraints: "1 <= string.length <= 100, 1 <= substring.length <= 100",
    tags: ["string","count"],
    testCases: [

      tc("abcabcbb abc", "2"),
      tc("bbbbb b", "4"),
      tc("pwwkew p", "2", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "string-find-all-anagrams",
    title: "Find All Anagrams in a String",
    difficulty: "easy",
    descriptionMarkdown: "Given a string and a substring, find all occurrences of the substring in the string.",
    inputDescription: "Input is a string and a substring separated by spaces.",
    outputDescription: "Output is a list of indices where the substring occurs in the string.",
    constraints: "1 <= string.length <= 100, 1 <= substring.length <= 100",
    tags: ["string","anagram"],
    testCases: [

      tc("abcabcbb abc", "[0, 5]"),
      tc("bbbbb b", "[0, 1, 2, 3, 4]"),
      tc("pwwkew p", "[0, 3]", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "string-replace-substrings",
    title: "Replace Substrings in a String",
    difficulty: "easy",
    descriptionMarkdown: "Given a string and a list of substrings, replace all occurrences of the substrings in the string with their corresponding replacement strings.",
    inputDescription: "Input is a string and a list of substrings and replacement strings separated by spaces.",
    outputDescription: "Output is the modified string with substrings replaced by their replacement strings.",
    constraints: "1 <= string.length <= 100, 1 <= substrings.length <= 100",
    tags: ["string","replacement"],
    testCases: [

      tc("Hello world world\nworld hello\nhello there", "Hello 5 5\n5 5 there"),
      tc("This is a test test\n test this\n this is a test", "This is a 4 4\n4 4 is a 4"),
      tc("This is a very long string with many words\nwords words words words words", "This is a 4 4\n4 4 4 4 4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "valid-expression-with-operators",
    title: "Valid Expression with Operators",
    difficulty: "easy",
    descriptionMarkdown: "Given a string representing an expression with operators (+, -, *, /) and numbers, determine if the expression is valid.",
    inputDescription: "A string representing an expression with operators and numbers",
    outputDescription: "A boolean indicating whether the expression is valid",
    constraints: "1 <= expression.length <= 100",
    tags: ["stack","string"],
    testCases: [

      tc("2+3*4", "true"),
      tc("2+3*", "false"),
      tc("2+3*(4/2)", "true", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "postfix-evaluation-with-variables",
    title: "Postfix Evaluation with Variables",
    difficulty: "easy",
    descriptionMarkdown: "Given a postfix expression with variables (a, b, c) and operators (+, -, *, /), evaluate the expression and return the result.",
    inputDescription: "A string representing a postfix expression with variables and operators",
    outputDescription: "The result of the expression evaluation",
    constraints: "1 <= expression.length <= 100",
    tags: ["postfix","evaluation"],
    testCases: [

      tc("a b +", "5"),
      tc("a b * c +", "20"),
      tc("a b * c + d /", "10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "reverse-stack-with-multiple-operations",
    title: "Reverse Stack with Multiple Operations",
    difficulty: "easy",
    descriptionMarkdown: "Given a stack and a list of operations (push, pop, reverse), apply the operations to the stack and return the final state of the stack.",
    inputDescription: "A list of operations (push, pop, reverse) and a list of stack elements",
    outputDescription: "The final state of the stack",
    constraints: "1 <= operations.length <= 100",
    tags: ["stack","reversal"],
    testCases: [

      tc("push 1\npush 2\nreverse\npop", "[2]"),
      tc("push 1\npush 2\npush 3\nreverse\npop", "[3, 2]"),
      tc("push 1\npush 2\npush 3\nreverse\nreverse\npop", "[3, 2, 1]", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "valid-parentheses-with-variables",
    title: "Valid Parentheses with Variables",
    difficulty: "easy",
    descriptionMarkdown: "Given a string representing an expression with variables (a, b, c) and parentheses, determine if the expression is valid.",
    inputDescription: "A string representing an expression with variables and parentheses",
    outputDescription: "A boolean indicating whether the expression is valid",
    constraints: "1 <= expression.length <= 100",
    tags: ["parentheses","string"],
    testCases: [

      tc("a(b+c)", "true"),
      tc("a(b+c)", "true"),
      tc("a(b+c)", "true", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "postfix-evaluation-with-multiple-variables",
    title: "Postfix Evaluation with Multiple Variables",
    difficulty: "easy",
    descriptionMarkdown: "Given a postfix expression with multiple variables (a, b, c, d) and operators (+, -, *, /), evaluate the expression and return the result.",
    inputDescription: "A string representing a postfix expression with multiple variables and operators",
    outputDescription: "The result of the expression evaluation",
    constraints: "1 <= expression.length <= 100",
    tags: ["postfix","evaluation"],
    testCases: [

      tc("a b + c *", "15"),
      tc("a b * c + d /", "10"),
      tc("a b * c + d / e *", "20", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "matrix-diagonal-sum-with-maximum",
    title: "Matrix Diagonal Sum with Maximum",
    difficulty: "easy",
    descriptionMarkdown: "Given a square matrix of size N x N, find the sum of the two diagonals with the maximum sum.",
    inputDescription: "Input is a space-separated list of N and then N x N matrix elements.",
    outputDescription: "Output is a single number, the sum of the two diagonals with the maximum sum.",
    constraints: "1 <= N <= 10^5",
    tags: ["matrix","diagonal","sum"],
    testCases: [

      tc("3 1 2 3 4 5 6 7 8", "29"),
      tc("4 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", "74"),
      tc("5 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20", "135", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "matrix-search-in-sorted-matrix",
    title: "Matrix Search in Sorted Matrix",
    difficulty: "easy",
    descriptionMarkdown: "Given a sorted matrix of size N x N, find the index of the target element in the matrix.",
    inputDescription: "Input is a space-separated list of N, then N x N matrix elements, and the target element.",
    outputDescription: "Output is a string indicating the index of the target element in the format (row, column).",
    constraints: "1 <= N <= 10^5",
    tags: ["matrix","search","sorted"],
    testCases: [

      tc("3 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30", "(1, 1)"),
      tc("4 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40", "(2, 2)"),
      tc("5 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50", "(3, 3)", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "matrix-rotate-90-degrees-count",
    title: "Matrix Rotate 90 Degrees Count",
    difficulty: "easy",
    descriptionMarkdown: "Given a square matrix of size N x N, find the number of elements that remain in their original position after rotating the matrix 90 degrees.",
    inputDescription: "Input is a space-separated list of N and then N x N matrix elements.",
    outputDescription: "Output is a single number, the count of elements that remain in their original position.",
    constraints: "1 <= N <= 10^5",
    tags: ["matrix","rotate","count"],
    testCases: [

      tc("3 1 2 3 4 5 6 7 8", "3"),
      tc("4 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", "6"),
      tc("5 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20", "9", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "matrix-diagonal-sum-with-minimum",
    title: "Matrix Diagonal Sum with Minimum",
    difficulty: "easy",
    descriptionMarkdown: "Given a square matrix of size N x N, find the sum of the two diagonals with the minimum sum.",
    inputDescription: "Input is a space-separated list of N and then N x N matrix elements.",
    outputDescription: "Output is a single number, the sum of the two diagonals with the minimum sum.",
    constraints: "1 <= N <= 10^5",
    tags: ["matrix","diagonal","sum"],
    testCases: [

      tc("3 1 2 3 4 5 6 7 8", "9"),
      tc("4 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", "24"),
      tc("5 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20", "45", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "matrix-search-in-unsorted-matrix",
    title: "Matrix Search in Unsorted Matrix",
    difficulty: "easy",
    descriptionMarkdown: "Given a matrix of size N x N, find the index of the target element in the matrix.",
    inputDescription: "Input is a space-separated list of N, then N x N matrix elements, and the target element.",
    outputDescription: "Output is a string indicating the index of the target element in the format (row, column).",
    constraints: "1 <= N <= 10^5",
    tags: ["matrix","search","unsorted"],
    testCases: [

      tc("3 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30", "(1, 1)"),
      tc("4 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40", "(2, 2)"),
      tc("5 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50", "(3, 3)", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "string-replace-words-with-pattern",
    title: "Replace Words with Pattern",
    difficulty: "easy",
    descriptionMarkdown: "Given a string `s` and a pattern `p`, replace all occurrences of `p` in `s` with a specified replacement string `r`. The pattern `p` is a sequence of alphanumeric characters and underscores.",
    inputDescription: "Input is a string `s`, a pattern `p`, and a replacement string `r`.",
    outputDescription: "Output is the modified string `s` with all occurrences of `p` replaced by `r`.",
    constraints: "1 <= len(s) <= 10^5, 1 <= len(p) <= 10^5, 1 <= len(r) <= 10^5",
    tags: ["string","search","replace"],
    testCases: [

      tc("Hello, world! world is beautiful.\nworld\nworld", "Hello,  is beautiful.\n  is beautiful.\n  is beautiful."),
      tc("abcabcabc\\nabc\\nabc", "abcabcabc\\nabc\\nabc"),
      tc("This is a test string.\nThis is a test string.\nThis is a test string.", "This is a test string.\nThis is a test string.\nThis is a test string.", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "find-longest-substring-without-repeating-characters",
    title: "Find Longest Substring Without Repeating Characters",
    difficulty: "easy",
    descriptionMarkdown: "Given a string `s`, find the length of the longest substring without repeating characters.",
    inputDescription: "Input is a string `s`.",
    outputDescription: "Output is the length of the longest substring without repeating characters.",
    constraints: "1 <= len(s) <= 10^5",
    tags: ["string","substring","repeating"],
    testCases: [

      tc("abcabcbb", "3"),
      tc("bbbbb", "1"),
      tc("pwwkew", "3", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "string-count-substrings-with-consecutive-repeating-characters",
    title: "Count Substrings with Consecutive Repeating Characters",
    difficulty: "easy",
    descriptionMarkdown: "Given a string `s`, count the number of substrings with consecutive repeating characters.",
    inputDescription: "Input is a string `s`.",
    outputDescription: "Output is the count of substrings with consecutive repeating characters.",
    constraints: "1 <= len(s) <= 10^5",
    tags: ["string","substring","repeating"],
    testCases: [

      tc("aaaabbbbcccc", "6"),
      tc("abcabcbb", "0"),
      tc("bbbbb", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "minimize-rectangle-perimeter-with-rectangles",
    title: "Minimize Rectangle Perimeter with Rectangles",
    difficulty: "easy",
    descriptionMarkdown: "You are given a list of rectangles, where each rectangle is represented as a string in the format \"width height\". Your task is to find the minimum perimeter of a rectangle that can be formed by combining any number of the given rectangles.",
    inputDescription: "A list of rectangles, where each rectangle is a string in the format \"width height\"",
    outputDescription: "The minimum perimeter of a rectangle that can be formed by combining any number of the given rectangles",
    constraints: "1 <= width, height <= 10^5",
    tags: ["rectangle","perimeter"],
    testCases: [

      tc("3 4\n5 6\n7 8", "34"),
      tc("1 2\n3 4\n5 6", "22"),
      tc("10 20\n30 40\n50 60", "140", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "minimize-rectangle-area-with-rectangles",
    title: "Minimize Rectangle Area with Rectangles",
    difficulty: "easy",
    descriptionMarkdown: "You are given a list of rectangles, where each rectangle is represented as a string in the format \"width height\". Your task is to find the minimum area of a rectangle that can be formed by combining any number of the given rectangles.",
    inputDescription: "A list of rectangles, where each rectangle is a string in the format \"width height\"",
    outputDescription: "The minimum area of a rectangle that can be formed by combining any number of the given rectangles",
    constraints: "1 <= width, height <= 10^5",
    tags: ["rectangle","area"],
    testCases: [

      tc("3 4\n5 6\n7 8", "72"),
      tc("1 2\n3 4\n5 6", "14"),
      tc("10 20\n30 40\n50 60", "1200", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "max-sum-of-subarray-with-constraints-and-negative-numbers",
    title: "Max Sum of Subarray with Constraints and Negative Numbers",
    difficulty: "easy",
    descriptionMarkdown: "You are given an array of integers and a constraint on the maximum sum of a subarray. Your task is to find the maximum sum of a subarray that does not exceed the given constraint.",
    inputDescription: "An array of integers and a constraint on the maximum sum of a subarray",
    outputDescription: "The maximum sum of a subarray that does not exceed the given constraint",
    constraints: "-10^5 <= num <= 10^5",
    tags: ["subarray","sum"],
    testCases: [

      tc("1 2 3 4 5\n10", "15"),
      tc("-1 -2 -3 -4 -5\n-10", "-1"),
      tc("1 -2 3 -4 5\n0", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "minimize-coin-change-with-coins-and-penalty",
    title: "Minimize Coin Change with Coins and Penalty",
    difficulty: "easy",
    descriptionMarkdown: "You are given a list of coins and a penalty for each coin. Your task is to find the minimum number of coins needed to make change for a given amount, considering the penalty for each coin.",
    inputDescription: "A list of coins and a penalty for each coin, and the amount to make change for",
    outputDescription: "The minimum number of coins needed to make change for the given amount",
    constraints: "1 <= coin <= 10^5",
    tags: ["coin","change"],
    testCases: [

      tc("1 2 5\n1 2 3\n10", "2"),
      tc("1 2 5\n2 3 4\n15", "3"),
      tc("1 2 5\n1 2 3\n20", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "max-sum-of-subarray-with-constraints-and-consecutive-numbers",
    title: "Max Sum of Subarray with Constraints and Consecutive Numbers",
    difficulty: "easy",
    descriptionMarkdown: "You are given an array of consecutive integers and a constraint on the maximum sum of a subarray. Your task is to find the maximum sum of a subarray that does not exceed the given constraint.",
    inputDescription: "An array of consecutive integers and a constraint on the maximum sum of a subarray",
    outputDescription: "The maximum sum of a subarray that does not exceed the given constraint",
    constraints: "-10^5 <= num <= 10^5",
    tags: ["subarray","sum"],
    testCases: [

      tc("1 2 3 4 5\n10", "15"),
      tc("-1 -2 -3 -4 -5\n-10", "-1"),
      tc("1 2 3 4 5\n0", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "matrix-rotate-90-degrees",
    title: "Rotate Matrix 90 Degrees",
    difficulty: "easy",
    descriptionMarkdown: "Given a 2D matrix, rotate it 90 degrees clockwise.",
    inputDescription: "Input is a 2D array of integers, e.g. [[1, 2, 3], [4, 5, 6], [7, 8, 9]].",
    outputDescription: "Output is the rotated 2D array.",
    constraints: "1 <= rows, cols <= 10",
    tags: ["matrix","rotation"],
    testCases: [

      tc("[[1, 2, 3], [4, 5, 6], [7, 8, 9]]", "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]"),
      tc("[[1, 2], [3, 4]]", "[[3, 1], [4, 2]]"),
      tc("[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]", "[[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "two-pointer-array-segment-sum",
    title: "Two Pointer Array Segment Sum",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers and a target sum, find the maximum sum of a segment of the array that equals the target sum.",
    inputDescription: "Input is a space-separated array of integers and a target sum.",
    outputDescription: "Output is the maximum sum of a segment of the array that equals the target sum.",
    constraints: "1 <= N <= 10^5",
    tags: ["two pointers","array"],
    testCases: [

      tc("1 2 3 4 5 10\n3", "6"),
      tc("10 20 30 40 50 100\n60", "-1"),
      tc("1 2 3 4 5 10\n20", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "two-pointer-pair-with-given-sum",
    title: "Two Pointer Pair with Given Sum",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers and a target sum, find the number of pairs that sum up to the target sum.",
    inputDescription: "Input is a space-separated array of integers and a target sum.",
    outputDescription: "Output is the number of pairs that sum up to the target sum.",
    constraints: "1 <= N <= 10^5",
    tags: ["two pointers","array"],
    testCases: [

      tc("1 2 3 4 5 10\n3", "2"),
      tc("10 20 30 40 50 100\n60", "0"),
      tc("1 2 3 4 5 10\n20", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "two-pointer-maximum-sum-subarray-with-constraints",
    title: "Two Pointer Maximum Sum Subarray with Constraints",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers and a maximum sum constraint, find the maximum sum of a subarray that does not exceed the constraint.",
    inputDescription: "Input is a space-separated array of integers and a maximum sum constraint.",
    outputDescription: "Output is the maximum sum of a subarray that does not exceed the constraint.",
    constraints: "1 <= N <= 10^5",
    tags: ["two pointers","array"],
    testCases: [

      tc("1 2 3 4 5 10\n15", "15"),
      tc("10 20 30 40 50 100\n60", "60"),
      tc("1 2 3 4 5 10\n20", "15", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "two-pointer-minimum-sum-subarray-with-constraints",
    title: "Two Pointer Minimum Sum Subarray with Constraints",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers and a minimum sum constraint, find the minimum sum of a subarray that meets the constraint.",
    inputDescription: "Input is a space-separated array of integers and a minimum sum constraint.",
    outputDescription: "Output is the minimum sum of a subarray that meets the constraint.",
    constraints: "1 <= N <= 10^5",
    tags: ["two pointers","array"],
    testCases: [

      tc("1 2 3 4 5 10\n-10", "-10"),
      tc("10 20 30 40 50 100\n-60", "-60"),
      tc("1 2 3 4 5 10\n-20", "-10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "two-pointer-maximum-sum-subarray-with-consecutive-numbers",
    title: "Two Pointer Maximum Sum Subarray with Consecutive Numbers",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers and a maximum sum constraint, find the maximum sum of a subarray that consists of consecutive numbers and does not exceed the constraint.",
    inputDescription: "Input is a space-separated array of integers and a maximum sum constraint.",
    outputDescription: "Output is the maximum sum of a subarray that consists of consecutive numbers and does not exceed the constraint.",
    constraints: "1 <= N <= 10^5",
    tags: ["two pointers","array"],
    testCases: [

      tc("1 2 3 4 5 10\n15", "15"),
      tc("10 20 30 40 50 100\n60", "60"),
      tc("1 2 3 4 5 10\n20", "15", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "two-pointer-maximum-sum-subarray-with-constraints-and-consecutive-numbers",
    title: "Maximum Sum Subarray with Constraints and Consecutive Numbers",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers, a constraint, and a condition for consecutive numbers, find the maximum sum of a subarray that satisfies the constraint and the condition. If no such subarray exists, return 0.",
    inputDescription: "Input is a space-separated array of integers, a constraint, and a condition for consecutive numbers.",
    outputDescription: "Output is the maximum sum of a subarray that satisfies the constraint and the condition, or 0 if no such subarray exists.",
    constraints: "1 <= N <= 10^5",
    tags: ["two pointers","array"],
    testCases: [

      tc("1 2 3 4 5\n3\ntrue", "15"),
      tc("5 4 3 2 1\n3\nfalse", "0"),
      tc("10 20 30 40 50 60\n3\ntrue", "150", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "two-pointer-pair-with-given-sum-and-constraints",
    title: "Find a Pair with Given Sum and Constraints in an Array",
    difficulty: "easy",
    descriptionMarkdown: "Given an array of integers, a target sum, and constraints, find a pair of elements in the array that add up to the target sum and satisfy the constraints. If no such pair exists, return an empty array.",
    inputDescription: "Input is a space-separated array of integers, a target sum, and constraints.",
    outputDescription: "Output is a space-separated pair of integers that add up to the target sum and satisfy the constraints, or an empty array if no such pair exists.",
    constraints: "1 <= N <= 10^5",
    tags: ["two pointers","array"],
    testCases: [

      tc("1 2 3 4 5 6\n10\n1 2", "3 7"),
      tc("1 2 3 4 5 6\n20\n1 2", ""),
      tc("10 20 30 40 50 60\n100\n1 2", "40 60", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "valid-expression-with-variables",
    title: "Valid Expression with Variables",
    difficulty: "easy",
    descriptionMarkdown: "Given a string containing variables and operators, determine if the expression is valid.",
    inputDescription: "A string containing variables and operators, separated by spaces.",
    outputDescription: "A boolean indicating whether the expression is valid.",
    constraints: "1 <= string.length <= 10^5",
    tags: ["expression","variables"],
    testCases: [

      tc("a + b * c", "true"),
      tc("a + b *", "false"),
      tc("a + b * c + d", "true", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "maze-exit-with-minimum-steps",
    title: "Maze Exit with Minimum Steps",
    difficulty: "easy",
    descriptionMarkdown: "You are given a maze represented as a 2D grid of characters. The maze has a start point at the top-left corner and an exit point at the bottom-right corner. The maze contains walls represented by '#' and empty spaces represented by '.'. Your task is to find the minimum number of steps required to exit the maze from the start point.",
    inputDescription: "Input is a string representing the maze, where each character is either '#' or '.'. The maze is guaranteed to have a start point at the top-left corner and an exit point at the bottom-right corner.",
    outputDescription: "The minimum number of steps required to exit the maze from the start point.",
    constraints: "1 <= maze.length <= 10^2, 1 <= maze[0].length <= 10^2",
    tags: ["maze","bfs"],
    testCases: [

      tc("......\n#.....\n#.....\n......\n......", "8"),
      tc(".......#\n#........\n#........\n#........\n#........\n#........\n.......#", "12"),
      tc("##########\n#.........#\n#.........#\n#.........#\n#.........#\n#.........#\n##########", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "subset-sum-with-constraints",
    title: "Subset Sum with Constraints",
    difficulty: "easy",
    descriptionMarkdown: "You are given a set of integers and a target sum. Your task is to find a subset of the given set that sums up to the target sum, subject to the constraint that the sum of any two elements in the subset must be less than or equal to a given limit.",
    inputDescription: "Input is a string representing the set of integers, separated by spaces, and a target sum, and a limit, all separated by commas.",
    outputDescription: "A boolean indicating whether a subset with the target sum exists, or the subset itself if it exists.",
    constraints: "1 <= N <= 10^2, 1 <= target_sum <= 10^3, 1 <= limit <= 10^3",
    tags: ["subset","constraints"],
    testCases: [

      tc("1 2 3 4, 5, 6", "false"),
      tc("1 2 3 4, 7, 8", "true"),
      tc("1 2 3 4, 10, 10", "true", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "permutations-of-subsets",
    title: "Permutations of Subsets",
    difficulty: "easy",
    descriptionMarkdown: "You are given a set of integers and a target sum. Your task is to find all permutations of subsets of the given set that sum up to the target sum.",
    inputDescription: "Input is a string representing the set of integers, separated by spaces, and a target sum, all separated by commas.",
    outputDescription: "A list of lists, where each sublist is a permutation of a subset that sums up to the target sum.",
    constraints: "1 <= N <= 10^2, 1 <= target_sum <= 10^3",
    tags: ["permutations","subset"],
    testCases: [

      tc("1 2 3, 3", "[[1, 2], [1, 3], [2, 3]]"),
      tc("1 2 3, 4", "[]"),
      tc("1 2 3, 6", "[[1, 2, 3]]", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "bst-level-order-sum",
    title: "BST Level Order Sum",
    difficulty: "easy",
    descriptionMarkdown: "Insert N integers into a BST (left-to-right). Print the sum of all values at each level, separated by spaces. The root is level 1.",
    inputDescription: "Line 1: N. Line 2: N space-separated integers.",
    outputDescription: "Space-separated sums, one per level (left to right).",
    constraints: "1 <= N <= 50, values are distinct integers.",
    tags: ["trees","bst"],
    testCases: [

      tc("3\n4 2 6", "4 8"),
      tc("1\n5", "5"),
      tc("7\n4 2 6 1 3 5 7", "4 8 16", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "subset-sum-with-multiples",
    title: "Subset Sum with Multiples",
    difficulty: "easy",
    descriptionMarkdown: "You are given a set of integers and a target sum. Your task is to find a subset of the given set that sums up to the target sum, subject to the constraint that each element in the subset can be used multiple times.",
    inputDescription: "Input is a string representing the set of integers, separated by spaces, and a target sum, all separated by commas.",
    outputDescription: "A boolean indicating whether a subset with the target sum exists, or the subset itself if it exists.",
    constraints: "1 <= N <= 10^2, 1 <= target_sum <= 10^3",
    tags: ["subset","multiples"],
    testCases: [

      tc("1 2 3, 5", "true"),
      tc("1 2 3, 7", "false"),
      tc("1 2 3, 6", "true", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "binary-tree-leaf-count",
    title: "Count Leaves in a Binary Tree",
    difficulty: "easy",
    descriptionMarkdown: "Given a binary tree, count the number of leaves in the tree.",
    inputDescription: "Input is a binary tree represented as a string, where each node is a number and each space separates a node from its children.",
    outputDescription: "Output is an integer representing the number of leaves in the tree.",
    constraints: "1 <= N <= 10^5",
    tags: ["binary tree","recursion"],
    testCases: [

      tc("1 2 3 4 5", "2"),
      tc("1 2 3 4 5 6 7", "3"),
      tc("1 2 3 4 5 6 7 8 9", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "subset-sum-with-target",
    title: "Find Subset with Target Sum",
    difficulty: "easy",
    descriptionMarkdown: "Given a set of integers and a target sum, find a subset of the integers that sums up to the target.",
    inputDescription: "Input is a string of space-separated integers and a target sum.",
    outputDescription: "Output is a string representing the subset of integers that sums up to the target, or 'No subset found' if no such subset exists.",
    constraints: "1 <= N <= 10^5",
    tags: ["subset sum","recursion"],
    testCases: [

      tc("1 2 3 4 5 10", "1 2 3 4"),
      tc("1 2 3 4 5 20", "No subset found"),
      tc("1 2 3 4 5 15", "1 2 3 4 5", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "valid-parentheses-balanced-with-variables",
    title: "Valid Balanced Parentheses with Variables",
    difficulty: "easy",
    descriptionMarkdown: "Given a string containing parentheses, variables, and operators, determine if the parentheses are balanced and the expression is valid.",
    inputDescription: "A string containing parentheses, variables, and operators.",
    outputDescription: "True if the parentheses are balanced and the expression is valid, False otherwise.",
    constraints: "1 <= S <= 10^5",
    tags: ["stack","parentheses"],
    testCases: [

      tc("a + b * (c - d) + e", "true"),
      tc("a + b * (c - d - e", "false"),
      tc("a + b * (c - d) + e + f * g", "true", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "matrix-diagonal-sum-with-missing-values",
    title: "Matrix Diagonal Sum with Missing Values",
    difficulty: "easy",
    descriptionMarkdown: "Given a square matrix of size N x N, where some elements are missing (represented by -1), calculate the sum of the main diagonal and the anti-diagonal.",
    inputDescription: "Input is a string of space-separated numbers, where each number represents an element in the matrix. The first number is the size of the matrix.",
    outputDescription: "Output is a single number, the sum of the main diagonal and the anti-diagonal.",
    constraints: "1 <= N <= 10^5, -1 <= matrix[i][j] <= 10^5",
    tags: ["matrix","diagonal","sum"],
    testCases: [

      tc("3\n1 2 3\n4 5 -1\n6 7 8", "30"),
      tc("4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16", "80"),
      tc("5\n1 2 3 4 5\n6 7 8 9 10\n11 12 13 -1 15\n16 17 18 19 20\n21 22 23 24 25", "105", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "substring-replacement-pattern",
    title: "Substring Replacement Pattern",
    difficulty: "medium",
    descriptionMarkdown: "Given a string `s` and a pattern `p`, replace all occurrences of `p` in `s` with a new string `r`. The pattern `p` can contain special characters like `*` which matches any character.",
    inputDescription: "Input is a string `s` and two strings `p` and `r`.",
    outputDescription: "Output is the modified string after replacement.",
    constraints: "1 <= len(s) <= 10^5, 1 <= len(p) <= 10^5, 1 <= len(r) <= 10^5",
    tags: ["string","pattern","replacement"],
    testCases: [

      tc("Hello world, world is beautiful\nHello world\nworld", "Hello ,  is beautiful\nHello"),
      tc("abcabcabc\nabc\nxyz", "xyzxyzxyz\nxyz"),
      tc("Hello world, world is beautiful\nHello world\nworld\nHello world", "Hello ,  is beautiful\nHello \nHello ,  is beautiful", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "longest-substring-without-repeating-2",
    title: "Longest Substring Without Repeating Characters 2",
    difficulty: "medium",
    descriptionMarkdown: "Given a string `s`, find the length of the longest substring without repeating characters. The substring can be any length, but it cannot contain any repeating characters.",
    inputDescription: "Input is a string `s`.",
    outputDescription: "Output is the length of the longest substring without repeating characters.",
    constraints: "1 <= len(s) <= 10^5",
    tags: ["string","substring","repeating"],
    testCases: [

      tc("abcabcbb", "3"),
      tc("bbbbb", "1"),
      tc("pwwkew", "3", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "string-replace-all-substrings",
    title: "String Replace All Substrings",
    difficulty: "medium",
    descriptionMarkdown: "Given a string `s` and a list of substrings `subs`, replace all occurrences of each substring in `s` with a new string.",
    inputDescription: "Input is a string `s` and a list of substrings `subs`.",
    outputDescription: "Output is the modified string after replacement.",
    constraints: "1 <= len(s) <= 10^5, 1 <= len(subs) <= 10^5",
    tags: ["string","substring","replacement"],
    testCases: [

      tc("Hello world, world is beautiful\nHello world\nworld", "Hello ,  is beautiful\nHello"),
      tc("abcabcabc\nabc\nxyz", "xyzxyzxyz\nxyz"),
      tc("Hello world, world is beautiful\nHello world\nworld\nHello world", "Hello ,  is beautiful\nHello \nHello ,  is beautiful", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "find-all-substrings-with-consecutive-repeating-characters",
    title: "Find All Substrings With Consecutive Repeating Characters",
    difficulty: "medium",
    descriptionMarkdown: "Given a string `s`, find all substrings with consecutive repeating characters.",
    inputDescription: "Input is a string `s`.",
    outputDescription: "Output is a list of substrings with consecutive repeating characters.",
    constraints: "1 <= len(s) <= 10^5",
    tags: ["string","substring","repeating"],
    testCases: [

      tc("abcabcbb", "abc,abc"),
      tc("bbbbb", "bbbb"),
      tc("pwwkew", "pww", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "string-replace-substrings-with-pattern",
    title: "String Replace Substrings With Pattern",
    difficulty: "medium",
    descriptionMarkdown: "Given a string `s` and a pattern `p`, replace all occurrences of substrings matching `p` in `s` with a new string `r`. The pattern `p` can contain special characters like `*` which matches any character.",
    inputDescription: "Input is a string `s` and two strings `p` and `r`.",
    outputDescription: "Output is the modified string after replacement.",
    constraints: "1 <= len(s) <= 10^5, 1 <= len(p) <= 10^5, 1 <= len(r) <= 10^5",
    tags: ["string","pattern","replacement"],
    testCases: [

      tc("Hello world, world is beautiful\nHello world\nworld", "Hello ,  is beautiful\nHello"),
      tc("abcabcabc\nabc\nxyz", "xyzxyzxyz\nxyz"),
      tc("Hello world, world is beautiful\nHello world\nworld\nHello world", "Hello ,  is beautiful\nHello \nHello ,  is beautiful", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "relative-sorting-with-missing-numbers",
    title: "Relative Sorting with Missing Numbers",
    difficulty: "medium",
    descriptionMarkdown: "Given two arrays of integers, sort the first array in the same order as the second array, but with missing numbers replaced by their next available number.",
    inputDescription: "Two space-separated integers representing the length of the two arrays, followed by the two arrays of integers, space-separated.",
    outputDescription: "A space-separated list of integers representing the sorted array with missing numbers replaced.",
    constraints: "1 <= A.length, B.length <= 10^5, 1 <= A[i], B[i] <= 10^5",
    tags: ["sorting","ranking"],
    testCases: [

      tc("5 5\n1 2 3 4 5\n2 1 3 5 4", "1 2 3 4 5"),
      tc("5 5\n1 2 3 4 5\n2 1 3 5 6", "1 2 3 4 5"),
      tc("10 10\n1 2 3 4 5 6 7 8 9 10\n2 1 3 5 4 7 6 8 9 10", "1 2 3 4 5 6 7 8 9 10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "rank-array-with-negative-numbers",
    title: "Rank Array with Negative Numbers",
    difficulty: "medium",
    descriptionMarkdown: "Given an array of integers, rank the array in ascending order, but with negative numbers at the end.",
    inputDescription: "A space-separated list of integers.",
    outputDescription: "A space-separated list of integers representing the ranked array.",
    constraints: "1 <= N <= 10^5, -10^5 <= A[i] <= 10^5",
    tags: ["sorting","ranking"],
    testCases: [

      tc("5\n1 2 3 4 5", "1 2 3 4 5"),
      tc("5\n-1 -2 -3 -4 -5", "-1 -2 -3 -4 -5"),
      tc("10\n-1 0 1 2 3 4 5 6 7 8", "0 1 2 3 4 5 6 7 8 -1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "selection-sort-with-swapping",
    title: "Selection Sort with Swapping",
    difficulty: "medium",
    descriptionMarkdown: "Given an array of integers, implement selection sort with swapping, but with a twist: the array is sorted in descending order, and the swapping is done in a way that the largest element is moved to the end of the array.",
    inputDescription: "A space-separated list of integers.",
    outputDescription: "A space-separated list of integers representing the sorted array.",
    constraints: "1 <= N <= 10^5, -10^5 <= A[i] <= 10^5",
    tags: ["sorting","ranking"],
    testCases: [

      tc("5\n5 4 3 2 1", "1 2 3 4 5"),
      tc("5\n-1 -2 -3 -4 -5", "-5 -4 -3 -2 -1"),
      tc("10\n8 7 6 5 4 3 2 1 0 -1", "-1 0 1 2 3 4 5 6 7 8", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "rank-array-with-zero-sum",
    title: "Rank Array with Zero Sum",
    difficulty: "medium",
    descriptionMarkdown: "Given an array of integers, rank the array in ascending order, but with zero-sum elements at the end.",
    inputDescription: "A space-separated list of integers.",
    outputDescription: "A space-separated list of integers representing the ranked array.",
    constraints: "1 <= N <= 10^5, -10^5 <= A[i] <= 10^5",
    tags: ["sorting","ranking"],
    testCases: [

      tc("5\n1 2 3 4 5", "1 2 3 4 5"),
      tc("5\n-1 -2 -3 -4 -5", "-1 -2 -3 -4 -5"),
      tc("10\n-1 0 1 2 3 4 5 6 7 8", "-1 1 2 3 4 5 6 7 8 0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "minimize-rectangle-perimeter-with-rectangles-and-obstacles",
    title: "Minimize Rectangle Perimeter with Rectangles and Obstacles",
    difficulty: "medium",
    descriptionMarkdown: "You are given a set of rectangles and obstacles on a 2D plane. Each rectangle is represented by its width and height, and each obstacle is represented by its x and y coordinates. Your task is to find the minimum perimeter of a rectangle that can be formed by combining the given rectangles and avoiding the obstacles.",
    inputDescription: "Input format: [width, height] of rectangles and [x, y] of obstacles, separated by spaces",
    outputDescription: "Output format: Minimum perimeter of the rectangle",
    constraints: "1 <= width, height <= 10^5, 1 <= x, y <= 10^5",
    tags: ["rectangle","perimeter","obstacles"],
    testCases: [

      tc("5 3 1 2 3 4 5 6\n7 8 9 10 11 12 13 14", "20"),
      tc("10 5 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19\n20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39", "40"),
      tc("1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1\n2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2", "20", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "max-sum-of-subarray-with-constraints-and-consecutive-numbers-and-negative-numbers",
    title: "Max Sum of Subarray with Constraints and Consecutive Numbers and Negative Numbers",
    difficulty: "medium",
    descriptionMarkdown: "You are given an array of integers and a set of constraints. Each constraint is a pair of integers representing a range of values. Your task is to find the maximum sum of a subarray that satisfies all the constraints and contains at least one consecutive pair of numbers.",
    inputDescription: "Input format: Array of integers and constraints, separated by spaces",
    outputDescription: "Output format: Maximum sum of the subarray",
    constraints: "1 <= array length <= 10^5, 1 <= constraint length <= 10^5",
    tags: ["subarray","constraints","consecutive numbers"],
    testCases: [

      tc("1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10", "30"),
      tc("-1 1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10", "20"),
      tc("1 1 1 1 1 1 1 1 1 1\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10", "10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "subset-sum-with-multiples-and-constraints",
    title: "Subset Sum with Multiples and Constraints",
    difficulty: "medium",
    descriptionMarkdown: "You are given a set of numbers and a set of constraints. Each constraint is a pair of integers representing a range of values. Your task is to find a subset of the numbers that sums up to a multiple of the given number and satisfies all the constraints.",
    inputDescription: "Input format: Set of numbers and constraints, separated by spaces",
    outputDescription: "Output format: Subset of numbers that satisfies the conditions",
    constraints: "1 <= number length <= 10^5, 1 <= constraint length <= 10^5",
    tags: ["subset","constraints","multiples"],
    testCases: [

      tc("1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10", "1 2 3 4 5 6 7 8 9 10"),
      tc("-1 1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10", "-1 1 2 3 4 5 6 7 8 9"),
      tc("1 1 1 1 1 1 1 1 1 1\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10", "1 1 1 1 1 1 1 1 1 1", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "matrix-diagonal-sum-with-missing-values-and-constraints",
    title: "Matrix Diagonal Sum with Missing Values and Constraints",
    difficulty: "medium",
    descriptionMarkdown: "You are given a matrix of integers and a set of constraints. Each constraint is a pair of integers representing a range of values. Your task is to find the sum of the diagonal elements that satisfy all the constraints and do not contain any missing values.",
    inputDescription: "Input format: Matrix of integers and constraints, separated by spaces",
    outputDescription: "Output format: Sum of diagonal elements",
    constraints: "1 <= matrix size <= 10^5, 1 <= constraint length <= 10^5",
    tags: ["matrix","diagonal sum","constraints"],
    testCases: [

      tc("1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10", "55"),
      tc("-1 1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10", "45"),
      tc("1 1 1 1 1 1 1 1 1 1\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10", "10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "interval-scheduling-with-constraints",
    title: "Interval Scheduling with Constraints",
    difficulty: "medium",
    descriptionMarkdown: "You are given a list of intervals and a set of constraints. Each interval is represented as a tuple of two integers, start and end. The constraints are represented as a list of pairs, where each pair contains a start time and an end time. Your task is to find the maximum number of non-overlapping intervals that satisfy all the constraints.",
    inputDescription: "Input is a list of intervals and a list of constraints, where each interval is a space-separated pair of integers and each constraint is a space-separated pair of integers.",
    outputDescription: "Output is an integer representing the maximum number of non-overlapping intervals.",
    constraints: "1 <= N <= 10^5, 1 <= M <= 10^5",
    tags: ["greedy","interval scheduling"],
    testCases: [

      tc("1 3\n2 4\n1 2 3\n3 4 5", "2"),
      tc("1 2\n3 4\n1 2 3 4\n5 6 7 8", "1"),
      tc("1 3\n2 4\n1 2 3 4 5 6\n7 8 9 10 11 12", "2", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "gas-station-with-multiple-pumps",
    title: "Gas Station with Multiple Pumps",
    difficulty: "medium",
    descriptionMarkdown: "You are given a list of gas stations and their corresponding gas capacities. Each gas station is represented as a tuple of two integers, start and end. Your task is to find the minimum number of gas pumps required to serve all the gas stations.",
    inputDescription: "Input is a list of gas stations, where each gas station is a space-separated pair of integers.",
    outputDescription: "Output is an integer representing the minimum number of gas pumps required.",
    constraints: "1 <= N <= 10^5",
    tags: ["greedy","gas station"],
    testCases: [

      tc("1 3\n2 4\n5 7", "2"),
      tc("1 2\n3 4\n5 6", "1"),
      tc("1 3\n2 4\n5 7 9 11", "3", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "min-operations-to-make-arrays-equal",
    title: "Min Operations to Make Arrays Equal",
    difficulty: "medium",
    descriptionMarkdown: "You are given two arrays of integers. Your task is to find the minimum number of operations required to make the two arrays equal.",
    inputDescription: "Input is two space-separated arrays of integers.",
    outputDescription: "Output is an integer representing the minimum number of operations required.",
    constraints: "1 <= N, M <= 10^5",
    tags: ["greedy","array manipulation"],
    testCases: [

      tc("1 2 3\n4 5 6", "3"),
      tc("1 1 1\n2 2 2", "0"),
      tc("1 2 3 4\n5 6 7 8", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "min-operations-to-make-arrays-equal-with-multiples",
    title: "Min Operations to Make Arrays Equal with Multiples",
    difficulty: "medium",
    descriptionMarkdown: "You are given two arrays of integers and a set of multiples. Your task is to find the minimum number of operations required to make the two arrays equal, considering the multiples.",
    inputDescription: "Input is two space-separated arrays of integers and a list of multiples, where each multiple is a space-separated pair of integers.",
    outputDescription: "Output is an integer representing the minimum number of operations required.",
    constraints: "1 <= N, M <= 10^5",
    tags: ["greedy","array manipulation"],
    testCases: [

      tc("1 2 3\n4 5 6\n2 3", "3"),
      tc("1 1 1\n2 2 2\n2 3", "0"),
      tc("1 2 3 4\n5 6 7 8\n2 3 4", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "balanced-parentheses-in-expression",
    title: "Balanced Parentheses in Expression",
    difficulty: "medium",
    descriptionMarkdown: "Given a string representing an expression, determine if the parentheses are balanced. An expression is balanced if every open parenthesis can be matched with a corresponding close parenthesis.",
    inputDescription: "A string representing an expression",
    outputDescription: "A boolean indicating whether the parentheses are balanced",
    constraints: "1 <= expression.length <= 10^5",
    tags: ["stack","parentheses"],
    testCases: [

      tc("((()))", "true"),
      tc("(()", "false"),
      tc("((())()", "true", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "postfix-evaluation-with-decimal-numbers",
    title: "Postfix Evaluation with Decimal Numbers",
    difficulty: "medium",
    descriptionMarkdown: "Given a postfix expression containing decimal numbers, evaluate the expression and return the result.",
    inputDescription: "A string representing a postfix expression",
    outputDescription: "The result of the expression as a decimal number",
    constraints: "1 <= expression.length <= 10^5",
    tags: ["postfix","evaluation"],
    testCases: [

      tc("2.5 3.7 +", "6.2"),
      tc("10.2 5.6 -", "4.6"),
      tc("2.5 3.7 4.9 + +", "10.9", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "valid-expression-with-decimal-numbers",
    title: "Valid Expression with Decimal Numbers",
    difficulty: "medium",
    descriptionMarkdown: "Given a string representing an expression, determine if the expression is valid. An expression is valid if it contains only decimal numbers, '+' and '-' operators, and parentheses.",
    inputDescription: "A string representing an expression",
    outputDescription: "A boolean indicating whether the expression is valid",
    constraints: "1 <= expression.length <= 10^5",
    tags: ["expression","validation"],
    testCases: [

      tc("2.5 + 3.7", "true"),
      tc("10.2 - 5.6", "true"),
      tc("2.5 3.7 +", "false", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "most-frequent-substring",
    title: "Most Frequent Substring",
    difficulty: "medium",
    descriptionMarkdown: "Given a string of length N, find the most frequent substring of length M. If there are multiple substrings with the same maximum frequency, return any one of them.",
    inputDescription: "Input is a string of length N and an integer M.",
    outputDescription: "Output is the most frequent substring of length M.",
    constraints: "1 <= N <= 10^5, 1 <= M <= 10^5",
    tags: ["hash tables","frequency maps"],
    testCases: [

      tc("abcabcabc\n3", "abc"),
      tc("abcdefg\n2", "ab"),
      tc("aaaabbbbcccc\n3", "aaa", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "target-difference",
    title: "Target Difference",
    difficulty: "medium",
    descriptionMarkdown: "Given an array of integers and a target difference, find the number of pairs of integers in the array that have a difference equal to the target difference.",
    inputDescription: "Input is an array of integers and an integer target difference.",
    outputDescription: "Output is the number of pairs of integers with the target difference.",
    constraints: "1 <= N <= 10^5, -10^5 <= A[i] <= 10^5, 1 <= target difference <= 10^5",
    tags: ["hash tables","frequency maps"],
    testCases: [

      tc("[1, 2, 3, 4, 5]\n1", "4"),
      tc("[10, 20, 30, 40, 50]\n10", "0"),
      tc("[1, 2, 3, 4, 5]\n5", "0", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "most-frequent-substring-with-consecutive-duplicates",
    title: "Most Frequent Substring with Consecutive Duplicates",
    difficulty: "hard",
    descriptionMarkdown: "Given a string `s` and an integer `k`, find the most frequent substring of length `k` that contains consecutive duplicates. A substring is considered to have consecutive duplicates if it contains at least two identical characters that are adjacent to each other.",
    inputDescription: "Input is a string `s` and an integer `k` separated by a space.",
    outputDescription: "Output is the most frequent substring of length `k` that contains consecutive duplicates.",
    constraints: "1 <= k <= 10^5, 1 <= |s| <= 10^5",
    tags: ["hash tables","frequency maps"],
    testCases: [

      tc("abcabcabc 3", "abc"),
      tc("abababab 4", "abab"),
      tc("abcde 5", "abcde", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "target-difference-with-constraints",
    title: "Target Difference with Constraints",
    difficulty: "hard",
    descriptionMarkdown: "Given an array of integers `nums` and a target integer `target`, find the maximum difference between any two elements in `nums` that satisfy the constraint `nums[i] <= target - nums[i]`. If no such pair exists, return 0.",
    inputDescription: "Input is an array of integers `nums` and a target integer `target` separated by a space.",
    outputDescription: "Output is the maximum difference between any two elements in `nums` that satisfy the constraint `nums[i] <= target - nums[i]`.",
    constraints: "1 <= nums.length <= 10^5, 1 <= nums[i] <= 10^5, 1 <= target <= 10^5",
    tags: ["hash tables","frequency maps"],
    testCases: [

      tc("1 2 3 4 5 10", "4"),
      tc("5 5 5 5 5 10", "0"),
      tc("1 2 3 4 5 100", "99", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "duplicate-substring-with-consecutive-duplicates",
    title: "Duplicate Substring with Consecutive Duplicates",
    difficulty: "hard",
    descriptionMarkdown: "Given a string `s` and an integer `k`, find the duplicate substring of length `k` that contains consecutive duplicates. A substring is considered to have consecutive duplicates if it contains at least two identical characters that are adjacent to each other.",
    inputDescription: "Input is a string `s` and an integer `k` separated by a space.",
    outputDescription: "Output is the duplicate substring of length `k` that contains consecutive duplicates.",
    constraints: "1 <= k <= 10^5, 1 <= |s| <= 10^5",
    tags: ["hash tables","frequency maps"],
    testCases: [

      tc("abcabcabc 3", "abc"),
      tc("abababab 4", "abab"),
      tc("abcde 5", "abcde", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "most-frequent-substring-with-consecutive-duplicates-and-constraints",
    title: "Most Frequent Substring with Consecutive Duplicates and Constraints",
    difficulty: "hard",
    descriptionMarkdown: "Given a string `s` and an integer `k`, find the most frequent substring of length `k` that contains consecutive duplicates and satisfies the constraint `s[i] <= s[i + 1]`. A substring is considered to have consecutive duplicates if it contains at least two identical characters that are adjacent to each other.",
    inputDescription: "Input is a string `s` and an integer `k` separated by a space.",
    outputDescription: "Output is the most frequent substring of length `k` that contains consecutive duplicates and satisfies the constraint `s[i] <= s[i + 1]`.",
    constraints: "1 <= k <= 10^5, 1 <= |s| <= 10^5",
    tags: ["hash tables","frequency maps"],
    testCases: [

      tc("abcabcabc 3", "abc"),
      tc("abababab 4", "abab"),
      tc("abcde 5", "abcde", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "target-difference-with-consecutive-duplicates",
    title: "Target Difference with Consecutive Duplicates",
    difficulty: "hard",
    descriptionMarkdown: "Given an array of integers `nums` and a target integer `target`, find the maximum difference between any two elements in `nums` that satisfy the constraint `nums[i] <= target - nums[i]` and have consecutive duplicates. If no such pair exists, return 0.",
    inputDescription: "Input is an array of integers `nums` and a target integer `target` separated by a space.",
    outputDescription: "Output is the maximum difference between any two elements in `nums` that satisfy the constraint `nums[i] <= target - nums[i]` and have consecutive duplicates.",
    constraints: "1 <= nums.length <= 10^5, 1 <= nums[i] <= 10^5, 1 <= target <= 10^5",
    tags: ["hash tables","frequency maps"],
    testCases: [

      tc("1 2 3 4 5 10", "4"),
      tc("5 5 5 5 5 10", "0"),
      tc("1 2 3 4 5 100", "99", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "gas-station-with-constraints",
    title: "Gas Station with Constraints",
    difficulty: "hard",
    descriptionMarkdown: "You are given a list of gas stations with their fuel capacities and distances to the next station. However, some stations have constraints that prevent you from refueling at those stations. Find the minimum number of refueling stops required to reach the destination.",
    inputDescription: "Input is a string of space-separated integers, where the first integer is the number of gas stations, followed by the fuel capacities and distances to the next station, and finally the constraints.",
    outputDescription: "Output is a single integer representing the minimum number of refueling stops required.",
    constraints: "1 <= N <= 10^5, 0 <= fuel_capacity <= 10^6, 1 <= distance <= 10^6",
    tags: ["greedy","gas station"],
    testCases: [

      tc("5 10 20 30 40 50 60 70 80 90\n1 2 3 4 5 6 7 8 9 10\n1 2 3 4 5 6 7 8 9 10", "3"),
      tc("10 100 200 300 400 500 600 700 800 900 1000\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11", "5"),
      tc("15 1500 2500 3500 4500 5500 6500 7500 8500 9500 10500 11500 12500 13500 14500\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", "8", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "interval-scheduling-with-constraints-and-penalty",
    title: "Interval Scheduling with Constraints and Penalty",
    difficulty: "hard",
    descriptionMarkdown: "You are given a list of intervals with start and end times, and a list of constraints that specify which intervals cannot be scheduled together. Additionally, there is a penalty for scheduling an interval that conflicts with a constraint. Find the maximum number of non-conflicting intervals that can be scheduled.",
    inputDescription: "Input is a string of space-separated integers, where the first integer is the number of intervals, followed by the start and end times of each interval, and finally the constraints.",
    outputDescription: "Output is a single integer representing the maximum number of non-conflicting intervals that can be scheduled.",
    constraints: "1 <= N <= 10^5, 0 <= start_time <= end_time <= 10^6, 1 <= constraint <= 10^5",
    tags: ["greedy","interval scheduling"],
    testCases: [

      tc("5 10 20 30 40 50\n1 2 3 4 5 6\n1 2 3 4 5 6\n1 2 3 4 5 6", "4"),
      tc("10 100 200 300 400 500 600 700 800 900 1000\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11\n1 2 3 4 5 6 7 8 9 10 11", "6"),
      tc("15 1500 2500 3500 4500 5500 6500 7500 8500 9500 10500 11500 12500 13500 14500\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15", "9", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "substring-replace-all-substrings",
    title: "Substring Replace All Substrings",
    difficulty: "hard",
    descriptionMarkdown: "Given a string `s` and a pattern `p`, replace all occurrences of `p` in `s` with a new string `t`. The pattern `p` can contain special characters like `*` which matches any sequence of characters. The replacement string `t` can also contain special characters like `*` which matches any sequence of characters.",
    inputDescription: "Input is a string `s` and a pattern `p` and a replacement string `t`.",
    outputDescription: "Output is the modified string after replacing all occurrences of `p` with `t`.",
    constraints: "1 <= len(s) <= 10^5, 1 <= len(p) <= 10^5, 1 <= len(t) <= 10^5",
    tags: ["string","pattern","replacement"],
    testCases: [

      tc("Hello, world! Hello, world!\nHello, world!\nHello, world!", "Hello, world! Hello, world!\nHello, world!\nHello, world!"),
      tc("Hello, world! Hello, world!\nHello, world!\nHello, world!", "Hello, world! Hello, world!\nHello, world!\nHello, world!"),
      tc("Hello, world! Hello, world!\nHello, world!\nHello, world!", "Hello, world! Hello, world!\nHello, world!\nHello, world!", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "gas-station-with-constraints-and-penalty",
    title: "Gas Station with Constraints and Penalty",
    difficulty: "hard",
    descriptionMarkdown: "You are given a list of gas stations with their fuel capacities and distances between them. You also have a list of constraints, each representing a range of valid fuel capacities. Your goal is to find the minimum number of gas stations to visit to cover all the distances between the stations, while ensuring that the fuel capacity of each station is within the valid range. If a station's fuel capacity is not within the valid range, a penalty is incurred.",
    inputDescription: "Input format: gas_stations (list of integers), distances (list of integers), constraints (list of lists of integers)",
    outputDescription: "Output format: minimum number of gas stations to visit",
    constraints: "1 <= N <= 10^5, 1 <= M <= 10^5, 1 <= K <= 10^5",
    tags: ["greedy algorithms","interval scheduling"],
    testCases: [

      tc("gas_stations = [10, 20, 30, 40, 50], distances = [5, 10, 15, 20, 25], constraints = [[10, 20], [30, 40]]", "3"),
      tc("gas_stations = [5, 15, 25, 35, 45], distances = [10, 20, 30, 40, 50], constraints = [[10, 20], [30, 40]]", "4"),
      tc("gas_stations = [10, 20, 30, 40, 50], distances = [5, 10, 15, 20, 25], constraints = [[5, 10], [20, 30]]", "5", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-segment-merging-with-sorted-subarrays-and-gaps",
    title: "Merging Sorted Array Segments with Gaps",
    difficulty: "hard",
    descriptionMarkdown: "Given an array of integers, merge all adjacent sorted subarrays into a single sorted array, but with gaps of size 3 between each element.",
    inputDescription: "Input is a space-separated list of integers.",
    outputDescription: "Output is a space-separated list of integers.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","sorting"],
    testCases: [

      tc("1 2 3 4 5 6 7 8 9 10\n3 4 5 6 7 8 9 10 11 12", "1 2 3 4 5 6 7 8 9 10 13 14 15 16 17 18 19 20 21 22"),
      tc("10 9 8 7 6 5 4 3 2 1", "1 2 3 4 5 6 7 8 9 10"),
      tc("1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20", "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-partitioning-by-parity-and-constraints",
    title: "Partitioning Array by Parity with Constraints",
    difficulty: "hard",
    descriptionMarkdown: "Given an array of integers, partition the array into two subarrays such that all elements in the first subarray have even parity and all elements in the second subarray have odd parity. The constraint is that the sum of all elements in the first subarray must be greater than or equal to the sum of all elements in the second subarray.",
    inputDescription: "Input is a space-separated list of integers.",
    outputDescription: "Output is a space-separated list of integers.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","partitioning"],
    testCases: [

      tc("2 4 6 8 10 12 14 16 18 20\n1 3 5 7 9 11 13 15 17 19", "2 4 6 8 10 12 14 16 18 20"),
      tc("1 3 5 7 9 11 13 15 17 19", "1 3 5 7 9 11 13 15 17 19"),
      tc("2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40", "2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-run-length-encoding-with-gaps-and-constraints",
    title: "Run-Length Encoding with Gaps and Constraints",
    difficulty: "hard",
    descriptionMarkdown: "Given an array of integers, apply run-length encoding to the array, but with gaps of size 2 between each element. The constraint is that the encoded array must have a maximum length of 10^5.",
    inputDescription: "Input is a space-separated list of integers.",
    outputDescription: "Output is a space-separated list of integers.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","encoding"],
    testCases: [

      tc("1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1"),
      tc("2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2", "2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2"),
      tc("1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20", "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-segment-merging-with-sorted-subarrays-and-constraints",
    title: "Merging Sorted Array Segments with Constraints",
    difficulty: "hard",
    descriptionMarkdown: "Given an array of integers, merge all adjacent sorted subarrays into a single sorted array, but with the constraint that the sum of all elements in the first subarray must be greater than or equal to the sum of all elements in the second subarray.",
    inputDescription: "Input is a space-separated list of integers.",
    outputDescription: "Output is a space-separated list of integers.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","sorting"],
    testCases: [

      tc("1 2 3 4 5 6 7 8 9 10\n3 4 5 6 7 8 9 10 11 12", "1 2 3 4 5 6 7 8 9 10 13 14 15 16 17 18 19 20 21 22"),
      tc("10 9 8 7 6 5 4 3 2 1", "1 2 3 4 5 6 7 8 9 10"),
      tc("1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20", "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "array-pair-padding-with-zeros-and-constraints",
    title: "Pair Padding with Zeros and Constraints",
    difficulty: "hard",
    descriptionMarkdown: "Given an array of integers, pair each element with its adjacent element, but with the constraint that the sum of all elements in the first pair must be greater than or equal to the sum of all elements in the second pair. Pad the array with zeros if necessary.",
    inputDescription: "Input is a space-separated list of integers.",
    outputDescription: "Output is a space-separated list of integers.",
    constraints: "1 <= N <= 10^5",
    tags: ["array","pairing"],
    testCases: [

      tc("1 2 3 4 5 6 7 8 9 10\n3 4 5 6 7 8 9 10 11 12", "1 2 3 4 5 6 7 8 9 10 13 14 15 16 17 18 19 20 21 22")
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "two-pointer-maximum-sum-subarray-with-consecutive-numbers-and-negative-numbers",
    title: "Maximum Sum Subarray with Consecutive Numbers and Negative Numbers",
    difficulty: "hard",
    descriptionMarkdown: "Given an array of integers, find the maximum sum of a subarray with consecutive numbers and negative numbers. The subarray can contain zeros.",
    inputDescription: "Input is an array of integers separated by spaces.",
    outputDescription: "Output is the maximum sum of a subarray with consecutive numbers and negative numbers.",
    constraints: "1 <= N <= 10^5",
    tags: ["two pointers","array"],
    testCases: [

      tc("1 2 -3 4 5 -6 7 8 -9 10", "1 2 -3 4 5 -6 7 8 -9 10"),
      tc("-1 -2 -3 -4 -5", "-1"),
      tc("1 2 3 4 5 6 7 8 9 10", "1 2 3 4 5 6 7 8 9 10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "two-pointer-maximum-sum-subarray-with-constraints-and-consecutive-numbers-and-negative-numbers",
    title: "Maximum Sum Subarray with Constraints, Consecutive Numbers, and Negative Numbers",
    difficulty: "hard",
    descriptionMarkdown: "Given an array of integers and a constraint, find the maximum sum of a subarray with consecutive numbers and negative numbers. The subarray can contain zeros, but the sum of the subarray must be greater than or equal to the constraint.",
    inputDescription: "Input is an array of integers separated by spaces and a constraint.",
    outputDescription: "Output is the maximum sum of a subarray with consecutive numbers and negative numbers.",
    constraints: "1 <= N <= 10^5",
    tags: ["two pointers","array"],
    testCases: [

      tc("1 2 -3 4 5 -6 7 8 -9 10 100", "1 2 -3 4 5 -6 7 8 -9 10"),
      tc("-1 -2 -3 -4 -5 100", "-1"),
      tc("1 2 3 4 5 6 7 8 9 10 100", "1 2 3 4 5 6 7 8 9 10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  \n  // TODO: Solve the problem using 'arr'\n  console.log(0);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    \n    # TODO: Solve the problem using 'arr'\n    print(0)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            \n            // TODO: Solve the problem using 'arr'\n            System.out.println(0);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        \n        // TODO: Solve the problem using 'arr'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // TODO: Solve the problem using 'arr'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "two-pointer-pair-with-given-sum-and-constraints-and-consecutive-numbers",
    title: "Pair with Given Sum, Constraints, and Consecutive Numbers",
    difficulty: "hard",
    descriptionMarkdown: "Given an array of integers and a target sum, find a pair of numbers in the array that add up to the target sum. The pair can contain zeros, but the sum of the pair must be greater than or equal to the target sum and the numbers in the pair must be consecutive.",
    inputDescription: "Input is an array of integers separated by spaces and a target sum.",
    outputDescription: "Output is a pair of numbers that add up to the target sum.",
    constraints: "1 <= N <= 10^5",
    tags: ["two pointers","array"],
    testCases: [

      tc("1 2 3 4 5 6 7 8 9 10 20", "10 10"),
      tc("-1 -2 -3 -4 -5 20", "-1 -19"),
      tc("1 2 3 4 5 6 7 8 9 10 20", "10 10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst tokens = input.split(/\\s+/);\nif (tokens.length > 0 && tokens[0] !== \"\") {\n  const n = Number(tokens[0]);\n  const arr = tokens.slice(1, 1 + n).map(Number);\n  const target = Number(tokens[1 + n] ?? 0);\n  \n  // TODO: Solve the problem using 'arr' and 'target'\n  console.log(false);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    arr = [int(x) for x in input_data[1:1+n]]\n    target = int(input_data[1+n])\n    \n    # TODO: Solve the problem using 'arr' and 'target'\n    print(False)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n            int target = sc.hasNextInt() ? sc.nextInt() : 0;\n            \n            // TODO: Solve the problem using 'arr' and 'target'\n            System.out.println(false);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        int *arr = (int *)malloc(n * sizeof(int));\n        for (int i = 0; i < n; i++) {\n            if (scanf(\"%d\", &arr[i]) != 1) arr[i] = 0;\n        }\n        int target = 0;\n        if (scanf(\"%d\", &target) != 1) target = 0;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        printf(\"0\\n\");\n        free(arr);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    if (cin >> n) {\n        vector<int> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        int target;\n        cin >> target;\n        \n        // TODO: Solve the problem using 'arr' and 'target'\n        cout << 0 << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "prime-factorization-of-large-number",
    title: "Prime Factorization of Large Number",
    difficulty: "hard",
    descriptionMarkdown: "Given a large number N, find its prime factorization. The number will be represented as a string.",
    inputDescription: "Input is a string representing a large number.",
    outputDescription: "Output is a string representing the prime factorization of the input number.",
    constraints: "1 <= N <= 10^18",
    tags: ["math","prime factorization"],
    testCases: [

      tc("1000000007", "7^9"),
      tc("12345678901234567890", "2^2 * 3 * 5^2 * 7 * 11 * 13 * 17 * 19 * 23 * 29 * 31"),
      tc("123456789012345678901234567890", "2^3 * 3^2 * 5 * 7^2 * 11 * 13 * 17 * 19 * 23 * 29 * 31 * 37", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "digit-sum-until-reach-single-digit",
    title: "Digit Sum Until Reach Single Digit",
    difficulty: "hard",
    descriptionMarkdown: "Given a positive integer N, find the smallest number of operations to reach a single digit. In each operation, replace the number with the sum of its digits.",
    inputDescription: "Input is a positive integer.",
    outputDescription: "Output is the smallest number of operations to reach a single digit.",
    constraints: "1 <= N <= 10^6",
    tags: ["math","digit sum"],
    testCases: [

      tc("38", "2"),
      tc("999", "4"),
      tc("123456", "7", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "base-conversion-of-large-number",
    title: "Base Conversion of Large Number",
    difficulty: "hard",
    descriptionMarkdown: "Given a large number N and a base B, find the representation of N in base B.",
    inputDescription: "Input is a large number N and a base B.",
    outputDescription: "Output is the representation of N in base B.",
    constraints: "1 <= N <= 10^18, 2 <= B <= 36",
    tags: ["math","base conversion"],
    testCases: [

      tc("12345678901234567890 10", "12345678901234567890"),
      tc("12345678901234567890 16", "1a2b3c4d5e6f7g8h9i0j"),
      tc("12345678901234567890 32", "1a2b3c4d5e6f7g8h9i0jklmno", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "gcd-of-three-numbers",
    title: "GCD of Three Numbers",
    difficulty: "hard",
    descriptionMarkdown: "Given three integers A, B, and C, find their greatest common divisor.",
    inputDescription: "Input is three integers A, B, and C.",
    outputDescription: "Output is the greatest common divisor of A, B, and C.",
    constraints: "1 <= A, B, C <= 10^9",
    tags: ["math","gcd"],
    testCases: [

      tc("12 18 24", "6"),
      tc("15 20 25", "5"),
      tc("30 45 60", "15", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst nums = input.split(/\\s+/).map(Number);\nif (nums.length > 0 && !isNaN(nums[0])) {\n  // TODO: Solve the problem using 'nums' array\n  console.log(nums[0]);\n}",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    nums = [int(x) for x in input_data]\n    \n    # TODO: Solve the problem using 'nums'\n    print(nums[0])\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Long> nums = new ArrayList<>();\n        while (sc.hasNextLong()) {\n            nums.add(sc.nextLong());\n        }\n        \n        // TODO: Solve the problem using 'nums' list\n        if (!nums.isEmpty()) {\n            System.out.println(nums.get(0));\n        }\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long a = 0, b = 0, c = 0;\n    int count = scanf(\"%lld %lld %lld\", &a, &b, &c);\n    // TODO: Solve the problem using the inputs read\n    if (count >= 1) {\n        printf(\"%lld\\n\", a);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    vector<long long> nums;\n    long long val;\n    while (cin >> val) {\n        nums.push_back(val);\n    }\n    \n    // TODO: Solve the problem using 'nums'\n    if (!nums.empty()) {\n        cout << nums[0] << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "prime-number-check-with-multiple-tests",
    title: "Prime Number Check with Multiple Tests",
    difficulty: "hard",
    descriptionMarkdown: "Given a positive integer N, check if it is prime. However, the input will be a string of multiple numbers separated by spaces, and you need to check each number individually.",
    inputDescription: "Input is a string of multiple positive integers separated by spaces.",
    outputDescription: "Output is a string of boolean values (true or false) separated by spaces, indicating whether each number is prime.",
    constraints: "1 <= N <= 10^6",
    tags: ["math","prime number"],
    testCases: [

      tc("2 3 4 5 6 7 8 9 10", "true true false false false true false false false"),
      tc("11 12 13 14 15 16 17 18 19", "true false true false false false false false true"),
      tc("20 21 22 23 24 25 26 27 28", "false true false false false false false false false", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "hard",
    descriptionMarkdown: "Given an array of integers, find the length of the longest strictly increasing subsequence.",
    inputDescription: "Line 1: N. Line 2: N space-separated integers.",
    outputDescription: "Length of the longest increasing subsequence.",
    constraints: "1 <= N <= 2500, -10^4 <= a[i] <= 10^4",
    tags: ["dp","arrays"],
    testCases: [

      tc("8\n10 9 2 5 3 7 101 18", "4"),
      tc("4\n0 1 0 3", "3"),
      tc("6\n3 10 2 1 20 50", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "minimum-edit-distance",
    title: "Minimum Edit Distance",
    difficulty: "hard",
    descriptionMarkdown: "Given two strings, find the minimum number of single-character operations (insert, delete, replace) to convert the first string into the second.",
    inputDescription: "Line 1: string A. Line 2: string B.",
    outputDescription: "Minimum edit distance (integer).",
    constraints: "1 <= |A|,|B| <= 500",
    tags: ["dp","strings"],
    testCases: [

      tc("horse\nros", "3"),
      tc("intention\nexecution", "5"),
      tc("kitten\nsitting", "3", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "0-1-knapsack",
    title: "0/1 Knapsack Problem",
    difficulty: "hard",
    descriptionMarkdown: "Given N items each with a weight and value, and a knapsack of capacity W, find the maximum total value you can carry without exceeding weight W. Each item can only be used once.",
    inputDescription: "Line 1: N W. Line 2: N weights. Line 3: N values.",
    outputDescription: "Maximum value achievable.",
    constraints: "1 <= N <= 100, 1 <= W <= 1000",
    tags: ["dp","greedy"],
    testCases: [

      tc("4 8\n2 3 4 5\n3 4 5 6", "10"),
      tc("3 5\n2 3 4\n3 4 5", "7"),
      tc("5 10\n1 2 3 5 4\n1 6 10 16 8", "22", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "matrix-chain-multiplication",
    title: "Matrix Chain Multiplication",
    difficulty: "hard",
    descriptionMarkdown: "Given a sequence of N matrices with dimensions, find the minimum number of scalar multiplications needed to multiply them all. Matrix i has dimensions p[i-1] x p[i].",
    inputDescription: "Line 1: N (number of matrices). Line 2: N+1 space-separated dimension values p[0]..p[N].",
    outputDescription: "Minimum number of scalar multiplications.",
    constraints: "2 <= N <= 20, 1 <= p[i] <= 100",
    tags: ["dp"],
    testCases: [

      tc("3\n10 30 5 60", "4500"),
      tc("4\n40 20 30 10 30", "26000"),
      tc("2\n5 10 20", "1000", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "longest-common-substring",
    title: "Longest Common Substring",
    difficulty: "hard",
    descriptionMarkdown: "Given two strings, find the length of their longest common substring (contiguous characters).",
    inputDescription: "Line 1: string A. Line 2: string B.",
    outputDescription: "Length of longest common substring.",
    constraints: "1 <= |A|,|B| <= 1000",
    tags: ["dp","strings"],
    testCases: [

      tc("abcde\nabcfgh", "3"),
      tc("xyzabc\nabc", "3"),
      tc("aaaaa\naaaa", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "coin-change-minimum-coins",
    title: "Coin Change: Minimum Coins",
    difficulty: "hard",
    descriptionMarkdown: "Given coin denominations and a target amount, find the minimum number of coins needed to make the amount. Return -1 if it's impossible.",
    inputDescription: "Line 1: N (number of coins). Line 2: N coin values. Line 3: target amount.",
    outputDescription: "Minimum number of coins, or -1 if impossible.",
    constraints: "1 <= N <= 12, 1 <= coins[i] <= 2*10^4, 0 <= amount <= 10^4",
    tags: ["dp","greedy"],
    testCases: [

      tc("3\n1 5 6\n11", "2"),
      tc("2\n2 5\n3", "-1"),
      tc("4\n1 2 5 10\n27", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "word-break-check",
    title: "Word Break Check",
    difficulty: "hard",
    descriptionMarkdown: "Given a string s and a dictionary of words, determine if s can be segmented into space-separated dictionary words. Print Yes or No.",
    inputDescription: "Line 1: target string s. Line 2: number of dictionary words N. Lines 3..N+2: one dictionary word per line.",
    outputDescription: "Yes if s can be segmented, No otherwise.",
    constraints: "1 <= |s| <= 300, 1 <= N <= 100",
    tags: ["dp","strings"],
    testCases: [

      tc("leetcode\n2\nleet\ncode", "Yes"),
      tc("applepenapple\n2\napple\npen", "Yes"),
      tc("catsandog\n5\ncats\ndog\nsand\ncat\nan", "No", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "dijkstra-shortest-path",
    title: "Dijkstra Shortest Path",
    difficulty: "hard",
    descriptionMarkdown: "Given a weighted undirected graph with V vertices and E edges, find the shortest path distance from vertex 1 to vertex V. Print -1 if unreachable.",
    inputDescription: "Line 1: V E. Lines 2..E+1: u v w (edge from u to v with weight w). Vertices are 1-indexed.",
    outputDescription: "Shortest distance from vertex 1 to vertex V.",
    constraints: "2 <= V <= 100, 1 <= E <= 500, 1 <= w <= 10^4",
    tags: ["graph","greedy"],
    testCases: [

      tc("5 6\n1 2 2\n1 3 4\n2 3 1\n2 4 7\n3 5 3\n4 5 1", "6"),
      tc("4 4\n1 2 1\n2 3 2\n3 4 5\n1 4 10", "8"),
      tc("3 2\n1 2 5\n2 3 3", "8", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "topological-sort-dag",
    title: "Topological Sort",
    difficulty: "hard",
    descriptionMarkdown: "Given a Directed Acyclic Graph with V vertices and E directed edges, print a valid topological ordering. Vertices are 0-indexed.",
    inputDescription: "Line 1: V E. Lines 2..E+1: u v (directed edge from u to v).",
    outputDescription: "Space-separated topological order. (Any valid order is accepted — print lexicographically smallest.)",
    constraints: "2 <= V <= 20, 0 <= E <= V*(V-1)",
    tags: ["graph","sorting"],
    testCases: [

      tc("6 6\n5 2\n5 0\n4 0\n4 1\n2 3\n3 1", "4 5 0 2 3 1"),
      tc("4 4\n0 1\n0 2\n1 3\n2 3", "0 1 2 3"),
      tc("3 2\n0 1\n0 2", "0 1 2", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "detect-cycle-directed-graph",
    title: "Detect Cycle in Directed Graph",
    difficulty: "hard",
    descriptionMarkdown: "Given a directed graph with V vertices and E edges (0-indexed), detect if it contains a cycle. Print Yes or No.",
    inputDescription: "Line 1: V E. Lines 2..E+1: u v (directed edge from u to v).",
    outputDescription: "Yes if cycle exists, No otherwise.",
    constraints: "2 <= V <= 50, 0 <= E <= V*(V-1)",
    tags: ["graph","dfs"],
    testCases: [

      tc("4 4\n0 1\n1 2\n2 3\n3 1", "Yes"),
      tc("4 3\n0 1\n1 2\n2 3", "No"),
      tc("3 3\n0 1\n1 2\n2 0", "Yes", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "n-queens-count",
    title: "N-Queens Count",
    difficulty: "hard",
    descriptionMarkdown: "Count the number of ways to place N queens on an NxN chessboard so that no two queens attack each other.",
    inputDescription: "One integer N.",
    outputDescription: "Number of valid arrangements.",
    constraints: "1 <= N <= 12",
    tags: ["backtracking","recursion"],
    testCases: [

      tc("4", "2"),
      tc("8", "92"),
      tc("6", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "sudoku-validator",
    title: "Sudoku Validator",
    difficulty: "hard",
    descriptionMarkdown: "Given a filled 9x9 Sudoku grid, check if it is valid (each row, column, and 3x3 box contains 1-9 exactly once). Print Valid or Invalid.",
    inputDescription: "9 lines, each with 9 space-separated integers (1-9).",
    outputDescription: "Valid or Invalid.",
    constraints: "All cells contain integers 1-9.",
    tags: ["arrays","math"],
    testCases: [

      tc("5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9", "Valid"),
      tc("1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9", "Invalid"),
      tc("5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 1", "Invalid", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "largest-rectangle-histogram",
    title: "Largest Rectangle in Histogram",
    difficulty: "hard",
    descriptionMarkdown: "Given N non-negative integers representing bar heights in a histogram (each of width 1), find the area of the largest rectangle that can be formed.",
    inputDescription: "Line 1: N. Line 2: N space-separated heights.",
    outputDescription: "Area of the largest rectangle.",
    constraints: "1 <= N <= 10^5, 0 <= height[i] <= 10^4",
    tags: ["stack","arrays"],
    testCases: [

      tc("6\n2 1 5 6 2 3", "10"),
      tc("4\n4 4 4 4", "16"),
      tc("7\n6 2 5 4 5 1 6", "12", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    descriptionMarkdown: "Given two sorted arrays A and B, find the median of the combined sorted array. If the total length is even, print the average (as a decimal with 1 decimal place); if odd, print the middle element.",
    inputDescription: "Line 1: n m. Line 2: n sorted integers (A). Line 3: m sorted integers (B).",
    outputDescription: "Median value (integer if odd total, X.5 if even total).",
    constraints: "1 <= n,m <= 1000",
    tags: ["binary-search","arrays"],
    testCases: [

      tc("2 2\n1 3\n2 4", "2.5"),
      tc("2 1\n1 2\n3", "2"),
      tc("3 4\n1 3 8\n2 4 5 6", "4", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "minimum-spanning-tree-kruskal",
    title: "Minimum Spanning Tree (Kruskal)",
    difficulty: "hard",
    descriptionMarkdown: "Given a connected undirected weighted graph with V vertices and E edges, find the total weight of the Minimum Spanning Tree using Kruskal's algorithm.",
    inputDescription: "Line 1: V E. Lines 2..E+1: u v w (edge with weight w, 1-indexed vertices).",
    outputDescription: "Total weight of the MST.",
    constraints: "2 <= V <= 100, V-1 <= E <= 500, 1 <= w <= 10^4",
    tags: ["graph","greedy"],
    testCases: [

      tc("4 5\n1 2 10\n1 3 6\n1 4 5\n2 4 15\n3 4 4", "19"),
      tc("3 3\n1 2 1\n2 3 2\n1 3 5", "3"),
      tc("5 7\n1 2 2\n1 3 3\n2 3 1\n2 4 4\n3 5 5\n4 5 6\n3 4 2", "10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: "hard",
    descriptionMarkdown: "Given an N x M grid of 0s and 1s, count the number of islands. An island is a group of 1s connected horizontally or vertically.",
    inputDescription: "Line 1: N M. Lines 2..N+1: M space-separated values (0 or 1).",
    outputDescription: "Number of islands.",
    constraints: "1 <= N,M <= 50",
    tags: ["graph","dfs","arrays"],
    testCases: [

      tc("4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", "3"),
      tc("3 3\n1 0 0\n0 1 0\n0 0 1", "3"),
      tc("2 4\n1 1 0 1\n1 0 0 1", "2", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "longest-palindromic-subsequence",
    title: "Longest Palindromic Subsequence",
    difficulty: "hard",
    descriptionMarkdown: "Given a string, find the length of its longest palindromic subsequence.",
    inputDescription: "One string.",
    outputDescription: "Length of the longest palindromic subsequence.",
    constraints: "1 <= |s| <= 1000",
    tags: ["dp","strings"],
    testCases: [

      tc("bbbab", "4"),
      tc("cbbd", "2"),
      tc("agbdba", "5", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "count-inversions-in-array",
    title: "Count Inversions in Array",
    difficulty: "hard",
    descriptionMarkdown: "Given an array, count the number of inversions — pairs (i, j) where i < j but arr[i] > arr[j]. Use merge-sort for O(n log n).",
    inputDescription: "Line 1: N. Line 2: N space-separated integers.",
    outputDescription: "Number of inversions.",
    constraints: "1 <= N <= 10^5, 0 <= a[i] <= 10^5",
    tags: ["sorting","divide-and-conquer"],
    testCases: [

      tc("6\n2 4 1 3 5 0", "8"),
      tc("4\n1 2 3 4", "0"),
      tc("5\n5 4 3 2 1", "10", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "regular-expression-match",
    title: "Regular Expression Matching",
    difficulty: "hard",
    descriptionMarkdown: "Implement wildcard pattern matching where '?' matches any single character and '*' matches any sequence (including empty). Print Yes if the pattern matches the full string, No otherwise.",
    inputDescription: "Line 1: the input string. Line 2: the pattern.",
    outputDescription: "Yes or No.",
    constraints: "1 <= |s|,|p| <= 200",
    tags: ["dp","strings"],
    testCases: [

      tc("aa\na*", "Yes"),
      tc("cb\n?a", "No"),
      tc("adceb\na*b", "Yes", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\n// TODO: Solve the problem using 'input'\nconsole.log(input);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n        \n    # TODO: Solve the problem using 'input_data'\n    print(input_data)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.useDelimiter(\"\\\\A\").next().trim();\n            \n            // TODO: Solve the problem using 's'\n            System.out.println(s);\n        }\n    }\n}",
  "c": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[10005];\n    if (scanf(\"%10000s\", s) == 1) {\n        // TODO: Solve the problem using 's'\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    string s;\n    if (cin >> s) {\n        // TODO: Solve the problem using 's'\n        cout << s << \"\\n\";\n    }\n    return 0;\n}"
}
  }),
  problem({
    slug: "count-ways-to-reach-nth-stair",
    title: "Count Ways to Reach Nth Stair",
    difficulty: "hard",
    descriptionMarkdown: "You can climb 1, 2, or 3 stairs at a time. Count the number of distinct ways to reach the Nth stair from the ground (stair 0). Answer modulo 10^9+7.",
    inputDescription: "One integer N.",
    outputDescription: "Number of distinct ways modulo 10^9+7.",
    constraints: "1 <= N <= 10^6",
    tags: ["dp","math"],
    testCases: [

      tc("4", "7"),
      tc("5", "13"),
      tc("10", "274", true)
    ],
    starterCode: {
  "javascript": "const input = (() => {\n  const b = new Uint8Array(65536);\n  const n = Deno.stdin.readSync(b);\n  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : \"\";\n})().trim();\n\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: Solve the problem using 'n'\nconsole.log(n);",
  "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    n = int(input_data[0]) if input_data else 0\n    \n    # TODO: Solve the problem using 'n'\n    print(n)\n\nif __name__ == '__main__':\n    main()",
  "java": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.hasNextLong() ? sc.nextLong() : 0;\n        \n        // TODO: Solve the problem using 'n'\n        System.out.println(n);\n    }\n}",
  "c": "#include <stdio.h>\n\nint main() {\n    long long n = 0;\n    if (scanf(\"%lld\", &n) == 1) {\n        // TODO: Solve the problem using 'n'\n        printf(\"%lld\\n\", n);\n    }\n    return 0;\n}",
  "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    long long n = 0;\n    if (cin >> n) {\n        // TODO: Solve the problem using 'n'\n        cout << n << \"\\n\";\n    }\n    return 0;\n}"
}
  })
];

module.exports = { PRACTICE_BANK };
