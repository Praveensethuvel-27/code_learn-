import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { api } from "../lib/apiClient";

const STEPS = [
  { step: "1", text: "Enter your registered email above" },
  { step: "2", text: "Check inbox for the 6-digit OTP" },
  { step: "3", text: "Use OTP to set a new password" },
];

export function ForgotPasswordPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent,  setSent]  = useState(false);
  const [busy,  setBusy]  = useState(false);

  const handleSend = async () => {
    setError(""); setBusy(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
      nav("/reset-password", { state: { email } });
    } catch (e) {
      setError(e?.response?.data?.message || "Request failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f5f6fa" }}>
      <Stack spacing={0} sx={{ width: "min(460px,100%)", px: 2 }}>

        {/* Header */}
        <Stack alignItems="center" spacing={1.5} mb={4}>
          <Box sx={{
            width: 56, height: 56, borderRadius: 3,
            bgcolor: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 24px rgba(79,70,229,0.3)",
          }}>
            <EmailIcon sx={{ color: "#fff", fontSize: 26 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.4, color: "#0f172a" }}>
            Forgot password?
          </Typography>
          <Typography color="text.secondary" fontSize={14} textAlign="center" sx={{ maxWidth: 300 }}>
            No worries — enter your email and we&apos;ll send a 6-digit OTP to reset it.
          </Typography>
        </Stack>

        {/* Card */}
        <Paper sx={{
          p: { xs: 3, sm: 4 }, borderRadius: 3,
          border: "1px solid #e2e8f0", bgcolor: "#ffffff",
          boxShadow: "0 4px 24px rgba(15,23,42,0.06)",
        }}>
          <Stack spacing={2.5}>
            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}
            {sent  && <Alert severity="success" sx={{ borderRadius: 2 }}>OTP sent! Check your inbox.</Alert>}

            <TextField
              label="Email address" type="email" value={email} fullWidth
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              InputProps={{
                startAdornment: (
                  <EmailIcon sx={{ color: "#94a3b8", fontSize: 18, mr: 1 }} />
                ),
              }}
            />

            <Button variant="contained" size="large" disabled={busy || !email.trim()}
              onClick={handleSend} startIcon={<SendIcon />}
              sx={{ py: 1.4, fontWeight: 700, fontSize: 15, bgcolor: "#4f46e5",
                "&:hover": { bgcolor: "#4338ca" }, boxShadow: "0 4px 14px rgba(79,70,229,0.3)" }}>
              {busy ? "Sending OTP…" : "Send OTP"}
            </Button>

            {/* Steps hint */}
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: "#eef2ff", border: "1px solid #c7d2fe" }}>
              <Stack spacing={1}>
                {STEPS.map(({ step, text }) => (
                  <Stack key={step} direction="row" spacing={1.2} alignItems="center">
                    <Box sx={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                      bgcolor: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 800, color: "#fff",
                    }}>
                      {step}
                    </Box>
                    <Typography fontSize={12} color="text.secondary">{text}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Back to login */}
        <Stack alignItems="center" mt={3}>
          <Button component={RouterLink} to="/login"
            startIcon={<ArrowBackIcon sx={{ fontSize: "16px !important" }} />}
            sx={{ color: "#4f46e5", fontSize: 14, fontWeight: 600 }}>
            Back to login
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}