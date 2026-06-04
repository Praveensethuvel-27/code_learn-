/** Default sum problem test cases — do not reuse for other problems. */
const SUM_TWO_NUMBERS_TESTS = [
  { input: "1 2\n", expectedOutput: "3\n", isHidden: false },
  { input: "10 20\n", expectedOutput: "30\n", isHidden: true },
];

function isSumTwoNumbersTemplate(testCases) {
  if (!Array.isArray(testCases) || testCases.length !== 2) return false;
  const norm = (s) => String(s ?? "").replace(/\r\n/g, "\n").trim();
  return (
    norm(testCases[0]?.input) === "1 2" &&
    norm(testCases[0]?.expectedOutput) === "3" &&
    norm(testCases[1]?.input) === "10 20" &&
    norm(testCases[1]?.expectedOutput) === "30"
  );
}

const DENO_READ = `const input = (() => {
  const b = new Uint8Array(65536);
  const n = Deno.stdin.readSync(b);
  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : "";
})().trim()`;

function starterTemplates() {
  return {
    javascript: `${DENO_READ};\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: solve the problem\nconsole.log(n);\n`,
    typescript: `${DENO_READ};\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n\n// TODO: solve the problem\nconsole.log(n);\n`,
    python:
      "import sys\nn = int(sys.stdin.read().strip().split()[0] or 0)\n\n# TODO: solve the problem\nprint(n)\n",
    java:
      "import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    long n = sc.hasNextLong() ? sc.nextLong() : 0;\n    // TODO\n    System.out.println(n);\n  }\n}\n",
    c:
      '#include <stdio.h>\nint main() {\n  long n = 0;\n  scanf("%ld", &n);\n  /* TODO */\n  printf("%ld\\n", n);\n  return 0;\n}\n',
    cpp:
      '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n  long long n = 0;\n  cin >> n;\n  // TODO\n  cout << n << "\\n";\n}\n',
    csharp:
      'using System;\nclass Program {\n  static void Main() {\n    long n = long.Parse(Console.ReadLine()?.Trim().Split()[0] ?? "0");\n    // TODO\n    Console.WriteLine(n);\n  }\n}\n',
    fsharp:
      'open System\n[<EntryPoint>]\nlet main _ =\n    let n = int64 (System.Console.ReadLine().Trim().Split([|\' \'|]).[0])\n    printfn "%d" n\n    0\n',
    go:
      'package main\nimport ("bufio"; "fmt"; "os"; "strconv")\nfunc main() {\n  sc := bufio.NewScanner(os.Stdin)\n  sc.Scan()\n  n, _ := strconv.ParseInt(sc.Text(), 10, 64)\n  fmt.Println(n)\n}\n',
    rust:
      'use std::io::{self, Read};\nfn main() {\n  let mut s = String::new();\n  io::stdin().read_to_string(&mut s).unwrap();\n  let n: i64 = s.trim().split_whitespace().next().unwrap_or("0").parse().unwrap_or(0);\n  println!("{}", n);\n}\n',
    php:
      '<?php\n$n = (int)trim(explode(" ", trim(fgets(STDIN)))[0] ?? 0);\necho $n, "\\n";\n',
    ruby:
      'n = gets.to_s.strip.split.first.to_i\nputs n\n',
    haskell:
      'main = do\n  line <- getLine\n  let n = read (head (words line) :: String) :: Integer\n  print n\n  putStrLn ""\n',
  };
}

const PROBLEM_FIXES = {
  "factorial-of-a-number": {
    inputDescription: "A single integer `n` (0 ≤ n ≤ 12).",
    outputDescription: "Print factorial of n.",
    testCases: [
      { input: "0\n", expectedOutput: "1\n", isHidden: false },
      { input: "5\n", expectedOutput: "120\n", isHidden: false },
      { input: "10\n", expectedOutput: "3628800\n", isHidden: true },
      { input: "1\n", expectedOutput: "1\n", isHidden: true },
    ],
    starterCode: {
      javascript: `${DENO_READ};\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\nlet f = 1n;\nfor (let i = 2n; i <= BigInt(n); i++) f *= i;\nconsole.log(f.toString());\n`,
    },
  },
};

module.exports = {
  SUM_TWO_NUMBERS_TESTS,
  isSumTwoNumbersTemplate,
  starterTemplates,
  PROBLEM_FIXES,
};
