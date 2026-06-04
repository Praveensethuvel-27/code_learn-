import { useMemo, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Alert, Box, Button, IconButton, InputAdornment,
  Paper, Stack, TextField, Typography,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { api } from "../lib/apiClient";

export function ResetPasswordPage() {
  const nav = useNavigate();
  const loc = useLocation();
  const prefilledEmail = useMemo(() => loc.state?.email || "", [loc.state]);

  const [email,       setEmail]       = useState(prefilledEmail);
  const [otp,         setOtp]         = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [error,       setError]       = useState("");
  const [ok,          setOk]          = useState(false);
  const [busy,        setBusy]        = useState(false);

  const strength =
    !newPassword        ? 0
    : newPassword.length < 6  ? 1
    : newPassword.length < 10 ? 2
    : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? 4
    : 3;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#dc2626", "#d97706", "#16a34a", "#0284c7"];

  const handleReset = async () => {
    setError(""); setBusy(true);
    try {
      await api.post("/auth/reset-password", { email, otp, newPassword });
      setOk(true);
      setTimeout(() => nav("/login"), 1800);
    } catch (e) {
      setError(e?.response?.data?.message || "Reset failed");
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
            <LockResetIcon sx={{ color: "#fff", fontSize: 28 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.4, color: "#0f172a" }}>
            Reset password
          </Typography>
          <Typography color="text.secondary" fontSize={14} textAlign="center">
            Enter the OTP from your email and choose a new password.
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
            {ok    && (
              <Alert severity="success" icon={<CheckCircleIcon />} sx={{ borderRadius: 2 }}>
                Password updated! Redirecting to login…
              </Alert>
            )}

            {/* Email */}
            <TextField label="Email address" type="email" value={email} fullWidth
              onChange={(e) => setEmail(e.target.value)}
              sx={{ opacity: prefilledEmail ? 0.7 : 1 }} />

            {/* OTP */}
            <Box>
              <Typography fontSize={12} color="text.secondary" mb={1} fontWeight={600}>
                6-digit OTP
              </Typography>
              <TextField
                placeholder="• • • • • •" value={otp} fullWidth
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                inputProps={{
                  maxLength: 6,
                  style: {
                    letterSpacing: "0.5em", fontSize: "1.3rem", fontWeight: 800,
                    textAlign: "center", fontFamily: "'JetBrains Mono', monospace",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderColor: otp.length === 6 ? "#16a34a" : undefined,
                  },
                }}
              />
              {/* Progress dots */}
              <Stack direction="row" spacing={0.5} mt={1} justifyContent="center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Box key={i} sx={{
                    width: 6, height: 6, borderRadius: "50%",
                    bgcolor: i < otp.length ? "#4f46e5" : "#e2e8f0",
                    transition: "background 0.2s",
                  }} />
                ))}
              </Stack>
            </Box>

            {/* New password */}
            <Box>
              <TextField
                label="New password" type={showPass ? "text" : "password"}
                value={newPassword} fullWidth
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleReset()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowPass((p) => !p)}>
                        {showPass ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {newPassword && (
                <Box mt={1}>
                  <Stack direction="row" spacing={0.5} mb={0.5}>
                    {[1, 2, 3, 4].map((i) => (
                      <Box key={i} sx={{
                        flex: 1, height: 3, borderRadius: 4,
                        bgcolor: i <= strength ? strengthColor[strength] : "#e2e8f0",
                        transition: "background 0.3s",
                      }} />
                    ))}
                  </Stack>
                  <Typography fontSize={11} sx={{ color: strengthColor[strength], fontWeight: 600 }}>
                    {strengthLabel[strength]} password
                  </Typography>
                </Box>
              )}
            </Box>

            <Button variant="contained" size="large"
              disabled={busy || ok || !otp || !newPassword}
              onClick={handleReset}
              sx={{ py: 1.4, fontWeight: 700, fontSize: 15, bgcolor: "#4f46e5",
                "&:hover": { bgcolor: "#4338ca" }, boxShadow: "0 4px 14px rgba(79,70,229,0.3)" }}>
              {busy ? "Updating…" : "Update Password"}
            </Button>
          </Stack>
        </Paper>

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