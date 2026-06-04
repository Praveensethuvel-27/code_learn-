import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert, Box, Button, Divider, IconButton, InputAdornment,
  Paper, Stack, TextField, Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useAuth } from "../providers/authContext";

export function SignupPage() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSignup = async () => {
    setError(""); setBusy(true);
    try {
      await signup(name, email, password);
      nav("/dashboard");
    } catch (e) {
      setError(e?.response?.data?.message || "Signup failed. Please try again.");
    } finally { setBusy(false); }
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,165,233,0.1), transparent)" }}>
      <Stack spacing={3} sx={{ width: "min(440px, 100%)", px: 2 }}>
        <Stack alignItems="center" spacing={1}>
          <Box sx={{ width: 52, height: 52, borderRadius: 3,
            background: "linear-gradient(135deg, #0ea5e9, #6d28d9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 24px rgba(14,165,233,0.35)" }}>
            <PersonAddOutlinedIcon sx={{ color: "#fff", fontSize: 26 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>Create your account</Typography>
          <Typography color="text.secondary" fontSize={14}>Start your coding journey today — it&apos;s free</Typography>
        </Stack>

        <Paper sx={{ p: 3.5, borderRadius: 3, border: "1px solid", borderColor: "divider",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <Stack spacing={2.5}>
            {error ? <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert> : null}
            <TextField label="Full name" value={name} onChange={(e) => setName(e.target.value)} fullWidth onKeyDown={(e) => e.key === "Enter" && handleSignup()} />
            <TextField label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth onKeyDown={(e) => e.key === "Enter" && handleSignup()} />
            <TextField label="Password (min 8 chars)" type={showPass ? "text" : "password"} value={password}
              onChange={(e) => setPassword(e.target.value)} fullWidth onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              InputProps={{ endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowPass((p) => !p)}>
                    {showPass ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              )}} />
            <Button variant="contained" size="large" disabled={busy} onClick={handleSignup}
              sx={{ py: 1.4, fontWeight: 700, fontSize: 15,
                background: "linear-gradient(135deg, #0ea5e9, #6d28d9)",
                boxShadow: "0 4px 14px rgba(14,165,233,0.4)",
                "&:hover": { boxShadow: "0 6px 20px rgba(14,165,233,0.5)" } }}>
              {busy ? "Creating account…" : "Create free account"}
            </Button>
          </Stack>
        </Paper>

        <Divider />
        <Typography align="center" fontSize={13} color="text.secondary">
          Already have an account?{" "}
          <Button component={RouterLink} to="/login" sx={{ fontWeight: 700, p: 0, minWidth: 0, fontSize: 13 }}>Sign in</Button>
        </Typography>
      </Stack>
    </Box>
  );
}
