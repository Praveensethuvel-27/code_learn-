import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../providers/authContext";

export function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleLogin = async () => {
    setError("");
    setBusy(true);
    try {
      const result = await login(email, password);
      // role-based redirect: admin → admin panel, others → dashboard
      if (result?.role === "admin") {
        nav("/admin/users");
      } else {
        nav("/dashboard");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109,40,217,0.12), transparent)",
      }}
    >
      <Stack spacing={3} sx={{ width: "min(440px, 100%)", px: 2 }}>
        {/* Brand */}
        <Stack alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 3,
              background: "linear-gradient(135deg, #6d28d9, #0ea5e9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(109,40,217,0.35)",
            }}
          >
            <LockOutlinedIcon sx={{ color: "#fff", fontSize: 26 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
            Welcome back
          </Typography>
          <Typography color="text.secondary" fontSize={14}>
            Sign in to continue learning
          </Typography>
        </Stack>

        <Paper
          sx={{
            p: 3.5,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <Stack spacing={2.5}>
            {error ? (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {error}
              </Alert>
            ) : null}

            <TextField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              fullWidth
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <TextField
              label="Password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              fullWidth
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPass((p) => !p)}>
                      {showPass ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              size="large"
              disabled={busy}
              onClick={handleLogin}
              sx={{
                py: 1.4,
                fontWeight: 700,
                fontSize: 15,
                background: "linear-gradient(135deg, #6d28d9, #7c3aed)",
                boxShadow: "0 4px 14px rgba(109,40,217,0.4)",
                "&:hover": { boxShadow: "0 6px 20px rgba(109,40,217,0.5)" },
              }}
            >
              {busy ? "Signing in…" : "Sign in"}
            </Button>

            <Stack direction="row" justifyContent="flex-end">
              <Button
                component={RouterLink}
                to="/forgot-password"
                size="small"
                sx={{ color: "text.secondary", fontSize: 12 }}
              >
                Forgot password?
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {/* Dev helper */}
        <Paper
          sx={{
            p: 2,
            borderRadius: 2.5,
            border: "1px dashed",
            borderColor: "warning.light",
            bgcolor: "rgba(245,158,11,0.04)",
          }}
        >
          <Typography fontSize={12} color="warning.dark" fontWeight={600} mb={1}>
            🔑 Dev Credentials
          </Typography>
          <Button
            size="small"
            variant="outlined"
            color="warning"
            sx={{ fontSize: 11, mr: 1 }}
            onClick={() => {
              setEmail("admin@mernlearn.local");
              setPassword("Admin12345!");
            }}
          >
            Fill Admin
          </Button>
          <Typography fontSize={11} color="text.secondary" component="span">
            admin@mernlearn.local / Admin12345!
          </Typography>
        </Paper>

        <Divider />
        <Typography align="center" fontSize={13} color="text.secondary">
          Don&apos;t have an account?{" "}
          <Button
            component={RouterLink}
            to="/signup"
            sx={{ fontWeight: 700, p: 0, minWidth: 0, fontSize: 13 }}
          >
            Sign up free
          </Button>
        </Typography>
      </Stack>
    </Box>
  );
}
