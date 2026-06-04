import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Box, Button, Grid, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ExtensionIcon from "@mui/icons-material/Extension";
import { api } from "../lib/apiClient";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function StreakPage() {
  const [stats, setStats] = useState(null);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [progRes, subRes] = await Promise.all([
          api.get("/streak/progress"),
          api.get("/submissions/me"),
        ]);
        setStats(progRes.data);
        setSubs(subRes.data.submissions || []);
      } catch { /* ignore */ }
    })();
  }, []);

  const today = new Date();
  const activeDays = new Set(subs.map((s) => new Date(s.createdAt).toDateString()));

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d;
  });

  const currentStreak = stats?.displayStreak ?? 0;
  const dailyStreak = stats?.dailyStreak ?? 0;
  const completionBonus = stats?.completionBonus ?? 0;
  const practiceSolved = stats?.practiceSolved ?? 0;
  const practiceTotal = stats?.practiceTotal ?? 0;
  const allComplete = stats?.allPracticeComplete ?? false;
  const tips = stats?.streakTips ?? [];
  const practicePct = practiceTotal ? Math.round((practiceSolved / practiceTotal) * 100) : 0;
  const streakPercent = Math.min(100, (dailyStreak / 7) * 100);

  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (29 - i));
    return { date: d, active: activeDays.has(d.toDateString()) };
  });

  return (
    <Stack spacing={0}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.6, color: "#0f172a", lineHeight: 1.1 }}>
          Streak
        </Typography>
        <Typography color="text.secondary" fontSize={14} mt={0.5}>
          Solve daily to build your streak. Finish all practice problems for a bonus +1.
        </Typography>
      </Box>

      {allComplete && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
          You completed every practice problem — +1 streak bonus applied.
        </Alert>
      )}

      <Paper variant="outlined" sx={{
        p: 3, borderRadius: 3, mb: 2.5,
        bgcolor: currentStreak > 0 ? "#fff7ed" : "#f8fafc",
        borderColor: currentStreak > 0 ? "#fed7aa" : "#e2e8f0",
      }}>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }}
          justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Box sx={{
              width: 64, height: 64, borderRadius: 3,
              bgcolor: currentStreak > 0 ? "#fff" : "#f1f5f9",
              border: `2px solid ${currentStreak > 0 ? "#fed7aa" : "#e2e8f0"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: currentStreak > 0 ? "0 4px 14px rgba(249,115,22,0.2)" : "none",
            }}>
              <WhatshotIcon sx={{ fontSize: 34, color: currentStreak > 0 ? "#f97316" : "#94a3b8" }} />
            </Box>
            <Box>
              <Typography fontSize={12} fontWeight={600} color={currentStreak > 0 ? "#c2410c" : "#64748b"}
                textTransform="uppercase" letterSpacing={0.8}>
                Streak score
              </Typography>
              <Typography sx={{ fontSize: "2.8rem", fontWeight: 900, lineHeight: 1, color: currentStreak > 0 ? "#ea580c" : "#0f172a" }}>
                {currentStreak}
                <Typography component="span" fontSize={16} fontWeight={600} color="text.secondary" ml={0.8}>
                  day{currentStreak !== 1 ? "s" : ""}
                </Typography>
              </Typography>
              {completionBonus > 0 && (
                <Typography fontSize={11} color="#16a34a" fontWeight={700} mt={0.3}>
                  includes +{completionBonus} for completing all practice problems
                </Typography>
              )}
            </Box>
          </Stack>

          <Stack spacing={1} sx={{ minWidth: 180 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize={12} color="text.secondary">Daily streak</Typography>
              <Typography fontSize={12} fontWeight={700} color="#f97316">{dailyStreak}/7</Typography>
            </Stack>
            <LinearProgress variant="determinate" value={streakPercent} sx={{
              height: 8, borderRadius: 99, bgcolor: "#fee2e2",
              "& .MuiLinearProgress-bar": { bgcolor: "#f97316", borderRadius: 99 },
            }} />
          </Stack>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: "#e2e8f0", mb: 2.5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
          <Stack direction="row" alignItems="center" gap={1}>
            <ExtensionIcon sx={{ fontSize: 18, color: "#4f46e5" }} />
            <Typography fontWeight={800} fontSize={14} color="#0f172a">Practice problems</Typography>
          </Stack>
          <Typography fontSize={12} fontWeight={700} color="#4f46e5">
            {practiceSolved}/{practiceTotal} solved
          </Typography>
        </Stack>
        <LinearProgress variant="determinate" value={practicePct} sx={{
          height: 8, borderRadius: 99, mb: 1.5,
          bgcolor: "#eef2ff",
          "& .MuiLinearProgress-bar": { bgcolor: "#4f46e5", borderRadius: 99 },
        }} />
        <Typography fontSize={12} color="text.secondary" mb={1.5}>
          {allComplete
            ? "All practice problems accepted — streak bonus active."
            : `Solve ${practiceTotal - practiceSolved} more to unlock +1 streak bonus.`}
        </Typography>
        <Button component={RouterLink} to="/problems" variant="contained" size="small"
          sx={{ fontWeight: 700, bgcolor: "#4f46e5", borderRadius: 2, textTransform: "none" }}>
          Go to Problems
        </Button>
      </Paper>

      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        {[
          { label: "Active days", value: stats?.activeDays ?? activeDays.size, color: "#4f46e5", bg: "#eef2ff", icon: <EmojiEventsIcon sx={{ fontSize: 20, color: "#4f46e5" }} /> },
          { label: "Submissions", value: stats?.totalSubmissions ?? subs.length, color: "#0284c7", bg: "#e0f2fe", icon: <CheckCircleIcon sx={{ fontSize: 20, color: "#0284c7" }} /> },
          { label: "Daily streak", value: dailyStreak, color: "#f97316", bg: "#fff7ed", icon: <WhatshotIcon sx={{ fontSize: 20, color: "#f97316" }} /> },
        ].map((s) => (
          <Grid size={{ xs: 12, sm: 4 }} key={s.label}>
            <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: "#e2e8f0" }}>
              <Stack direction="row" alignItems="center" gap={1.5}>
                <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {s.icon}
                </Box>
                <Box>
                  <Typography fontSize={12} color="text.secondary">{s.label}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, lineHeight: 1.1 }}>{s.value}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: "#e2e8f0", mb: 2.5 }}>
        <Typography fontWeight={700} fontSize={14} color="#0f172a" mb={2}>Last 7 Days</Typography>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          {last7Days.map((d, i) => {
            const active = activeDays.has(d.toDateString());
            const isToday = d.toDateString() === today.toDateString();
            return (
              <Stack key={i} alignItems="center" spacing={0.8} sx={{ flex: 1 }}>
                <Typography fontSize={11} fontWeight={600} color={isToday ? "#4f46e5" : "#94a3b8"}>
                  {DAY_LABELS[d.getDay() === 0 ? 6 : d.getDay() - 1]}
                </Typography>
                <Box sx={{
                  width: 38, height: 38, borderRadius: 2,
                  bgcolor: active ? "#fff7ed" : "#f8fafc",
                  border: `2px solid ${active ? "#fed7aa" : isToday ? "#c7d2fe" : "#e2e8f0"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {active
                    ? <WhatshotIcon sx={{ fontSize: 20, color: "#f97316" }} />
                    : <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: isToday ? "#4f46e5" : "#e2e8f0" }} />}
                </Box>
                <Typography fontSize={10} color="text.secondary">{d.getDate()}</Typography>
              </Stack>
            );
          })}
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: "#e2e8f0", mb: 2.5 }}>
        <Typography fontWeight={700} fontSize={14} color="#0f172a" mb={2}>Last 30 Days Activity</Typography>
        <Stack direction="row" flexWrap="wrap" gap={0.7}>
          {last30.map((d, i) => (
            <Box key={i} title={d.date.toDateString()} sx={{
              width: 22, height: 22, borderRadius: 1,
              bgcolor: d.active ? "#fed7aa" : "#f1f5f9",
              border: `1px solid ${d.active ? "#f97316" : "#e2e8f0"}`,
            }} />
          ))}
        </Stack>
      </Paper>

      {tips.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: "#e2e8f0" }}>
          <Typography fontWeight={700} fontSize={14} color="#0f172a" mb={1.5}>Consistency tips</Typography>
          <Stack spacing={1}>
            {tips.map((tip, i) => (
              <Typography key={i} sx={{ fontSize: 13, color: "text.secondary", lineHeight: 1.6 }}>
                {i + 1}. {tip}
              </Typography>
            ))}
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}