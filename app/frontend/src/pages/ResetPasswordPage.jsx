import { useMemo, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { api } from "../lib/apiClient";

export function ResetPasswordPage() {
  const nav = useNavigate();
  const loc = useLocation();
  const prefilledEmail = useMemo(() => loc.state?.email || "", [loc.state]);

  const [email, setEmail] = useState(prefilledEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <Box sx={{ display: "grid", placeItems: "center" }}>
      <Paper sx={{ p: 3, width: "min(520px, 100%)" }} variant="outlined">
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Reset password
          </Typography>
          {error ? <Alert severity="error">{error}</Alert> : null}
          {ok ? <Alert severity="success">Password updated. You can login now.</Alert> : null}
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField
            label="OTP (6 digits)"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <TextField
            label="New password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            variant="contained"
            disabled={busy}
            onClick={async () => {
              setError("");
              setBusy(true);
              try {
                await api.post("/auth/reset-password", { email, otp, newPassword });
                setOk(true);
                setTimeout(() => nav("/login"), 600);
              } catch (e) {
                setError(e?.response?.data?.message || "Reset failed");
              } finally {
                setBusy(false);
              }
            }}
          >
            Update password
          </Button>
          <Button component={RouterLink} to="/login">
            Back to login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

