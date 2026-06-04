import { useEffect, useState } from "react";
import {
  Avatar, Box, Button, CircularProgress, LinearProgress,
  Paper, Stack, Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Shield";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ExtensionIcon from "@mui/icons-material/Extension";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "../providers/authContext";
import { api } from "../lib/apiClient";

const ROLE_STYLE = {
  admin: { color: "#d97706", bg: "#fef3c7", border: "#fde68a", label: "Admin" },
  user:  { color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe", label: "Student" },
};

export function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [gRes, sRes] = await Promise.all([
          api.get("/gamification/me"),
          api.get("/streak/progress"),
        ]);
        setProfile(gRes.data?.profile);
        setStreak(sRes.data);
      } catch { /* optional */ }
      finally { setLoading(false); }
    })();
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";
  const role = user?.role || "user";
  const rc = ROLE_STYLE[role] || ROLE_STYLE.user;
  const level = profile?.level ?? 1;
  const xp = profile?.xp ?? 0;
  const levelPct = profile?.levelProgress?.next
    ? Math.min(100, (xp / profile.levelProgress.next) * 100)
    : 0;
  const practicePct = streak?.practiceTotal
    ? Math.round(((streak.practiceSolved ?? 0) / streak.practiceTotal) * 100)
    : 0;

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress sx={{ color: "#4f46e5" }} />
      </Box>
    );
  }

  return (
    <Stack spacing={2.5} sx={{ maxWidth: 720, mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 3,
          bgcolor: "#4f46e5",
          color: "#fff",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} sx={{ alignItems: { sm: "center" } }}>
          <Avatar
            sx={{
              width: 72,
              height: 72,
              bgcolor: "rgba(255,255,255,0.2)",
              border: "3px solid rgba(255,255,255,0.5)",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: -0.4 }}>
              {user?.name || "Student"}
            </Typography>
            <Typography sx={{ opacity: 0.9, fontSize: 14, mt: 0.3 }}>{user?.email}</Typography>
            <Box
              sx={{
                display: "inline-flex",
                mt: 1,
                px: 1.2,
                py: 0.35,
                borderRadius: 1.5,
                bgcolor: "rgba(255,255,255,0.2)",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {rc.label}
            </Box>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Button
              component={RouterLink}
              to="/rewards"
              size="small"
              sx={{ bgcolor: "#fff", color: "#4f46e5", fontWeight: 700, textTransform: "none" }}
            >
              XP & Badges
            </Button>
            <Button
              component={RouterLink}
              to="/leaderboard"
              size="small"
              variant="outlined"
              sx={{ borderColor: "rgba(255,255,255,0.6)", color: "#fff", fontWeight: 700, textTransform: "none" }}
            >
              Leaderboard
            </Button>
          </Stack>
        </Stack>
        {profile && (
          <Box sx={{ mt: 2.5 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.6 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 600 }}>Level {level}</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{xp} XP</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={levelPct}
              sx={{
                height: 8,
                borderRadius: 99,
                bgcolor: "rgba(255,255,255,0.2)",
                "& .MuiLinearProgress-bar": { bgcolor: "#fbbf24", borderRadius: 99 },
              }}
            />
          </Box>
        )}
      </Paper>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <StatBlock
          icon={<MilitaryTechIcon sx={{ color: "#4f46e5" }} />}
          label="Level"
          value={String(level)}
          sub={`${profile?.earnedBadgeCount ?? 0} badges earned`}
        />
        <StatBlock
          icon={<LocalFireDepartmentIcon sx={{ color: "#ea580c" }} />}
          label="Streak"
          value={String(profile?.streak ?? streak?.displayStreak ?? 0)}
          sub="day coding streak"
        />
        <StatBlock
          icon={<ExtensionIcon sx={{ color: "#7c3aed" }} />}
          label="Practice"
          value={`${streak?.practiceSolved ?? 0}/${streak?.practiceTotal ?? 0}`}
          sub={`${practicePct}% complete`}
        />
        <StatBlock
          icon={<WorkspacePremiumIcon sx={{ color: "#0891b2" }} />}
          label="Solved"
          value={String(profile?.uniqueSolved ?? 0)}
          sub="unique problems"
        />
      </Stack>

      <Paper variant="outlined" sx={{ borderRadius: 3, borderColor: "#e2e8f0", overflow: "hidden" }}>
        <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid #e2e8f0", bgcolor: "#f8fafc" }}>
          <Typography fontWeight={800} fontSize={15}>Account details</Typography>
        </Box>
        {[
          { icon: <PersonIcon sx={{ fontSize: 16, color: "#4f46e5" }} />, label: "Full name", value: user?.name },
          { icon: <EmailIcon sx={{ fontSize: 16, color: "#0284c7" }} />, label: "Email", value: user?.email },
          {
            icon: <ShieldIcon sx={{ fontSize: 16, color: rc.color }} />,
            label: "Role",
            value: user?.role || "user",
          },
        ].map(({ icon, label, value }) => (
          <Stack
            key={label}
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              px: 2.5,
              py: 2,
              borderBottom: "1px solid #e2e8f0",
              "&:last-child": { borderBottom: "none" },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                bgcolor: "#f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>
            <Box>
              <Typography fontSize={11} color="text.secondary" fontWeight={600}>
                {label}
              </Typography>
              <Typography fontSize={14} fontWeight={700} color="#0f172a" sx={{ textTransform: label === "Role" ? "capitalize" : "none" }}>
                {value || "—"}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Paper>

      <Button
        component={RouterLink}
        to="/dashboard"
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        sx={{ alignSelf: "flex-start", bgcolor: "#4f46e5", fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: "#4338ca" } }}
      >
        Back to dashboard
      </Button>
    </Stack>
  );
}

function StatBlock({ icon, label, value, sub }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        flex: 1,
        p: 2,
        borderRadius: 2.5,
        borderColor: "#e2e8f0",
        minWidth: { xs: "100%", sm: 140 },
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography fontSize={11} color="text.secondary">
            {label}
          </Typography>
          <Typography sx={{ fontWeight: 900, fontSize: 22, lineHeight: 1.1 }}>{value}</Typography>
          <Typography fontSize={10} color="text.secondary">
            {sub}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
