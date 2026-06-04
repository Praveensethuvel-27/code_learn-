import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { api } from "../lib/apiClient";

export function ForgotPasswordPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <Box sx={{ display: "grid", placeItems: "center" }}>
      <Paper sx={{ p: 3, width: "min(520px, 100%)" }} variant="outlined">
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Forgot password
          </Typography>
          <Typography color="text.secondary">
            We’ll email you a 6-digit OTP to reset your password.
          </Typography>
          {error ? <Alert severity="error">{error}</Alert> : null}
          {sent ? <Alert severity="success">OTP sent (if the email exists).</Alert> : null}
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button
            variant="contained"
            disabled={busy}
            onClick={async () => {
              setError("");
              setBusy(true);
              try {
                await api.post("/auth/forgot-password", { email });
                setSent(true);
                nav("/reset-password", { state: { email } });
              } catch (e) {
                setError(e?.response?.data?.message || "Request failed");
              } finally {
                setBusy(false);
              }
            }}
          >
            Send OTP
          </Button>
          <Button component={RouterLink} to="/login">
            Back to login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

