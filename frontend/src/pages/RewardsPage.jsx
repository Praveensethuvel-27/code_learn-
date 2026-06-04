import { useEffect, useState } from "react";
import {
  Alert, Box, Grid, LinearProgress, Paper, Stack, Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { api } from "../lib/apiClient";

export function RewardsPage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/gamification/me");
        setProfile(res.data.profile);
      } catch (e) {
        setError(e?.response?.data?.message || "Login required");
      }
    })();
  }, []);

  if (error) {
    return <Alert severity="warning">{error} — <RouterLink to="/login">Login</RouterLink></Alert>;
  }
  if (!profile) return null;

  const pct = profile.levelProgress.next
    ? Math.min(100, (profile.levelProgress.current / profile.levelProgress.next) * 100)
    : 100;

  return (
    <Stack spacing={3}>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a" }}>XP & Badges</Typography>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: "#eef2ff", borderColor: "#c7d2fe" }}>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} spacing={2}>
          <Box sx={{
            width: 72, height: 72, borderRadius: 3, bgcolor: "#4f46e5", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, fontWeight: 900,
          }}>
            {profile.level}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Level {profile.level}</Typography>
            <Typography sx={{ color: "#4338ca", fontWeight: 700 }}>{profile.xp} XP total</Typography>
            <Typography fontSize={13} color="text.secondary" mt={0.5}>
              {profile.uniqueSolved} unique problems solved · {profile.earnedBadgeCount} badges
            </Typography>
            <LinearProgress variant="determinate" value={pct} sx={{ mt: 1.5, height: 8, borderRadius: 99 }} />
            <Typography fontSize={11} color="text.secondary" mt={0.5}>
              {profile.levelProgress.remaining} XP to level {profile.level + 1}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Typography fontWeight={800} fontSize={16}>Badges</Typography>
      <Grid container spacing={1.5}>
        {profile.badges.map((b) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={b.id}>
            <Paper
              variant="outlined"
              sx={{
                p: 2, borderRadius: 2.5, textAlign: "center", height: "100%",
                opacity: b.earned ? 1 : 0.45,
                borderColor: b.earned ? b.color : "#e2e8f0",
                bgcolor: b.earned ? b.bg : "#f8fafc",
              }}
            >
              <Typography fontSize={32}>{b.icon}</Typography>
              <Typography fontWeight={800} fontSize={13} mt={0.5}>{b.title}</Typography>
              <Typography fontSize={11} color="text.secondary" mt={0.3}>{b.desc}</Typography>
              {b.earned && (
                <Typography fontSize={10} fontWeight={700} color={b.color} mt={0.8}>EARNED</Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
