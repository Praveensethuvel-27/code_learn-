import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { api } from "../lib/apiClient";
import { getTopicMeta } from "../config/aiLearnTopics";
import { LessonVisualDiagram } from "../components/ai-learn/LessonVisualDiagram";

const LAST_LESSON_KEY = "codelearn_ai_learn_last";

function findLesson(modules, moduleId, lessonInModule) {
  const mod = modules.find((m) => m.id === moduleId);
  if (!mod) return null;
  return mod.lessons.find((l) => l.lessonInModule === lessonInModule) || mod.lessons[0] || null;
}

function getAdjacent(modules, moduleId, lessonInModule, dir) {
  const mi = modules.findIndex((m) => m.id === moduleId);
  if (mi < 0) return null;
  const mod = modules[mi];
  let li = (lessonInModule || 1) - 1;
  if (dir === "next") {
    li += 1;
    if (li >= mod.lessons.length) {
      if (mi + 1 >= modules.length) return null;
      return { moduleId: modules[mi + 1].id, lessonInModule: 1 };
    }
    return { moduleId, lessonInModule: li + 1 };
  }
  li -= 1;
  if (li < 0) {
    if (mi <= 0) return null;
    const prev = modules[mi - 1];
    return { moduleId: prev.id, lessonInModule: prev.lessons.length };
  }
  return { moduleId, lessonInModule: li + 1 };
}

