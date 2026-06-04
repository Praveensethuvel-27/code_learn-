import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CodeIcon from "@mui/icons-material/Code";
import { api } from "../lib/apiClient";
import { useAuth } from "../providers/authContext";

const LANG_META = {
  javascript: { color: "#92400e", bg: "#fef9c3", border: "#fde68a", icon: "⚡", dot: "#f59e0b", headerBg: "#fffbeb" },
  python:     { color: "#14532d", bg: "#dcfce7", border: "#bbf7d0", icon: "🐍", dot: "#22c55e", headerBg: "#f0fdf4" },
  java:       { color: "#7f1d1d", bg: "#fee2e2", border: "#fecaca", icon: "☕", dot: "#ef4444", headerBg: "#fef2f2" },
  c:          { color: "#1e3a8a", bg: "#dbeafe", border: "#bfdbfe", icon: "⚙",  dot: "#3b82f6", headerBg: "#eff6ff" },
  cpp:        { color: "#3b0764", bg: "#ede9fe", border: "#ddd6fe", icon: "🚀", dot: "#8b5cf6", headerBg: "#f5f3ff" },
};

export function LessonPage() {
  const { id }      = useParams();
  const { isAuthed, user } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [error,  setError]  = useState("");
  const [done,   setDone]   = useState(false);
  const [loading,setLoading]= useState(false);

  useEffect(() => {
    (async () => {
      try { const r = await api.get(`/lessons/${id}`); setLesson(r.data.lesson); }
      catch (e) { setError(e?.response?.data?.message || "Failed to load lesson"); }
    })();
  }, [id]);

  // Mark as done if user has already completed this lesson
  useEffect(() => {
    if (lesson && user?.completedLessons) {
      const already = user.completedLessons.some(
        (lid) => lid.toString() === lesson._id.toString()
      );
      if (already) setDone(true);
    }
  }, [lesson, user]);

  if (error)   return <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>;
  if (!lesson) return null;

  const lm = LANG_META[lesson.language] || { color: "#374151", bg: "#f3f4f6", border: "#e2e8f0", icon: "📄", dot: "#94a3b8", headerBg: "#f8fafc" };

  return (
    <Stack spacing={0}>

      {/* ── Hero header — LIGHT ── */}
      <Box sx={{
        bgcolor: lm.headerBg,
        border: "2px solid",
        borderColor: lm.border,
        borderRadius: 4, mb: 3,
        p: { xs: 3, md: 4 },
        position: "relative", overflow: "hidden",
      }}>
        {/* colored top line */}
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, bgcolor: lm.dot, borderRadius: "4px 4px 0 0" }} />
        <Box sx={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", bgcolor: `${lm.dot}0a`, pointerEvents: "none" }} />

        <Button component={RouterLink} to="/languages"
          startIcon={<ArrowBackIcon sx={{ fontSize: 14 }} />}
          sx={{ color: lm.color, fontSize: 12, fontWeight: 600, mb: 2, px: 0, opacity: 0.8,
            "&:hover": { opacity: 1, bgcolor: "transparent" } }}>
          Back to Lessons
        </Button>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
          <Box sx={{
            width: 60, height: 60, borderRadius: 3, flexShrink: 0,
            bgcolor: "#fff", border: `2px solid ${lm.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, boxShadow: `0 4px 12px ${lm.dot}20`,
          }}>
            {lm.icon}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} mb={0.8} alignItems="center" flexWrap="wrap" gap={0.5}>
              <Box sx={{
                px: 1.2, py: 0.3, borderRadius: 1,
                bgcolor: "#fff", color: lm.color,
                border: `1px solid ${lm.border}`,
                fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5,
              }}>
                {lesson.language}
              </Box>
              <Box sx={{
                px: 1.2, py: 0.3, borderRadius: 1,
                bgcolor: lm.bg, color: lm.color,
                border: `1px solid ${lm.border}`,
                fontSize: 11, fontWeight: 600,
              }}>
                {lesson.topic}
              </Box>
            </Stack>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: -0.5, lineHeight: 1.2 }}>
              {lesson.title}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* ── Content ── */}
      <Box sx={{
        bgcolor: "#fff", border: "2px solid #e2e8f0", borderRadius: 3.5, mb: 2.5, overflow: "hidden",
      }}>
        {/* header */}
        <Stack direction="row" alignItems="center" gap={1.5}
          sx={{ px: 2.5, py: 1.8, borderBottom: "1px solid #f1f5f9", bgcolor: "#f8fafc" }}>
          <Box sx={{
            width: 32, height: 32, borderRadius: 1.5,
            bgcolor: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <EmojiObjectsIcon sx={{ fontSize: 17, color: "#4f46e5" }} />
          </Box>
          <Typography fontWeight={800} fontSize={15} color="#0f172a">Lesson Content</Typography>
          <Box sx={{
            ml: "auto", px: 1.2, py: 0.3, borderRadius: 1,
            bgcolor: "#eef2ff", color: "#4f46e5", fontSize: 11, fontWeight: 700,
          }}>
            📖 Read carefully
          </Box>
        </Stack>

        {/* content body */}
        <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
          {lesson.contentMarkdown?.split("\n\n").map((para, i) => {
            const isHeading = para.startsWith("#");
            const cleaned   = para.replace(/^#+\s/, "").replace(/\*\*(.*?)\*\*/g, "$1");

            if (isHeading) {
              return (
                <Stack key={i} direction="row" alignItems="center" gap={1.5} sx={{ mt: i === 0 ? 0 : 3, mb: 1 }}>
                  <Box sx={{ width: 4, height: 20, bgcolor: lm.dot, borderRadius: 99, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: 17, fontWeight: 800, color: "#0f172a", lineHeight: 1.3 }}>
                    {cleaned}
                  </Typography>
                </Stack>
              );
            }

            if (para.startsWith("```") || para.includes("    ")) {
              return (
                <Box key={i} component="pre" sx={{
                  mt: 1.5, mb: 2,
                  p: 2, borderRadius: 2,
                  bgcolor: "#1e293b", color: "#e2e8f0",
                  fontFamily: "'JetBrains Mono','Fira Code',monospace",
                  fontSize: 13, lineHeight: 1.8,
                  overflowX: "auto",
                  whiteSpace: "pre-wrap", wordBreak: "break-word",
                  border: "1px solid #334155",
                }}>
                  {para.replace(/```\w*/g, "").replace(/```/g, "").trim()}
                </Box>
              );
            }

            return (
              <Typography key={i} sx={{
                fontSize: 15, color: "#374151", lineHeight: 1.85,
                mt: i === 0 ? 0 : 1.5,
              }}>
                {cleaned}
              </Typography>
            );
          })}
        </Box>
      </Box>

      {/* ── Code example ── */}
      {lesson.codeExample && (
        <Box sx={{
          bgcolor: "#fff", border: "2px solid #e2e8f0", borderRadius: 3.5, mb: 2.5, overflow: "hidden",
        }}>
          <Stack direction="row" alignItems="center" gap={1.5}
            sx={{ px: 2.5, py: 1.8, borderBottom: "1px solid #f1f5f9", bgcolor: "#f8fafc" }}>
            <Box sx={{
              width: 32, height: 32, borderRadius: 1.5,
              bgcolor: lm.bg, border: `1px solid ${lm.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <CodeIcon sx={{ fontSize: 17, color: lm.dot }} />
            </Box>
            <Typography fontWeight={800} fontSize={15} color="#0f172a">Code Example</Typography>
            <Box sx={{
              ml: "auto", px: 1.2, py: 0.3, borderRadius: 1,
              bgcolor: lm.bg, color: lm.color, border: `1px solid ${lm.border}`,
              fontSize: 11, fontWeight: 700,
            }}>
              {lm.icon} {lesson.language}
            </Box>
          </Stack>

          {/* window chrome */}
          <Stack direction="row" alignItems="center" gap={1}
            sx={{ px: 2, py: 1, bgcolor: "#1e293b", borderBottom: "1px solid #334155" }}>
            {["#ef4444","#f59e0b","#22c55e"].map((c) => (
              <Box key={c} sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: c, opacity: 0.8 }} />
            ))}
            <Typography sx={{ ml: 1, fontSize: 11, color: "#64748b", fontFamily: "'JetBrains Mono',monospace" }}>
              {lesson.language} — example.{lesson.language === "python" ? "py" : lesson.language === "java" ? "java" : "js"}
            </Typography>
          </Stack>

          <Box component="pre" sx={{
            m: 0, p: 2.5,
            bgcolor: "#1e293b", color: "#e2e8f0",
            fontFamily: "'JetBrains Mono','Fira Code',monospace",
            fontSize: 13.5, lineHeight: 1.85,
            whiteSpace: "pre-wrap", wordBreak: "break-word",
            overflowX: "auto",
          }}>
            {lesson.codeExample}
          </Box>

          <Box sx={{ p: 2, bgcolor: "#fffbeb", borderTop: "1px solid #fde68a" }}>
            <Stack direction="row" gap={1} alignItems="flex-start">
              <Typography fontSize={16}>💡</Typography>
              <Typography fontSize={13} color="#92400e" fontWeight={600} lineHeight={1.6}>
                Try running this code in the{" "}
                <Box component={RouterLink} to="/editor" sx={{ color: "#d97706", fontWeight: 700 }}>
                  Editor
                </Box>
                {" "}to see it in action!
              </Typography>
            </Stack>
          </Box>
        </Box>
      )}

      {/* ── Action area ── */}
      <Box sx={{
        bgcolor: "#fff", border: "2px solid #e2e8f0", borderRadius: 3.5, p: 3, mb: 2.5,
      }}>
        {isAuthed ? (
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={800} fontSize={15} color="#0f172a" mb={0.5}>
                {done ? "🎉 Great job! You completed this lesson!" : "Ready to mark this lesson as done?"}
              </Typography>
              <Typography fontSize={13} color="#64748b">
                {done
                  ? "Your progress has been saved. Keep going!"
                  : "Click the button once you've read and understood the content."}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5} flexShrink={0}>
              {!done ? (
                <Button variant="contained" size="large"
                  startIcon={<CheckCircleIcon />}
                  disabled={loading}
                  onClick={async () => {
                    setLoading(true);
                    try { await api.post(`/lessons/${lesson._id}/complete`); setDone(true); }
                    catch { /* ignore */ }
                    finally { setLoading(false); }
                  }}
                  sx={{
                    fontWeight: 700, bgcolor: "#4f46e5", borderRadius: 2.5, px: 3,
                    "&:hover": { bgcolor: "#4338ca" },
                    boxShadow: "0 4px 14px rgba(79,70,229,0.25)",
                  }}>
                  Mark as Completed
                </Button>
              ) : (
                <Button variant="contained" size="large"
                  startIcon={<CheckCircleIcon />}
                  disabled
                  sx={{
                    fontWeight: 700, borderRadius: 2.5, px: 3,
                    bgcolor: "#16a34a !important", color: "#fff !important",
                    boxShadow: "0 4px 14px rgba(22,163,74,0.2)",
                  }}>
                  ✓ Completed!
                </Button>
              )}
              {done && (
                <Button component={RouterLink} to="/languages"
                  variant="outlined" size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ fontWeight: 700, borderRadius: 2.5, borderColor: "#e2e8f0", color: "#4f46e5", "&:hover": { borderColor: "#4f46e5", bgcolor: "#eef2ff" } }}>
                  Next Lesson
                </Button>
              )}
            </Stack>
          </Stack>
        ) : (
          <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} gap={2}
            sx={{ p: 2.5, borderRadius: 2.5, bgcolor: "#eff6ff", border: "2px solid #bae6fd" }}>
            <LockIcon sx={{ color: "#0284c7", fontSize: 28, flexShrink: 0 }} />
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={800} fontSize={15} color="#0f172a">
                Track your progress
              </Typography>
              <Typography fontSize={13} color="#0284c7" mt={0.3}>
                Sign in to mark lessons as completed and track your learning journey.
              </Typography>
            </Box>
            <Button component={RouterLink} to="/login" variant="contained"
              sx={{ fontWeight: 700, bgcolor: "#0284c7", borderRadius: 2.5, "&:hover": { bgcolor: "#0369a1" }, whiteSpace: "nowrap" }}>
              Sign in to track
            </Button>
          </Stack>
        )}
      </Box>

      {/* ── Bottom nav ── */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button component={RouterLink} to="/languages"
          startIcon={<ArrowBackIcon />} variant="outlined"
          sx={{ fontWeight: 700, borderColor: "#e2e8f0", color: "#64748b", borderRadius: 2, "&:hover": { borderColor: "#4f46e5", color: "#4f46e5", bgcolor: "#eef2ff" } }}>
          All Lessons
        </Button>
        <Button component={RouterLink} to="/problems"
          endIcon={<ArrowForwardIcon />} variant="contained"
          sx={{ fontWeight: 700, bgcolor: "#4f46e5", borderRadius: 2, "&:hover": { bgcolor: "#4338ca" } }}>
          Practice Problems
        </Button>
      </Stack>
    </Stack>
  );
}