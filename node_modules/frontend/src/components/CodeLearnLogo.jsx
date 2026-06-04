import { Box, Typography } from "@mui/material";

/** Shared CodeLearn brand mark */
export function CodeLearnLogo({ size = 28, showText = true, dark = false }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: 1.5,
          flexShrink: 0,
          bgcolor: "#4f46e5",
          boxShadow: "0 4px 14px rgba(79,70,229,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M8 6L16 12L8 18V6Z"
            fill="#fff"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M5 4H7V20H5V4Z" fill="rgba(255,255,255,0.85)" />
        </svg>
      </Box>
      {showText && (
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: size * 0.55,
            letterSpacing: -0.4,
            color: dark ? "#fff" : "inherit",
            lineHeight: 1,
          }}
        >
          CodeLearn
        </Typography>
      )}
    </Box>
  );
}
