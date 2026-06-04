import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box, Chip, Grid, MenuItem, Paper, Stack,
  TextField, Typography, Skeleton, Avatar,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { api } from "../lib/apiClient";

const LANG_COLORS = {
  javascript: { bg: "#fef9c3", color: "#854d0e", icon: "JS" },
  python:     { bg: "#dcfce7", color: "#166534", icon: "PY" },
  java:       { bg: "#fee2e2", color: "#991b1b", icon: "JV" },
  c:          { bg: "#dbeafe", color: "#1e40af", icon: "C"  },
  cpp:        { bg: "#ede9fe", color: "#5b21b6", icon: "C++" },
};

const TOPIC_ICONS = {
  basics: "📘", loops: "🔁", functions: "⚙️", oop: "🧩",
  arrays: "📦", strings: "🔤", recursion: "🔄",
};

export function LanguagesPage() {
  const [meta, setMeta] = useState({ languages: [], topics: [] });
  const [language, setLanguage] = useState("javascript");
  const [topic, setTopic] = useState("basics");
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await api.get("/languages");
      setMeta(res.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get("/lessons", { params: { language, topic } });
        setLessons(res.data.lessons || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [language, topic]);

  const title = useMemo(() => {
    const l = meta.languages.find((x) => x.key === language)?.label || language;
    const t = meta.topics.find((x) => x.key === topic)?.label || topic;
    return `${l} • ${t}`;
  }, [meta, language, topic]);

  const langStyle = LANG_COLORS[language] || { bg: "#f3f4f6", color: "#374151", icon: "?" };

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" spacing={1}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.5 }}>
            Lessons
          </Typography>
          <Typography color="text.secondary" fontSize={14}>
            Pick a language and topic to start learning
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <SchoolIcon sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography fontWeight={700} color="primary.main" fontSize={14}>
            {lessons.length} lesson{lessons.length !== 1 ? "s" : ""} available
          </Typography>
        </Stack>
      </Stack>

      {/* Filter Bar */}
      <Paper
        variant="outlined"
        sx={{
          p: 2.5,
          borderRadius: 3,
          background: "linear-gradient(135deg, rgba(109,40,217,0.04), rgba(14,165,233,0.03))",
          border: "1px solid rgba(109,40,217,0.12)",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
          {/* Language avatar */}
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: langStyle.bg,
              color: langStyle.color,
              fontWeight: 900,
              fontSize: langStyle.icon.length > 2 ? 11 : 14,
              border: "2px solid",
              borderColor: langStyle.color + "44",
              flexShrink: 0,
            }}
          >
            {langStyle.icon}
          </Avatar>

          <TextField
            label="Language"
            select
            fullWidth
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            sx={{ maxWidth: { sm: 200 } }}
          >
            {meta.languages.map((l) => (
              <MenuItem key={l.key} value={l.key}>{l.label}</MenuItem>
            ))}
          </TextField>

          <TextField
            label="Topic"
            select
            fullWidth
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            sx={{ maxWidth: { sm: 200 } }}
          >
            {meta.topics.map((t) => (
              <MenuItem key={t.key} value={t.key}>
                {TOPIC_ICONS[t.key] || "📄"} {t.label}
              </MenuItem>
            ))}
          </TextField>

          <Box
            sx={{
              px: 2, py: 0.8,
              bgcolor: langStyle.bg,
              color: langStyle.color,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: 13,
              whiteSpace: "nowrap",
              flexShrink: 0,
              border: "1px solid",
              borderColor: langStyle.color + "33",
            }}
          >
            {title}
          </Box>
        </Stack>
      </Paper>

      {/* Topic quick-select pills */}
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {meta.topics.map((t) => (
          <Chip
            key={t.key}
            label={`${TOPIC_ICONS[t.key] || "📄"} ${t.label}`}
            onClick={() => setTopic(t.key)}
            variant={topic === t.key ? "filled" : "outlined"}
            color={topic === t.key ? "primary" : "default"}
            sx={{ fontWeight: 600, cursor: "pointer" }}
          />
        ))}
      </Stack>

      {/* Lessons Grid */}
      {loading ? (
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={12} md={6} key={i}>
              <Skeleton variant="rounded" height={160} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      ) : lessons.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            p: 6,
            borderRadius: 3,
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(109,40,217,0.03), rgba(14,165,233,0.02))",
          }}
        >
          <MenuBookIcon sx={{ fontSize: 52, color: "text.disabled", mb: 1.5 }} />
          <Typography variant="h6" fontWeight={700} color="text.secondary">
            No lessons found
          </Typography>
          <Typography color="text.disabled" fontSize={14} mt={0.5}>
            Try selecting a different language or topic
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {lessons.map((lesson, idx) => (
            <Grid item xs={12} sm={6} lg={4} key={lesson._id}>
              <Paper
                variant="outlined"
                component={RouterLink}
                to={`/lessons/${lesson._id}`}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  display: "block",
                  textDecoration: "none",
                  height: "100%",
                  transition: "transform 0.18s, box-shadow 0.18s, border-color 0.18s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 28px rgba(109,40,217,0.12)",
                    borderColor: "primary.main",
                  },
                }}
              >
                <Stack spacing={1.5} height="100%">
                  {/* Card top */}
                  <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                    <Box
                      sx={{
                        width: 36, height: 36, borderRadius: 2,
                        bgcolor: langStyle.bg, color: langStyle.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 900, fontSize: 11, flexShrink: 0,
                        border: "1.5px solid", borderColor: langStyle.color + "33",
                      }}
                    >
                      {langStyle.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 11, fontWeight: 700,
                        color: "text.disabled",
                        bgcolor: "grey.100",
                        px: 1, py: 0.3, borderRadius: 1,
                      }}
                    >
                      #{idx + 1}
                    </Typography>
                  </Stack>

                  {/* Title */}
                  <Typography fontWeight={800} fontSize={15} color="text.primary" lineHeight={1.3}>
                    {lesson.title}
                  </Typography>

                  {/* Tags */}
                  <Stack direction="row" spacing={0.8} flexWrap="wrap" gap={0.5}>
                    <Chip
                      label={lesson.language}
                      size="small"
                      sx={{ height: 18, fontSize: 10, bgcolor: langStyle.bg, color: langStyle.color }}
                    />
                    <Chip
                      label={`${TOPIC_ICONS[lesson.topic] || ""} ${lesson.topic}`}
                      size="small"
                      sx={{ height: 18, fontSize: 10 }}
                    />
                  </Stack>

                  {/* Preview */}
                  <Typography
                    color="text.secondary"
                    fontSize={13}
                    lineHeight={1.55}
                    sx={{
                      flex: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {lesson.contentMarkdown?.replace(/#+\s/g, "").replace(/\*\*/g, "")}
                  </Typography>

                  {/* CTA */}
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "primary.main" }}>
                    <Typography fontSize={13} fontWeight={700}>
                      Open lesson
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: 15 }} />
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
