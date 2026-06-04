import { Box, Paper, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SchemaIcon from "@mui/icons-material/Schema";

/**
 * In-lesson learning visual: mind map or step workflow (not stock photos).
 */
export function LessonVisualDiagram({ diagram, color = "#7c3aed", lessonTitle }) {
  if (!diagram) return null;

  const isFlow = diagram.type === "flow";

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 2.5,
        p: { xs: 2, md: 2.5 },
        borderRadius: 2.5,
        border: `2px solid ${color}44`,
        bgcolor: `${color}06`,
        overflow: "hidden",
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
        {isFlow ? (
          <SchemaIcon sx={{ color, fontSize: 22 }} />
        ) : (
          <AccountTreeIcon sx={{ color, fontSize: 22 }} />
        )}
        <Box>
          <Typography sx={{ fontSize: 10, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.6 }}>
            {isFlow ? "Workflow" : "Mind map"}
          </Typography>
          <Typography sx={{ fontWeight: 800, fontSize: 15, color: "#0f172a", lineHeight: 1.2 }}>
            {diagram.title || lessonTitle}
          </Typography>
        </Box>
      </Stack>

      {isFlow && diagram.steps?.length > 0 && <FlowSteps steps={diagram.steps} color={color} />}
      {!isFlow && diagram.center && (
        <MindMap center={diagram.center} branches={diagram.branches || []} color={color} />
      )}
    </Paper>
  );
}

function FlowSteps({ steps, color }) {
  return (
    <Box sx={{ overflowX: "auto", pb: 0.5 }}>
      <Stack
        direction="row"
        spacing={0}
        sx={{
          alignItems: "center",
          flexWrap: { xs: "nowrap", md: "wrap" },
          gap: { xs: 0, md: 1 },
          minWidth: "min-content",
        }}
      >
        {steps.map((step, i) => (
          <Stack key={i} direction="row" sx={{ alignItems: "center", flexShrink: 0 }}>
            <Box
              sx={{
                px: 1.75,
                py: 1.25,
                borderRadius: 2,
                bgcolor: "#fff",
                border: `2px solid ${color}`,
                boxShadow: `0 4px 14px ${color}22`,
                maxWidth: { xs: 140, sm: 180 },
              }}
            >
              <Typography sx={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", mb: 0.25 }}>
                Step {i + 1}
              </Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#1e293b", lineHeight: 1.35 }}>
                {step}
              </Typography>
            </Box>
            {i < steps.length - 1 && (
              <ArrowForwardIcon sx={{ color, mx: { xs: 0.5, md: 1 }, fontSize: 22, flexShrink: 0 }} />
            )}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

function MindMap({ center, branches, color }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          borderRadius: 3,
          bgcolor: color,
          color: "#fff",
          fontWeight: 900,
          fontSize: 16,
          textAlign: "center",
          boxShadow: `0 8px 24px ${color}55`,
          maxWidth: 320,
        }}
      >
        {center}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: `repeat(${Math.min(branches.length, 4)}, 1fr)` },
          gap: 1.25,
          width: "100%",
        }}
      >
        {branches.map((branch, i) => (
          <Box
            key={i}
            sx={{
              position: "relative",
              p: 1.5,
              borderRadius: 2,
              bgcolor: "#fff",
              border: `1.5px solid ${color}55`,
              "&::before": {
                content: '""',
                position: "absolute",
                top: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 2,
                height: 10,
                bgcolor: `${color}66`,
                display: { xs: "none", sm: "block" },
              },
            }}
          >
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: "#334155", lineHeight: 1.4, textAlign: "center" }}>
              {branch}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
