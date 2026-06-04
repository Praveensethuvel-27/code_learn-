import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BoltIcon from "@mui/icons-material/Bolt";
import SearchIcon from "@mui/icons-material/Search";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { api } from "../lib/apiClient";

const DIFF = {
  easy:   { color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0", dot: "#22c55e", emoji: "🟢", label: "Easy"   },
  medium: { color: "#b45309", bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b", emoji: "🟡", label: "Medium" },
  hard:   { color: "#b91c1c", bg: "#fef2f2", border: "#fecaca", dot: "#ef4444", emoji: "🔴", label: "Hard"   },
};

const DIFF_FILTERS = [
  { value: "",       label: "All",    emoji: "⚡", color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe" },
  { value: "easy",   label: "Easy",   emoji: "🟢", color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
  { value: "medium", label: "Medium", emoji: "🟡", color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
  { value: "hard",   label: "Hard",   emoji: "🔴", color: "#b91c1c", bg: "#fef2f2", border: "#fecaca" },
];

function DiffPill({ item, active, onClick }) {
  return (
    <Box onClick={onClick} sx={{
      display: "flex", alignItems: "center", gap: 0.8,
      px: 1.8, py: 0.9, borderRadius: 99, cursor: "pointer",
      border: "2px solid",
      borderColor: active ? item.color : "#e2e8f0",
      bgcolor: active ? item.bg : "#fff",
      color: active ? item.color : "#64748b",
      fontSize: 13, fontWeight: active ? 700 : 500,
      boxShadow: active ? `0 3px 10px ${item.color}20` : "none",
      transition: "all 0.14s",
      "&:hover": { borderColor: item.color, color: item.color, bgcolor: item.bg },
      userSelect: "none",
    }}>
      <span style={{ fontSize: 14 }}>{item.emoji}</span>
      {item.label}
    </Box>
  );
}

function ProblemCard({ problem, idx }) {
  const d = DIFF[problem.difficulty] || { color: "#64748b", bg: "#f1f5f9", border: "#e2e8f0", dot: "#94a3b8", emoji: "⚪", label: problem.difficulty };

  return (
    <Box component={RouterLink} to={`/problems/${problem.slug}`} sx={{
      textDecoration: "none",
      display: "flex", flexDirection: "column",
      borderRadius: 3.5, overflow: "hidden",
      border: "2px solid #e2e8f0",
      borderTop: `3px solid ${d.dot}`,
      bgcolor: "#fff",
      transition: "all 0.18s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: `0 12px 32px ${d.dot}20`,
        borderColor: d.border,
      },
    }}>
      <Stack sx={{ p: 2.5 }} spacing={1.5}>
        {/* header row */}
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
          <Stack direction="row" alignItems="center" gap={1.2}>
            <Box sx={{
              width: 36, height: 36, borderRadius: 2, flexShrink: 0,
              bgcolor: d.bg, border: `2px solid ${d.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
            }}>
              <EmojiEventsIcon sx={{ fontSize: 18, color: d.color }} />
            </Box>
            <Box>
              <Typography fontSize={10} fontWeight={700} color="#94a3b8" letterSpacing={0.5} lineHeight={1} textTransform="uppercase">
                Problem #{idx + 1}
              </Typography>
              <Typography fontSize={15} fontWeight={800} color="#0f172a" lineHeight={1.25} mt={0.3}>
                {problem.title}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{
            px: 1.2, py: 0.4, borderRadius: 1.5, flexShrink: 0,
            bgcolor: d.bg, color: d.color,
            border: `1.5px solid ${d.border}`,
            fontSize: 11, fontWeight: 800,
            display: "flex", alignItems: "center", gap: 0.4,
          }}>
            {d.emoji} {d.label}
          </Box>
        </Stack>

        {/* tags */}
        <Stack direction="row" spacing={0.7} flexWrap="wrap" gap={0.5}>
          {(problem.tags || []).slice(0, 4).map((t) => (
            <Box key={t} sx={{
              px: 1, py: 0.25, borderRadius: 1,
              bgcolor: "#f1f5f9", color: "#64748b",
              border: "1px solid #e2e8f0",
              fontSize: 10, fontWeight: 600,
            }}>
              {t}
            </Box>
          ))}
        </Stack>

        <Typography color="#64748b" fontSize={13} lineHeight={1.6}>
          Solve this challenge and improve your problem-solving speed.
        </Typography>

        {/* CTA */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={0.5}>
          <Box sx={{
            display: "flex", alignItems: "center", gap: 0.5,
            color: d.color, fontSize: 13, fontWeight: 700,
          }}>
            Solve now <ArrowForwardIcon sx={{ fontSize: 14 }} />
          </Box>
          <Box sx={{
            px: 1, py: 0.3, borderRadius: 1,
            bgcolor: "#f8fafc", color: "#94a3b8",
            border: "1px solid #e2e8f0",
            fontSize: 10, fontWeight: 600,
          }}>
            {problem.difficulty === "easy" ? "~10 min" : problem.difficulty === "medium" ? "~20 min" : "~30 min"}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export function ProblemListPage() {
  const [difficulty, setDifficulty] = useState("");
  const [q,          setQ]          = useState("");
  const [problems,   setProblems]   = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [daily,      setDaily]      = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await api.get("/gamification/challenge/today");
        setDaily(r.data);
      } catch { /* optional */ }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get("/problems", {
          params: { difficulty: difficulty || undefined, q: q || undefined, problemType: "practice_problem" },
        });
        setProblems(res.data.problems || []);
      } finally { setLoading(false); }
    })();
  }, [difficulty, q]);

  const easy   = problems.filter((p) => p.difficulty === "easy").length;
  const medium = problems.filter((p) => p.difficulty === "medium").length;
  const hard   = problems.filter((p) => p.difficulty === "hard").length;

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
        <Box sx={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(2,132,199,0.06), transparent 70%)", pointerEvents: "none" }} />

        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }}
          justifyContent="space-between" spacing={2} mt={0.5}>
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, mb: 0.8 }}>
              Practice Arena
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: -0.6, lineHeight: 1.1 }}>
              Problems
            </Typography>
            <Typography sx={{ color: "#64748b", fontSize: 14, mt: 0.5 }}>
              Practice daily and improve your coding speed.
            </Typography>
          </Box>

          {/* stat pills */}
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            <Box sx={{ px: 1.5, py: 0.8, borderRadius: 2, bgcolor: "#f0fdf4", border: "1.5px solid #bbf7d0", color: "#15803d", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 0.6 }}>
              🟢 {easy} Easy
            </Box>
            <Box sx={{ px: 1.5, py: 0.8, borderRadius: 2, bgcolor: "#fffbeb", border: "1.5px solid #fde68a", color: "#b45309", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 0.6 }}>
              🟡 {medium} Med
            </Box>
            <Box sx={{ px: 1.5, py: 0.8, borderRadius: 2, bgcolor: "#fef2f2", border: "1.5px solid #fecaca", color: "#b91c1c", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 0.6 }}>
              🔴 {hard} Hard
            </Box>
          </Stack>
        </Stack>

        {daily?.challenge && (
          <Stack
            component={RouterLink}
            to={`/problems/${daily.challenge.slug}`}
            direction="row"
            sx={{
              alignItems: "center",
              gap: 1,
              mt: 2.5,
              px: 2, py: 1.2, borderRadius: 2,
              bgcolor: daily.solvedToday ? "#f0fdf4" : "#fffbeb",
              border: `1.5px solid ${daily.solvedToday ? "#86efac" : "#fde68a"}`,
              textDecoration: "none",
              width: "fit-content",
              "&:hover": { filter: "brightness(0.98)" },
            }}
          >
            <WhatshotIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
            <Box>
              <Typography fontSize={13} fontWeight={800} color="#b45309">
                Daily challenge: {daily.challenge.title}
                {daily.solvedToday ? " ✓" : ""}
              </Typography>
              <Typography fontSize={11} color="#92400e">
                +75 bonus XP · {daily.challenge.solverCount} solved today
              </Typography>
            </Box>
            <BoltIcon sx={{ fontSize: 14, color: "#f59e0b" }} />
          </Stack>
        )}
      </Box>

      {/* ── Search ── */}
      <Box sx={{
        display: "flex", alignItems: "center", gap: 1.2,
        px: 1.8, py: 1.2, mb: 2,
        bgcolor: "#fff", border: "2px solid #e2e8f0", borderRadius: 2.5,
        "&:focus-within": { borderColor: "#0284c7", boxShadow: "0 0 0 3px rgba(2,132,199,0.1)" },
        transition: "all 0.15s",
      }}>
        <SearchIcon sx={{ fontSize: 20, color: "#94a3b8", flexShrink: 0 }} />
        <Box component="input"
          placeholder="Search problems by name or tag…"
          value={q} onChange={(e) => setQ(e.target.value)}
          sx={{
            border: "none", outline: "none", bgcolor: "transparent",
            fontSize: 14, color: "#0f172a", width: "100%",
            "::placeholder": { color: "#94a3b8" },
          }}
        />
        {q && (
          <Box onClick={() => setQ("")} sx={{
            fontSize: 11, fontWeight: 700, color: "#94a3b8",
            cursor: "pointer", "&:hover": { color: "#ef4444" }, flexShrink: 0,
          }}>
            ✕ Clear
          </Box>
        )}
      </Box>

      {/* ── Difficulty pills ── */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" gap={1} mb={1.5}>
          <Box sx={{ width: 4, height: 16, bgcolor: "#0284c7", borderRadius: 99 }} />
          <Typography fontSize={11} fontWeight={700} color="#94a3b8" textTransform="uppercase" letterSpacing={1}>
            Filter by Difficulty
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {DIFF_FILTERS.map((item) => (
            <DiffPill key={item.value} item={item}
              active={difficulty === item.value}
              onClick={() => setDifficulty(item.value)} />
          ))}
        </Stack>
      </Box>

      {/* ── Results label ── */}
      {!loading && (
        <Stack direction="row" alignItems="center" gap={1.5} mb={2.5}>
          <Box sx={{ width: 4, height: 22, bgcolor: "#0284c7", borderRadius: 99 }} />
          <Typography fontSize={15} fontWeight={800} color="#0f172a">
            {difficulty ? DIFF[difficulty]?.label + " Problems" : "All Problems"}
          </Typography>
          <Box sx={{ px: 1.2, py: 0.2, bgcolor: "#eff6ff", color: "#0284c7", borderRadius: 1, fontSize: 11, fontWeight: 700 }}>
            {problems.length} result{problems.length !== 1 ? "s" : ""}
          </Box>
        </Stack>
      )}

      {/* ── Problem grid ── */}
      {loading ? (
        <Grid container spacing={2}>
          {[1,2,3,4].map((i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Skeleton variant="rounded" height={190} sx={{ borderRadius: 3.5 }} />
            </Grid>
          ))}
        </Grid>
      ) : problems.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography fontSize={48} mb={1}>🔍</Typography>
          <Typography variant="h6" fontWeight={800} color="#374151">No problems found</Typography>
          <Typography color="#94a3b8" fontSize={14} mt={0.5}>
            Try a different difficulty or clear the search
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {problems.map((p, idx) => (
            <Grid item xs={12} sm={6} key={p.slug}>
              <ProblemCard problem={p} idx={idx} />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}