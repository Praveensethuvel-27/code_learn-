const DENO_READ = `const input = (() => {
  const b = new Uint8Array(65536);
  const n = Deno.stdin.readSync(b);
  return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : "";
})().trim()`;

/** Playground snippets (Editor page). */
export const PLAYGROUND_CODE = {
  javascript: `// JavaScript\nconsole.log("Hello, CodeLearn! 🚀");\n`,
  typescript: `// TypeScript\nconsole.log("Hello, CodeLearn! 🚀");\n`,
  python:     `# Python\nprint("Hello, CodeLearn! 🚀")\n`,
  java:       `public class Main { public static void main(String[] a) { System.out.println("Hello, CodeLearn! 🚀"); } }\n`,
  c:          `#include <stdio.h>\nint main(){ printf("Hello, CodeLearn! 🚀\\n"); return 0; }\n`,
  cpp:        `#include <bits/stdc++.h>\nusing namespace std;\nint main(){ cout<<"Hello, CodeLearn! 🚀"<<endl; return 0;}\n`,
  csharp:     `using System;\nclass P { static void Main()=>Console.WriteLine("Hello, CodeLearn! 🚀"); }\n`,
  go:         `package main\nimport "fmt"\nfunc main(){ fmt.Println("Hello, CodeLearn! 🚀") }\n`,
  rust:       `fn main(){ println!("Hello, CodeLearn! 🚀"); }\n`,
  php:        `<?php\necho "Hello, CodeLearn! 🚀\\n";\n`,
  ruby:       `puts "Hello, CodeLearn! 🚀"\n`,
  fsharp:     `printfn "Hello, CodeLearn! 🚀"\n`,
  haskell:    `main = putStrLn "Hello, CodeLearn! 🚀"\n`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Hello</title>
  <style>
    body { font-family: system-ui; padding: 2rem; background: #f0f9ff; }
    h1 { color: #0369a1; }
  </style>
</head>
<body>
  <h1>Hello, CodeLearn! 🚀</h1>
  <p>Edit HTML and click Run to preview.</p>
</body>
</html>
`,
  css: `body {
  font-family: system-ui, sans-serif;
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #4f46e5, #0284c7);
  color: #fff;
}

.preview-box {
  background: rgba(255,255,255,0.15);
  padding: 2rem 3rem;
  border-radius: 16px;
  backdrop-filter: blur(8px);
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: #fff;
  color: #4f46e5;
  font-weight: 700;
  cursor: pointer;
}
`,
  sql: `-- SQLite (browser) — click Run
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO users (id, name) VALUES (1, 'Alex'), (2, 'Sam');

SELECT * FROM users;
`,
};

/** Problem skeleton when DB has no starter for that language. */
export const PROBLEM_STARTER = {
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
    "open System\n[<EntryPoint>]\nlet main _ =\n    let n = int64 (System.Console.ReadLine().Trim().Split([|' '|]).[0])\n    printfn \"%d\" n\n    0\n",
  go:
    'package main\nimport ("bufio"; "fmt"; "os"; "strconv")\nfunc main() {\n  sc := bufio.NewScanner(os.Stdin)\n  sc.Scan()\n  n, _ := strconv.ParseInt(sc.Text(), 10, 64)\n  fmt.Println(n)\n}\n',
  rust:
    'use std::io::{self, Read};\nfn main() {\n  let mut s = String::new();\n  io::stdin().read_to_string(&mut s).unwrap();\n  let n: i64 = s.trim().split_whitespace().next().unwrap_or("0").parse().unwrap_or(0);\n  println!("{}", n);\n}\n',
  php:
    '<?php\n$n = (int)trim(explode(" ", trim(fgets(STDIN)))[0] ?? 0);\necho $n, "\\n";\n',
  ruby:
    "n = gets.to_s.strip.split.first.to_i\nputs n\n",
  haskell:
    'main = do\n  line <- getLine\n  let n = read (head (words line) :: String) :: Integer\n  print n\n  putStrLn ""\n',
};

export function getProblemStarter(problem, lang) {
  const fromDb = problem?.starterCode?.[lang];
  if (fromDb && String(fromDb).trim()) return fromDb;
  return PROBLEM_STARTER[lang] || PROBLEM_STARTER.javascript;
}

export function getPlaygroundCode(lang) {
  return PLAYGROUND_CODE[lang] || PLAYGROUND_CODE.javascript;
}
