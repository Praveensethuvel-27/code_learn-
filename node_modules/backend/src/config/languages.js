/** OnlineCompiler.io — problems + editor compile/run. */
const COMPILER_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "c",
  "cpp",
  "csharp",
  "fsharp",
  "go",
  "rust",
  "php",
  "ruby",
  "haskell",
];

/** Editor-only (browser preview / sql.js) — save snippets, not problem submit. */
const BROWSER_LANGUAGES = ["html", "css", "sql"];

const SUPPORTED_LANGUAGES = [...COMPILER_LANGUAGES, ...BROWSER_LANGUAGES];

const COMPILER_MAP = {
  javascript: "typescript-deno",
  typescript: "typescript-deno",
  python:     "python-3.14",
  java:       "openjdk-25",
  c:          "gcc-15",
  cpp:        "g++-15",
  csharp:     "dotnet-csharp-9",
  fsharp:     "dotnet-fsharp-9",
  go:         "go-1.26",
  rust:       "rust-1.93",
  php:        "php-8.5",
  ruby:       "ruby-4.0",
  haskell:    "haskell-9.12",
};

const JUDGE0_LANGUAGE_IDS = {
  javascript: 63,
  typescript: 74,
  python:     71,
  java:       62,
  c:          50,
  cpp:        54,
  csharp:     51,
  fsharp:     87,
  go:         60,
  rust:       73,
  php:        68,
  ruby:       72,
  haskell:    61,
};

module.exports = {
  COMPILER_LANGUAGES,
  BROWSER_LANGUAGES,
  SUPPORTED_LANGUAGES,
  COMPILER_MAP,
  JUDGE0_LANGUAGE_IDS,
};
