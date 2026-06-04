import { useMemo, useState } from "react";
import {
  Alert, Box, Button, Collapse, Dialog, DialogActions, DialogContent,
  DialogTitle, Snackbar, Stack, TextField, Typography,
} from "@mui/material";
import Editor from "@monaco-editor/react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SaveIcon from "@mui/icons-material/Save";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BoltIcon from "@mui/icons-material/Bolt";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "../lib/apiClient";
import { LANGS, isCompilerLanguage } from "../config/languages";
import { getPlaygroundCode } from "../config/defaultCode";
import { LanguageSidebar } from "../components/LanguageSidebar";
import { LanguageIcon } from "../components/LanguageIcon";
import { buildCssPreview, buildHtmlPreview, runSqlLocal } from "../utils/localRun";

const AI_BTNS = [
  { key: "explain", icon: <MenuBookIcon sx={{ fontSize: 18 }} />,    label: "AI Explain",   desc: "Line-by-line explanation", color: "#4f46e5", bg: "#eef2ff", border: "#a5b4fc" },
  { key: "error",   icon: <AutoFixHighIcon sx={{ fontSize: 18 }} />, label: "Fix Error",    desc: "Find & fix bugs",          color: "#dc2626", bg: "#fff1f2", border: "#fda4af" },
];

