/** Groq models available in AI chat (sync with backend) */
export const AI_MODELS = [
  { key: "llama-3.3-70b-versatile", label: "Llama 3.3 · 70B", icon: "🦙", sub: "Best quality" },
  { key: "openai/gpt-oss-120b", label: "GPT OSS · 120B", icon: "🤖", sub: "Flagship" },
  { key: "openai/gpt-oss-20b", label: "GPT OSS · 20B", icon: "⚡", sub: "Ultra fast" },
  { key: "llama-3.1-8b-instant", label: "Llama 3.1 · 8B", icon: "💨", sub: "Lightweight" },
  { key: "qwen/qwen3-32b", label: "Qwen3 · 32B", icon: "🧪", sub: "Preview" },
  { key: "meta-llama/llama-4-scout-17b-16e-instruct", label: "Llama 4 Scout", icon: "🔭", sub: "Preview" },
];

export const DEFAULT_AI_MODEL = AI_MODELS[0].key;

export function getStoredAiModel() {
  try {
    const k = localStorage.getItem("codelearn_ai_model");
    if (k && AI_MODELS.some((m) => m.key === k)) return k;
  } catch { /* ignore */ }
  return DEFAULT_AI_MODEL;
}

export function setStoredAiModel(key) {
  try {
    localStorage.setItem("codelearn_ai_model", key);
  } catch { /* ignore */ }
}
