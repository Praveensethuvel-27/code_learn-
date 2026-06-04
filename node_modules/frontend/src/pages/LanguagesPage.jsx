import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Grid, Skeleton, Stack, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { api } from "../lib/apiClient";

/* ─── tokens ─── */
const LANG_META = {
  javascript: { bg: "#fef9c3", color: "#92400e", border: "#fde68a", icon: "JS",  dot: "#f59e0b", headerBg: "#fffbeb", headerBorder: "#fde68a" },
  python:     { bg: "#dcfce7", color: "#14532d", border: "#bbf7d0", icon: "PY",  dot: "#22c55e", headerBg: "#f0fdf4", headerBorder: "#bbf7d0" },
  java:       { bg: "#fee2e2", color: "#7f1d1d", border: "#fecaca", icon: "JV",  dot: "#ef4444", headerBg: "#fef2f2", headerBorder: "#fecaca" },
  c:          { bg: "#dbeafe", color: "#1e3a8a", border: "#bfdbfe", icon: "C",   dot: "#3b82f6", headerBg: "#eff6ff", headerBorder: "#bfdbfe" },
  cpp:        { bg: "#ede9fe", color: "#3b0764", border: "#ddd6fe", icon: "C++", dot: "#8b5cf6", headerBg: "#f5f3ff", headerBorder: "#ddd6fe" },
};

