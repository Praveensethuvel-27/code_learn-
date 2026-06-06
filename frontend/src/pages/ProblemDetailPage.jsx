import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { LANGS } from "../config/languages";
import { getProblemStarter } from "../config/defaultCode";
import { LanguageSidebar } from "../components/LanguageSidebar";
import { LanguageIcon } from "../components/LanguageIcon";
import { XpCelebrationOverlay } from "../components/XpCelebrationOverlay";
import { xpForDifficulty } from "../config/gamification";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert, Box, Button, CircularProgress, Drawer, Fab, IconButton, Stack, Typography, TextField, Tooltip,
} from "@mui/material";
import Editor from "@monaco-editor/react";
import CheckCircleIcon    from "@mui/icons-material/CheckCircle";
import ArrowBackIcon      from "@mui/icons-material/ArrowBack";
import PlayArrowIcon      from "@mui/icons-material/PlayArrow";
import SendIcon           from "@mui/icons-material/Send";
import CloseIcon          from "@mui/icons-material/Close";
import SmartToyIcon       from "@mui/icons-material/SmartToy";
import CloudUploadIcon    from "@mui/icons-material/CloudUpload";
import ContentCopyIcon    from "@mui/icons-material/ContentCopy";
import AutoFixHighIcon    from "@mui/icons-material/AutoFixHigh";
import { api } from "../lib/apiClient";

// ─── Constants ────────────────────────────────────────────────────────────────

const DIFF = {
  easy:   { label: "Easy",   color: "#16a34a", bg: "#dcfce7", dot: "#22c55e" },
  medium: { label: "Medium", color: "#d97706", bg: "#fef3c7", dot: "#f59e0b" },
  hard:   { label: "Hard",   color: "#dc2626", bg: "#fee2e2", dot: "#ef4444" },
};

const AI_MODELS = [
  { key: "llama-3.3-70b-versatile",                   label: "Llama 3.3 · 70B",  icon: "🦙", sub: "Best quality · 280 t/s",   badge: "default"  },
  { key: "openai/gpt-oss-120b",                        label: "GPT OSS · 120B",   icon: "🤖", sub: "Flagship · 500 t/s",        badge: "powerful" },
  { key: "openai/gpt-oss-20b",                         label: "GPT OSS · 20B",    icon: "⚡", sub: "Ultra fast · 1000 t/s",     badge: "fastest"  },
  { key: "llama-3.1-8b-instant",                       label: "Llama 3.1 · 8B",   icon: "💨", sub: "Lightweight · 560 t/s",     badge: "light"    },
  { key: "qwen/qwen3-32b",                             label: "Qwen3 · 32B",      icon: "🧪", sub: "Preview · 400 t/s",         badge: "preview"  },
  { key: "meta-llama/llama-4-scout-17b-16e-instruct",  label: "Llama 4 Scout",    icon: "🔭", sub: "Preview · 750 t/s",         badge: "preview"  },
];

const AI_BTNS = [
  { key: "hint",        icon: "💡", label: "AI Hint",          sub: "Get guided hints",            color: "#d97706", bg: "#fef3c7", border: "#fcd34d" },
  { key: "explain",     icon: "📖", label: "Explain Code",     sub: "Line-by-line explanation",    color: "#4f46e5", bg: "#e0e7ff", border: "#a5b4fc" },
  { key: "review",      icon: "📝", label: "Code Review",      sub: "Best practices & quality",    color: "#0891b2", bg: "#ecfeff", border: "#67e8f9" },
  { key: "testcases",   icon: "🧪", label: "Test Cases",       sub: "Generate test inputs",        color: "#7c3aed", bg: "#f5f3ff", border: "#c4b5fd" },
  { key: "alternative", icon: "🔄", label: "Alternative Sol.", sub: "Different approach",          color: "#065f46", bg: "#ecfdf5", border: "#6ee7b7" },
  { key: "translate",   icon: "🌍", label: "Translate Code",   sub: "Convert to another language", color: "#9f1239", bg: "#fff1f2", border: "#fda4af" },
  { key: "chat",        icon: "💬", label: "AI Chat",          sub: "Ask anything",                color: "#1d4ed8", bg: "#eff6ff", border: "#93c5fd" },
];

const AI_CFG = {
  hint:        { title: "Hint Generator",       endpoint: "/ai/hint",        accent: "#d97706", light: "#fffbeb", border: "#fde68a" },
  explain:     { title: "Code Explainer",       endpoint: "/ai/explain",     accent: "#4f46e5", light: "#eef2ff", border: "#a5b4fc" },
  error:       { title: "Error Fixer",          endpoint: "/ai/fix",         accent: "#dc2626", light: "#fff1f2", border: "#fda4af" },
  review:      { title: "Code Review",          endpoint: "/ai/review",      accent: "#0891b2", light: "#ecfeff", border: "#67e8f9" },
  testcases:   { title: "Test Case Generator",  endpoint: "/ai/testcases",   accent: "#7c3aed", light: "#f5f3ff", border: "#c4b5fd" },
  alternative: { title: "Alternative Solution", endpoint: "/ai/alternative", accent: "#065f46", light: "#ecfdf5", border: "#6ee7b7" },
  translate:   { title: "Code Translator",      endpoint: "/ai/translate",   accent: "#9f1239", light: "#fff1f2", border: "#fda4af" },
};

// ─── TestCasesPanel ──────────────────────────────────────────────────────────
const CATEGORY_STYLE = {
  normal:   { label: "Normal",   color: "#16a34a", bg: "#dcfce7" },
  edge:     { label: "Edge",     color: "#d97706", bg: "#fef3c7" },
  boundary: { label: "Boundary", color: "#7c3aed", bg: "#f5f3ff" },
  stress:   { label: "Stress",   color: "#0891b2", bg: "#ecfeff"  },
  tricky:   { label: "Tricky",   color: "#dc2626", bg: "#fee2e2"  },
};

