import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert, Box, Button, IconButton,
  InputAdornment, Stack, TextField, Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import { useAuth } from "../providers/authContext";
import { MouseGlowLayer } from "../components/MouseGlowLayer";
import { CodeLearnLogo } from "../components/CodeLearnLogo";
import ExtensionIcon from "@mui/icons-material/Extension";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const FEATURES = [
  { Icon: ExtensionIcon, color: "#4f46e5", text: "70 practice problems with real test cases" },
  { Icon: WhatshotIcon, color: "#f59e0b", text: "Daily challenge — +75 bonus XP" },
  { Icon: WorkspacePremiumIcon, color: "#0891b2", text: "XP, levels & badges as you solve" },
  { Icon: LeaderboardIcon, color: "#d97706", text: "Leaderboard — compete with classmates" },
  { Icon: BookmarkIcon, color: "#7c3aed", text: "Save code snippets from the editor" },
];

export function SignupPage() {
  const { signup } = useAuth();
  const nav        = useNavigate();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState("");
  const [busy,     setBusy]     = useState(false);

  const strength =
    !password        ? 0
    : password.length < 6  ? 1
    : password.length < 10 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4 : 3;
  const strengthLabel = ["", "Weak",    "Fair",    "Good",    "Strong" ];
  const strengthColor = ["", "#dc2626", "#d97706", "#16a34a", "#0284c7"];
  const strengthBg    = ["", "#fef2f2", "#fffbeb", "#f0fdf4", "#eff6ff"];

  const handleSignup = async () => {
    setError(""); setBusy(true);
    try { await signup(name, email, password); nav("/dashboard"); }
    catch (e) { setError(e?.response?.data?.message || "Signup failed."); }
    finally { setBusy(false); }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, bgcolor: "#f8fafc" }}>

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
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, bgcolor: "#4f46e5" }} />
        <Box sx={{ mb: 6, mt: 1 }}>
          <CodeLearnLogo size={32} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 900, color: "#0f172a", fontSize: "2.2rem", letterSpacing: -1, lineHeight: 1.1, mb: 1.5 }}>
            Start your coding<br />journey today! 🎓
          </Typography>
          <Typography sx={{ color: "#64748b", fontSize: 15, lineHeight: 1.7, mb: 4 }}>
            Everything you need to go from beginner to job-ready — for free.
          </Typography>

          <Stack spacing={1.5}>
            {FEATURES.map((f) => {
              const Icon = f.Icon;
              return (
                <Stack key={f.text} direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      flexShrink: 0,
                      bgcolor: f.color,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon sx={{ fontSize: 20 }} />
                  </Box>
                  <Typography fontSize={14} color="#475569" lineHeight={1.5}>
                    {f.text}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>

          {/* bottom badge */}
          <Box sx={{ mt: 4, px: 2, py: 1.5, borderRadius: 2, bgcolor: "#eff6ff", border: "1.5px solid #bae6fd" }}>
            <Typography fontSize={13} color="#0284c7" textAlign="center" fontWeight={600}>
              🎉 Join thousands of students already learning on CodeLearn
            </Typography>
          </Box>
        </Box>
      </MouseGlowLayer>

      {/* ── Right — form ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 3, md: 6 } }}>
        <Box sx={{ width: "100%", maxWidth: 420 }}>

          {/* mobile logo */}
          <Box sx={{ mb: 4, display: { md: "none" } }}>
            <CodeLearnLogo size={28} />
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.6, color: "#0f172a", mb: 0.5 }}>
            Create account
          </Typography>
          <Typography color="#64748b" fontSize={14} mb={3}>
            Already have an account?{" "}
            <Box component={RouterLink} to="/login" sx={{ color: "#0284c7", fontWeight: 700, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
              Sign in
            </Box>
          </Typography>

          <Stack spacing={2}>
            {error && <Alert severity="error" sx={{ borderRadius: 2, fontSize: 13 }}>{error}</Alert>}

            <Box>
              <Typography fontSize={13} fontWeight={600} color="#374151" mb={0.7}>Full name</Typography>
              <TextField fullWidth value={name} placeholder="Praveen Kumar"
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fff", "&:hover fieldset": { borderColor: "#0284c7" }, "&.Mui-focused fieldset": { borderColor: "#0284c7" } } }}
              />
            </Box>

            <Box>
              <Typography fontSize={13} fontWeight={600} color="#374151" mb={0.7}>Email address</Typography>
              <TextField fullWidth type="email" value={email} placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fff", "&:hover fieldset": { borderColor: "#0284c7" }, "&.Mui-focused fieldset": { borderColor: "#0284c7" } } }}
              />
            </Box>

            <Box>
              <Typography fontSize={13} fontWeight={600} color="#374151" mb={0.7}>Password</Typography>
              <TextField fullWidth type={showPass ? "text" : "password"} value={password}
                placeholder="Min. 8 characters"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fff", "&:hover fieldset": { borderColor: "#0284c7" }, "&.Mui-focused fieldset": { borderColor: "#0284c7" } } }}
                InputProps={{ endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPass((p) => !p)}>
                      {showPass ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                )}}
              />
              {/* strength bar */}
              {password && (
                <Box mt={1}>
                  <Stack direction="row" spacing={0.5} mb={0.5}>
                    {[1,2,3,4].map((i) => (
                      <Box key={i} sx={{ flex: 1, height: 4, borderRadius: 99, bgcolor: i <= strength ? strengthColor[strength] : "#e2e8f0", transition: "background 0.3s" }} />
                    ))}
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={0.6}>
                    <Box sx={{ px: 0.8, py: 0.2, borderRadius: 1, bgcolor: strengthBg[strength], color: strengthColor[strength], fontSize: 10, fontWeight: 700 }}>
                      {strengthLabel[strength]}
                    </Box>
                    <Typography fontSize={11} color="#94a3b8">password strength</Typography>
                  </Stack>
                </Box>
              )}
            </Box>

            <Button variant="contained" size="large" disabled={busy} onClick={handleSignup}
              endIcon={<ArrowForwardIcon />}
              sx={{ fontWeight: 800, fontSize: 15, bgcolor: "#4f46e5", borderRadius: 2.5, py: 1.4, "&:hover": { bgcolor: "#4338ca" }, boxShadow: "0 4px 14px rgba(79,70,229,0.35)" }}>
              {busy ? "Creating account…" : "Create free account"}
            </Button>

            <Typography fontSize={12} color="#94a3b8" textAlign="center">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Stack>

          {/* perks */}
          <Stack direction="row" spacing={2} justifyContent="center" mt={3} flexWrap="wrap" gap={1}>
            {["Free forever", "No credit card", "Instant access"].map((p) => (
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