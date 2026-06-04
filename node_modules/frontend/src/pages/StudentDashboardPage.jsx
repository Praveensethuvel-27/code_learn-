import { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ExtensionIcon from "@mui/icons-material/Extension";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import { api } from "../lib/apiClient";
import { LEVEL_XP_STEP } from "../config/gamification";
import { MouseGlowLayer } from "../components/MouseGlowLayer";

const STATUS = {
  accepted: { color: "#15803d", bg: "#f0fdf4" },
  wrong_answer: { color: "#b45309", bg: "#fffbeb" },
  compile_error: { color: "#b91c1c", bg: "#fef2f2" },
  runtime_error: { color: "#b91c1c", bg: "#fef2f2" },
};

const QUICK_LINKS = [
  { to: "/problems", label: "Practice", sub: "70 problems", Icon: ExtensionIcon, color: "#4f46e5" },
  { to: "/leaderboard", label: "Leaderboard", sub: "See your rank", Icon: LeaderboardIcon, color: "#d97706" },
  { to: "/rewards", label: "XP & Badges", sub: "Level up", Icon: WorkspacePremiumIcon, color: "#0891b2" },
  { to: "/streak", label: "Streak", sub: "Daily habit", Icon: LocalFireDepartmentIcon, color: "#ea580c" },
];

function QuickLinkCard({ item }) {
  const Icon = item.Icon;
  return (
    <Box
      component={RouterLink}
      to={item.to}
      sx={{
        width: "100%",
        boxSizing: "border-box",
        p: 2,
        borderRadius: 2.5,
        textDecoration: "none",
        bgcolor: "#fff",
        border: "2px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 1,
        minHeight: 128,
        transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: item.color,
          boxShadow: `0 10px 24px ${item.color}28`,
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: item.color,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: 26 }} />
      </Box>
      <Typography sx={{ fontWeight: 800, fontSize: 14, color: "#0f172a", lineHeight: 1.2 }}>{item.label}</Typography>
      <Typography sx={{ fontSize: 12, color: "#64748b", lineHeight: 1.3, px: 0.5 }}>{item.sub}</Typography>
    </Box>
  );
}

function StatTile({ icon, label, value, sub, solid }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        height: "100%",
        bgcolor: solid || "#fff",
        border: solid ? "none" : "1.5px solid #e2e8f0",
        color: solid ? "#fff" : "inherit",
        transition: "transform 0.18s, box-shadow 0.18s",
        "&:hover": { transform: "translateY(-3px)", boxShadow: "0 12px 28px rgba(15,23,42,0.12)" },
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: solid ? "rgba(255,255,255,0.2)" : "#f1f5f9",
            color: solid ? "#fff" : "#4f46e5",
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 600, opacity: solid ? 0.9 : 0.7, textTransform: "uppercase", letterSpacing: 0.5 }}>
            {label}
          </Typography>
          <Typography sx={{ fontWeight: 900, fontSize: 26, lineHeight: 1.1, letterSpacing: -0.5 }}>
            {value}
          </Typography>
          <Typography sx={{ fontSize: 11, mt: 0.3, opacity: solid ? 0.85 : 0.65 }}>{sub}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export function StudentDashboardPage({ user }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subs, setSubs] = useState([]);
  const [savedCodes, setSavedCodes] = useState([]);
  const [streakProg, setStreakProg] = useState(null);
  const [profile, setProfile] = useState(null);
  const [daily, setDaily] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [sRes, cRes, progRes, gamRes, dailyRes] = await Promise.all([
          api.get("/submissions/me"),
          api.get("/savedcodes/me"),
          api.get("/streak/progress"),
          api.get("/gamification/me").catch(() => ({ data: {} })),
          api.get("/gamification/challenge/today").catch(() => ({ data: {} })),
        ]);
        setSubs(sRes.data.submissions || []);
        setSavedCodes(cRes.data.savedCodes || []);
        setStreakProg(progRes.data);
        setProfile(gamRes.data?.profile ?? null);
        setDaily(dailyRes.data?.challenge ?? null);
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const accepted = subs.filter((s) => s.status === "accepted").length;
  const practiceSolved = streakProg?.practiceSolved ?? 0;
  const practiceTotal = streakProg?.practiceTotal ?? 0;
  const practicePct = practiceTotal ? Math.round((practiceSolved / practiceTotal) * 100) : 0;
  const displayStreak = streakProg?.displayStreak ?? profile?.streak ?? 0;
  const xp = profile?.xp ?? 0;
  const level = profile?.level ?? 1;
  const levelPct = profile?.levelProgress?.next
    ? Math.min(100, (xp / profile.levelProgress.next) * 100)
    : Math.min(100, ((xp % LEVEL_XP_STEP) / LEVEL_XP_STEP) * 100);
  const earnedBadges = (profile?.badges || []).filter((b) => b.earned).slice(0, 4);
  const firstName = user?.name?.split(" ")[0] ?? "Student";
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 320 }}>
        <CircularProgress sx={{ color: "#4f46e5" }} />
      </Box>
    );
  }

  return (
    <MouseGlowLayer glowColor="99, 102, 241" intensity={0.08} sx={{ borderRadius: 2, mx: -0.5, px: 0.5 }}>
    <Stack spacing={3}>
      {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

      {/* Hero */}
      <MouseGlowLayer
        glowColor="255, 255, 255"
        intensity={0.12}
        blurSize={280}
        sx={{ borderRadius: 4 }}
      >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 4,
          bgcolor: "#4f46e5",
          color: "#fff",
          border: "none",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2.5}
          sx={{ alignItems: { md: "center" }, position: "relative", zIndex: 1 }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center", flex: 1, minWidth: 0 }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: "rgba(255,255,255,0.2)",
                border: "2px solid rgba(255,255,255,0.4)",
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              {initials}
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 600, opacity: 0.9, mb: 0.3 }}>
                Welcome back
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.5, lineHeight: 1.15 }}>
                {firstName}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap", gap: 0.5 }}>
                <Box sx={{ px: 1.2, py: 0.35, borderRadius: 99, bgcolor: "rgba(255,255,255,0.2)", fontSize: 11, fontWeight: 700 }}>
                  Level {level}
                </Box>
                <Box sx={{ px: 1.2, py: 0.35, borderRadius: 99, bgcolor: "rgba(255,255,255,0.2)", fontSize: 11, fontWeight: 700 }}>
                  {xp} XP
                </Box>
                <Box sx={{ px: 1.2, py: 0.35, borderRadius: 99, bgcolor: "#f59e0b", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 0.4 }}>
                  <LocalFireDepartmentIcon sx={{ fontSize: 13 }} /> {displayStreak} day streak
                </Box>
              </Stack>
            </Box>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flexShrink: 0 }}>
            <Button
              component={RouterLink}
              to="/problems"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                fontWeight: 800,
                borderRadius: 2.5,
                bgcolor: "#fff",
                color: "#4f46e5",
                textTransform: "none",
                px: 2.5,
                "&:hover": { bgcolor: "#f8fafc" },
              }}
            >
              Continue practice
            </Button>
            <Button
              component={RouterLink}
              to="/editor"
              variant="outlined"
              startIcon={<CodeIcon />}
              sx={{
                fontWeight: 700,
                borderRadius: 2.5,
                borderColor: "rgba(255,255,255,0.5)",
                color: "#fff",
                textTransform: "none",
                "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              Open editor
            </Button>
          </Stack>
        </Stack>
        <Box sx={{ mt: 2.5, position: "relative", zIndex: 1 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.6 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 600, opacity: 0.9 }}>Level progress</Typography>
            <Typography sx={{ fontSize: 11, fontWeight: 700 }}>
              {profile?.levelProgress?.remaining != null
                ? `${profile.levelProgress.remaining} XP to Level ${level + 1}`
                : `${Math.round(levelPct)}%`}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={levelPct}
            sx={{
              height: 8,
              borderRadius: 99,
              bgcolor: "rgba(255,255,255,0.2)",
              "& .MuiLinearProgress-bar": { borderRadius: 99, bgcolor: "#fbbf24" },
            }}
          />
        </Box>
      </Paper>
      </MouseGlowLayer>



      {/* Daily challenge */}
      {daily?.slug && (
        <Paper
          component={RouterLink}
          to={`/problems/${daily.slug}`}
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            textDecoration: "none",
            display: "block",
            bgcolor: "#fffbeb",
            border: "2px solid #f59e0b",
            transition: "transform 0.15s, box-shadow 0.15s",
            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(245,158,11,0.2)" },
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2.5,
                bgcolor: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <WhatshotIcon sx={{ color: "#fff", fontSize: 28 }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 10, fontWeight: 800, color: "#b45309", letterSpacing: 0.8, textTransform: "uppercase" }}>
                Today&apos;s challenge · +75 XP
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }} noWrap>
                {daily.title}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#78716c" }}>
                {daily.difficulty} · {daily.solverCount ?? 0} solved today
              </Typography>
            </Box>
            <PlayArrowIcon sx={{ color: "#b45309", fontSize: 28 }} />
          </Stack>
        </Paper>
      )}

      {/* Quick links */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(5, minmax(0, 1fr))" },
          gap: 1.5,
          width: "100%",
        }}
      >
        {QUICK_LINKS.map((q) => (
          <QuickLinkCard key={q.to} item={q} />
        ))}
      </Box>

      {/* Stats */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatTile
            solid="#4f46e5"
            icon={<MilitaryTechIcon />}
            label="Level"
            value={level}
            sub={`${xp} total XP`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatTile
            icon={<LocalFireDepartmentIcon sx={{ color: "#ea580c" }} />}
            label="Streak"
            value={displayStreak}
            sub="days coding"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatTile
            icon={<ExtensionIcon sx={{ color: "#7c3aed" }} />}
            label="Practice"
            value={`${practiceSolved}/${practiceTotal}`}
            sub={`${practicePct}% complete`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatTile
            icon={<EmojiEventsIcon sx={{ color: "#d97706" }} />}
            label="Solved"
            value={accepted}
            sub={`${subs.length} submissions`}
          />
        </Grid>
      </Grid>

      {/* Practice progress + badges */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: "#e2e8f0", height: "100%" }}>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>Practice path progress</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 14, color: "#4f46e5" }}>{practicePct}%</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={practicePct}
              sx={{
                height: 12,
                borderRadius: 99,
                mb: 2,
                bgcolor: "#e2e8f0",
                "& .MuiLinearProgress-bar": { borderRadius: 99, bgcolor: "#4f46e5" },
              }}
            />
            <Typography sx={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, mb: 2 }}>
              {streakProg?.allPracticeComplete
                ? "Amazing — you completed all practice problems! Keep your streak alive with daily challenges."
                : practiceTotal > 0
                  ? `${Math.max(0, practiceTotal - practiceSolved)} problems left to unlock the full streak bonus.`
                  : "Practice problems will appear here once published."}
            </Typography>
            <Button
              component={RouterLink}
              to="/practice-paths"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{ fontWeight: 700, bgcolor: "#4f46e5", borderRadius: 2, textTransform: "none", "&:hover": { bgcolor: "#4338ca" } }}
            >
              Browse practice paths
            </Button>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: "#e2e8f0", height: "100%" }}>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>Your badges</Typography>
              <Button component={RouterLink} to="/rewards" size="small" sx={{ textTransform: "none", fontWeight: 700 }}>
                View all
              </Button>
            </Stack>
            {earnedBadges.length > 0 ? (
              <Grid container spacing={1}>
                {earnedBadges.map((b) => (
                  <Grid key={b.id} size={{ xs: 6 }}>
                    <Box
                      sx={{
                        p: 1.2,
                        borderRadius: 2,
                        textAlign: "center",
                        bgcolor: b.bg,
                        border: `1.5px solid ${b.color}44`,
                      }}
                    >
                      <Typography sx={{ fontSize: 26 }}>{b.icon}</Typography>
                      <Typography sx={{ fontSize: 11, fontWeight: 800, color: b.color }}>{b.title}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography sx={{ fontSize: 13, color: "#94a3b8", py: 2, textAlign: "center" }}>
                Solve your first problem to earn badges 🏅
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Activity */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: "#e2e8f0" }}>
            <Stack direction="row" sx={{ alignItems: "center", gap: 1, mb: 2 }}>
              <BookmarkIcon sx={{ fontSize: 18, color: "#0284c7" }} />
              <Typography sx={{ fontWeight: 800, fontSize: 15 }}>Saved snippets</Typography>
              <Box sx={{ ml: "auto", px: 1, py: 0.2, borderRadius: 99, bgcolor: "#e0f2fe", fontSize: 11, fontWeight: 700, color: "#0369a1" }}>
                {savedCodes.length}
              </Box>
            </Stack>
            <Stack spacing={1}>
              {savedCodes.slice(0, 5).map((s) => (
                <Box
                  key={s._id}
                  component={RouterLink}
                  to="/saved-codes"
                  sx={{
                    p: 1.25,
                    borderRadius: 2,
                    border: "1px solid #e2e8f0",
                    bgcolor: "#f8fafc",
                    textDecoration: "none",
                    display: "block",
                    "&:hover": { bgcolor: "#f1f5f9", borderColor: "#cbd5e1" },
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }} noWrap>
                    {s.title}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: "#94a3b8" }}>{s.language}</Typography>
                </Box>
              ))}
              {!savedCodes.length && (
                <Typography sx={{ fontSize: 13, color: "#94a3b8", textAlign: "center", py: 2 }}>
                  No snippets yet — try the{" "}
                  <Box component={RouterLink} to="/editor" sx={{ color: "#4f46e5", fontWeight: 700 }}>
                    editor
                  </Box>
                </Typography>
              )}
            </Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: "#e2e8f0" }}>
            <Stack direction="row" sx={{ alignItems: "center", gap: 1, mb: 2 }}>
              <LeaderboardIcon sx={{ fontSize: 18, color: "#7c3aed" }} />
              <Typography sx={{ fontWeight: 800, fontSize: 15 }}>Recent submissions</Typography>
            </Stack>
            <Stack spacing={1}>
              {subs.slice(0, 5).map((s) => {
                const sc = STATUS[s.status] || { color: "#64748b", bg: "#f1f5f9" };
                const slug = s.problem?.slug;
                return (
                  <Box
                    key={s._id}
                    component={slug ? RouterLink : "div"}
                    to={slug ? `/problems/${slug}` : undefined}
                    sx={{
                      p: 1.25,
                      borderRadius: 2,
                      border: "1px solid #e2e8f0",
                      bgcolor: "#f8fafc",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.25,
                      "&:hover": slug ? { bgcolor: "#f1f5f9" } : {},
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1.5,
                        bgcolor: sc.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {s.status === "accepted" ? (
                        <CheckCircleIcon sx={{ fontSize: 16, color: sc.color }} />
                      ) : (
                        <HighlightOffIcon sx={{ fontSize: 16, color: sc.color }} />
                      )}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }} noWrap>
                        {s.problem?.title ?? "Problem"}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: "#94a3b8" }}>
                        {s.summary?.passed}/{s.summary?.total} tests · {s.language}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
              {!subs.length && (
                <Typography sx={{ fontSize: 13, color: "#94a3b8", textAlign: "center", py: 2 }}>
                  No submissions yet —{" "}
                  <Box component={RouterLink} to="/problems" sx={{ color: "#4f46e5", fontWeight: 700 }}>
                    start practicing
                  </Box>
                </Typography>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
    </MouseGlowLayer>
  );
}
