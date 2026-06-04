import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import { useAuth } from "../providers/authContext";

/* ─── data ─── */
import { LANGS as RUN_LANGS } from "../config/languages";

const LANGS = RUN_LANGS.map((l) => ({
  label: l.full,
  icon: l.full.slice(0, 2).toUpperCase(),
  color: l.color,
  bg: l.bg,
  border: l.border,
}));

const STATS = [
  { value: "16",    label: "Languages"  },
  { value: "70",    label: "Problems"   },
  { value: "1",     label: "Code Editor"},
  { value: "100%",  label: "Free"       },
];

const FEATURES = [
  { emoji: "💻", title: "Code Editor",          desc: "Run JS, Python, Java, C/C++, and more. HTML/CSS live preview + SQL in the browser.",      color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe", to: "/editor"          },
  { emoji: "⚡", title: "Practice Problems",    desc: "Solve coding challenges, run tests, and submit — ranked by difficulty.",                  color: "#d97706", bg: "#fef3c7", border: "#fde68a", to: "/problems"        },
  { emoji: "📊", title: "Progress Dashboard",   desc: "Track streaks, practice progress, and saved snippets all in one place.",                   color: "#0284c7", bg: "#e0f2fe", border: "#bae6fd", to: "/dashboard"       },
  { emoji: "💾", title: "Saved Snippets",       desc: "Save and revisit your best code from the editor.",                                        color: "#7c3aed", bg: "#ede9fe", border: "#ddd6fe", to: "/saved-codes"     },
  { emoji: "🔥", title: "Streak Tracker",       desc: "Build daily habits — complete all practice problems for a bonus streak.",                  color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", to: "/streak"          },
  { emoji: "🏆", title: "Leaderboard",          desc: "Compete on XP and weekly solves. Climb the ranks with your classmates.",                     color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", to: "/leaderboard"     },
  { emoji: "💎", title: "XP & Badges",          desc: "Earn XP per problem, level up, unlock badges including daily challenge rewards.",          color: "#7c3aed", bg: "#ede9fe", border: "#ddd6fe", to: "/rewards"         },
  { emoji: "✨", title: "AI Learn Path",        desc: "7 modules: Intro AI → Models → ML → Math → Deep Learning → Transformers → LLMs. Daily lesson.", color: "#7c3aed", bg: "#f5f3ff", border: "#e9d5ff", to: "/ai-learn"        },
];

const STEPS = [
  { num: "01", color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe", title: "Open the editor",       desc: "Pick a language from the sidebar — compiler langs, HTML/CSS, or SQL."                    },
  { num: "02", color: "#d97706", bg: "#fef3c7", border: "#fde68a", title: "Write & run code",      desc: "Click Run — compile online or preview HTML/CSS/SQL in your browser."                   },
  { num: "03", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", title: "Solve problems",      desc: "Practice DSA problems with real test cases and instant feedback."                        },
  { num: "04", color: "#0284c7", bg: "#e0f2fe", border: "#bae6fd", title: "Earn XP & rank up",     desc: "Submit solutions, earn badges, climb the leaderboard, keep your streak."                   },
];

const PERKS = ["No credit card required", "Free forever for students", "Progress saved automatically"];

const CODE_LINES = [
  [{ t: "// JS Basics: Variables", c: "#94a3b8" }],
  [],
  [{ t: "const", c: "#7c3aed" }, { t: " name",  c: "#0284c7" }, { t: " = ", c: "#475569" }, { t: '"CodeLearn"', c: "#16a34a" }, { t: ";", c: "#475569" }],
  [{ t: "let",   c: "#7c3aed" }, { t: " score", c: "#0284c7" }, { t: " = ", c: "#475569" }, { t: "0",           c: "#ea580c" }, { t: ";", c: "#475569" }],
  [],
  [{ t: "console", c: "#0284c7" }, { t: ".", c: "#475569" }, { t: "log", c: "#0284c7" }, { t: "(", c: "#475569" }, { t: '"Hello, World!"', c: "#16a34a" }, { t: ");", c: "#475569" }],
];

const PX = { xs: 2, sm: 4, md: 8, lg: 12 };

export function HomePage() {
  const { isAuthed } = useAuth();

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>

      {/* ══ HERO ══ */}
      <Box sx={{
        bgcolor: "#fff",
        borderBottom: "1px solid #e2e8f0",
        pt: { xs: 6, md: 9 }, pb: { xs: 6, md: 8 }, px: PX,
        position: "relative", overflow: "hidden",
      }}>
        {/* light blue accent blobs */}
        <Box sx={{ position: "absolute", top: -80, right: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(2,132,199,0.08), transparent 70%)", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.06), transparent 70%)", pointerEvents: "none" }} />

        {/* top blue accent line */}
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #4f46e5, #0284c7, #38bdf8)", borderRadius: "0 0 4px 4px" }} />

        <Grid container spacing={{ xs: 4, md: 8 }} sx={{ alignItems: "center" }}>

          {/* left — copy */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {/* badge */}
              <Box sx={{
                display: "inline-flex", alignItems: "center", gap: 0.8,
                px: 1.4, py: 0.6, borderRadius: 99,
                bgcolor: "#eff6ff", color: "#0284c7", border: "1.5px solid #bae6fd",
                fontSize: 11, fontWeight: 700, width: "fit-content",
              }}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#0284c7", boxShadow: "0 0 0 3px rgba(2,132,199,0.2)" }} />
                Free for students · No credit card needed
              </Box>

              {/* headline */}
              <Box>
                <Typography sx={{ fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.0, fontSize: { xs: "2.4rem", sm: "3rem", md: "3.6rem" }, color: "#0f172a" }}>
                  Master coding,
                </Typography>
                <Typography sx={{
                  fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.0,
                  fontSize: { xs: "2.4rem", sm: "3rem", md: "3.6rem" },
                  background: "linear-gradient(135deg, #4f46e5 0%, #0284c7 60%, #38bdf8 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  one day at a time.
                </Typography>
              </Box>

              <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: "#64748b", lineHeight: 1.75, maxWidth: 480 }}>
                70 coding problems, daily challenges, XP & badges, leaderboard, streak tracking, and a multi-language editor — free for students, job-ready practice.
              </Typography>

              {/* CTAs */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button component={RouterLink} to={isAuthed ? "/dashboard" : "/signup"}
                  variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                  sx={{ fontWeight: 800, fontSize: 15, bgcolor: "#4f46e5", borderRadius: 2.5, px: 3.5, py: 1.5, "&:hover": { bgcolor: "#4338ca" }, boxShadow: "0 6px 20px rgba(79,70,229,0.35)" }}>
                  {isAuthed ? "Go to Dashboard" : "Start for free"}
                </Button>
                <Button component={RouterLink} to="/problems"
                  variant="outlined" size="large"
                  sx={{ fontWeight: 700, fontSize: 15, borderColor: "#bae6fd", color: "#0284c7", borderRadius: 2.5, px: 3.5, py: 1.5, "&:hover": { borderColor: "#0284c7", bgcolor: "#eff6ff" } }}>
                  Practice Paths →
                </Button>
              </Stack>

              {/* perks */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} flexWrap="wrap">
                {PERKS.map((p) => (
                  <Stack key={p} direction="row" alignItems="center" gap={0.7}>
                    <Box sx={{ width: 18, height: 18, borderRadius: "50%", bgcolor: "#eff6ff", border: "1.5px solid #bae6fd", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CheckIcon sx={{ fontSize: 11, color: "#0284c7" }} />
                    </Box>
                    <Typography fontSize={13} color="#64748b">{p}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* right — code panel */}
          <Grid item xs={12} md={6}>
            <Box sx={{
              bgcolor: "#1e293b", borderRadius: 3, overflow: "hidden",
              border: "1px solid #334155",
              boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
            }}>
              {/* window chrome */}
              <Stack direction="row" alignItems="center" gap={1}
                sx={{ px: 2, py: 1.5, bgcolor: "#0f172a", borderBottom: "1px solid #1e293b" }}>
                {["#ef4444","#f59e0b","#22c55e"].map((c) => (
                  <Box key={c} sx={{ width: 11, height: 11, borderRadius: "50%", bgcolor: c, opacity: 0.85 }} />
                ))}
                <Box sx={{
                  ml: 1.5, px: 1.5, py: 0.3, borderRadius: 1,
                  bgcolor: "#1e293b", border: "1px solid #334155",
                  fontSize: 11, color: "#64748b", fontFamily: "'JetBrains Mono',monospace",
                }}>
                  main.js
                </Box>
              </Stack>

              {/* code */}
              <Box sx={{ p: 2.5, fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: 13, lineHeight: 2 }}>
                {CODE_LINES.map((line, i) => (
                  <Box key={i} sx={{ display: "flex", gap: 0.5, minHeight: "1.6em" }}>
                    <Typography sx={{ fontSize: 11, color: "#334155", fontFamily: "inherit", width: 20, flexShrink: 0, userSelect: "none", lineHeight: 2 }}>
                      {i + 1}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      {line.map((tok, j) => (
                        <Box key={j} component="span" sx={{ color: tok.c }}>{tok.t}</Box>
                      ))}
                    </Box>
                  </Box>
                ))}
                {/* blinking cursor */}
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <Typography sx={{ fontSize: 11, color: "#334155", fontFamily: "inherit", width: 20, lineHeight: 2 }}>7</Typography>
                  <Box sx={{
                    width: 8, height: "1.2em", bgcolor: "#38bdf8", mt: 0.4,
                    animation: "blink 1.1s step-end infinite",
                    "@keyframes blink": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0 } },
                  }} />
                </Box>
              </Box>

              {/* terminal-style output */}
              <Box sx={{ bgcolor: "#0f172a", borderTop: "1px solid #1e293b", px: 2.5, py: 1.5 }}>
                <Typography sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#22c55e" }}>
                  ▶ Hello, World!
                </Typography>
                <Typography sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#64748b", mt: 0.3 }}>
                  Process exited with code 0
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* stats row */}
        <Stack direction="row" spacing={{ xs: 3, sm: 5 }} flexWrap="wrap" gap={2} mt={{ xs: 5, md: 6 }}>
          {STATS.map((s) => (
            <Box key={s.label}>
              <Typography sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>
                {s.value}
              </Typography>
              <Typography fontSize={13} color="#94a3b8" mt={0.3}>{s.label}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* ══ PRACTICE PATHS HIGHLIGHT BANNER ══ */}
      <Box sx={{ px: PX, py: { xs: 4, md: 5 } }}>
        <Box sx={{
          p: { xs: 3, md: 4 }, borderRadius: 4,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          border: "1px solid #334155",
          position: "relative", overflow: "hidden",
        }}>
          {/* top accent */}
          <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #4f46e5, #0284c7, #38bdf8)" }} />
          <Box sx={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(2,132,199,0.12), transparent 70%)", pointerEvents: "none" }} />

          <Stack direction={{ xs: "column", md: "row" }} alignItems={{ md: "center" }} justifyContent="space-between" spacing={3}>
            <Box>
              <Stack direction="row" alignItems="center" gap={1} mb={1}>
                <Box sx={{ px: 1.2, py: 0.3, borderRadius: 1, bgcolor: "rgba(2,132,199,0.15)", border: "1px solid rgba(2,132,199,0.3)", color: "#38bdf8", fontSize: 11, fontWeight: 700 }}>
                  🆕 NEW
                </Box>
                <Typography fontSize={12} color="#64748b" fontWeight={600}>Structured Learning</Typography>
              </Stack>
              <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.4rem", md: "1.8rem" }, color: "#f1f5f9", letterSpacing: -0.5, lineHeight: 1.2 }}>
                Practice Paths — DSA, Algorithms & Interview Prep
              </Typography>
              <Typography fontSize={14} color="#94a3b8" mt={0.8} maxWidth={520}>
                8 structured paths covering Beginner DSA, Data Structures, Dynamic Programming, Interview Questions and more — just like GeeksForGeeks, but inside CodeLearn.
              </Typography>
            </Box>

            {/* path pills preview */}
            <Stack spacing={1} flexShrink={0}>
              {[
                { icon: "🌱", label: "Beginner DSA",       color: "#22c55e" },
                { icon: "🗂️", label: "Data Structures",    color: "#3b82f6" },
                { icon: "⚙️", label: "Algorithms",          color: "#8b5cf6" },
                { icon: "💼", label: "Interview Questions", color: "#0ea5e9" },
              ].map((item) => (
                <Stack key={item.label} direction="row" alignItems="center" gap={1.2}
                  sx={{ px: 1.8, py: 0.9, borderRadius: 2, bgcolor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: item.color, flexShrink: 0 }} />
                  <Typography fontSize={13} color="#e2e8f0" fontWeight={600}>{item.icon} {item.label}</Typography>
                  <ArrowForwardIcon sx={{ fontSize: 13, color: "#475569", ml: "auto" }} />
                </Stack>
              ))}
              <Button component={RouterLink} to="/problems" variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 0.5, fontWeight: 700, bgcolor: "#0284c7", borderRadius: 2, "&:hover": { bgcolor: "#0369a1" } }}>
                Explore All Paths
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* ══ LANG CHIPS ══ */}
      <Box sx={{ px: PX, pb: { xs: 4, md: 5 } }}>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" gap={1.5} justifyContent={{ xs: "flex-start", md: "center" }}>
          {LANGS.map((l) => (
            <Box key={l.label} sx={{
              display: "flex", alignItems: "center", gap: 0.9,
              px: 1.6, py: 0.9, borderRadius: 2,
              bgcolor: l.bg, color: l.color,
              border: `1.5px solid ${l.border}`,
              fontSize: 13, fontWeight: 700,
            }}>
              <Box sx={{
                width: 24, height: 24, borderRadius: 1, bgcolor: "#fff",
                border: `1.5px solid ${l.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: l.label === "C++" ? 8 : 10, fontWeight: 900, color: l.color,
              }}>
                {l.icon}
              </Box>
              {l.label}
            </Box>
          ))}
        </Stack>
      </Box>

      {/* ══ FEATURES ══ */}
      <Box sx={{ px: PX, py: { xs: 6, md: 9 } }}>
        <Stack alignItems="center" spacing={1} mb={6}>
          <Box sx={{ height: 4, width: 48, bgcolor: "#0284c7", borderRadius: 99, mb: 1 }} />
          <Box sx={{ px: 1.4, py: 0.5, bgcolor: "#eff6ff", color: "#0284c7", border: "1px solid #bae6fd", borderRadius: 99, fontSize: 11, fontWeight: 600 }}>
            Everything you need
          </Box>
          <Typography sx={{ fontWeight: 900, letterSpacing: -0.8, color: "#0f172a", textAlign: "center", lineHeight: 1.1, fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
            One platform, every tool
          </Typography>
          <Typography fontSize={15} color="#64748b" textAlign="center" sx={{ maxWidth: 440 }}>
            From your first line of code to cracking coding interviews — we've got you covered.
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {FEATURES.map((f) => (
            <Grid item xs={12} sm={6} lg={4} key={f.title}>
              <Box component={RouterLink} to={f.to} sx={{
                textDecoration: "none",
                display: "flex", flexDirection: "column",
                p: 3, borderRadius: 3.5,
                bgcolor: "#fff",
                border: "1.5px solid #e2e8f0",
                borderTop: `3px solid ${f.color}`,
                height: "100%",
                transition: "transform 0.18s, box-shadow 0.18s, border-color 0.18s",
                "&:hover": { transform: "translateY(-3px)", boxShadow: `0 10px 30px ${f.color}18`, borderColor: f.border },
              }}>
                <Box sx={{ width: 46, height: 46, borderRadius: 2, mb: 2, bgcolor: f.bg, border: `1.5px solid ${f.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                  {f.emoji}
                </Box>
                <Typography fontSize={15} fontWeight={800} color="#0f172a" mb={0.8}>{f.title}</Typography>
                <Typography fontSize={13} color="#64748b" lineHeight={1.65} sx={{ flex: 1 }}>{f.desc}</Typography>
                <Stack direction="row" alignItems="center" gap={0.5} mt={1.8} sx={{ color: f.color, fontSize: 13, fontWeight: 700 }}>
                  Explore <ArrowForwardIcon sx={{ fontSize: 14 }} />
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ══ HOW IT WORKS ══ */}
      <Box sx={{ bgcolor: "#fff", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", px: PX, py: { xs: 6, md: 9 }, position: "relative" }}>
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #4f46e5, #0284c7, #38bdf8)" }} />

        <Stack alignItems="center" mb={6}>
          <Box sx={{ height: 4, width: 48, bgcolor: "#0284c7", borderRadius: 99, mb: 2 }} />
          <Typography sx={{ fontWeight: 900, letterSpacing: -0.6, color: "#0f172a", fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
            How it works
          </Typography>
          <Typography fontSize={14} color="#64748b" mt={1}>Four simple steps to go from zero to job-ready</Typography>
        </Stack>

        <Grid container spacing={2}>
          {STEPS.map((s) => (
            <Grid item xs={12} sm={6} md={3} key={s.num}>
              <Box sx={{
                p: 2.5, borderRadius: 3,
                bgcolor: "#f8fafc",
                border: "1.5px solid #e2e8f0",
                borderLeft: `4px solid ${s.color}`,
                height: "100%",
                transition: "border-color 0.15s, transform 0.15s, box-shadow 0.15s",
                "&:hover": { borderColor: s.border, transform: "translateY(-2px)", boxShadow: `0 8px 24px ${s.color}15` },
              }}>
                <Box sx={{
                  width: 42, height: 42, borderRadius: 2, mb: 2,
                  bgcolor: s.bg, border: `1.5px solid ${s.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 900, color: s.color,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {s.num}
                </Box>
                <Typography fontSize={14} fontWeight={800} color="#0f172a" mb={0.8}>{s.title}</Typography>
                <Typography fontSize={13} color="#64748b" lineHeight={1.65}>{s.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ══ CTA BANNER ══ */}
      <Box sx={{ px: PX, py: { xs: 6, md: 9 } }}>
        <Box sx={{
          p: { xs: 4, md: 7 }, borderRadius: 4,
          bgcolor: "#eff6ff",
          border: "2px solid #bae6fd",
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #4f46e5, #0284c7, #38bdf8)" }} />
          <Box sx={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", bgcolor: "rgba(2,132,199,0.06)", pointerEvents: "none" }} />
          <Box sx={{ position: "absolute", bottom: -50, left: -30, width: 160, height: 160, borderRadius: "50%", bgcolor: "rgba(79,70,229,0.05)", pointerEvents: "none" }} />

          <Stack alignItems="center" spacing={2.5} sx={{ position: "relative" }}>
            <Typography sx={{ fontWeight: 900, letterSpacing: -0.8, color: "#0f172a", lineHeight: 1.1, fontSize: { xs: "1.7rem", md: "2.6rem" } }}>
              Ready to start your coding journey?
            </Typography>
            <Typography fontSize={16} sx={{ color: "#475569", maxWidth: 420 }}>
              Join thousands of students learning to code for free. No credit card needed.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button component={RouterLink} to={isAuthed ? "/dashboard" : "/signup"}
                variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                sx={{ fontWeight: 800, fontSize: 15, bgcolor: "#0284c7", color: "#fff", borderRadius: 2.5, px: 3.5, py: 1.5, "&:hover": { bgcolor: "#0369a1" }, boxShadow: "0 6px 20px rgba(2,132,199,0.25)" }}>
                {isAuthed ? "Go to Dashboard" : "Create free account"}
              </Button>
              <Button component={RouterLink} to="/problems"
                variant="outlined" size="large"
                sx={{ fontWeight: 700, fontSize: 15, borderColor: "#0284c7", color: "#0284c7", borderRadius: 2.5, px: 3.5, py: 1.5, bgcolor: "#fff", "&:hover": { bgcolor: "#eff6ff" } }}>
                Explore Practice Paths
              </Button>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} flexWrap="wrap" justifyContent="center">
              {PERKS.map((p) => (
                <Stack key={p} direction="row" alignItems="center" gap={0.7}>
                  <CheckIcon sx={{ fontSize: 14, color: "#0284c7" }} />
                  <Typography fontSize={13} sx={{ color: "#475569" }}>{p}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Box>

    </Box>
  );
}