function SingleTestRunner({ tc, code, language, slug, onClose }) {
  const [status,   setStatus]   = useState("idle"); // idle|running|pass|fail|error
  const [actual,   setActual]   = useState("");
  const [stderr,   setStderr]   = useState("");
  const [timeMs,   setTimeMs]   = useState(null);

  const runTest = async () => {
    setStatus("running"); setActual(""); setStderr("");
    try {
      const res = await api.post("/submissions/run", {
        language,
        sourceCode: code,
        slug,
        stdin: tc.input,
      });
      const base = res.data?.result ?? res.data?.submission ?? res.data;
      const out  = (base?.stdout || "").trim();
      const err  = (base?.stderr || "").trim();
      const exp  = (tc.expectedOutput || "").trim();
      setActual(out);
      setStderr(err);
      setTimeMs(base?.time || null);
      if (err) { setStatus("error"); return; }
      setStatus(out === exp ? "pass" : "fail");
    } catch (e) {
      setStderr(e?.response?.data?.message || "Run failed");
      setStatus("error");
    }
  };

  const catStyle = CATEGORY_STYLE[tc.category?.toLowerCase()] || CATEGORY_STYLE.normal;
  const statusColor = { idle: "#64748b", running: "#f59e0b", pass: "#16a34a", fail: "#dc2626", error: "#dc2626" };
  const statusBg    = { idle: "#f8fafc",  running: "#fffbeb",  pass: "#f0fdf4",  fail: "#fff1f2",  error: "#fff1f2"  };
  const statusIcon  = { idle: "▷", running: "⟳", pass: "✓", fail: "✗", error: "!" };

  return (
    <Box sx={{
      borderRadius: 2, overflow: "hidden",
      border: `1.5px solid ${status === "pass" ? "#86efac" : status === "fail" || status === "error" ? "#fca5a5" : "#e2e8f0"}`,
      transition: "border-color 0.3s",
      bgcolor: statusBg[status],
    }}>
      {/* Header row */}
      <Stack direction="row" sx={{ alignItems: "center", px: 1.8, py: 1, gap: 1 }}>
        {/* Status circle */}
        <Box sx={{
          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          bgcolor: status === "running" ? "#fef3c7" : status === "pass" ? "#dcfce7" : status === "fail" || status === "error" ? "#fee2e2" : "#f1f5f9",
          border: `1.5px solid ${statusColor[status]}`,
          animation: status === "running" ? "spin 1s linear infinite" : "none",
          "@keyframes spin": { to: { transform: "rotate(360deg)" } },
        }}>
          <Typography sx={{ fontSize: 10, fontWeight: 800, color: statusColor[status], lineHeight: 1 }}>
            {statusIcon[status]}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" gap={0.8} sx={{ alignItems: "center" }}>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: "#0f172a" }}>
              Test {tc.id} — {tc.name}
            </Typography>
            <Box sx={{ px: 0.8, py: 0.15, borderRadius: 1, fontSize: 9.5, fontWeight: 700,
              color: catStyle.color, bgcolor: catStyle.bg, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {catStyle.label}
            </Box>
          </Stack>
          {tc.reason && (
            <Typography sx={{ fontSize: 10.5, color: "#9ca3af", mt: 0.2 }}>{tc.reason}</Typography>
          )}
        </Box>

        {timeMs && status !== "idle" && (
          <Typography sx={{ fontSize: 10, color: "#9ca3af", flexShrink: 0 }}>⏱ {parseFloat(timeMs).toFixed(3)}s</Typography>
        )}

        {/* Run button */}
        <Box onClick={status !== "running" ? runTest : undefined} sx={{
          px: 1.4, py: 0.5, borderRadius: 1.5, cursor: status === "running" ? "default" : "pointer",
          fontSize: 11, fontWeight: 700, flexShrink: 0,
          bgcolor: status === "pass" ? "#16a34a" : status === "fail" || status === "error" ? "#dc2626" : "#1e293b",
          color: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          transition: "all 0.15s",
          "&:hover": status !== "running" ? { opacity: 0.85, transform: "translateY(-1px)" } : {},
        }}>
          {status === "running" ? "Running…" : status === "idle" ? "▷ Run" : "↺ Rerun"}
        </Box>
      </Stack>

      {/* Details — input/expected/actual */}
      <Box sx={{ px: 1.8, pb: 1.5, display: "grid", gridTemplateColumns: status !== "idle" ? "1fr 1fr 1fr" : "1fr 1fr", gap: 1 }}>
        <Box>
          <Typography sx={{ fontSize: 9.5, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: 0.5, mb: 0.4 }}>Input</Typography>
          <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: "#f8fafc", border: "1px solid #e2e8f0",
            fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: "#1e293b", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {tc.input || "(empty)"}
          </Box>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 9.5, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: 0.5, mb: 0.4 }}>Expected</Typography>
          <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: "#f0fdf4", border: "1px solid #86efac",
            fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: "#14532d", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {tc.expectedOutput || "(empty)"}
          </Box>
        </Box>
        {status !== "idle" && (
          <Box>
            <Typography sx={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, mb: 0.4,
              color: status === "pass" ? "#16a34a" : "#dc2626" }}>
              {status === "pass" ? "Output ✓" : "Your Output"}
            </Typography>
            <Box sx={{ p: 1, borderRadius: 1.5,
              bgcolor: status === "pass" ? "#f0fdf4" : "#fff1f2",
              border: `1px solid ${status === "pass" ? "#86efac" : "#fca5a5"}`,
              fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5,
              color: status === "pass" ? "#14532d" : "#7f1d1d", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
              {stderr || actual || "(no output)"}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function TestCasesPanel({ code, language, problem, model, onClose }) {
  const [loading,   setLoading]   = useState(true);
  const [testCases, setTestCases] = useState([]);
  const [rawText,   setRawText]   = useState("");
  const [error,     setError]     = useState("");
  const [count,     setCount]     = useState(6);
  const [runningAll, setRunningAll] = useState(false);

  const generate = async (n = count) => {
    setLoading(true); setError(""); setTestCases([]); setRawText("");
    try {
      const r = await api.post("/ai/testcases", {
        code, language,
        problemTitle: problem?.title || "",
        problemDesc: [
          problem?.descriptionMarkdown ?? problem?.description ?? "",
          problem?.inputDescription  ? `
Input format: ${problem.inputDescription}`  : "",
          problem?.outputDescription ? `
Output format: ${problem.outputDescription}` : "",
        ].filter(Boolean).join("").trim(),
        count: n, model,
      });
      if (r.data.parsed && Array.isArray(r.data.testCases)) {
        setTestCases(r.data.testCases);
      } else {
        setRawText(r.data.result || "No response.");
      }
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to generate test cases.");
    } finally { setLoading(false); }
  };

  useEffect(() => { generate(count); }, []);

  const passed = testCases.filter(t => t._status === "pass").length;
  const ran    = testCases.filter(t => t._status && t._status !== "idle").length;

  return (
    <Box sx={{ borderRadius: 2, overflow: "hidden", border: "1.5px solid #c4b5fd", mt: 1 }}>
      {/* Header */}
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between",
        px: 2, py: 1.2, bgcolor: "#f5f3ff", borderBottom: "1px solid #c4b5fd" }}>
        <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
          <Typography sx={{ fontSize: 14 }}>🧪</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: "#7c3aed" }}>Test Cases</Typography>
          {loading && <CircularProgress size={11} sx={{ color: "#7c3aed" }} />}
          {!loading && testCases.length > 0 && (
            <Box sx={{ px: 1, py: 0.2, borderRadius: 10, bgcolor: "#7c3aed", fontSize: 10, fontWeight: 700, color: "#fff" }}>
              {testCases.length}
            </Box>
          )}
        </Stack>
        <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
          {/* Count selector */}
          {!loading && (
            <Stack direction="row" gap={0.5}>
              {[3, 6, 9, 12].map(n => (
                <Box key={n} onClick={() => { setCount(n); generate(n); }}
                  sx={{ px: 1, py: 0.3, borderRadius: 1, fontSize: 10.5, fontWeight: 700, cursor: "pointer",
                    bgcolor: count === n ? "#7c3aed" : "#ede9fe", color: count === n ? "#fff" : "#7c3aed",
                    "&:hover": { bgcolor: "#7c3aed", color: "#fff" } }}>
                  {n}
                </Box>
              ))}
            </Stack>
          )}
          <Box onClick={onClose} sx={{ cursor: "pointer", color: "#9ca3af", "&:hover": { color: "#374151" } }}>
            <CloseIcon sx={{ fontSize: 15 }} />
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ p: 2, bgcolor: "#fff", maxHeight: 520, overflowY: "auto" }}>
        {loading && (
          <Stack direction="row" gap={1.5} sx={{ alignItems: "center" }}>
            <DotLoader color="#7c3aed" />
            <Typography sx={{ fontSize: 12, color: "#6b7280" }}>Generating {count} test cases…</Typography>
          </Stack>
        )}
        {error && <Alert severity="error" sx={{ fontSize: 12, borderRadius: 1.5 }}>{error}</Alert>}

        {/* Raw fallback */}
        {rawText && !loading && (
          <Box>
            <Alert severity="info" sx={{ fontSize: 12, borderRadius: 1.5, mb: 1 }}>
              AI returned text format — copy inputs manually to test
            </Alert>
            <Typography sx={{ fontSize: 12.5, whiteSpace: "pre-wrap", color: "#374151", lineHeight: 1.8 }}>{rawText}</Typography>
          </Box>
        )}

        {/* Structured test cases */}
        {testCases.length > 0 && !loading && (
          <Stack gap={1.2}>
            {testCases.map(tc => (
              <SingleTestRunner
                key={tc.id}
                tc={tc}
                code={code}
                language={language}
                slug={problem?.slug}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

// ─── TestRow — individual test case (needs useState so must be a component) ────
function TestRow({ t, idx }) {
  const ok      = Boolean(t.passed) || t.status === "Accepted" || t.status === "passed";
  const [open, setOpen] = useState(!ok); // failed tests expanded by default

  return (
    <Box sx={{ borderRadius: 2, border: `1.5px solid ${ok ? "#86efac" : "#fca5a5"}`, overflow: "hidden" }}>
      {/* Header */}
      <Stack direction="row" gap={1}
        onClick={() => setOpen(p => !p)}
        sx={{ alignItems: "center", px: 1.8, py: 1, cursor: "pointer",
          bgcolor: ok ? "#f0fdf4" : "#fff1f2",
          "&:hover": { bgcolor: ok ? "#dcfce7" : "#ffe4e6" } }}>
        <Box sx={{ width: 18, height: 18, borderRadius: "50%", bgcolor: ok ? "#22c55e" : "#ef4444",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Typography sx={{ fontSize: 10, color: "#fff", fontWeight: 800 }}>{ok ? "✓" : "✗"}</Typography>
        </Box>
        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: ok ? "#15803d" : "#b91c1c", flex: 1 }}>
          Test {idx + 1}{t.name ? ` — ${t.name}` : ""}
        </Typography>
        {t.time && <Typography sx={{ fontSize: 10, color: "#9ca3af" }}>{t.time}ms</Typography>}
        <Typography sx={{ fontSize: 10, color: "#9ca3af", ml: 0.5 }}>{open ? "▲" : "▼"}</Typography>
      </Stack>

      {/* Details */}
      {open && (
        <Box sx={{ px: 1.8, pb: 1.5, pt: 0.8, bgcolor: "#fff", borderTop: `1px solid ${ok ? "#bbf7d0" : "#fecaca"}` }}>

          {/* Input / Expected side by side — only if present */}
          {(t.input !== undefined || (t.expectedOutput ?? t.expected) !== undefined) && (
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mb: 1 }}>
              {t.input !== undefined && (
                <Box>
                  <Typography sx={{ fontSize: 10, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: 0.5, mb: 0.4 }}>Input</Typography>
                  <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: "#f8fafc", border: "1px solid #e2e8f0",
                    fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: "#1e293b", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                    {String(t.input ?? "")}
                  </Box>
                </Box>
              )}
              {(t.expectedOutput ?? t.expected) !== undefined && (
                <Box>
                  <Typography sx={{ fontSize: 10, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: 0.5, mb: 0.4 }}>Expected</Typography>
                  <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: "#f0fdf4", border: "1px solid #86efac",
                    fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: "#1e293b", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                    {String(t.expectedOutput ?? t.expected ?? "")}
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {/* stdout — always show if present (program output) */}
          {(t.stdout || t.actual || t.actualOutput || t.output) ? (
            <Box sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, mb: 0.4,
                color: ok ? "#15803d" : "#dc2626" }}>
                {ok ? "Output" : "Your Output"}
              </Typography>
              <Box sx={{ p: 1.2, borderRadius: 1.5,
                bgcolor: ok ? "#f0fdf4" : "#fff1f2",
                border: `1px solid ${ok ? "#86efac" : "#fca5a5"}`,
                fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, lineHeight: 1.7,
                color: ok ? "#14532d" : "#7f1d1d",
                whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                {String(t.stdout || t.actual || t.actualOutput || t.output || "")}
              </Box>
            </Box>
          ) : null}

          {/* stderr */}
          {t.stderr ? (
            <Box sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: 10, fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: 0.5, mb: 0.4 }}>
                Runtime Error
              </Typography>
              <Box sx={{ p: 1.2, borderRadius: 1.5, bgcolor: "#fef2f2", border: "1px solid #fca5a5",
                fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, color: "#7f1d1d", whiteSpace: "pre-wrap" }}>
                {t.stderr}
              </Box>
            </Box>
          ) : null}

          {/* time + memory */}
          {(t.time || t.memory) && (
            <Stack direction="row" gap={2}>
              {t.time   && <Typography sx={{ fontSize: 10.5, color: "#9ca3af" }}>⏱ {parseFloat(t.time).toFixed(3)}s</Typography>}
              {t.memory && <Typography sx={{ fontSize: 10.5, color: "#9ca3af" }}>💾 {Math.round(Number(t.memory) / 1024)} KB</Typography>}
            </Stack>
          )}

          {t.message && (
            <Typography sx={{ fontSize: 11, color: "#6b7280", fontStyle: "italic", mt: 0.5 }}>{t.message}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function DotLoader({ color }) {
  return (
    <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
      {[0, 1, 2].map(i => (
        <Box key={i} sx={{
          width: 6, height: 6, borderRadius: "50%", bgcolor: color,
          animation: "bounce 1.2s ease-in-out infinite",
          animationDelay: `${i * 0.2}s`,
          "@keyframes bounce": {
            "0%,80%,100%": { transform: "scale(0.6)", opacity: 0.4 },
            "40%":          { transform: "scale(1)",   opacity: 1   },
          },
        }} />
      ))}
    </Box>
  );
}

function AIResponse({ text, onSendToEditor }) {
  const parts = [];
  const regex = /```(\w*)\n?([\s\S]*?)```/g;
  let lastIndex = 0, match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
    parts.push({ type: "code", lang: match[1] || "code", content: match[2].trim() });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push({ type: "text", content: text.slice(lastIndex) });

  return (
    <Box>
      {parts.map((p, i) =>
        p.type === "code" ? (
          <Box key={i} sx={{
            my: 2, borderRadius: 2.5, overflow: "hidden",
            border: "1px solid #334155",
            boxShadow: "0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.04)",
            background: "linear-gradient(180deg,#1e2d3d 0%,#0f172a 100%)",
          }}>
            {/* Code block header */}
            <Box sx={{
              px: 2, py: 1,
              background: "linear-gradient(90deg,#1e293b,#1a2744)",
              borderBottom: "1px solid #334155",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              backdropFilter: "blur(8px)",
            }}>
              {/* Lang badge */}
              <Box sx={{
                px: 1.2, py: 0.3, borderRadius: 1, fontSize: 10, fontWeight: 700,
                letterSpacing: 1, textTransform: "uppercase",
                bgcolor: "rgba(99,102,241,0.18)", color: "#a5b4fc",
                border: "1px solid rgba(99,102,241,0.3)",
              }}>{p.lang || "code"}</Box>

              {/* Action buttons */}
              <Stack direction="row" gap={1}>
                {/* Copy button */}
                <CopyCodeBtn content={p.content} />
                {/* Send to editor button */}
                {onSendToEditor && (
                  <SendToEditorBtn code={p.content} onSend={onSendToEditor} />
                )}
              </Stack>
            </Box>

            {/* Code content */}
            <Box sx={{
              p: 2, overflowX: "auto",
              fontFamily: "'IBM Plex Mono','Fira Code',monospace",
              fontSize: 13, lineHeight: 1.8, color: "#e2e8f0",
              whiteSpace: "pre",
              background: "linear-gradient(180deg,#0f172a 0%,#0a0f1e 100%)",
            }}>
              {p.content}
            </Box>
          </Box>
        ) : (
          <Typography key={i} sx={{ fontSize: 13, lineHeight: 1.85, color: "#374151", whiteSpace: "pre-wrap", mb: 0.5 }}>
            {p.content.trim().split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
              seg.startsWith("**") && seg.endsWith("**")
                ? <Box component="span" key={j} sx={{ fontWeight: 800, color: "#0f172a" }}>{seg.slice(2, -2)}</Box>
                : seg
            )}
          </Typography>
        )
      )}
    </Box>
  );
}

// ── Copy Code Button ─────────────────────────────────────────────────────────
function CopyCodeBtn({ content }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Box onClick={handleCopy} sx={{
      display: "flex", alignItems: "center", gap: 0.6,
      px: 1.4, py: 0.5, borderRadius: 1.5, cursor: "pointer",
      fontSize: 11, fontWeight: 600,
      color:   copied ? "#4ade80" : "#94a3b8",
      bgcolor: copied ? "rgba(74,222,128,0.1)" : "rgba(148,163,184,0.08)",
      border:  `1px solid ${copied ? "rgba(74,222,128,0.3)" : "rgba(148,163,184,0.15)"}`,
      transition: "all 0.2s",
      "&:hover": { color: "#e2e8f0", bgcolor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" },
    }}>
      {copied
        ? <><CheckCircleIcon sx={{ fontSize: 12 }} /> Copied!</>
        : <><ContentCopyIcon sx={{ fontSize: 12 }} /> Copy</>}
    </Box>
  );
}

// ── Send to Editor Button — premium glow animation ────────────────────────────
function SendToEditorBtn({ code, onSend }) {
  const [state, setState] = useState("idle"); // idle | sending | done

  const handleClick = async () => {
    if (state !== "idle") return;
    setState("sending");
    await new Promise(r => setTimeout(r, 650));
    onSend(code);
    setState("done");
    setTimeout(() => setState("idle"), 2500);
  };

  const styles = {
    idle: {
      color: "#c4b5fd", bgcolor: "rgba(167,139,250,0.1)",
      border: "1px solid rgba(167,139,250,0.3)",
      "&:hover": { bgcolor: "rgba(167,139,250,0.2)", border: "1px solid rgba(167,139,250,0.6)", boxShadow: "0 0 12px rgba(167,139,250,0.35)" },
    },
    sending: {
      color: "#fbbf24", bgcolor: "rgba(251,191,36,0.1)",
      border: "1px solid rgba(251,191,36,0.4)",
      boxShadow: "0 0 16px rgba(251,191,36,0.3)",
      animation: "glow 0.8s ease-in-out infinite alternate",
      "@keyframes glow": { from: { boxShadow: "0 0 8px rgba(251,191,36,0.2)" }, to: { boxShadow: "0 0 20px rgba(251,191,36,0.5)" } },
    },
    done: {
      color: "#4ade80", bgcolor: "rgba(74,222,128,0.1)",
      border: "1px solid rgba(74,222,128,0.4)",
      boxShadow: "0 0 16px rgba(74,222,128,0.3)",
    },
  };

  return (
    <Box onClick={handleClick} sx={{
      display: "flex", alignItems: "center", gap: 0.6,
      px: 1.4, py: 0.5, borderRadius: 1.5, cursor: state === "idle" ? "pointer" : "default",
      fontSize: 11, fontWeight: 700, transition: "all 0.25s",
      ...styles[state],
    }}>
      {state === "idle"    && <><AutoFixHighIcon sx={{ fontSize: 12 }} /> Send to Editor</>}
      {state === "sending" && (
        <>
          <Box sx={{
            width: 12, height: 12, borderRadius: "50%",
            border: "2px solid #fbbf24", borderTopColor: "transparent",
            animation: "spin 0.6s linear infinite",
            "@keyframes spin": { to: { transform: "rotate(360deg)" } },
          }} />
          Sending…
        </>
      )}
      {state === "done" && (
        <Box sx={{
          display: "flex", alignItems: "center", gap: 0.5,
          animation: "popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          "@keyframes popIn": { from: { transform: "scale(0.7)", opacity: 0 }, to: { transform: "scale(1)", opacity: 1 } },
        }}>
          <CheckCircleIcon sx={{ fontSize: 12 }} /> Sent ✨
        </Box>
      )}
    </Box>
  );
}

// ── AI Chat Modal (popup) ────────────────────────────────────────────────────
function ChatModal({ code, language, problem, model, onClose, onSendToEditor, initMessage }) {
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hi! 👋 I'm your AI tutor for **${problem.title}**. Ask me anything!` },
  ]);
  const bottomRef   = useRef(null);
  const didAutoSend = useRef(false);
  const loadingRef  = useRef(false);

  const problemDesc = [
    problem?.descriptionMarkdown ?? problem?.description ?? problem?.desc ?? "",
    problem?.inputDescription  ? `\nInput format: ${problem.inputDescription}`  : "",
    problem?.outputDescription ? `\nOutput format: ${problem.outputDescription}` : "",
  ].filter(Boolean).join("").trim();

  const sendMessage = async (overrideText) => {
    const trimmed = (overrideText ?? input).trim();
    if (!trimmed || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    if (!overrideText) setInput("");
    const newUserMsg = { role: "user", content: trimmed };
    setMessages(prev => {
      const updated = [...prev, newUserMsg];
      // fire API with latest messages
      const toSend = updated
        .filter((m, i) => !(i === 0 && m.role === "assistant"))
        .map(m => ({ role: m.role, content: m.content }));
      api.post("/ai/chat", { messages: toSend, language, problemTitle: problem?.title || "", problemDesc, model })
        .then(r => setMessages(p => [...p, { role: "assistant", content: r.data.result || "No response." }]))
        .catch(() => setMessages(p => [...p, { role: "assistant", content: "⚠️ Something went wrong. Try again!" }]))
        .finally(() => { loadingRef.current = false; setLoading(false); });
      return updated;
    });
  };

  const send = () => sendMessage();

  // Auto-send error context when modal opens
  useEffect(() => {
    if (initMessage && !didAutoSend.current) {
      didAutoSend.current = true;
      setTimeout(() => sendMessage(initMessage), 350);
    }
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <>
      {/* Backdrop */}
      <Box onClick={onClose} sx={{
        position: "fixed", inset: 0, bgcolor: "rgba(15,23,42,0.35)", zIndex: 40,
        animation: "fadeIn 0.18s ease",
        "@keyframes fadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
      }} />

      {/* Modal */}
      <Box sx={{
        position: "fixed", bottom: 24, left: "50%",
        transform: "translateX(-50%)",
        width: { xs: "calc(100vw - 32px)", sm: 560 },
        zIndex: 50,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 24px 64px rgba(15,23,42,0.28), 0 0 0 1.5px #93c5fd",
        animation: "slideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)",
        "@keyframes slideUp": {
          from: { opacity: 0, transform: "translateX(-50%) translateY(32px) scale(0.96)" },
          to:   { opacity: 1, transform: "translateX(-50%) translateY(0)     scale(1)"    },
        },
      }}>
        {/* Header */}
        <Stack direction="row" sx={{alignItems: "center", justifyContent: "space-between", px: 2.5, py: 1.4, bgcolor: "#1d4ed8", backgroundImage: "linear-gradient(135deg,#1d4ed8,#4f46e5)"}}>
          <Stack direction="row" gap={1.2} sx={{ alignItems: "center" }}>
            <Box sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography sx={{ fontSize: 14 }}>💬</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>AI Chat Tutor</Typography>
              <Typography sx={{ fontSize: 10, color: "#bfdbfe" }}>{AI_MODELS.find(m => m.key === model)?.label || model}</Typography>
            </Box>
          </Stack>
          <Box onClick={onClose} sx={{ cursor: "pointer", color: "rgba(255,255,255,0.6)", p: 0.5, borderRadius: 1, "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.1)" } }}>
            <CloseIcon sx={{ fontSize: 17 }} />
          </Box>
        </Stack>

        {/* Messages */}
        <Box sx={{ p: 2, bgcolor: "#fff", height: 320, overflowY: "auto", display: "flex", flexDirection: "column", gap: 1.5 }}>
          {messages.map((m, i) => (
            <Box key={i} sx={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 1 }}>
              {m.role === "assistant" && (
                <Box sx={{ width: 24, height: 24, borderRadius: "50%", bgcolor: "#eff6ff", border: "1.5px solid #93c5fd", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, mt: 0.3 }}>🤖</Box>
              )}
              <Box sx={{
                maxWidth: "82%",
                px: 1.8, py: 1.1,
                borderRadius: m.role === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                bgcolor: m.role === "user" ? "#1d4ed8" : "#f1f5f9",
                color:   m.role === "user" ? "#fff"     : "#1e293b",
                fontSize: 13, lineHeight: 1.65,
                boxShadow: m.role === "user" ? "0 2px 8px #1d4ed830" : "none",
              }}>
                {m.role === "assistant"
                  ? <AIResponse text={m.content} onSendToEditor={onSendToEditor} />
                  : m.content}
              </Box>
            </Box>
          ))}
          {loading && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Box sx={{ width: 24, height: 24, borderRadius: "50%", bgcolor: "#eff6ff", border: "1.5px solid #93c5fd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>🤖</Box>
              <Box sx={{ px: 1.8, py: 1.1, borderRadius: "14px 14px 14px 2px", bgcolor: "#f1f5f9" }}>
                <DotLoader color="#1d4ed8" />
              </Box>
            </Box>
          )}
          <div ref={bottomRef} />
        </Box>

        {/* Input */}
        <Box sx={{ px: 2, py: 1.4, borderTop: "1.5px solid #e2e8f0", bgcolor: "#f8fafc", display: "flex", gap: 1, alignItems: "flex-end" }}>
          <TextField fullWidth size="small" placeholder="Ask anything about this problem…"
            value={input} onChange={e => setInput(e.target.value)} disabled={loading} multiline maxRows={3}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5, fontSize: 13, bgcolor: "#fff" } }}
          />
          <Button variant="contained" onClick={send} disabled={!input.trim() || loading}
            sx={{ minWidth: 40, height: 38, px: 1.4, borderRadius: 2.5, bgcolor: "#1d4ed8", "&:hover": { bgcolor: "#1e40af" }, boxShadow: "0 2px 8px #1d4ed840", flexShrink: 0 }}>
            <SendIcon sx={{ fontSize: 16 }} />
          </Button>
        </Box>
      </Box>
    </>
  );
}

// ── Translate Panel ───────────────────────────────────────────────────────────
function TranslatePanel({ code, language, problem, model, onClose, onSendToEditor }) {
  const [targetLang, setTargetLang] = useState("");
  const [loading,    setLoading]    = useState(false);
  const [response,   setResponse]   = useState("");
  const [error,      setError]      = useState("");
  const otherLangs = LANGS.filter(l => l.key !== language);
  const c = AI_CFG.translate;

  const run = async () => {
    if (!targetLang || !code.trim()) { setError("Write some code first!"); return; }
    setLoading(true); setError(""); setResponse("");
    try {
      const r = await api.post("/ai/translate", { code, language, targetLanguage: targetLang, problemTitle: problem?.title || "", model });
      setResponse(r.data.result || "No response.");
    } catch { setError("AI request failed. Try again."); }
    finally  { setLoading(false); }
  };

  return (
    <Box sx={{ borderRadius: 2, overflow: "hidden", border: `1.5px solid ${c.border}`, mt: 1 }}>
      <Stack direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between", px: 2, py: 1.2, bgcolor: c.light, borderBottom: `1px solid ${c.border}` }}>
        <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
          <Typography sx={{ fontSize: 14 }}>🌍</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: c.accent }}>Code Translator</Typography>
          {loading && <CircularProgress size={11} sx={{ color: c.accent }} />}
        </Stack>
        <Box onClick={onClose} sx={{ cursor: "pointer", color: "#9ca3af", "&:hover": { color: "#374151" } }}>
          <CloseIcon sx={{ fontSize: 15 }} />
        </Box>
      </Stack>
      <Box sx={{ p: 2, bgcolor: "#fff" }}>
        {!response && !loading && (
          <>
            <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: "#374151", mb: 1 }}>From <strong>{language}</strong> → pick target:</Typography>
            <Stack direction="row" gap={0.8} mb={1.5} sx={{ flexWrap: "wrap" }}>
              {otherLangs.map(l => (
                <Box key={l.key} onClick={() => setTargetLang(l.key)}
                  sx={{ px: 1.2, py: 0.5, borderRadius: 1.5, cursor: "pointer", fontSize: 11.5, fontWeight: 600,
                    border: `2px solid ${targetLang === l.key ? l.color : "#e2e8f0"}`,
                    bgcolor: targetLang === l.key ? l.bg : "#f8fafc",
                    color:   targetLang === l.key ? l.color : "#64748b" }}>
                  {l.icon} {l.full}
                </Box>
              ))}
            </Stack>
            <Button variant="contained" disabled={!targetLang} onClick={run} size="small"
              sx={{ fontSize: 11.5, fontWeight: 700, borderRadius: 1.5, bgcolor: c.accent, "&:hover": { bgcolor: "#881337" }, textTransform: "none", boxShadow: "none" }}>
              Translate →
            </Button>
          </>
        )}
        {error   && <Alert severity="error" sx={{ fontSize: 12, borderRadius: 1.5, mt: 1 }}>{error}</Alert>}
        {loading && <Stack direction="row" gap={1.5} sx={{ alignItems: "center" }}><DotLoader color={c.accent} /><Typography sx={{ fontSize: 12, color: "#6b7280" }}>Translating…</Typography></Stack>}
        {response && (
          <>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0.8 }}>
              <Box onClick={() => { setResponse(""); setTargetLang(""); }} sx={{ fontSize: 11, color: c.accent, cursor: "pointer", fontWeight: 600 }}>← Translate again</Box>
            </Box>
            <AIResponse text={response} onSendToEditor={onSendToEditor} />
          </>
        )}
      </Box>
    </Box>
  );
}

// ── Generic AI Panel ──────────────────────────────────────────────────────────
function AIPanel({ type, code, language, problem, model, onClose, onSendToEditor, errorContext }) {
  const [loading,  setLoading]  = useState(true);
  const [response, setResponse] = useState("");
  const [error,    setError]    = useState("");
  const c = AI_CFG[type];

  // Resolve problem description — handle any field name the backend uses
  // Build full problem context including input/output format for AI accuracy
  const problemDesc = [
    problem?.descriptionMarkdown ?? problem?.description ?? problem?.desc ?? problem?.content ?? "",
    problem?.inputDescription  ? `\nInput format: ${problem.inputDescription}`  : "",
    problem?.outputDescription ? `\nOutput format: ${problem.outputDescription}` : "",
  ].filter(Boolean).join("").trim();

  useEffect(() => {
    if (!c) { setError("Unknown AI tool type."); setLoading(false); return; }
    if (!code.trim() && !["testcases", "alternative"].includes(type)) {
      setError("Write some code first!"); setLoading(false); return;
    }
    api.post(c.endpoint, {
      code:         code || "",
      language,
      problemTitle: problem?.title || "",
      problemDesc:  problemDesc,
      model,
      // Pass error details so Fix Error AI knows what went wrong
      ...(type === "error" && errorContext ? {
        errorMessage: errorContext.stderr || errorContext.stdout || "",
        errorStatus:  errorContext.status || "",
      } : {}),
    })
      .then(r => {
        const result = r?.data?.result;
        if (!result) { setError("AI returned empty response. Try again."); return; }
        setResponse(result);
      })
      .catch(e => {
        const msg = e?.response?.data?.message || e?.message || "AI request failed.";
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ borderRadius: 2, overflow: "hidden", border: `1.5px solid ${c.border}`, mt: 1 }}>
      <Stack direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between", px: 2, py: 1.2, bgcolor: c.light, borderBottom: `1px solid ${c.border}` }}>
        <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
          <Typography sx={{ fontSize: 14 }}>{AI_BTNS.find(b => b.key === type)?.icon}</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 12.5, color: c.accent }}>{c.title}</Typography>
          {loading && <CircularProgress size={11} sx={{ color: c.accent }} />}
        </Stack>
        <Box onClick={onClose} sx={{ cursor: "pointer", color: "#9ca3af", "&:hover": { color: "#374151" } }}>
          <CloseIcon sx={{ fontSize: 15 }} />
        </Box>
      </Stack>
      <Box sx={{ p: 2, bgcolor: "#fff", maxHeight: 340, overflowY: "auto" }}>
        {loading  && <Stack direction="row" gap={1.5} sx={{ alignItems: "center" }}><DotLoader color={c.accent} /><Typography sx={{ fontSize: 12, color: "#6b7280" }}>AI is thinking…</Typography></Stack>}
        {error    && <Alert severity="error" sx={{ fontSize: 12, borderRadius: 1.5 }}>{error}</Alert>}
        {response && <AIResponse text={response} onSendToEditor={onSendToEditor} />}
      </Box>
    </Box>
  );
}


