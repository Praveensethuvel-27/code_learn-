import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert, Box, Button, Divider, IconButton,
  InputAdornment, Stack, TextField, Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import { useAuth } from "../providers/authContext";
import { MouseGlowLayer } from "../components/MouseGlowLayer";
import { CodeLearnLogo } from "../components/CodeLearnLogo";

const PERKS = ["Free forever", "No credit card", "Instant access"];

const CODE_LINES = [
  [{ t: "const", c: "#7c3aed" }, { t: " student", c: "#0284c7" }, { t: " = {", c: "#475569" }],
  [{ t: '  name:', c: "#475569" }, { t: ' "You"', c: "#16a34a" }, { t: ",", c: "#475569" }],
  [{ t: '  goal:', c: "#475569" }, { t: ' "Job Ready"', c: "#16a34a" }, { t: ",", c: "#475569" }],
  [{ t: '  streak:', c: "#475569" }, { t: " 🔥", c: "#ea580c" }, { t: " 7", c: "#ea580c" }],
  [{ t: "};", c: "#475569" }],
];

export function LoginPage() {
  const { login } = useAuth();
  const nav       = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState("");
  const [busy,     setBusy]     = useState(false);

  const handleLogin = async () => {
    setError(""); setBusy(true);
    try {
      const result = await login(email, password);
      nav("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Check your credentials.");
    } finally { setBusy(false); }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, bgcolor: "#f8fafc" }}>

      {/* ── Left panel — branding + mouse glow ── */}
      <MouseGlowLayer
        glowColor="79, 70, 229"
        intensity={0.1}
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          bgcolor: "#f8fafc",
          borderRight: "1.5px solid #e2e8f0",
          p: 6,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ borderTop: "4px solid #4f46e5", position: "absolute", top: 0, left: 0, right: 0 }} />

        <Box sx={{ mb: 6, mt: 1 }}>
          <CodeLearnLogo size={32} />
        </Box>

        {/* headline */}
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 900, color: "#0f172a", fontSize: "2.2rem", letterSpacing: -1, lineHeight: 1.1, mb: 1.5 }}>
            Welcome back,<br />keep coding! 🚀
          </Typography>
          <Typography sx={{ color: "#64748b", fontSize: 15, lineHeight: 1.7, mb: 4 }}>
            Your streak, lessons, and progress are waiting for you.
          </Typography>

          {/* perks */}
          <Stack spacing={1.2} mb={4}>
            {["Track your daily streak", "Complete all practice problems for bonus", "Save and revisit your code"].map((p) => (
              <Stack key={p} direction="row" alignItems="center" gap={1.2}>
                <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: "#eff6ff", border: "1.5px solid #bae6fd", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckIcon sx={{ fontSize: 11, color: "#0284c7" }} />
                </Box>
                <Typography fontSize={14} color="#475569">{p}</Typography>
              </Stack>
            ))}
          </Stack>

          {/* code block decoration — light style */}
          <Box sx={{ bgcolor: "#f8fafc", borderRadius: 2.5, p: 2, border: "1.5px solid #e2e8f0", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.9 }}>
            {CODE_LINES.map((tokens, i) => (
              <Box key={i} sx={{ display: "flex", gap: 0.5 }}>
                <Typography sx={{ color: "#cbd5e1", fontSize: 11, minWidth: 16, fontFamily: "inherit" }}>{i + 1}</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {tokens.map((tok, j) => (
                    <Typography key={j} component="span" sx={{ color: tok.c, fontFamily: "inherit", fontSize: "inherit" }}>{tok.t}</Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </MouseGlowLayer>

      {/* ── Right panel — form ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 3, md: 6 } }}>
        <Box sx={{ width: "100%", maxWidth: 420 }}>

          {/* mobile logo */}
          <Box sx={{ mb: 4, display: { md: "none" } }}>
            <CodeLearnLogo size={28} />
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.6, color: "#0f172a", mb: 0.5 }}>Sign in</Typography>
          <Typography color="#64748b" fontSize={14} mb={3}>Don't have an account?{" "}
            <Box component={RouterLink} to="/signup" sx={{ color: "#0284c7", fontWeight: 700, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              Sign up free
            </Box>
          </Typography>

          <Stack spacing={2}>
            {error && <Alert severity="error" sx={{ borderRadius: 2, fontSize: 13 }}>{error}</Alert>}

            <Box>
              <Typography fontSize={13} fontWeight={600} color="#374151" mb={0.7}>Email address</Typography>
              <TextField fullWidth type="email" value={email} placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fff", "&:hover fieldset": { borderColor: "#0284c7" }, "&.Mui-focused fieldset": { borderColor: "#0284c7" } } }}
              />
            </Box>

            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.7}>
                <Typography fontSize={13} fontWeight={600} color="#374151">Password</Typography>
                <Box component={RouterLink} to="/forgot-password" sx={{ fontSize: 12, color: "#0284c7", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
                  Forgot password?
                </Box>
              </Stack>
              <TextField fullWidth type={showPass ? "text" : "password"} value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fff", "&:hover fieldset": { borderColor: "#0284c7" }, "&.Mui-focused fieldset": { borderColor: "#0284c7" } } }}
                InputProps={{ endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPass((p) => !p)}>
                      {showPass ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                )}}
              />
            </Box>

            <Button variant="contained" size="large" disabled={busy} onClick={handleLogin}
              endIcon={<ArrowForwardIcon />}
              sx={{ fontWeight: 800, fontSize: 15, bgcolor: "#4f46e5", borderRadius: 2.5, py: 1.4, "&:hover": { bgcolor: "#4338ca" }, boxShadow: "0 4px 14px rgba(79,70,229,0.35)" }}>
              {busy ? "Signing in…" : "Sign in"}
            </Button>
          </Stack>

          {/* perks */}
          <Stack direction="row" spacing={2} justifyContent="center" mt={3} flexWrap="wrap" gap={1}>
            {PERKS.map((p) => (
              <Stack key={p} direction="row" alignItems="center" gap={0.6}>
                <Box sx={{ width: 14, height: 14, borderRadius: "50%", bgcolor: "#eff6ff", border: "1.5px solid #bae6fd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckIcon sx={{ fontSize: 9, color: "#0284c7" }} />
                </Box>
                <Typography fontSize={12} color="#64748b">{p}</Typography>
              </Stack>
            ))}
          </Stack>


        </Box>
      </Box>
    </Box>
  );
}