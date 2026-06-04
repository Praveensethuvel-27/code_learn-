import { Box, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

/**
 * ChatGPT-style composer: send arrow only when there is text and not loading.
 */
export function ChatComposer({ value, onChange, onSend, loading, placeholder }) {
  const canSend = Boolean(value.trim()) && !loading;

  return (
    <Box
      sx={{
        maxWidth: 768,
        mx: "auto",
        width: "100%",
        px: { xs: 1.5, md: 2 },
        pb: 2,
        pt: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 1,
          borderRadius: "28px",
          border: "1px solid",
          borderColor: canSend ? "#d1d5db" : "#e5e7eb",
          bgcolor: "#fff",
          boxShadow: canSend
            ? "0 2px 12px rgba(0,0,0,0.06)"
            : "0 1px 4px rgba(0,0,0,0.04)",
          px: 2,
          py: 1.25,
          transition: "border-color 0.2s, box-shadow 0.2s",
          "&:focus-within": {
            borderColor: "#a3a3a3",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          },
        }}
      >
        <Box
          component="textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && canSend) {
              e.preventDefault();
              onSend();
            }
          }}
          disabled={loading}
          placeholder={placeholder}
          rows={1}
          sx={{
            flex: 1,
            border: "none",
            outline: "none",
            resize: "none",
            fontFamily: "inherit",
            fontSize: 15,
            lineHeight: 1.5,
            maxHeight: 160,
            py: 0.5,
            bgcolor: "transparent",
            color: "#0f172a",
            "&::placeholder": { color: "#9ca3af" },
            "&:disabled": { opacity: 0.6 },
          }}
          onInput={(e) => {
            const t = e.target;
            t.style.height = "auto";
            t.style.height = `${Math.min(t.scrollHeight, 160)}px`;
          }}
        />
        {canSend && (
          <IconButton
            onClick={onSend}
            aria-label="Send message"
            sx={{
              width: 36,
              height: 36,
              flexShrink: 0,
              bgcolor: "#0f172a",
              color: "#fff",
              mb: 0.25,
              transition: "transform 0.15s, opacity 0.2s",
              animation: "fadeInBtn 0.2s ease",
              "@keyframes fadeInBtn": {
                from: { opacity: 0, transform: "scale(0.85)" },
                to: { opacity: 1, transform: "scale(1)" },
              },
              "&:hover": { bgcolor: "#1e293b", transform: "scale(1.05)" },
            }}
          >
            <ArrowUpwardIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
      </Box>
      <Box sx={{ textAlign: "center", mt: 1 }}>
        <Box component="span" sx={{ fontSize: 11, color: "#9ca3af" }}>
          Enter to send · Shift+Enter for new line
        </Box>
      </Box>
    </Box>
  );
}