// ─── Error Choice Modal ───────────────────────────────────────────────────────
function ErrorChoiceModal({ onChat, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <Box onClick={onClose} sx={{
        position: "fixed", inset: 0, bgcolor: "rgba(15,23,42,0.4)", zIndex: 40,
        animation: "fadeIn 0.15s ease",
        "@keyframes fadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
      }} />

      {/* Modal */}
      <Box sx={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 360, zIndex: 50,
        bgcolor: "#fff", borderRadius: 3,
        boxShadow: "0 24px 64px rgba(15,23,42,0.22), 0 0 0 1.5px #e2e8f0",
        overflow: "hidden",
        animation: "popIn 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        "@keyframes popIn": {
          from: { opacity: 0, transform: "translate(-50%,-50%) scale(0.88)" },
          to:   { opacity: 1, transform: "translate(-50%,-50%) scale(1)" },
        },
      }}>
        {/* Header */}
        <Box sx={{ px: 2.5, pt: 2.5, pb: 1.5, borderBottom: "1px solid #f1f5f9" }}>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
              <Typography sx={{ fontSize: 20 }}>⚠️</Typography>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 14, color: "#0f172a" }}>Code has errors</Typography>
                <Typography sx={{ fontSize: 11.5, color: "#6b7280" }}>How would you like to fix it?</Typography>
              </Box>
            </Stack>
            <Box onClick={onClose} sx={{ cursor: "pointer", color: "#9ca3af", p: 0.5, borderRadius: 1, "&:hover": { color: "#374151", bgcolor: "#f3f4f6" } }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </Box>
          </Stack>
        </Box>

        {/* Single option — AI Chat */}
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.2 }}>
          <Box onClick={onChat} sx={{
            p: 2.2, borderRadius: 2.5, cursor: "pointer",
            background: "linear-gradient(135deg,#1d4ed8,#4f46e5)",
            boxShadow: "0 8px 24px rgba(79,70,229,0.35)",
            transition: "all 0.18s",
            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 12px 32px rgba(79,70,229,0.45)" },
          }}>
            <Stack direction="row" gap={1.5} sx={{ alignItems: "center" }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2.5,
                bgcolor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Typography sx={{ fontSize: 22 }}>🤖</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 14, color: "#fff" }}>Debug with AI Chat</Typography>
                <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.7)", mt: 0.3 }}>
                  Your error is already loaded — just ask!
                </Typography>
              </Box>
              <Box sx={{
                width: 32, height: 32, borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Typography sx={{ fontSize: 16, color: "#fff" }}>→</Typography>
              </Box>
            </Stack>
          </Box>

          <Box onClick={onClose} sx={{ textAlign: "center", pt: 0.3 }}>
            <Typography sx={{ fontSize: 12, color: "#9ca3af", cursor: "pointer", "&:hover": { color: "#64748b" } }}>
              I'll fix it myself
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}


// ─── Main Page ────────────────────────────────────────────────────────────────
export function ProblemDetailPage() {
  const { slug }  = useParams();
  const navigate  = useNavigate();

  const [problem,    setProblem]    = useState(null);
  const [language,   setLanguage]   = useState("javascript");
  const [code,       setCode]       = useState("");
  const [runResult,  setRunResult]  = useState(null);   // result from Run
  const [submitResult, setSubmitResult] = useState(null); // result from Submit
  const [loadError,    setLoadError]    = useState("");
  const [actionError,  setActionError]  = useState("");
  const [submitNotice, setSubmitNotice] = useState("");
  const [runBusy,    setRunBusy]    = useState(false);
  const [submitBusy, setSubmitBusy] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [aiPanel,    setAiPanel]    = useState(null);
  const [chatOpen,     setChatOpen]     = useState(false);
  const [chatInitMsg,  setChatInitMsg]  = useState(""); // pre-load error context into chat
  const [errorPrompt,  setErrorPrompt]  = useState(false);
  const [celebration, setCelebration] = useState(null);
  const [aiModel,    setAiModel]    = useState("llama-3.3-70b-versatile");
  const [editorFlash, setEditorFlash] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const streakNavTimer = useRef(null);

  const closeCelebration = useCallback((goStreak = false) => {
    if (streakNavTimer.current) {
      clearTimeout(streakNavTimer.current);
      streakNavTimer.current = null;
    }
    setCelebration(null);
    if (goStreak) navigate("/streak");
  }, [navigate]);

  const monacoLang = useMemo(() => LANGS.find(l => l.key === language)?.key || "plaintext", [language]);

  useEffect(() => {
    api.get(`/problems/${slug}`)
      .then(r  => {
        const p = r.data.problem;
        setProblem(p);
        setCode(getProblemStarter(p, "javascript"));
      })
      .catch(e => setLoadError(e?.response?.data?.message || "Failed to load problem"));
  }, [slug]);

  // Send code from AI to editor with flash animation
  const handleSendToEditor = useCallback((newCode) => {
    setCode(newCode);
    setEditorFlash(true);
    setTimeout(() => setEditorFlash(false), 1200);
  }, []);

  if (loadError) {
    return <Alert severity="error" sx={{ m: 3, borderRadius: 2 }}>{loadError}</Alert>;
  }
  if (!problem) return null;

  const diff = DIFF[problem.difficulty] || { label: problem.difficulty, color: "#64748b", bg: "#f1f5f9", dot: "#94a3b8" };

  // ── Run (test only, no submission saved) ──
  const handleRun = async () => {
    if (runBusy || submitBusy) return;
    if (!code?.trim()) {
      setActionError("Write some code before running.");
      return;
    }
    setRunBusy(true); setActionError(""); setRunResult(null); setAiPanel(null);
    try {
      const res = await api.post(`/submissions/run/${problem.slug}`, { language, sourceCode: code });
      const raw = res.data;
      // Backend returns: { ok, result: { stdout, stderr, status: { description }, time, memory, testResults? } }
      console.log("[Run] raw response:", JSON.stringify(raw, null, 2));
      const base   = raw?.result ?? raw?.submission ?? raw;
      const statusDesc = base?.status?.description ?? base?.status ?? base?.verdict ?? "unknown";
      // Map Judge0-style status to our keys
      const STATUS_MAP = {
        "Accepted":           "accepted",
        "Wrong Answer":       "wrong_answer",
        "Runtime Error":      "runtime_error",
        "Compilation Error":  "compile_error",
        "Time Limit Exceeded":"time_limit_exceeded",
        "Memory Limit Exceeded":"memory_limit_exceeded",
        "Internal Error":     "internal_error",
      };
      const normalStatus = STATUS_MAP[statusDesc] ?? statusDesc?.toLowerCase().replace(/ /g,"_") ?? "unknown";
      const tests = base?.testResults ?? [];
      const stdout    = base?.stdout         || null;
      const stderr    = base?.stderr         || base?.compile_output || null;
      const timeMs    = base?.time           || null;
      const memKb     = base?.memory         || null;

      if (tests.length === 0) {
        setActionError("No test results from server. Check you are logged in and the problem has test cases.");
        return;
      }

      const passedCount = tests.filter((t) => t.passed || t.status === "Accepted").length;

      const normalized = {
        status:      normalStatus,
        summary:     base?.summary ?? { passed: passedCount, total: tests.length },
        testResults: tests,
        stderr,
        stdout,
        time:        timeMs,
        memory:      memKb,
      };
      setRunResult(normalized);
      if (normalized.status !== "accepted" && normalized.status !== "unknown") {
        const errMsg = normalized.stderr || normalized.stdout || "Runtime Error";
        setChatInitMsg("My code is failing. Error: " + errMsg + ". Can you help me debug it?");
        setTimeout(() => { setErrorPrompt(true); }, 500);
      }
      if (normalized.status === "accepted") {
        setTimeout(() => {
          setCelebration({
            mode: "preview",
            testsPassed: passedCount,
            testsTotal: tests.length,
            baseXp: xpForDifficulty(problem.difficulty),
          });
        }, 500);
      }
    } catch (e) {
      setActionError(e?.response?.data?.message || "Run failed");
    } finally { setRunBusy(false); }
  };

  // ── Submit (save submission) ──
  const handleSubmit = async () => {
    if (submitted) { navigate("/streak"); return; }
    if (!code?.trim()) {
      setActionError("Write some code before submitting.");
      return;
    }
    setSubmitBusy(true); setActionError(""); setSubmitNotice(""); setSubmitResult(null); setAiPanel(null);
    try {
      const res = await api.post(`/submissions/problem/${problem.slug}`, { language, sourceCode: code });
      console.log("[Submit] raw response:", JSON.stringify(res.data, null, 2));
      const streakInfo = res.data?.streak;
      const sub  = res.data?.result ?? res.data?.submission ?? res.data;
      const subStatusDesc = sub?.status?.description ?? sub?.status ?? sub?.verdict ?? "unknown";
      const STATUS_MAP2 = {
        "Accepted":            "accepted",
        "Wrong Answer":        "wrong_answer",
        "Runtime Error":       "runtime_error",
        "Compilation Error":   "compile_error",
        "Time Limit Exceeded": "time_limit_exceeded",
        "Memory Limit Exceeded":"memory_limit_exceeded",
        "Internal Error":      "internal_error",
      };
      const subStatus = STATUS_MAP2[subStatusDesc] ?? subStatusDesc?.toLowerCase().replace(/ /g,"_") ?? "unknown";
      const subTests   = sub?.testResults ?? sub?.testCases ?? sub?.results ?? [];
      const subStdout  = sub?.stdout || null;
      const subStderr  = sub?.stderr || sub?.compile_output || null;
      const subSynth   = subTests.length === 0 ? [{
        passed:  subStatus === "accepted",
        status:  sub?.status?.description ?? subStatus,
        stdout:  subStdout,
        stderr:  subStderr,
        time:    sub?.time   || null,
        memory:  sub?.memory || null,
        name:    sub?.status?.description ?? "Execution Result",
        actual:  subStdout,
      }] : subTests;
      const subPassed  = subStatus === "accepted" ? subSynth.length
        : subSynth.filter(t => t.passed || t.status === "Accepted").length;
      setSubmitResult({
        status:      subStatus,
        summary:     sub?.summary ?? { passed: subPassed, total: subSynth.length },
        testResults: subSynth,
        stderr:      subStderr,
        stdout:      subStdout,
        time:        sub?.time   || null,
        memory:      sub?.memory || null,
      });
      setSubmitted(true);
      if (subStatus !== "accepted") {
        const subErr = subStderr || subStdout || "Runtime Error";
        setChatInitMsg("My code failed. Can you help me debug it? Error: " + subErr);
        setTimeout(() => setErrorPrompt(true), 500);
      } else {
        const rewards = res.data?.rewards;
        setCelebration({
          mode: "earned",
          testsPassed: subPassed,
          testsTotal: subSynth.length,
          xpGained: rewards?.xpGained ?? 0,
          baseXp: rewards?.baseXp ?? 0,
          dailyBonusXp: rewards?.dailyBonusXp ?? 0,
          isFirstSolve: rewards?.isFirstSolve ?? false,
          totalXp: rewards?.totalXp ?? 0,
          previousXp: rewards?.previousXp ?? 0,
          level: rewards?.level ?? 1,
          dailyBonus: rewards?.dailyBonus ?? false,
          newBadgeTitles: rewards?.newBadgeTitles ?? [],
        });
        const navMs = streakInfo?.allPracticeComplete ? 5500 : 5000;
        streakNavTimer.current = setTimeout(() => closeCelebration(true), navMs);
      }
    } catch (e) {
      setActionError(e?.response?.data?.message || "Submit failed");
    } finally { setSubmitBusy(false); }
  };

  const activeResult = submitResult || runResult;

  const renderAIPanel = () => {
    if (!aiPanel) return null;
    const props = { code, language, problem, model: aiModel, onClose: () => setAiPanel(null), onSendToEditor: handleSendToEditor };
    if (aiPanel === "translate") return <TranslatePanel {...props} />;
    if (aiPanel === "testcases") return <TestCasesPanel key="testcases" code={code} language={language} problem={problem} model={aiModel} onClose={() => setAiPanel(null)} />;
    if (aiPanel === "error") return null;
    return <AIPanel key={aiPanel} type={aiPanel} {...props} />;
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f1f5f9", display: "flex", flexDirection: "column" }}>

      {/* ── Error Choice Modal ── */}
      {errorPrompt && (
        <ErrorChoiceModal
          onChat={() => { setErrorPrompt(false); setChatOpen(true); }}
          onClose={() => setErrorPrompt(false)}
        />
      )}

      {celebration && (
        <XpCelebrationOverlay
          {...celebration}
          onClose={() => closeCelebration(submitted && celebration.mode === "earned")}
          onGenerateTestCases={
            celebration.mode === "earned" || celebration.mode === "preview"
              ? () => {
                  closeCelebration(false);
                  setAiPanel("testcases");
                }
              : undefined
          }
        />
      )}

      {/* ── Chat Modal ── */}
      {chatOpen && (
        <ChatModal
          code={code} language={language} problem={problem} model={aiModel}
          onClose={() => { setChatOpen(false); setChatInitMsg(""); setErrorPrompt(false); }}
          onSendToEditor={handleSendToEditor}
          initMessage={chatInitMsg}
        />
      )}

      {/* ── Top Nav ── */}
      <Box sx={{
        bgcolor: "#fff", borderBottom: "1.5px solid #e2e8f0",
        px: { xs: 2, md: 3 }, py: 1.2,
        display: "flex", alignItems: "center", gap: 2,
        position: "sticky", top: 0, zIndex: 20,
      }}>
        <Button component={RouterLink} to="/problems" startIcon={<ArrowBackIcon sx={{ fontSize: 13 }} />}
          sx={{ color: "#64748b", fontSize: 11.5, fontWeight: 600, px: 1.4, py: 0.5, borderRadius: 1.5, border: "1.5px solid #e2e8f0", bgcolor: "#fff", "&:hover": { bgcolor: "#f8fafc" }, textTransform: "none", minWidth: 0 }}>
          Problems
        </Button>
        <Box sx={{ width: 1, height: 18, bgcolor: "#e2e8f0" }} />
        <Stack direction="row" gap={1.2} sx={{ alignItems: "center", flex: 1, minWidth: 0 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: diff.dot, flexShrink: 0 }} />
          <Typography noWrap sx={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{problem.title}</Typography>
          <Box sx={{ px: 1.1, py: 0.2, borderRadius: 20, bgcolor: diff.bg, fontSize: 10.5, fontWeight: 700, color: diff.color, flexShrink: 0 }}>{diff.label}</Box>
          {(problem.tags || []).slice(0, 2).map(t => (
            <Box key={t} sx={{ px: 1.1, py: 0.2, borderRadius: 20, bgcolor: "#f1f5f9", fontSize: 10.5, color: "#64748b", fontWeight: 600, flexShrink: 0 }}>{t}</Box>
          ))}
        </Stack>
      </Box>

      {/* ── Body ── */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: { xs: "column", lg: "row" }, minHeight: 0, height: { xs: "auto", lg: "calc(100vh - 52px)" }, overflow: { xs: "auto", lg: "hidden" } }}>

        {/* ════ LEFT — Problem + Editor + Output ════ */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowY: "auto", height: "100%", position: "relative" }}>

          {/* Problem */}
          <Box sx={{ bgcolor: "#fff", mx: 2, mt: 2, borderRadius: 2.5, border: "1.5px solid #e2e8f0", overflow: "hidden" }}>
            <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #f1f5f9", bgcolor: "#fafbfc" }}>
              <Stack direction="row" gap={1} mb={0.5} sx={{ alignItems: "center" }}>
                <Box sx={{ width: 3, height: 16, borderRadius: 2, bgcolor: diff.dot }} />
                <Typography sx={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>{problem.title}</Typography>
              </Stack>
              <Typography sx={{ fontSize: 13, color: "#6b7280" }}>Difficulty: <strong style={{ color: diff.color }}>{diff.label}</strong></Typography>
            </Box>
            <Box sx={{ px: 3, py: 2.5 }}>
              <Typography sx={{ fontSize: 13.5, lineHeight: 1.9, color: "#374151", whiteSpace: "pre-wrap" }}>{problem.descriptionMarkdown}</Typography>
            </Box>
          </Box>

          {/* Input / Output Description */}
          {(problem.inputDescription || problem.outputDescription) && (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mx: 2, mt: 1.5 }}>
              {problem.inputDescription && (
                <Box sx={{ bgcolor: "#fff", borderRadius: 2.5, border: "1.5px solid #e2e8f0", overflow: "hidden" }}>
                  <Stack direction="row" gap={1} sx={{ alignItems: "center", px: 2, py: 1.2, borderBottom: "1px solid #f1f5f9", bgcolor: "#fafbfc" }}>
                    <Box sx={{ width: 3, height: 13, borderRadius: 2, bgcolor: "#6366f1" }} />
                    <Typography sx={{ fontWeight: 700, fontSize: 11, color: "#6366f1", textTransform: "uppercase", letterSpacing: 0.7 }}>Input</Typography>
                  </Stack>
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography sx={{ fontSize: 12.5, color: "#374151", whiteSpace: "pre-wrap", fontFamily: "'IBM Plex Mono',monospace", lineHeight: 1.7 }}>{problem.inputDescription}</Typography>
                  </Box>
                </Box>
              )}
              {problem.outputDescription && (
                <Box sx={{ bgcolor: "#fff", borderRadius: 2.5, border: "1.5px solid #e2e8f0", overflow: "hidden" }}>
                  <Stack direction="row" gap={1} sx={{ alignItems: "center", px: 2, py: 1.2, borderBottom: "1px solid #f1f5f9", bgcolor: "#fafbfc" }}>
                    <Box sx={{ width: 3, height: 13, borderRadius: 2, bgcolor: "#16a34a" }} />
                    <Typography sx={{ fontWeight: 700, fontSize: 11, color: "#16a34a", textTransform: "uppercase", letterSpacing: 0.7 }}>Output</Typography>
                  </Stack>
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography sx={{ fontSize: 12.5, color: "#374151", whiteSpace: "pre-wrap", fontFamily: "'IBM Plex Mono',monospace", lineHeight: 1.7 }}>{problem.outputDescription}</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {/* ── Editor Block ── */}
          <Box sx={{
            bgcolor: "#fff", mx: 2, mt: 1.5, borderRadius: 2.5,
            border: editorFlash ? "2px solid #a78bfa" : "1.5px solid #e2e8f0",
            overflow: "hidden",
            boxShadow: editorFlash ? "0 0 0 4px #a78bfa28, 0 0 24px #a78bfa30" : "none",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}>
            {/* Editor flash overlay */}
            {editorFlash && (
              <Box sx={{
                position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5,
                borderRadius: 2.5,
                background: "linear-gradient(135deg, #a78bfa18, #818cf818, transparent)",
                animation: "editorPulse 1.2s ease-out forwards",
                "@keyframes editorPulse": {
                  "0%":   { opacity: 1 },
                  "60%":  { opacity: 0.6 },
                  "100%": { opacity: 0 },
                },
              }} />
            )}

            {/* Flash banner */}
            {editorFlash && (
              <Box sx={{
                px: 2, py: 0.7,
                bgcolor: "#a78bfa",
                backgroundImage: "linear-gradient(90deg,#8b5cf6,#6366f1)",
                display: "flex", alignItems: "center", gap: 1,
                animation: "bannerSlide 0.3s ease",
                "@keyframes bannerSlide": { from: { opacity: 0, transform: "translateY(-8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
              }}>
                <AutoFixHighIcon sx={{ fontSize: 13, color: "#fff" }} />
                <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#fff" }}>AI code sent to editor ✨</Typography>
              </Box>
            )}

            {/* Mobile: horizontal language bar */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <LanguageSidebar
                variant="bar"
                mode="compiler"
                language={language}
                onChange={(key) => {
                  setLanguage(key);
                  setCode(getProblemStarter(problem, key));
                  setAiPanel(null);
                }}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", minHeight: { xs: 320, md: 400 } }}>
            <Box sx={{ display: { xs: "none", md: "block" }, flexShrink: 0 }}>
              <LanguageSidebar
                variant="sidebar"
                mode="compiler"
                language={language}
                onChange={(key) => {
                  setLanguage(key);
                  setCode(getProblemStarter(problem, key));
                  setAiPanel(null);
                }}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            <Box sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              px: 2,
              py: 1,
              bgcolor: "#fafbfc",
              borderBottom: "1.5px solid #e2e8f0",
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0, color: "#334155" }}>
                <LanguageIcon langKey={language} size={24} showLabel />
              </Box>
              <Stack direction="row" gap={1} sx={{ flexShrink: 0, ml: { xs: 0, sm: "auto" } }}>
                {/* Run */}
                <Button
                  variant="outlined"
                  startIcon={runBusy ? null : <PlayArrowIcon sx={{ fontSize: 15 }} />}
                  disabled={runBusy || submitBusy}
                  onClick={handleRun}
                  sx={{
                    fontWeight: 700, fontSize: 12, borderRadius: 2, px: 2, py: 0.7,
                    color: "#1e293b", borderColor: "#cbd5e1",
                    bgcolor: "#fff",
                    "&:hover": { bgcolor: "#f1f5f9", borderColor: "#94a3b8" },
                    textTransform: "none", boxShadow: "none",
                  }}>
                  {runBusy ? <><CircularProgress size={11} sx={{ color: "#64748b", mr: 0.8 }} />Running…</> : "Run"}
                </Button>

                {/* Submit */}
                <Button
                  variant="contained"
                  startIcon={submitBusy ? null : submitted ? <CheckCircleIcon sx={{ fontSize: 13 }} /> : <CloudUploadIcon sx={{ fontSize: 15 }} />}
                  disabled={submitBusy || runBusy}
                  onClick={handleSubmit}
                  sx={{
                    fontWeight: 700, fontSize: 12, borderRadius: 2, px: 2, py: 0.7,
                    bgcolor: submitted ? "#16a34a" : "#1e293b",
                    "&:hover": { bgcolor: submitted ? "#15803d" : "#0f172a" },
                    textTransform: "none", boxShadow: "none",
                  }}>
                  {submitBusy
                    ? <><CircularProgress size={11} sx={{ color: "#fff", mr: 0.8 }} />Submitting…</>
                    : submitted ? "Accepted ✓" : "Submit"}
                </Button>
              </Stack>
            </Box>

            {/* readline warning banner */}
            {(language === "javascript" || language === "typescript") && code.includes("readline") && (
              <Box sx={{ px: 2, py: 1, bgcolor: "#fffbeb", borderBottom: "1.5px solid #fde68a", display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography sx={{ fontSize: 12 }}>⚠️</Typography>
                <Typography sx={{ fontSize: 11.5, color: "#92400e", flex: 1 }}>
                  <strong>readline</strong> doesn't work in Judge0. Use <code style={{background:"#fef3c7",padding:"1px 4px",borderRadius:3}}>fs.readFileSync(0,'utf8')</code> to read input.
                </Typography>
                <Button size="small" onClick={() => {
                  setCode(prev => {
                    let c = prev;
                    c = c.replace(/const\s+readline\s*=\s*require\(["']readline["']\);?\n?/g, "const fs = require('fs');\n");
                    c = c.replace(/const\s+rl\s*=\s*readline\.createInterface\([\s\S]*?\}\);?\n?/g, "");
                    c = c.replace(/rl\.question\([^,]+,\s*\((\w+)\)\s*=>\s*\{/g, "const $1 = fs.readFileSync(0, 'utf8').trim();\n{");
                    c = c.replace(/\s*rl\.close\(\);?\n?/g, "\n");
                    c = c.replace(/^\}\);?\s*$/m, "}");
                    return c;
                  });
                }}
                sx={{ fontSize: 10.5, fontWeight: 700, bgcolor: "#f59e0b", color: "#fff", borderRadius: 1.5,
                  "&:hover": { bgcolor: "#d97706" }, textTransform: "none", boxShadow: "none", px: 1.2, py: 0.4, whiteSpace: "nowrap" }}>
                  Auto Fix
                </Button>
              </Box>
            )}

            <Box sx={{ position: "relative", flex: 1 }}>
              <Editor
                height="360px"
                language={monacoLang} theme="vs-light" value={code}
                onChange={v => setCode(v ?? "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13.5, lineHeight: 22,
                  fontFamily: "'IBM Plex Mono','Fira Code',monospace",
                  padding: { top: 14, bottom: 14 },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  renderLineHighlight: "line",
                  lineNumbersMinChars: 3,
                }}
              />
            </Box>
            </Box>
            </Box>
          </Box>

          {/* ── Output Block ── */}
          <Box sx={{ bgcolor: "#fff", mx: 2, mt: 1.5, mb: 2, borderRadius: 2.5, border: "1.5px solid #e2e8f0", overflow: "hidden" }}>
            <Stack direction="row" gap={1} sx={{ alignItems: "center", px: 2.5, py: 1.2, bgcolor: "#fafbfc", borderBottom: "1px solid #f1f5f9" }}>
              <Box sx={{ width: 3, height: 14, borderRadius: 2, bgcolor: activeResult ? (activeResult.status === "accepted" ? "#22c55e" : "#f59e0b") : "#94a3b8" }} />
              <Typography sx={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.7, color: "#64748b" }}>Output</Typography>
              {activeResult && (
                <Box sx={{ ml: "auto", px: 1.2, py: 0.25, borderRadius: 20,
                  bgcolor: activeResult.status === "accepted" ? "#dcfce7" : "#fef3c7",
                  fontSize: 10.5, fontWeight: 700,
                  color:   activeResult.status === "accepted" ? "#16a34a" : "#d97706" }}>
                  {activeResult.summary?.passed ?? 0}/{activeResult.summary?.total ?? "?"} passed
                </Box>
              )}
            </Stack>
            <Box sx={{ px: 2.5, py: 2, minHeight: 80 }}>
              {!activeResult && !runBusy && !submitBusy && (
                <Box>
                  <Alert severity="info" sx={{ mb: 1.5, borderRadius: 1.5, fontSize: 12 }}>
                    <strong>How tests work:</strong> Run/Submit runs your code once per hidden test in this problem.
                    Each test feeds <em>Input</em> to your program and checks <em>Expected</em> output.
                    Use the starter code to read stdin — free Editor has no tests.
                  </Alert>
                  <Typography sx={{ fontSize: 13, color: "#94a3b8", fontStyle: "italic" }}>
                    Click Run to test · Submit to save your solution…
                  </Typography>
                </Box>
              )}
              {(runBusy || submitBusy) && (
                <Stack direction="row" gap={1.5} sx={{ alignItems: "center" }}>
                  <DotLoader color="#1e293b" />
                  <Typography sx={{ fontSize: 13, color: "#6b7280" }}>{submitBusy ? "Submitting…" : "Running…"}</Typography>
                </Stack>
              )}
              {activeResult && (() => {
                const isAccepted = activeResult.status === "accepted";
                const tests      = activeResult.testResults || [];
                const passed     = activeResult.summary?.passed ?? tests.filter(t => t.passed || t.status === "passed" || t.correct).length;
                const total      = activeResult.summary?.total  ?? (tests.length || "?");

                return (
                  <Box>
                    {/* Status header */}
                    <Box sx={{ p: 2, borderRadius: 2,
                      bgcolor: isAccepted ? "#f0fdf4" : "#fff7ed",
                      border: `1.5px solid ${isAccepted ? "#86efac" : "#fed7aa"}`,
                      mb: tests.length > 0 ? 1.5 : 0 }}>
                      <Stack direction="row" gap={1.5} sx={{ alignItems: "center" }}>
                        <Typography sx={{ fontSize: 26 }}>{isAccepted ? "🎉" : "⚠️"}</Typography>
                        <Box>
                          <Typography sx={{ fontWeight: 800, fontSize: 14, textTransform: "capitalize",
                            color: isAccepted ? "#15803d" : "#c2410c" }}>
                            {(activeResult.status ?? "unknown").replace(/_/g, " ")}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                            {passed}/{total} test cases passed
                          </Typography>
                        </Box>
                        {isAccepted && (
                          <Box sx={{ ml: "auto" }}>
                            <Typography component={RouterLink} to="/rewards" sx={{ fontSize: 12, color: "#16a34a", fontWeight: 700, textDecoration: "none" }}>
                              View XP & badges →
                            </Typography>
                          </Box>
                        )}
                        {!isAccepted && (
                          <Box sx={{ ml: "auto" }}>
                            <Button size="small" variant="contained" startIcon={<AutoFixHighIcon sx={{ fontSize: 13 }} />}
                              onClick={() => { setChatInitMsg("My code failed. Can you help me debug it?"); setErrorPrompt(true); }}
                              sx={{ fontSize: 11, fontWeight: 700, bgcolor: "#dc2626", "&:hover": { bgcolor: "#b91c1c" }, borderRadius: 2, textTransform: "none", boxShadow: "none" }}>
                              Fix with AI
                            </Button>
                          </Box>
                        )}
                      </Stack>
                    </Box>

                    {/* Test case rows */}
                    {tests.length > 0 && (
                      <Stack gap={0.8}>
                        {tests.map((t, idx) => (
                          <TestRow key={idx} t={t} idx={idx} />
                        ))}
                      </Stack>
                    )}
                  </Box>
                );
              })()}
              {submitNotice && <Alert severity="success" sx={{ mt: 1, fontSize: 12, borderRadius: 1.5 }} onClose={() => setSubmitNotice("")}>{submitNotice}</Alert>}
              {actionError && <Alert severity="error" sx={{ mt: 1, fontSize: 12, borderRadius: 1.5 }} onClose={() => setActionError("")}>{actionError}</Alert>}
            </Box>

          </Box>

          {/* ── AI Panel — desktop: below output ── */}
          {aiPanel && (
            <Box sx={{ display: { xs: "none", lg: "block" }, mx: 2, mb: 2 }}>
              {renderAIPanel()}
            </Box>
          )}

          {/* Mobile AI panel output */}
          {aiPanel && (
            <Box sx={{ display: { xs: "block", lg: "none" }, mx: 2, mb: 2 }}>
              {renderAIPanel()}
            </Box>
          )}

        </Box>

        {/* Mobile FAB — AI tools drawer */}
        <Fab
          color="primary"
          aria-label="AI tools"
          onClick={() => setAiDrawerOpen(true)}
          sx={{
            display: { xs: "flex", lg: "none" },
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 30,
            bgcolor: "#7c3aed",
            "&:hover": { bgcolor: "#6d28d9" },
          }}
        >
          <SmartToyIcon />
        </Fab>
        <Drawer
          anchor="bottom"
          open={aiDrawerOpen}
          onClose={() => setAiDrawerOpen(false)}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              maxHeight: "70vh",
              display: { lg: "none" },
            },
          }}
        >
          <Box sx={{ p: 2, pb: 3 }}>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
                <SmartToyIcon sx={{ color: "#7c3aed" }} />
                <Typography sx={{ fontWeight: 800, fontSize: 16 }}>AI Tools</Typography>
              </Stack>
              <IconButton size="small" onClick={() => setAiDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Stack gap={0.8}>
              {AI_BTNS.map((btn) => (
                <Box
                  key={btn.key}
                  onClick={() => {
                    setAiDrawerOpen(false);
                    if (btn.key === "chat") {
                      setChatOpen(true);
                      return;
                    }
                    setAiPanel(aiPanel === btn.key ? null : btn.key);
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    px: 1.5,
                    py: 1.1,
                    borderRadius: 2,
                    cursor: "pointer",
                    bgcolor: aiPanel === btn.key ? btn.bg : "#f8fafc",
                    border: `2px solid ${aiPanel === btn.key ? btn.color : "#e2e8f0"}`,
                  }}
                >
                  <Typography sx={{ fontSize: 18 }}>{btn.icon}</Typography>
                  <Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: btn.color }}>{btn.label}</Typography>
                    <Typography sx={{ fontSize: 11, color: "#94a3b8" }}>{btn.sub}</Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Drawer>
        {/* ════ end LEFT ════ */}

        {/* ════ RIGHT — AI Sidebar (desktop) ════ */}
        <Box sx={{
          width: { lg: 280, xl: 300 },
          flexShrink: 0,
          bgcolor: "#fff",
          borderLeft: { lg: "1.5px solid #e2e8f0" },
          borderTop: { xs: "1.5px solid #e2e8f0", lg: "none" },
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          height: { lg: "100%" },
          maxHeight: { lg: "100%" },
          overflowY: "auto",
        }}>
          {/* Header */}
          <Box sx={{ px: 2, pt: 2, pb: 1.5, borderBottom: "1px solid #f1f5f9" }}>
            <Stack direction="row" gap={1} mb={1.5} sx={{ alignItems: "center" }}>
              <SmartToyIcon sx={{ fontSize: 16, color: "#8b5cf6" }} />
              <Typography sx={{ fontWeight: 800, fontSize: 13, color: "#0f172a", textTransform: "uppercase", letterSpacing: 0.8 }}>AI Tools</Typography>
            </Stack>

            {/* Model Selector */}
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "#faf5ff", border: "1.5px solid #e9d5ff" }}>
              <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: "#7c3aed", mb: 1, textTransform: "uppercase", letterSpacing: 0.6 }}>🤖 AI Model</Typography>
              <Stack gap={0.6}>
                {AI_MODELS.map(m => (
                  <Box key={m.key} onClick={() => setAiModel(m.key)}
                    sx={{
                      display: "flex", alignItems: "center", gap: 1,
                      px: 1.2, py: 0.7, borderRadius: 1.5, cursor: "pointer",
                      bgcolor: aiModel === m.key ? "#7c3aed" : "#fff",
                      color:   aiModel === m.key ? "#fff"     : "#374151",
                      border:  `1.5px solid ${aiModel === m.key ? "#7c3aed" : "#e9d5ff"}`,
                      transition: "all 0.12s",
                      "&:hover": { bgcolor: aiModel === m.key ? "#6d28d9" : "#f5f3ff" },
                    }}>
                    <Typography sx={{ fontSize: 13 }}>{m.icon}</Typography>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack direction="row" gap={0.6} sx={{ alignItems: "center" }}>
                        <Typography noWrap sx={{ fontSize: 11.5, fontWeight: 700, color: "inherit" }}>{m.label}</Typography>
                        {m.badge === "preview"  && <Box sx={{ px: 0.6, py: 0.1, borderRadius: 1, bgcolor: aiModel === m.key ? "#a78bfa" : "#fef3c7", fontSize: 9, fontWeight: 700, color: aiModel === m.key ? "#fff" : "#92400e", letterSpacing: 0.4 }}>PREVIEW</Box>}
                        {m.badge === "fastest"  && <Box sx={{ px: 0.6, py: 0.1, borderRadius: 1, bgcolor: aiModel === m.key ? "#a78bfa" : "#dcfce7", fontSize: 9, fontWeight: 700, color: aiModel === m.key ? "#fff" : "#166534", letterSpacing: 0.4 }}>FASTEST</Box>}
                        {m.badge === "powerful" && <Box sx={{ px: 0.6, py: 0.1, borderRadius: 1, bgcolor: aiModel === m.key ? "#a78bfa" : "#ede9fe", fontSize: 9, fontWeight: 700, color: aiModel === m.key ? "#fff" : "#5b21b6", letterSpacing: 0.4 }}>PRO</Box>}
                      </Stack>
                      <Typography sx={{ fontSize: 10, color: aiModel === m.key ? "#ddd6fe" : "#9ca3af" }}>{m.sub}</Typography>
                    </Box>
                    {aiModel === m.key && <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#a78bfa", flexShrink: 0 }} />}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>

          {/* AI Tool Buttons */}
          <Box sx={{ px: 2, py: 1.5, flex: 1 }}>
            <Stack gap={0.7}>
              {AI_BTNS.map(btn => (
                <Box key={btn.key}
                  onClick={() => {
                    if (btn.key === "chat") { setChatOpen(true); setErrorPrompt(false); return; }
                    setAiPanel(aiPanel === btn.key ? null : btn.key);
                    setErrorPrompt(false);
                  }}
                  sx={{
                    display: "flex", alignItems: "center", gap: 1.2,
                    px: 1.5, py: 1, borderRadius: 2, cursor: "pointer",
                    bgcolor: (btn.key === "chat" ? chatOpen : aiPanel === btn.key) ? btn.bg : "#f8fafc",
                    color:   (btn.key === "chat" ? chatOpen : aiPanel === btn.key) ? btn.color : "#64748b",
                    border:  (btn.key === "chat" ? chatOpen : aiPanel === btn.key) ? `2px solid ${btn.color}` : "2px solid #e2e8f0",
                    boxShadow: (btn.key === "chat" ? chatOpen : aiPanel === btn.key) ? `0 0 0 3px ${btn.color}18` : "none",
                    transition: "all 0.13s",
                    "&:hover": { bgcolor: btn.bg, color: btn.color, border: `2px solid ${btn.color}` },
                  }}>
                  <Typography sx={{ fontSize: 15, flexShrink: 0 }}>{btn.icon}</Typography>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: "inherit", lineHeight: 1.3 }}>{btn.label}</Typography>
                    <Typography sx={{ fontSize: 10.5, color: "#9ca3af", lineHeight: 1.3 }}>{btn.sub}</Typography>
                  </Box>
                  {(btn.key === "chat" ? chatOpen : aiPanel === btn.key) && (
                    <CloseIcon sx={{ fontSize: 13, ml: "auto", flexShrink: 0, color: btn.color }} />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Tips */}
          <Box sx={{ mx: 2, mb: 2, p: 1.8, borderRadius: 2, bgcolor: "#fffbeb", border: "1.5px solid #fde68a" }}>
            <Stack direction="row" gap={0.8} sx={{ alignItems: "flex-start" }}>
              <Typography sx={{ fontSize: 14 }}>💡</Typography>
              <Box>
                <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#92400e", mb: 0.5 }}>Tips</Typography>
                {["Read carefully before coding.", "Use Run to test before Submit.", "Think about edge cases."].map((t, i) => (
                  <Typography key={i} sx={{ fontSize: 11, color: "#b45309", lineHeight: 1.7 }}>• {t}</Typography>
                ))}
              </Box>
            </Stack>
          </Box>

        </Box>
        {/* ════ end RIGHT ════ */}
      </Box>
    </Box>
  );
}