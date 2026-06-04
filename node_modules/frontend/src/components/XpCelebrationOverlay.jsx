import { useEffect, useState, useRef } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { LEVEL_XP_STEP } from "../config/gamification";

function useCountUp(target, duration = 900, active = true) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!active || target <= 0) {
      setValue(target);
      return undefined;
    }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(target * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    setValue(0);
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, active]);

  return value;
}

function HexagonXpBadge({ size = 120, pulse = true }) {
  const s = size;
  const c = s / 2;
  const r = s * 0.38;
  const points = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${c + r * Math.cos(a)},${c + r * Math.sin(a)}`;
  }).join(" ");

  return (
    <Box
      sx={{
        position: "relative",
        width: s,
        height: s,
        mx: "auto",
        animation: pulse ? "hexPulse 2.2s ease-in-out infinite" : "none",
        "@keyframes hexPulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: -8,
          borderRadius: "50%",
          background:
            "conic-gradient(from 0deg, #fbbf24, #a855f7, #22c55e, #3b82f6, #fbbf24)",
          opacity: 0.35,
          filter: "blur(12px)",
          animation: "spinGlow 4s linear infinite",
          "@keyframes spinGlow": { to: { transform: "rotate(360deg)" } },
        }}
      />
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ position: "relative", zIndex: 1 }}>
        <defs>
          <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <filter id="hexShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#b45309" floodOpacity="0.45" />
          </filter>
        </defs>
        <polygon
          points={points}
          fill="url(#hexGrad)"
          stroke="#fff"
          strokeWidth="3"
          filter="url(#hexShadow)"
        />
        <text
          x={c}
          y={c - 6}
          textAnchor="middle"
          fill="#fff"
          fontSize={s * 0.22}
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          XP
        </text>
        <text
          x={c}
          y={c + s * 0.14}
          textAnchor="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize={s * 0.28}
          fontWeight="800"
        >
          ⚡
        </text>
      </svg>
    </Box>
  );
}

/**
 * @param {{
 *   mode: 'preview' | 'earned',
 *   testsPassed?: number,
 *   testsTotal?: number,
 *   xpGained?: number,
 *   baseXp?: number,
 *   dailyBonusXp?: number,
 *   isFirstSolve?: boolean,
 *   totalXp?: number,
 *   previousXp?: number,
 *   level?: number,
 *   dailyBonus?: boolean,
 *   newBadgeTitles?: string[],
 *   onClose: () => void,
 *   onGenerateTestCases?: () => void,
 * }} props
 */
export function XpCelebrationOverlay({
  mode = "earned",
  testsPassed = 0,
  testsTotal = 0,
  xpGained = 0,
  baseXp = 0,
  dailyBonusXp = 0,
  isFirstSolve = true,
  totalXp = 0,
  previousXp = 0,
  level = 1,
  dailyBonus = false,
  newBadgeTitles = [],
  onClose,
  onGenerateTestCases,
}) {
  const isPreview = mode === "preview";
  const displayXp = isPreview ? baseXp : xpGained;
  const animatedXp = useCountUp(displayXp, 1000, displayXp > 0);
  const showXp = displayXp > 0 ? animatedXp : 0;

  const levelStart = (level - 1) * LEVEL_XP_STEP;
  const levelEnd = level * LEVEL_XP_STEP;
  const barFrom = Math.max(0, (previousXp - levelStart) / LEVEL_XP_STEP);
  const barTo = Math.max(barFrom, Math.min(1, (totalXp - levelStart) / LEVEL_XP_STEP));
  const [barWidth, setBarWidth] = useState(isPreview ? 0 : barFrom * 100);

  useEffect(() => {
    if (isPreview) return undefined;
    const t = setTimeout(() => setBarWidth(barTo * 100), 400);
    return () => clearTimeout(t);
  }, [barTo, isPreview]);

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${8 + (i * 7) % 85}%`,
    delay: `${i * 0.08}s`,
    color: ["#fbbf24", "#22c55e", "#a855f7", "#3b82f6"][i % 4],
  }));

  return (
    <>
      <Box
        onClick={onClose}
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "rgba(15,23,42,0.55)",
          backdropFilter: "blur(4px)",
          zIndex: 60,
          animation: "fadeIn 0.25s ease",
          "@keyframes fadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
        }}
      />
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "92vw", sm: 400 },
          maxWidth: 400,
          zIndex: 70,
          animation: "celebrateIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
          "@keyframes celebrateIn": {
            from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.75)" },
            to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
          },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {particles.map((p) => (
          <Box
            key={p.id}
            sx={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: p.color,
              left: p.left,
              top: "20%",
              animation: `burst 1.2s ease-out ${p.delay} forwards`,
              "@keyframes burst": {
                "0%": { opacity: 1, transform: "translateY(0) scale(1)" },
                "100%": { opacity: 0, transform: "translateY(-80px) scale(0.3)" },
              },
            }}
          />
        ))}

        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(15,23,42,0.3), 0 0 0 1.5px #e2e8f0",
          }}
        >
          <Box
            sx={{
              px: 3,
              pt: 3,
              pb: 2.5,
              textAlign: "center",
              background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 45%, #312e81 100%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 50% 0%, rgba(251,191,36,0.25) 0%, transparent 55%)",
                pointerEvents: "none",
              }}
            />
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "#86efac",
                mb: 1,
                animation: "slideDown 0.5s ease 0.15s both",
                "@keyframes slideDown": {
                  from: { opacity: 0, transform: "translateY(-12px)" },
                  to: { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              {testsTotal > 0
                ? `All ${testsPassed}/${testsTotal} tests passed`
                : "All tests passed"}
            </Typography>

            <HexagonXpBadge size={108} />

            <Typography
              sx={{
                fontWeight: 900,
                fontSize: 42,
                lineHeight: 1,
                mt: 1.5,
                background: "linear-gradient(90deg, #fde047, #fbbf24, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "xpPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both",
                "@keyframes xpPop": {
                  from: { opacity: 0, transform: "scale(0.5)" },
                  to: { opacity: 1, transform: "scale(1)" },
                },
              }}
            >
              {isPreview && baseXp > 0 ? `+${baseXp}` : showXp > 0 ? `+${showXp}` : "✓"}
              {(isPreview ? baseXp : showXp) > 0 && (
                <Typography component="span" sx={{ fontSize: 22, ml: 0.5, fontWeight: 800 }}>
                  XP
                </Typography>
              )}
            </Typography>

            <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.85)", mt: 0.8, fontWeight: 600 }}>
              {isPreview
                ? "Submit to save & earn XP"
                : xpGained > 0
                  ? "XP added to your profile!"
                  : "Accepted — already earned XP on this problem"}
            </Typography>
          </Box>

          <Box sx={{ px: 3, py: 2 }}>
            {!isPreview && xpGained > 0 && (
              <Stack gap={0.8} sx={{ mb: 2 }}>
                {baseXp > 0 && (
                  <Stack direction="row" justifyContent="space-between" sx={{ fontSize: 12.5 }}>
                    <Typography sx={{ color: "#64748b" }}>First solve ({isFirstSolve ? "this problem" : ""})</Typography>
                    <Typography sx={{ fontWeight: 800, color: "#16a34a" }}>+{baseXp} XP</Typography>
                  </Stack>
                )}
                {dailyBonus && dailyBonusXp > 0 && (
                  <Stack direction="row" justifyContent="space-between" sx={{ fontSize: 12.5 }}>
                    <Typography sx={{ color: "#64748b" }}>Daily challenge bonus</Typography>
                    <Typography sx={{ fontWeight: 800, color: "#7c3aed" }}>+{dailyBonusXp} XP</Typography>
                  </Stack>
                )}
              </Stack>
            )}

            {!isPreview && totalXp > 0 && (
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#64748b" }}>
                    Level {level}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#0f172a" }}>
                    {totalXp} / {levelEnd} XP
                  </Typography>
                </Stack>
                <Box sx={{ height: 8, borderRadius: 4, bgcolor: "#e2e8f0", overflow: "hidden" }}>
                  <Box
                    sx={{
                      height: "100%",
                      width: `${barWidth}%`,
                      borderRadius: 4,
                      background: "linear-gradient(90deg, #22c55e, #16a34a)",
                      transition: "width 1s cubic-bezier(0.34, 1.2, 0.64, 1)",
                    }}
                  />
                </Box>
              </Box>
            )}

            {newBadgeTitles?.length > 0 && (
              <Box
                sx={{
                  mb: 2,
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: "#fef3c7",
                  border: "1.5px solid #fde68a",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontSize: 12, fontWeight: 800, color: "#b45309" }}>
                  New badge: {newBadgeTitles.join(", ")}
                </Typography>
              </Box>
            )}

            {onGenerateTestCases && (
              <Button
                fullWidth
                onClick={onGenerateTestCases}
                sx={{
                  mb: 1,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: 13,
                  color: "#fff",
                  background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
                  "&:hover": { background: "linear-gradient(135deg,#6d28d9,#5b21b6)" },
                }}
              >
                Generate AI test cases
              </Button>
            )}

            <Button
              fullWidth
              variant="outlined"
              onClick={onClose}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                fontSize: 13,
                borderColor: "#e2e8f0",
                color: "#64748b",
              }}
            >
              {isPreview ? "Keep coding" : "Awesome!"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