// ── AI Response Renderer ──────────────────────────────────────────────────
function AIResponse({ text }) {
  const parts = [];
  const regex = /```(\w*)\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;
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
          <Box key={i} sx={{ my: 1.5, borderRadius: 2, overflow: "hidden", border: "1.5px solid #e2e8f0" }}>
            <Box sx={{ px: 1.5, py: 0.6, bgcolor: "#1e293b", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
                {p.lang || "code"}
              </Typography>
              <Box onClick={() => navigator.clipboard?.writeText(p.content)}
                sx={{ fontSize: 10, color: "#64748b", cursor: "pointer", "&:hover": { color: "#e2e8f0" } }}>
                copy
              </Box>
            </Box>
            <Box sx={{ p: 2, bgcolor: "#0f172a", overflowX: "auto", fontFamily: "'IBM Plex Mono','Fira Code',monospace", fontSize: 12.5, lineHeight: 1.75, color: "#e2e8f0", whiteSpace: "pre" }}>
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

// ── AI Panel ─────────────────────────────────────────────────────────────
function AIPanel({ type, code, language, onClose }) {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const CFG = {
    explain: { title: "AI Code Explainer", icon: "📖", accent: "#4f46e5", light: "#eef2ff", border: "#a5b4fc" },
    error:   { title: "AI Error Fixer",    icon: "🔧", accent: "#dc2626", light: "#fff1f2", border: "#fda4af" },
  };
  const c = CFG[type];

  useMemo(() => {
    if (!code.trim()) { setError("Write some code first!"); setLoading(false); return; }
    const endpoints = { explain: "/ai/explain", error: "/ai/fix" };
    api.post(endpoints[type], {
      code, language,
      problemTitle: `${language} code`,
      problemDesc: "General code from editor",
    })
      .then(r => setResponse(r.data.result || "No response."))
      .catch(() => setError("AI request failed. Try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ mt: 1.5, borderRadius: 2.5, overflow: "hidden", border: `1.5px solid ${c.border}`, boxShadow: `0 4px 20px ${c.accent}15` }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between"
        sx={{ px: 2.5, py: 1.4, bgcolor: c.light, borderBottom: `1px solid ${c.border}` }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography fontSize={16}>{c.icon}</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 13, color: c.accent }}>{c.title}</Typography>
          {loading && (
            <Stack direction="row" gap={0.4} ml={1}>
              {[0,1,2].map(i => (
                <Box key={i} sx={{
                  width: 5, height: 5, borderRadius: "50%", bgcolor: c.accent,
                  animation: "pulse 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                  "@keyframes pulse": { "0%,80%,100%": { transform: "scale(0.5)", opacity: 0.3 }, "40%": { transform: "scale(1)", opacity: 1 } }
                }} />
              ))}
            </Stack>
          )}
        </Stack>
        <Box onClick={onClose} sx={{ cursor: "pointer", color: "#9ca3af", p: 0.3, borderRadius: 1, "&:hover": { color: "#374151", bgcolor: "#f3f4f6" } }}>
          <CloseIcon sx={{ fontSize: 16 }} />
        </Box>
      </Stack>
      <Box sx={{ p: 2.5, bgcolor: "#fff", maxHeight: 380, overflowY: "auto" }}>
        {error && <Alert severity="error" sx={{ borderRadius: 2, fontSize: 12.5 }}>{error}</Alert>}
        {response && <AIResponse text={response} />}
      </Box>
    </Box>
  );
}

// ── Main EditorPage ───────────────────────────────────────────────────────
export function EditorPage() {
  const [language,  setLanguage]  = useState("javascript");
  const [code,      setCode]      = useState(getPlaygroundCode("javascript"));
  const [stdin,     setStdin]     = useState("");
  const [output,    setOutput]    = useState("");
  const [error,     setError]     = useState("");
  const [busy,      setBusy]      = useState(false);
  const [saveOpen,  setSaveOpen]  = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [saving,    setSaving]    = useState(false);
  const [snack,     setSnack]     = useState("");
  const [aiPanel,   setAiPanel]   = useState(null);
  const [previewDoc, setPreviewDoc] = useState("");

  const lang       = LANGS.find((l) => l.key === language) || LANGS[0];
  const monacoLang = useMemo(() => {
    if (language === "cpp") return "cpp";
    if (language === "csharp") return "csharp";
    if (language === "fsharp") return "fsharp";
    if (language === "html") return "html";
    if (language === "css") return "css";
    if (language === "sql") return "sql";
    return language;
  }, [language]);
  const handleRun = async () => {
    if (!code?.trim()) {
      setError("Write some code before running.");
      return;
    }
    setError(""); setOutput(""); setPreviewDoc(""); setBusy(true);
    try {
      if (language === "html") {
        setPreviewDoc(buildHtmlPreview(code));
        setOutput("HTML preview updated → see panel on the right.");
        return;
      }
      if (language === "css") {
        setPreviewDoc(buildCssPreview(code));
        setOutput("CSS preview updated → see panel on the right.");
        return;
      }
      if (language === "sql") {
        const r = await runSqlLocal(code);
        setOutput(r.output || "(no output)");
        if (!r.ok) setError("SQL finished with errors (see output).");
        return;
      }
      if (!isCompilerLanguage(language)) {
        setError("This language cannot be run here.");
        return;
      }
      const res = await api.post("/submissions/run", { language, sourceCode: code, stdin });
      const r   = res.data.result;
      setOutput(
        [
          r.compile_output ? `[Compile]\n${r.compile_output}` : null,
          r.stderr         ? `[Stderr]\n${r.stderr}`          : null,
          r.stdout         ? r.stdout                          : null,
          r.message        ? `[Message]\n${r.message}`        : null,
        ].filter(Boolean).join("\n\n") || "(no output)",
      );
    } catch (e) {
      setError(e?.response?.data?.message || "Run failed");
    } finally { setBusy(false); }
  };

  const handleSave = async () => {
    if (!saveTitle.trim()) return;
    setSaving(true);
    try {
      await api.post("/savedcodes", { title: saveTitle.trim(), language, sourceCode: code });
      setSaveOpen(false); setSaveTitle(""); setSnack("Code saved! ✅");
    } catch (e) {
      setSnack(e?.response?.data?.message || "Save failed");
    } finally { setSaving(false); }
  };

  return (
    <Stack spacing={0}>

      {/* Hero */}
      <Box sx={{ bgcolor: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 4, mb: 3, p: { xs: 2.5, md: 3 }, position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#4f46e5,#0284c7,#38bdf8)", borderRadius: "4px 4px 0 0" }} />
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" spacing={2} mt={0.5}>
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, mb: 0.5 }}>Workspace</Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: -0.4 }}>Code Editor</Typography>
            <Typography sx={{ color: "#64748b", fontSize: 13, mt: 0.3 }}>
              Run JS, Python, Java, C/C++ and more. HTML/CSS preview + SQL in your browser.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, px: 1.4, py: 0.7, borderRadius: 2, bgcolor: "#eef2ff", border: "1px solid #c7d2fe", color: "#4f46e5", fontSize: 12, fontWeight: 700 }}>
              <AutoAwesomeIcon sx={{ fontSize: 14 }} /> Smart Workspace
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, px: 1.4, py: 0.7, borderRadius: 2, bgcolor: "#fffbeb", border: "1px solid #fde68a", color: "#b45309", fontSize: 12, fontWeight: 700 }}>
              <BoltIcon sx={{ fontSize: 14 }} /> Fast Run
            </Box>
          </Stack>
        </Stack>
      </Box>

      {error && <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>{error}</Alert>}

      {/* Main: language sidebar + editor + I/O */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 360px" }, gap: 2 }}>

        <Box sx={{ bgcolor: "#0f172a", borderRadius: 3, overflow: "hidden", border: "2px solid #1e293b", minHeight: { md: "58vh" } }}>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <LanguageSidebar
              variant="bar"
              language={language}
              onChange={(key) => { setLanguage(key); setCode(getPlaygroundCode(key)); setAiPanel(null); setPreviewDoc(""); setOutput(""); }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: { xs: "none", md: "block" }, flexShrink: 0 }}>
            <LanguageSidebar
              variant="sidebar"
              language={language}
              onChange={(key) => { setLanguage(key); setCode(getPlaygroundCode(key)); setAiPanel(null); setPreviewDoc(""); setOutput(""); }}
            />
          </Box>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, bgcolor: "#fff" }}>
          <Stack direction="row" sx={{ alignItems: "center", gap: 1.5, justifyContent: "space-between", px: 2, py: 1.2, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0", flexWrap: "wrap" }}>
            <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
            <Stack direction="row" gap={0.7}>
              {["#ef4444","#f59e0b","#22c55e"].map((c) => (
                <Box key={c} sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: c, opacity: 0.8 }} />
              ))}
            </Stack>
            <LanguageIcon langKey={language} size={22} showLabel />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small" startIcon={<SaveIcon sx={{ fontSize: 14 }} />}
                disabled={busy}
                onClick={() => { setSaveTitle(`${language} snippet`); setSaveOpen(true); }}
                sx={{ fontWeight: 700, borderColor: "#e2e8f0", color: "#374151", borderRadius: 2, textTransform: "none" }}>
                Save
              </Button>
              <Button variant="contained" size="small" startIcon={<PlayArrowIcon sx={{ fontSize: 14 }} />}
                disabled={busy} onClick={handleRun}
                sx={{ fontWeight: 700, bgcolor: "#16a34a", borderRadius: 2, textTransform: "none", "&:hover": { bgcolor: "#15803d" } }}>
                {busy ? "Running…" : "Run"}
              </Button>
            </Stack>
          </Stack>
          <Editor
            height="52vh"
            language={monacoLang}
            theme="vs-light"
            value={code}
            onChange={(v) => setCode(v ?? "")}
            options={{
              minimap: { enabled: false }, fontSize: 13.5, lineHeight: 22,
              fontFamily: "'IBM Plex Mono','Fira Code',monospace",
              padding: { top: 14, bottom: 14 },
              scrollBeyondLastLine: false, smoothScrolling: true,
            }}
          />
          {/* AI toolbar */}
          <Stack direction="row" alignItems="center" gap={1} sx={{ px: 2, py: 1.2, bgcolor: "#f8fafc", borderTop: "1.5px solid #e2e8f0", flexWrap: "wrap" }}>
            <Typography sx={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, letterSpacing: 0.5, mr: 0.5 }}>AI TOOLS</Typography>
            {AI_BTNS.map(btn => (
              <Box key={btn.key}
                onClick={() => setAiPanel(aiPanel === btn.key ? null : btn.key)}
                sx={{
                  display: "flex", alignItems: "center", gap: 0.8,
                  px: 1.8, py: 0.8, borderRadius: 2.5, cursor: "pointer",
                  bgcolor: aiPanel === btn.key ? btn.bg : "#fff",
                  color: aiPanel === btn.key ? btn.color : "#64748b",
                  border: aiPanel === btn.key ? `2px solid ${btn.color}` : "2px solid #e2e8f0",
                  boxShadow: aiPanel === btn.key ? `0 0 0 3px ${btn.color}20` : "none",
                  transform: aiPanel === btn.key ? "translateY(-1px)" : "none",
                  transition: "all 0.18s",
                  "&:hover": { bgcolor: btn.bg, color: btn.color, border: `2px solid ${btn.color}`, transform: "translateY(-1px)" },
                }}>
                {btn.icon}
                <Box>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.2 }}>{btn.label}</Typography>
                  <Typography sx={{ fontSize: 10, color: "inherit", opacity: 0.7 }}>{btn.desc}</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
          {/* AI Panel */}
          <Collapse in={!!aiPanel}>
            <Box sx={{ px: 2, pb: 2 }}>
              {aiPanel && <AIPanel key={aiPanel} type={aiPanel} code={code} language={language} onClose={() => setAiPanel(null)} />}
            </Box>
          </Collapse>
          </Box>
          </Box>
        </Box>

        {/* Right — stdin / preview + output */}
        <Stack spacing={2}>
          {(language === "html" || language === "css") && (
            <Box sx={{ bgcolor: "#fff", border: "2px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}>
              <Stack direction="row" alignItems="center" gap={1} sx={{ px: 2, py: 1.2, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <Typography fontSize={14}>👁</Typography>
                <Typography fontWeight={700} fontSize={13} color="#0f172a">Live preview</Typography>
              </Stack>
              <Box
                component="iframe"
                title="preview"
                srcDoc={previewDoc || "<p style='font-family:system-ui;padding:1rem;color:#94a3b8'>Click Run to preview</p>"}
                sx={{ width: "100%", minHeight: 220, border: "none", bgcolor: "#fff" }}
                sandbox="allow-scripts"
              />
            </Box>
          )}

          {isCompilerLanguage(language) && (
          <Box sx={{ bgcolor: "#fff", border: "2px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}>
            <Stack direction="row" alignItems="center" gap={1} sx={{ px: 2, py: 1.2, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              <Typography fontSize={14}>📥</Typography>
              <Typography fontWeight={700} fontSize={13} color="#0f172a">Input (stdin)</Typography>
              <Typography fontSize={11} color="#94a3b8" sx={{ ml: "auto" }}>optional</Typography>
            </Stack>
            <Box component="textarea"
              placeholder="Enter input here..."
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              sx={{ width: "100%", minHeight: 90, p: 2, border: "none", outline: "none", resize: "vertical", fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: "#0f172a", bgcolor: "transparent", lineHeight: 1.7, "::placeholder": { color: "#94a3b8" } }}
            />
          </Box>
          )}

          <Box sx={{ bgcolor: "#fff", border: "2px solid #e2e8f0", borderRadius: 3, overflow: "hidden", flex: 1 }}>
            <Stack direction="row" alignItems="center" gap={1} sx={{ px: 2, py: 1.2, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              <Typography fontSize={14}>📤</Typography>
              <Typography fontWeight={700} fontSize={13} color="#0f172a">Output</Typography>
              {output && (
                <Box onClick={() => setOutput("")} sx={{ ml: "auto", fontSize: 11, color: "#94a3b8", cursor: "pointer", "&:hover": { color: "#ef4444" } }}>
                  ✕ Clear
                </Box>
              )}
            </Stack>
            <Box sx={{ p: 2, minHeight: 180, fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, lineHeight: 1.8, color: output ? "#0f172a" : "#94a3b8", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {output || "▶ Free run only — no test cases here. Use Practice Paths → open a problem for auto tests."}
            </Box>
          </Box>

          <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: "#fffbeb", border: "2px solid #fde68a" }}>
            <Stack direction="row" gap={1}>
              <Typography fontSize={15}>💡</Typography>
              <Typography fontSize={12} color="#92400e" lineHeight={1.6} fontWeight={500}>
                <strong>Tip:</strong> HTML/CSS = live preview. SQL = SQLite in browser. Problems use compiler languages only.
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Save dialog */}
      <Dialog open={saveOpen} onClose={() => setSaveOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, color: "#0f172a" }}>💾 Save Code Snippet</DialogTitle>
        <DialogContent>
          <TextField autoFocus label="Snippet title" fullWidth value={saveTitle}
            onChange={(e) => setSaveTitle(e.target.value)} sx={{ mt: 1 }}
            onKeyDown={(e) => e.key === "Enter" && handleSave()} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setSaveOpen(false)} sx={{ color: "#64748b" }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving || !saveTitle.trim()}
            sx={{ fontWeight: 700, bgcolor: "#4f46e5", borderRadius: 2, "&:hover": { bgcolor: "#4338ca" } }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!snack} autoHideDuration={3000} onClose={() => setSnack("")} message={snack} />
    </Stack>
  );
}