function CurriculumNav({ modules, selectedModuleId, selectedLesson, onSelectLesson, suggestedToday }) {
  const [expanded, setExpanded] = useState(() => {
    const init = {};
    modules.forEach((m) => { init[m.id] = m.id === selectedModuleId; });
    return init;
  });

  useEffect(() => {
    setExpanded((prev) => ({ ...prev, [selectedModuleId]: true }));
  }, [selectedModuleId]);

  return (
    <Paper
      elevation={0}
      sx={{
        position: { lg: "sticky" },
        top: { lg: 16 },
        borderRadius: 3,
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ px: 2, py: 1.75, bgcolor: "#0f172a", color: "#fff" }}>
        <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase", opacity: 0.7 }}>
          Curriculum
        </Typography>
        <Typography sx={{ fontWeight: 800, fontSize: 15, mt: 0.25 }}>
          {modules.length} modules · read at your pace
        </Typography>
      </Box>
      <Box sx={{ maxHeight: { lg: "calc(100vh - 200px)" }, overflowY: "auto", p: 1 }}>
        {modules.map((mod) => {
          const meta = getTopicMeta(mod.id);
          const Icon = meta.Icon;
          const isOpen = expanded[mod.id];
          return (
            <Box key={mod.id} sx={{ mb: 0.5 }}>
              <Stack
                direction="row"
                spacing={1}
                onClick={() => setExpanded((e) => ({ ...e, [mod.id]: !e[mod.id] }))}
                sx={{
                  alignItems: "center",
                  p: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#f8fafc" },
                }}
              >
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 1.5,
                    bgcolor: meta.color,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon sx={{ fontSize: 16 }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: 10, fontWeight: 700, color: "#94a3b8" }}>Module {mod.order}</Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#1e293b", lineHeight: 1.25 }} noWrap>
                    {mod.title}
                  </Typography>
                </Box>
                <IconButton size="small" sx={{ p: 0 }}>
                  {isOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </IconButton>
              </Stack>
              <Collapse in={isOpen}>
                <Stack sx={{ pl: 4.5, pr: 0.5, pb: 0.5 }} spacing={0.25}>
                  {mod.lessons.map((l) => {
                    const selected = mod.id === selectedModuleId && l.lessonInModule === selectedLesson;
                    const isToday =
                      suggestedToday?.moduleId === mod.id &&
                      suggestedToday?.lessonInModule === l.lessonInModule;
                    return (
                      <Typography
                        key={l.lessonInModule}
                        onClick={() => onSelectLesson(mod.id, l.lessonInModule)}
                        sx={{
                          fontSize: 12,
                          py: 0.65,
                          px: 1,
                          borderRadius: 1.5,
                          cursor: "pointer",
                          fontWeight: selected ? 800 : 500,
                          color: selected ? meta.color : "#64748b",
                          bgcolor: selected ? meta.bg : "transparent",
                          borderLeft: selected ? `3px solid ${meta.color}` : "3px solid transparent",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                          "&:hover": { bgcolor: selected ? meta.bg : "#f8fafc" },
                        }}
                      >
                        <Box component="span" sx={{ flex: 1 }}>{l.title}</Box>
                        {isToday && (
                          <Chip label="Today" size="small" sx={{ height: 18, fontSize: 9, fontWeight: 800 }} />
                        )}
                      </Typography>
                    );
                  })}
                </Stack>
              </Collapse>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

function ReadingPanel({ lesson, meta, prev, next, onSelectLesson }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e2e8f0",
        bgcolor: "#fff",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${meta.color}, ${meta.color}88)`,
        }}
      />
      <Box sx={{ px: { xs: 2.5, md: 4 }, py: { xs: 3, md: 4 }, maxWidth: 820, mx: "auto" }}>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 0.75, mb: 2 }}>
          <Chip
            size="small"
            label={`Module ${lesson.moduleOrder} · Lesson ${lesson.lessonInModule}/${lesson.lessonsInModule}`}
            sx={{ fontWeight: 700, bgcolor: meta.bg, color: meta.color }}
          />
          <Chip
            size="small"
            icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
            label={`${lesson.readTimeMin || 6} min read`}
            variant="outlined"
          />
          <Chip size="small" icon={<MenuBookOutlinedIcon sx={{ fontSize: 14 }} />} label="Read only" variant="outlined" />
        </Stack>

        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            color: meta.color,
            textTransform: "uppercase",
            letterSpacing: 1,
            mb: 1,
          }}
        >
          {lesson.moduleTitle}
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: 28, md: 34 },
            color: "#0f172a",
            letterSpacing: -0.8,
            lineHeight: 1.15,
            mb: 1.5,
          }}
        >
          {lesson.title}
        </Typography>
        <Typography sx={{ fontSize: 17, color: "#64748b", lineHeight: 1.6, mb: 3 }}>
          {lesson.summary}
        </Typography>

        <LessonVisualDiagram diagram={lesson.diagram} color={meta.color} lessonTitle={lesson.title} />

        {lesson.highlights?.length > 0 && (
          <Box sx={{ mb: 3, p: 2.5, borderRadius: 2.5, bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}>
            <Typography sx={{ fontSize: 12, fontWeight: 800, color: "#64748b", mb: 1.5, textTransform: "uppercase" }}>
              Key points
            </Typography>
            <Stack spacing={1}>
              {lesson.highlights.map((h, i) => (
                <Stack key={i} direction="row" spacing={1.25} alignItems="flex-start">
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: meta.color, mt: 0.75, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: 14, color: "#334155", lineHeight: 1.55, fontWeight: 500 }}>{h}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}

        <Stack spacing={3}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <LightbulbOutlinedIcon sx={{ color: "#d97706", fontSize: 22 }} />
              <Typography sx={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>Lesson</Typography>
            </Stack>
            <Typography
              sx={{
                fontSize: 16,
                color: "#374151",
                lineHeight: 1.9,
                whiteSpace: "pre-wrap",
                fontFamily: '"Georgia", "Times New Roman", serif',
              }}
            >
              {lesson.concept}
            </Typography>
          </Box>

          <Divider />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: "#faf5ff", border: "1px solid #e9d5ff", height: "100%" }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <PsychologyOutlinedIcon sx={{ color: "#7c3aed", fontSize: 20 }} />
                  <Typography sx={{ fontWeight: 800, fontSize: 14 }}>Reflect</Typography>
                </Stack>
                <Typography sx={{ fontSize: 14, color: "#4b5563", lineHeight: 1.7 }}>{lesson.miniChallenge}</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: "#f8fafc", border: "1px solid #e2e8f0", height: "100%" }}>
                <Typography sx={{ fontWeight: 800, fontSize: 14, mb: 1 }}>Remember</Typography>
                <Typography sx={{ fontSize: 14, color: "#4b5563", lineHeight: 1.7 }}>{lesson.codeTip}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Button
            disabled={!prev}
            startIcon={<ArrowBackIcon />}
            onClick={() => prev && onSelectLesson(prev.moduleId, prev.lessonInModule)}
            sx={{ textTransform: "none", fontWeight: 700, color: "#475569" }}
          >
            Previous
          </Button>
          <Button
            disabled={!next}
            endIcon={<ArrowForwardIcon />}
            variant="contained"
            onClick={() => next && onSelectLesson(next.moduleId, next.lessonInModule)}
            sx={{
              textTransform: "none",
              fontWeight: 800,
              bgcolor: meta.color,
              borderRadius: 2,
              px: 2.5,
              "&:hover": { bgcolor: meta.color, filter: "brightness(0.92)" },
            }}
          >
            Next lesson
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export function AiLearnPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [curriculum, setCurriculum] = useState(null);
  const [suggestedToday, setSuggestedToday] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const moduleId = searchParams.get("module") || "intro_ai";
  const lessonInModule = Number(searchParams.get("lesson")) || 1;

  const loadBrowse = useCallback(async () => {
    const res = await api.get("/ai-learn/browse");
    setCurriculum(res.data.curriculum);
    setSuggestedToday(res.data.suggestedToday);
    return res.data.curriculum;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await loadBrowse();
        const mods = data?.modules || [];
        const saved = localStorage.getItem(LAST_LESSON_KEY);
        if (!searchParams.get("module") && mods.length) {
          if (saved) {
            try {
              const { module: m, lesson: l } = JSON.parse(saved);
              if (mods.some((x) => x.id === m)) {
                setSearchParams({ module: m, lesson: String(l || 1) }, { replace: true });
                return;
              }
            } catch { /* ignore */ }
          }
          setSearchParams({ module: mods[0].id, lesson: "1" }, { replace: true });
        }
      } catch (e) {
        setError(e?.response?.data?.message || "Could not load AI Learn");
      } finally {
        setLoading(false);
      }
    })();
  }, [loadBrowse, searchParams, setSearchParams]);

  const modules = curriculum?.modules || [];
  const selectedLesson = useMemo(
    () => findLesson(modules, moduleId, lessonInModule),
    [modules, moduleId, lessonInModule],
  );

  const enrichedLesson = selectedLesson
    ? {
        ...selectedLesson,
        moduleId,
        moduleTitle: modules.find((m) => m.id === moduleId)?.title,
        moduleOrder: modules.find((m) => m.id === moduleId)?.order,
        lessonsInModule: modules.find((m) => m.id === moduleId)?.lessons?.length,
        topic: moduleId,
      }
    : null;

  const meta = enrichedLesson ? getTopicMeta(moduleId) : null;
  const prev = getAdjacent(modules, moduleId, lessonInModule, "prev");
  const next = getAdjacent(modules, moduleId, lessonInModule, "next");

  const selectLesson = (modId, lessonNum) => {
    localStorage.setItem(LAST_LESSON_KEY, JSON.stringify({ module: modId, lesson: lessonNum }));
    setSearchParams({ module: modId, lesson: String(lessonNum) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress sx={{ color: "#7c3aed" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mx: { xs: -2, md: -3 },
        mt: -3,
        mb: -3,
        minHeight: "calc(100vh - 56px)",
        bgcolor: "#f1f5f9",
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 45%, #312e81 100%)",
          color: "#fff",
          px: { xs: 2.5, md: 4 },
          py: { xs: 3, md: 4 },
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }} justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2.5,
                bgcolor: "rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 30 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, opacity: 0.75, textTransform: "uppercase" }}>
                CodeLearn · AI Academy
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.5, lineHeight: 1.15 }}>
                Read & learn AI
              </Typography>
              <Typography sx={{ fontSize: 14, opacity: 0.85, mt: 0.75, maxWidth: 520 }}>
                Structured lessons with mind maps and workflows. For any coding doubt anytime, open <strong>AI Chat</strong> from the sidebar.
              </Typography>
            </Box>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignSelf: { xs: "flex-start", md: "center" } }}>
            <Button
              component={RouterLink}
              to="/ai-chat"
              variant="contained"
              startIcon={<SmartToyOutlinedIcon />}
              sx={{
                bgcolor: "#fff",
                color: "#4f46e5",
                textTransform: "none",
                fontWeight: 800,
                borderRadius: 2,
                "&:hover": { bgcolor: "#f5f3ff" },
              }}
            >
              Open AI Chat
            </Button>
            {suggestedToday && (
              <Button
                variant="outlined"
                onClick={() => selectLesson(suggestedToday.moduleId, suggestedToday.lessonInModule)}
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.4)",
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                  "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
                }}
              >
                Today: {suggestedToday.title}
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 4 }}>
            {modules.length > 0 && (
              <CurriculumNav
                modules={modules}
                selectedModuleId={moduleId}
                selectedLesson={lessonInModule}
                onSelectLesson={selectLesson}
                suggestedToday={suggestedToday}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, lg: 8 }}>
            {enrichedLesson && meta ? (
              <ReadingPanel
                lesson={enrichedLesson}
                meta={meta}
                prev={prev}
                next={next}
                onSelectLesson={selectLesson}
              />
            ) : (
              <Alert severity="warning" sx={{ borderRadius: 2 }}>Select a lesson from the curriculum.</Alert>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