const TOPIC_META = {
  basics:    { icon: "📘", label: "Basics",    color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe" },
  loops:     { icon: "🔁", label: "Loops",     color: "#0284c7", bg: "#e0f2fe", border: "#bae6fd" },
  functions: { icon: "⚙️", label: "Functions", color: "#7c3aed", bg: "#ede9fe", border: "#ddd6fe" },
  oop:       { icon: "🧩", label: "OOP",       color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  arrays:    { icon: "📦", label: "Arrays",    color: "#d97706", bg: "#fef3c7", border: "#fde68a" },
  strings:   { icon: "🔤", label: "Strings",   color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  recursion: { icon: "🔄", label: "Recursion", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
};

function LangTab({ lkey, label, active, onClick, count }) {
  const lm = LANG_META[lkey] || { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0", dot: "#94a3b8", icon: "?" };
  return (
    <Box onClick={onClick} sx={{
      display: "flex", alignItems: "center", gap: 1.2,
      px: 2, py: 1.2, borderRadius: 2.5, cursor: "pointer",
      border: "2px solid",
      borderColor: active ? lm.dot : "#e2e8f0",
      bgcolor: active ? lm.bg : "#fff",
      transition: "all 0.15s",
      "&:hover": { borderColor: lm.dot, bgcolor: lm.bg },
      userSelect: "none",
      boxShadow: active ? `0 4px 14px ${lm.dot}25` : "none",
    }}>
      <Box sx={{
        width: 30, height: 30, borderRadius: 1.5,
        bgcolor: active ? "#fff" : lm.bg,
        border: `2px solid ${lm.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: lkey === "cpp" ? 8 : 11, fontWeight: 900, color: lm.color, flexShrink: 0,
      }}>
        {lm.icon}
      </Box>
      <Box>
        <Typography fontSize={13} fontWeight={active ? 800 : 600} color={active ? lm.color : "#374151"} lineHeight={1.1}>
          {label}
        </Typography>
        {count != null && (
          <Typography fontSize={10} color={active ? lm.color : "#94a3b8"} fontWeight={600} lineHeight={1} mt={0.2}>
            {count} lessons
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function TopicPill({ tkey, active, onClick }) {
  const tm = TOPIC_META[tkey] || { icon: "📄", label: tkey, color: "#64748b", bg: "#f1f5f9", border: "#e2e8f0" };
  return (
    <Box onClick={onClick} sx={{
      display: "flex", alignItems: "center", gap: 0.8,
      px: 1.6, py: 0.8, borderRadius: 99, cursor: "pointer",
      border: "2px solid",
      borderColor: active ? tm.color : "#e2e8f0",
      bgcolor: active ? tm.bg : "#fff",
      color: active ? tm.color : "#64748b",
      fontSize: 13, fontWeight: active ? 700 : 500,
      transition: "all 0.14s",
      boxShadow: active ? `0 3px 10px ${tm.color}20` : "none",
      "&:hover": { borderColor: tm.color, color: tm.color, bgcolor: tm.bg },
      userSelect: "none",
    }}>
      <span style={{ fontSize: 15 }}>{tm.icon}</span>
      {tm.label}
    </Box>
  );
}

function LessonCard({ lesson, idx, ls }) {
  const tm = TOPIC_META[lesson.topic] || { icon: "📄", label: lesson.topic, color: "#64748b", bg: "#f1f5f9", border: "#e2e8f0" };
  return (
    <Box component={RouterLink} to={`/lessons/${lesson._id}`} sx={{
      textDecoration: "none",
      display: "flex", flexDirection: "column",
      borderRadius: 3.5, overflow: "hidden",
      border: "2px solid #e2e8f0",
      borderTop: `3px solid ${ls.dot}`,
      bgcolor: "#fff", height: "100%",
      transition: "all 0.18s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: `0 12px 32px ${ls.dot}20`,
        borderColor: ls.border,
      },
    }}>
      {/* light coloured header band */}
      <Box sx={{
        height: 72, px: 2.5, pt: 2,
        bgcolor: ls.bg,
        borderBottom: `1px solid ${ls.border}`,
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <Box sx={{
          width: 38, height: 38, borderRadius: 2,
          bgcolor: "#fff", border: `2px solid ${ls.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: lesson.language === "cpp" ? 9 : 12, color: ls.color,
          boxShadow: `0 2px 8px ${ls.dot}20`,
        }}>
          {ls.icon}
        </Box>
        <Box sx={{
          px: 1, py: 0.3, borderRadius: 1,
          bgcolor: "#fff", color: ls.color,
          border: `1px solid ${ls.border}`,
          fontSize: 10, fontWeight: 800,
        }}>
          #{idx + 1}
        </Box>
      </Box>

      {/* body */}
      <Stack spacing={1.5} sx={{ p: 2.5, flex: 1 }}>
        <Typography fontSize={15} fontWeight={800} color="#0f172a" lineHeight={1.3}>
          {lesson.title}
        </Typography>

        {/* topic badge */}
        <Box sx={{
          display: "inline-flex", alignItems: "center", gap: 0.6,
          px: 1, py: 0.3, borderRadius: 1,
          bgcolor: tm.bg, color: tm.color,
          border: `1px solid ${tm.border}`,
          fontSize: 11, fontWeight: 700, width: "fit-content",
        }}>
          {tm.icon} {lesson.topic}
        </Box>

        <Typography color="#64748b" fontSize={13} lineHeight={1.65} sx={{
          flex: 1,
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {lesson.contentMarkdown?.replace(/#+\s/g, "").replace(/\*\*/g, "").trim()}
        </Typography>

        <Box sx={{
          display: "flex", alignItems: "center", gap: 0.5,
          color: ls.color, fontSize: 13, fontWeight: 700, mt: "auto",
        }}>
          Open lesson <ArrowForwardIcon sx={{ fontSize: 14 }} />
        </Box>
      </Stack>
    </Box>
  );
}

export function LanguagesPage() {
  const [meta,     setMeta]     = useState({ languages: [], topics: [] });
  const [language, setLanguage] = useState("javascript");
  const [topic,    setTopic]    = useState("basics");
  const [lessons,  setLessons]  = useState([]);
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    (async () => { const r = await api.get("/languages"); setMeta(r.data); })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try { const r = await api.get("/lessons", { params: { language, topic } }); setLessons(r.data.lessons || []); }
      finally { setLoading(false); }
    })();
  }, [language, topic]);

  const ls = LANG_META[language] || { bg: "#f1f5f9", color: "#374151", border: "#e2e8f0", icon: "?", dot: "#94a3b8" };
  const currentLang  = useMemo(() => meta.languages.find((x) => x.key === language)?.label || language, [meta, language]);
  const currentTopic = useMemo(() => TOPIC_META[topic] || { icon: "📄", label: topic }, [topic]);

  return (
    <Stack spacing={0}>

      {/* ── Hero band — LIGHT ── */}
      <Box sx={{
        bgcolor: "#fff",
        border: "1.5px solid #e2e8f0",
        borderRadius: 4, mb: 4,
        p: { xs: 3, md: 4 },
        position: "relative", overflow: "hidden",
      }}>
        {/* blue top accent line */}
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #4f46e5, #0284c7, #38bdf8)", borderRadius: "4px 4px 0 0" }} />

        {/* subtle bg blob */}
        <Box sx={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(2,132,199,0.06), transparent 70%)", pointerEvents: "none" }} />

        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" spacing={2} mt={0.5}>
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, mb: 0.8 }}>
              Learning Path
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: -0.6, lineHeight: 1.1 }}>
              Lessons
            </Typography>
            <Typography sx={{ color: "#64748b", fontSize: 14, mt: 0.5 }}>
              Pick a language and topic to start learning.
            </Typography>
          </Box>
          <Box sx={{
            px: 2, py: 1, borderRadius: 2,
            bgcolor: "#eff6ff", border: "1.5px solid #bae6fd",
            color: "#0284c7", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap",
          }}>
            {lessons.length} lesson{lessons.length !== 1 ? "s" : ""} available
          </Box>
        </Stack>
      </Box>

      {/* ── Language selector ── */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" gap={1} mb={1.5}>
          <Box sx={{ width: 4, height: 16, bgcolor: "#0284c7", borderRadius: 99 }} />
          <Typography fontSize={11} fontWeight={700} color="#94a3b8" textTransform="uppercase" letterSpacing={1}>
            Choose Language
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" gap={1.5}>
          {meta.languages.length > 0
            ? meta.languages.map((l) => (
                <LangTab key={l.key} lkey={l.key} label={l.label}
                  active={language === l.key} onClick={() => setLanguage(l.key)} />
              ))
            : [1,2,3,4,5].map((i) => <Skeleton key={i} variant="rounded" width={130} height={52} sx={{ borderRadius: 2.5 }} />)}
        </Stack>
      </Box>

      {/* ── Topic pills ── */}
      <Box sx={{ mb: 3.5 }}>
        <Stack direction="row" alignItems="center" gap={1} mb={1.5}>
          <Box sx={{ width: 4, height: 16, bgcolor: "#0284c7", borderRadius: 99 }} />
          <Typography fontSize={11} fontWeight={700} color="#94a3b8" textTransform="uppercase" letterSpacing={1}>
            Choose Topic
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {meta.topics.length > 0
            ? meta.topics.map((t) => (
                <TopicPill key={t.key} tkey={t.key} active={topic === t.key} onClick={() => setTopic(t.key)} />
              ))
            : [1,2,3,4].map((i) => <Skeleton key={i} variant="rounded" width={100} height={36} sx={{ borderRadius: 99 }} />)}
        </Stack>
      </Box>

      {/* ── Section label ── */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2.5}>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Box sx={{ width: 4, height: 22, bgcolor: ls.dot, borderRadius: 99 }} />
          <Typography fontSize={16} fontWeight={800} color="#0f172a">
            {currentTopic.icon} {currentTopic.label}
          </Typography>
          <Box sx={{ px: 1.2, py: 0.3, borderRadius: 1, bgcolor: ls.bg, color: ls.color, border: `1px solid ${ls.border}`, fontSize: 11, fontWeight: 700 }}>
            {currentLang}
          </Box>
        </Stack>
        {!loading && (
          <Typography fontSize={12} color="#94a3b8" fontWeight={600}>
            {lessons.length} result{lessons.length !== 1 ? "s" : ""}
          </Typography>
        )}
      </Stack>

      {/* ── Grid ── */}
      {loading ? (
        <Grid container spacing={2}>
          {[1,2,3].map((i) => <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={i}><Skeleton variant="rounded" height={260} sx={{ borderRadius: 3.5 }} /></Grid>)}
        </Grid>
      ) : lessons.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography fontSize={48} mb={1}>📭</Typography>
          <Typography variant="h6" fontWeight={800} color="#374151">No lessons found</Typography>
          <Typography color="#94a3b8" fontSize={14} mt={0.5}>Try a different language or topic</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {lessons.map((lesson, idx) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={lesson._id}>
              <LessonCard lesson={lesson} idx={idx} ls={ls} />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}