import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert, Box, Chip, CircularProgress, Grid,
  Paper, Stack, Tab, Tabs, Typography, TextField, MenuItem,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon       from "@mui/icons-material/School";
import ExtensionIcon    from "@mui/icons-material/Extension";
import SearchIcon       from "@mui/icons-material/Search";
import MenuBookIcon     from "@mui/icons-material/MenuBook";
import { api } from "../lib/apiClient";
import { useAuth } from "../providers/authContext";

// ── Styles ───────────────────────────────────────────
const DIFF_STYLE = {
  easy:   { color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0", dot: "#22c55e" },
  medium: { color: "#b45309", bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b" },
  hard:   { color: "#b91c1c", bg: "#fef2f2", border: "#fecaca", dot: "#ef4444" },
};

const LANG_STYLE = {
  javascript: { bg: "#fef9c3", color: "#92400e", border: "#fde68a", icon: "⚡" },
  python:     { bg: "#dcfce7", color: "#14532d", border: "#bbf7d0", icon: "🐍" },
  java:       { bg: "#fee2e2", color: "#7f1d1d", border: "#fecaca", icon: "☕" },
  c:          { bg: "#dbeafe", color: "#1e3a8a", border: "#bfdbfe", icon: "⚙" },
  cpp:        { bg: "#ede9fe", color: "#3b0764", border: "#ddd6fe", icon: "🚀" },
};

const TOPIC_ICON = {
  basics: "📘", loops: "🔁", functions: "⚙️", oop: "🧩",
  arrays: "📦", strings: "🔤", recursion: "🔄",
};

// ── Problem Card ─────────────────────────────────────
function ProblemCard({ p }) {
  const ds = DIFF_STYLE[p.difficulty] || DIFF_STYLE.easy;
  return (
    <Paper
      component={RouterLink}
      to={`/problems/${p.slug}`}
      variant="outlined"
      sx={{
        p: 0, borderRadius: 3, overflow: "hidden",
        textDecoration: "none", display: "block",
        borderColor: "#e2e8f0", bgcolor: "#fff",
        transition: "transform 0.16s, box-shadow 0.16s, border-color 0.16s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 10px 24px ${ds.dot}22`,
          borderColor: ds.border,
        },
      }}
    >
      {/* accent top */}
      <Box sx={{ height: 3, bgcolor: ds.dot }} />
      <Stack spacing={1.5} sx={{ p: 2.5 }}>
        {/* title */}
        <Typography fontSize={14} fontWeight={800} color="#0f172a" lineHeight={1.3}>
          {p.title}
        </Typography>

        {/* difficulty + tags */}
        <Stack direction="row" alignItems="center" gap={0.75} flexWrap="wrap">
          <Box sx={{
            px: 1, py: 0.25, borderRadius: 1,
            bgcolor: ds.bg, color: ds.color,
            border: `1px solid ${ds.border}`,
            fontSize: 10, fontWeight: 700,
          }}>
            {p.difficulty}
          </Box>
          {(p.tags || []).slice(0, 3).map((t) => (
            <Box key={t} sx={{
              px: 0.9, py: 0.15, borderRadius: 1,
              bgcolor: "#f1f5f9", color: "#475569",
              border: "1px solid #e2e8f0",
              fontSize: 10, fontWeight: 600,
            }}>
              {t}
            </Box>
          ))}
        </Stack>

        {/* CTA */}
        <Stack direction="row" alignItems="center" gap={0.5}
          sx={{ color: ds.color, fontSize: 12, fontWeight: 700 }}>
          Solve Problem <ArrowForwardIcon sx={{ fontSize: 13 }} />
        </Stack>
      </Stack>
    </Paper>
  );
}

// ── Lesson Card ──────────────────────────────────────
function LessonCard({ l }) {
  const ls = LANG_STYLE[l.language] || { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0", icon: "📄" };
  const topicIcon = TOPIC_ICON[l.topic] || "📄";
  return (
    <Paper
      component={RouterLink}
      to={`/lessons/${l._id}`}
      variant="outlined"
      sx={{
        p: 0, borderRadius: 3, overflow: "hidden",
        textDecoration: "none", display: "block",
        borderColor: "#e2e8f0", bgcolor: "#fff",
        transition: "transform 0.16s, box-shadow 0.16s, border-color 0.16s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 24px rgba(79,70,229,0.1)",
          borderColor: "#c7d2fe",
        },
      }}
    >
      <Box sx={{ height: 3, background: "linear-gradient(90deg, #6d28d9, #0ea5e9)" }} />
      <Stack spacing={1.5} sx={{ p: 2.5 }}>
        {/* lang badge + topic */}
        <Stack direction="row" alignItems="center" gap={1}>
          <Box sx={{
            width: 34, height: 34, borderRadius: 1.5, flexShrink: 0,
            bgcolor: ls.bg, border: `1.5px solid ${ls.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17,
          }}>
            {ls.icon}
          </Box>
          <Box>
            <Stack direction="row" gap={0.6} alignItems="center">
              <Box sx={{
                px: 0.9, py: 0.15, borderRadius: 1,
                bgcolor: ls.bg, color: ls.color,
                border: `1px solid ${ls.border}`,
                fontSize: 10, fontWeight: 700,
              }}>
                {l.language}
              </Box>
              <Box sx={{
                px: 0.9, py: 0.15, borderRadius: 1,
                bgcolor: "#f1f5f9", color: "#475569",
                border: "1px solid #e2e8f0",
                fontSize: 10, fontWeight: 600,
              }}>
                {topicIcon} {l.topic}
              </Box>
            </Stack>
          </Box>
        </Stack>

        {/* title */}
        <Typography fontSize={14} fontWeight={800} color="#0f172a" lineHeight={1.3}>
          {l.title}
        </Typography>

        {/* CTA */}
        <Stack direction="row" alignItems="center" gap={0.5}
          sx={{ color: "#6d28d9", fontSize: 12, fontWeight: 700 }}>
          Start Lesson <ArrowForwardIcon sx={{ fontSize: 13 }} />
        </Stack>
      </Stack>
    </Paper>
  );
}

// ── Loading skeleton ──────────────────────────────────
function LoadingGrid() {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Grid item xs={12} sm={6} lg={3} key={i}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: 130 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <CircularProgress size={22} />
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

// ── Main Page ─────────────────────────────────────────
export function PracticePathsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [filterStudent, setFilterStudent] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [problems,   setProblems]   = useState([]);
  const [loadingP,   setLoadingP]   = useState(true);
  const [error,      setError]      = useState("");

  const [diff,       setDiff]       = useState("");
  const [tag,        setTag]        = useState("");
  const [q,          setQ]          = useState("");

  useEffect(() => {
    (async () => {
      setLoadingP(true);
      try {
        const res = await api.get("/problems");
        const list = (res.data.problems || []).filter(
          (p) => p.problemType === "practice_problem" || !p.problemType,
        );
        setProblems(list);
      } catch (e) {
        setError("Failed to load problems");
      } finally { setLoadingP(false); }
    })();
  }, []);

  const allTags  = [...new Set(problems.flatMap((p) => p.tags || []))].sort();

  const filteredProblems = problems.filter((p) => {
    const matchDiff = !diff || p.difficulty === diff;
    const matchTag  = !tag  || (p.tags || []).includes(tag);
    const matchQ    = !q    || p.title.toLowerCase().includes(q.toLowerCase());
    return matchDiff && matchTag && matchQ;
  });

  const loadSubmissions = async () => {
    setReviewLoading(true);
    setReviewError("");
    try {
      const res = await api.get("/admin/submissions");
      setSubmissions(res.data.submissions || []);
    } catch (e) {
      setReviewError(e?.response?.data?.message || "Failed to load submissions");
    } finally {
      setReviewLoading(false);
    }
  };

  const students = [...new Set(submissions.map((s) => s.user?.name).filter(Boolean))].sort();
  const statuses = ["accepted", "wrong_answer", "compile_error", "runtime_error", "error"];
  const filteredSubs = submissions.filter((s) => {
    if (filterStudent && s.user?.name !== filterStudent) return false;
    if (filterStatus && s.status !== filterStatus) return false;
    return true;
  });

  const mistakeText = (s) => {
    const stderr = s?.summary?.stderr?.trim();
    const compile = s?.summary?.compileOutput?.trim();
    if (compile) return `Compile error:\n${compile}`;
    if (stderr) return `Runtime/Stderr:\n${stderr}`;
    if (s.status !== "accepted") return "No error details captured.";
    return "";
  };

  return (
    <Stack spacing={0}>

      {/* ── Hero ── */}
      <Box sx={{
        bgcolor: "#fff", border: "1.5px solid #e2e8f0",
        borderRadius: 4, mb: 3, p: { xs: 3, md: 4 },
        position: "relative", overflow: "hidden",
      }}>
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #6d28d9, #0284c7, #38bdf8)", borderRadius: "4px 4px 0 0" }} />

        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }}
          justifyContent="space-between" spacing={2} mt={0.5}>
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, mb: 0.5 }}>
              Coding Practice
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: -0.5, lineHeight: 1.1 }}>
              Practice Paths
            </Typography>
            <Typography sx={{ color: "#64748b", fontSize: 14, mt: 0.4 }}>
              Practice problems uploaded by admin — solve them in the code editor.
            </Typography>
          </Box>

          <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="flex-end">
            <Chip
              icon={<ExtensionIcon sx={{ fontSize: "14px !important" }} />}
              label={loadingP ? "…" : `${problems.length} Problems`}
              size="small"
              sx={{ bgcolor: "#fef2f2", color: "#b91c1c", border: "1.5px solid #fecaca", fontWeight: 700 }}
            />
            {isAdmin && (
              <>
                <Chip
                  component={RouterLink}
                  to="/admin/problems"
                  clickable
                  label="Upload Problem"
                  size="small"
                  sx={{
                    bgcolor: "#f0fdf4",
                    color: "#166534",
                    border: "1.5px solid #bbf7d0",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                />
                <Chip
                  component={RouterLink}
                  to="/dashboard"
                  clickable
                  label="Review Submissions"
                  size="small"
                  sx={{
                    bgcolor: "#ecfdf5",
                    color: "#065f46",
                    border: "1.5px solid #a7f3d0",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const next = !reviewOpen;
                    setReviewOpen(next);
                    if (next && submissions.length === 0) loadSubmissions();
                  }}
                />
              </>
            )}
          </Stack>
        </Stack>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

      {/* ── Search + Filters ── */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 3 }}>
        {/* Search */}
        <Box sx={{
          flex: 1, display: "flex", alignItems: "center", gap: 1,
          px: 1.5, py: 1, bgcolor: "#fff",
          border: "1.5px solid #e2e8f0", borderRadius: 2,
          "&:focus-within": { borderColor: "#6d28d9" }, transition: "border-color 0.15s",
        }}>
          <SearchIcon sx={{ fontSize: 18, color: "#94a3b8", flexShrink: 0 }} />
          <Box component="input"
            placeholder="Search problems…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            sx={{ border: "none", outline: "none", bgcolor: "transparent", fontSize: 14, color: "#0f172a", width: "100%", "::placeholder": { color: "#94a3b8" } }}
          />
          {q && <Box onClick={() => setQ("")} sx={{ fontSize: 11, color: "#94a3b8", cursor: "pointer", "&:hover": { color: "#ef4444" } }}>✕</Box>}
        </Box>

        <TextField select size="small" value={diff} onChange={(e) => setDiff(e.target.value)}
          label="Difficulty" sx={{ minWidth: 130, bgcolor: "#fff" }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </TextField>
        {allTags.length > 0 && (
          <TextField select size="small" value={tag} onChange={(e) => setTag(e.target.value)}
            label="Topic Tag" sx={{ minWidth: 140, bgcolor: "#fff" }}>
            <MenuItem value="">All Tags</MenuItem>
            {allTags.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
        )}
      </Stack>

      <>
          {loadingP ? (
            <LoadingGrid />
          ) : filteredProblems.length === 0 ? (
            <EmptyState
              icon={<ExtensionIcon sx={{ fontSize: 48, color: "text.disabled" }} />}
              title={problems.length === 0 ? "No problems yet" : "No matching problems"}
              sub={problems.length === 0 ? "Admin hasn't added any problems yet. Check back later!" : "Try a different filter or search."}
            />
          ) : (
            <>
              {/* Group by difficulty */}
              {["easy", "medium", "hard"].map((d) => {
                const group = filteredProblems.filter((p) => p.difficulty === d);
                if (!group.length) return null;
                const ds = DIFF_STYLE[d];
                return (
                  <Box key={d} sx={{ mb: 4 }}>
                    <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 2 }}>
                      <Box sx={{ width: 4, height: 22, bgcolor: ds.dot, borderRadius: 99 }} />
                      <Typography fontSize={17} fontWeight={900} color="#0f172a" textTransform="capitalize">
                        {d} Problems
                      </Typography>
                      <Box sx={{ px: 1.2, py: 0.3, borderRadius: 1, bgcolor: ds.bg, color: ds.color, border: `1px solid ${ds.border}`, fontSize: 11, fontWeight: 700 }}>
                        {group.length}
                      </Box>
                    </Stack>
                    <Grid container spacing={2}>
                      {group.map((p) => (
                        <Grid item xs={12} sm={6} lg={3} key={p._id || p.slug}>
                          <ProblemCard p={p} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                );
              })}
            </>
          )}
      </>

      {/* ── Admin: Review Submissions panel (shows who + mistakes) ── */}
      {isAdmin && reviewOpen && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2.5, borderRadius: 3, borderColor: "#e2e8f0", bgcolor: "#fff" }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ md: "center" }} justifyContent="space-between" mb={1.5}>
            <Box>
              <Typography fontWeight={900} fontSize={16} color="#0f172a">
                Review Submissions
              </Typography>
              <Typography fontSize={12.5} color="#64748b">
                See who submitted, status, tests passed, and common mistakes (stderr/compile output).
              </Typography>
            </Box>
            <Chip
              clickable
              onClick={loadSubmissions}
              label={reviewLoading ? "Refreshing…" : "Refresh"}
              size="small"
              sx={{ fontWeight: 800, bgcolor: "#fff", border: "1.5px solid #e2e8f0" }}
            />
          </Stack>

          {reviewError && <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>{reviewError}</Alert>}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} mb={2}>
            <TextField
              select
              size="small"
              label="Student"
              value={filterStudent}
              onChange={(e) => setFilterStudent(e.target.value)}
              sx={{ minWidth: 220, bgcolor: "#fff" }}
            >
              <MenuItem value="">All</MenuItem>
              {students.map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
            </TextField>
            <TextField
              select
              size="small"
              label="Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              sx={{ minWidth: 180, bgcolor: "#fff" }}
            >
              <MenuItem value="">All</MenuItem>
              {statuses.map((st) => <MenuItem key={st} value={st}>{st}</MenuItem>)}
            </TextField>
            <Box sx={{ display: "flex", alignItems: "center", color: "#64748b", fontSize: 12, fontWeight: 700 }}>
              {reviewLoading ? "Loading…" : `${filteredSubs.length} shown`}
            </Box>
          </Stack>

          {reviewLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={26} />
            </Box>
          ) : (
            <Stack spacing={1}>
              {filteredSubs.slice(0, 40).map((s) => {
                const msg = mistakeText(s);
                return (
                  <Paper key={s._id} variant="outlined" sx={{ p: 1.5, borderRadius: 2, borderColor: "#e2e8f0" }}>
                    <Stack spacing={0.6}>
                      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={1}>
                        <Typography fontSize={12} fontWeight={900} color="#0f172a">
                          {s.user?.name ?? "Unknown"}{" "}
                          <Typography component="span" fontSize={11} color="#64748b" fontWeight={600}>
                            ({s.user?.email ?? "—"})
                          </Typography>
                        </Typography>
                        <Typography fontSize={11} color="#94a3b8">
                          {new Date(s.createdAt).toLocaleString()}
                        </Typography>
                      </Stack>
                      <Stack direction="row" flexWrap="wrap" gap={0.8} alignItems="center">
                        <Typography fontSize={12} fontWeight={800}>{s.problem?.title ?? "Unknown Problem"}</Typography>
                        <Chip size="small" label={s.problem?.difficulty ?? "—"} />
                        <Chip size="small" label={s.language} />
                        <Chip size="small" label={s.status} color={s.status === "accepted" ? "success" : s.status === "wrong_answer" ? "warning" : "error"} />
                        <Typography fontSize={11} color="#64748b">
                          {s.summary?.passed}/{s.summary?.total} tests
                        </Typography>
                      </Stack>
                      {msg && (
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 1,
                            bgcolor: "#f8fafc",
                            borderColor: "#e2e8f0",
                            fontFamily: "monospace",
                            fontSize: 11,
                            whiteSpace: "pre-wrap",
                            maxHeight: 110,
                            overflow: "auto",
                          }}
                        >
                          {msg}
                        </Paper>
                      )}
                    </Stack>
                  </Paper>
                );
              })}
              {!filteredSubs.length && (
                <Typography fontSize={13} color="text.secondary">
                  No submissions found for this filter.
                </Typography>
              )}
              {filteredSubs.length > 40 && (
                <Typography fontSize={11} color="#94a3b8">
                  Showing first 40 submissions. Use filters to narrow down.
                </Typography>
              )}
            </Stack>
          )}
        </Paper>
      )}
    </Stack>
  );
}

function EmptyState({ icon, title, sub }) {
  return (
    <Paper variant="outlined" sx={{ p: 6, borderRadius: 3, textAlign: "center", bgcolor: "#f8fafc", borderColor: "#e2e8f0" }}>
      <Box sx={{ mb: 1.5 }}>{icon}</Box>
      <Typography variant="h6" fontWeight={700} color="text.secondary">{title}</Typography>
      <Typography color="text.disabled" fontSize={14} mt={0.5}>{sub}</Typography>
    </Paper>
  );
}