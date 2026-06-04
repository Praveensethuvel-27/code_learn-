import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import BoltIcon from "@mui/icons-material/Bolt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";

const LANGUAGES = ["Python", "JavaScript", "Java", "C", "C++"];

export function HomePage() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          background:
            "linear-gradient(135deg, #0f0a1e 0%, #1a0a3e 40%, #0c1a3e 100%)",
          p: { xs: 4, md: 7 },
          mb: 4,
        }}
      >
        {/* Decorative blobs */}
        <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <Box sx={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,40,217,0.3), transparent 70%)" }} />
          <Box sx={{ position: "absolute", bottom: -60, left: "30%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.2), transparent 70%)" }} />
        </Box>

        <Stack spacing={3} sx={{ position: "relative", maxWidth: 680 }}>
          <Chip
            label="🚀 Learn • Code • Grow"
            size="small"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "rgba(109,40,217,0.35)",
              color: "#c4b5fd",
              fontWeight: 600,
              border: "1px solid rgba(167,139,250,0.3)",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              letterSpacing: -1.5,
              color: "#fff",
              lineHeight: 1.1,
              fontSize: { xs: "2.2rem", md: "3.2rem" },
            }}
          >
            Master coding.{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg, #a78bfa, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              One problem at a time.
            </Box>
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: 17, maxWidth: 520 }}>
            Interactive lessons, real code execution, and instant feedback — all in
            one place. Learn Python, JavaScript, Java, C & C++ with hands-on challenges.
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
            <Button
              component={RouterLink}
              to="/languages"
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(135deg, #6d28d9, #7c3aed)",
                fontWeight: 700,
                px: 3,
                py: 1.4,
                boxShadow: "0 8px 24px rgba(109,40,217,0.5)",
                "&:hover": { boxShadow: "0 12px 32px rgba(109,40,217,0.6)" },
              }}
            >
              Start Learning Free
            </Button>
            <Button
              component={RouterLink}
              to="/problems"
              variant="outlined"
              size="large"
              sx={{
                color: "#e2e8f0",
                borderColor: "rgba(255,255,255,0.25)",
                fontWeight: 600,
                px: 3,
                py: 1.4,
                "&:hover": { borderColor: "rgba(255,255,255,0.5)", bgcolor: "rgba(255,255,255,0.06)" },
              }}
            >
              Browse Problems
            </Button>
          </Stack>

          {/* Language badges */}
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {LANGUAGES.map((lang) => (
              <Chip
                key={lang}
                label={lang}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontWeight: 500,
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Box>

      {/* Stats row */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { icon: <SchoolIcon sx={{ color: "#6d28d9" }} />, stat: "5+", label: "Languages" },
          { icon: <CodeIcon sx={{ color: "#0ea5e9" }} />, stat: "50+", label: "Coding Problems" },
          { icon: <BoltIcon sx={{ color: "#f59e0b" }} />, stat: "Real", label: "Code Execution" },
          { icon: <EmojiEventsIcon sx={{ color: "#10b981" }} />, stat: "Free", label: "To Get Started" },
        ].map((item) => (
          <Grid item xs={6} md={3} key={item.label}>
            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                borderRadius: 3,
                textAlign: "center",
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
              }}
            >
              {item.icon}
              <Typography variant="h4" sx={{ fontWeight: 900, mt: 0.5 }}>
                {item.stat}
              </Typography>
              <Typography color="text.secondary" fontSize={13}>
                {item.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Feature cards */}
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, letterSpacing: -0.5 }}>
        Everything you need to learn
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<SchoolIcon fontSize="large" />}
            color="#6d28d9"
            bg="rgba(109,40,217,0.08)"
            title="Structured Lessons"
            desc="Topic-based curriculum covering Basics, Loops, Functions, OOP per language. Learn at your own pace."
            badge="5 Languages"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<CodeIcon fontSize="large" />}
            color="#0ea5e9"
            bg="rgba(14,165,233,0.08)"
            title="Live Code Editor"
            desc="Monaco-powered editor with real execution via Judge0. Write, run, and see output instantly."
            badge="Powered by Judge0"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureCard
            icon={<TrackChangesIcon fontSize="large" />}
            color="#10b981"
            bg="rgba(16,185,129,0.08)"
            title="Progress Tracking"
            desc="Track completed lessons, submission history, and saved code snippets on your personal dashboard."
            badge="Your Dashboard"
          />
        </Grid>
      </Grid>

      {/* CTA Banner */}
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background: "linear-gradient(135deg, rgba(109,40,217,0.08), rgba(14,165,233,0.06))",
          border: "1px solid rgba(109,40,217,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
        variant="outlined"
      >
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <GroupsIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Ready to start your coding journey?
            </Typography>
          </Stack>
          <Typography color="text.secondary" fontSize={14}>
            Join students who are already building real skills. It&apos;s completely free.
          </Typography>
        </Stack>
        <Button
          component={RouterLink}
          to="/signup"
          variant="contained"
          size="large"
          sx={{ fontWeight: 700, px: 3, whiteSpace: "nowrap" }}
        >
          Create Free Account
        </Button>
      </Paper>
    </Box>
  );
}

function FeatureCard({ icon, color, bg, title, desc, badge }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 3,
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 24px rgba(0,0,0,0.09)" },
      }}
    >
      <Stack spacing={1.5}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2.5,
            bgcolor: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
          }}
        >
          {icon}
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography sx={{ fontWeight: 800, fontSize: 16 }}>{title}</Typography>
          <Chip label={badge} size="small" sx={{ fontSize: 10, height: 18 }} />
        </Stack>
        <Typography color="text.secondary" fontSize={14} lineHeight={1.6}>
          {desc}
        </Typography>
      </Stack>
    </Paper>
  );
}
