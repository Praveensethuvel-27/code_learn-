import { Box, Typography } from "@mui/material";
import { AnimatedRobot } from "./AnimatedRobot";

export function ChatBotAnimation({ loading = false, subtitle, compact = false, waving = false }) {
  if (compact) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
        <AnimatedRobot size="sm" thinking={loading} showShadow={false} waving={false} />
        <Typography sx={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
          {loading ? "Thinking…" : "AI tutor"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", py: 4, px: 2 }}>
      <AnimatedRobot size="lg" thinking={loading} showShadow waving={waving} />
      <Typography sx={{ fontWeight: 900, fontSize: 20, color: "#0f172a", mt: 2, letterSpacing: -0.3 }}>
        {loading ? "Thinking…" : waving ? "Hello! 👋" : "CodeLearn AI Tutor"}
      </Typography>
      <Typography sx={{ fontSize: 14, color: "#64748b", mt: 0.75, maxWidth: 360, mx: "auto", lineHeight: 1.55 }}>
        {subtitle || "Coding doubts, bugs, logic, DSA — or AI/ML topics. Ask anything."}
      </Typography>
    </Box>
  );
}
