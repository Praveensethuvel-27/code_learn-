/** Compiler languages (OnlineCompiler.io — problems + editor). */
export const COMPILER_LANGS = [
  { key: "javascript", full: "JavaScript", abbr: "JS", icon: "⚡", color: "#b45309", bg: "#fefce8", border: "#fde047", runMode: "compiler" },
  { key: "typescript", full: "TypeScript", abbr: "TS", icon: "📘", color: "#2563eb", bg: "#eff6ff", border: "#93c5fd", runMode: "compiler" },
  { key: "python",     full: "Python",     abbr: "PY", icon: "🐍", color: "#15803d", bg: "#f0fdf4", border: "#86efac", runMode: "compiler" },
  { key: "java",       full: "Java",       abbr: "JV", icon: "☕", color: "#b91c1c", bg: "#fff1f2", border: "#fda4af", runMode: "compiler" },
  { key: "c",          full: "C",          abbr: "C",  icon: "⚙",  color: "#1d4ed8", bg: "#eff6ff", border: "#93c5fd", runMode: "compiler" },
  { key: "cpp",        full: "C++",        abbr: "C++",icon: "🚀", color: "#6d28d9", bg: "#faf5ff", border: "#c4b5fd", runMode: "compiler" },
  { key: "csharp",     full: "C#",         abbr: "C#", icon: "🟣", color: "#7c3aed", bg: "#f5f3ff", border: "#c4b5fd", runMode: "compiler" },
  { key: "go",         full: "Go",         abbr: "Go", icon: "🐹", color: "#0891b2", bg: "#ecfeff", border: "#67e8f9", runMode: "compiler" },
  { key: "rust",       full: "Rust",       abbr: "Rs", icon: "🦀", color: "#c2410c", bg: "#fff7ed", border: "#fed7aa", runMode: "compiler" },
  { key: "php",        full: "PHP",        abbr: "PHP",icon: "🐘", color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe", runMode: "compiler" },
  { key: "ruby",       full: "Ruby",       abbr: "Rb", icon: "💎", color: "#dc2626", bg: "#fef2f2", border: "#fecaca", runMode: "compiler" },
  { key: "fsharp",     full: "F#",         abbr: "F#", icon: "🔷", color: "#0369a1", bg: "#e0f2fe", border: "#7dd3fc", runMode: "compiler" },
  { key: "haskell",    full: "Haskell",    abbr: "λ",  icon: "λ",  color: "#6366f1", bg: "#eef2ff", border: "#a5b4fc", runMode: "compiler" },
];

/** Browser-only run (Editor page). */
export const BROWSER_LANGS = [
  { key: "html", full: "HTML", abbr: "HTML", icon: "🌐", color: "#ea580c", bg: "#fff7ed", border: "#fdba74", runMode: "html" },
  { key: "css",  full: "CSS",  abbr: "CSS",  icon: "🎨", color: "#2563eb", bg: "#eff6ff", border: "#93c5fd", runMode: "css" },
  { key: "sql",  full: "SQL",  abbr: "SQL",  icon: "🗄", color: "#0d9488", bg: "#f0fdfa", border: "#5eead4", runMode: "sql" },
];

export const LANGS = [...COMPILER_LANGS, ...BROWSER_LANGS];

export const COMPILER_LANGUAGE_KEYS = COMPILER_LANGS.map((l) => l.key);
export const LANGUAGE_KEYS = LANGS.map((l) => l.key);

export function isCompilerLanguage(key) {
  return COMPILER_LANGUAGE_KEYS.includes(key);
}

export function getLangMeta(key) {
  return LANGS.find((l) => l.key === key);
}

export function langStyle(key) {
  const l = getLangMeta(key);
  return l
    ? { bg: l.bg, color: l.color, border: l.border }
    : { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0" };
}
