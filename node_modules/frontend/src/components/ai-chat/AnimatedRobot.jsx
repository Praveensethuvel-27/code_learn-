import { Box } from "@mui/material";

const BOT_IMG = "/ai-chat-bot.gif";

const CYAN = "#22d3ee";
const CYAN_GLOW = "0 0 10px rgba(34,211,238,0.95), 0 0 18px rgba(34,211,238,0.55)";

/**
 * Robot: wave/handshake on greet, blink eyes, thinking dots, float + blue shadow.
 */
export function AnimatedRobot({
  size = "lg",
  thinking = false,
  showShadow = true,
  waving = false,
}) {
  const dim = size === "sm" ? { w: 48, containerH: 56 } : { w: 200, containerH: 240 };
  const bobDuration = thinking ? "1s" : "2.8s";
  const bodyAnim = waving
    ? "botWaveHello 2.4s ease-in-out"
    : size === "lg"
      ? `botBob ${bobDuration} ease-in-out infinite`
      : "none";

  return (
    <Box
      sx={{
        position: "relative",
        width: dim.w,
        height: dim.containerH,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        mx: "auto",
        "@keyframes botBob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "@keyframes botWaveHello": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "12%": { transform: "translateY(-6px) rotate(-4deg)" },
          "28%": { transform: "translateY(0) rotate(3deg)" },
          "44%": { transform: "translateY(-5px) rotate(-3deg)" },
          "60%": { transform: "translateY(0) rotate(2deg)" },
          "76%": { transform: "translateY(-3px) rotate(-2deg)" },
        },
        "@keyframes armWaveRight": {
          "0%, 100%": { transform: "rotate(18deg)" },
          "20%": { transform: "rotate(-32deg)" },
          "40%": { transform: "rotate(8deg)" },
          "55%": { transform: "rotate(-28deg)" },
          "70%": { transform: "rotate(5deg)" },
          "85%": { transform: "rotate(-18deg)" },
        },
        "@keyframes armWaveLeft": {
          "0%, 100%": { transform: "rotate(-12deg)" },
          "25%": { transform: "rotate(8deg)" },
          "50%": { transform: "rotate(-6deg)" },
        },
        "@keyframes blueGlowShadow": {
          "0%, 100%": { transform: "translateX(-50%) scale(1)", opacity: 0.9 },
          "50%": { transform: "translateX(-50%) scale(0.7)", opacity: 0.4 },
        },
        "@keyframes eyeBlink": {
          "0%, 42%, 46%, 100%": { transform: "scaleY(1)", opacity: 1 },
          "44%": { transform: "scaleY(0.08)", opacity: 0.85 },
        },
        "@keyframes eyeGlow": {
          "0%, 100%": { opacity: 0.85, filter: "brightness(1)" },
          "50%": { opacity: 1, filter: "brightness(1.35)" },
        },
        "@keyframes thinkDot": {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: 0.35 },
          "40%": { transform: "translateY(-5px)", opacity: 1 },
        },
      }}
    >
      {showShadow && size === "lg" && (
        <>
          <Box
            sx={{
              position: "absolute",
              bottom: 2,
              left: "50%",
              width: dim.w * 0.75,
              height: 28,
              transform: "translateX(-50%)",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(56,189,248,0.5) 0%, transparent 70%)",
              filter: "blur(10px)",
              animation: waving
                ? "blueGlowShadow 2.4s ease-in-out"
                : `blueGlowShadow ${bobDuration} ease-in-out infinite`,
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: dim.w * 0.65,
              height: 22,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(34,211,238,0.9) 0%, rgba(59,130,246,0.5) 50%, transparent 75%)",
              boxShadow: "0 0 24px rgba(56,189,248,0.7)",
              animation: waving
                ? "blueGlowShadow 2.4s ease-in-out"
                : `blueGlowShadow ${bobDuration} ease-in-out infinite`,
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <Box
        sx={{
          position: "relative",
          width: dim.w,
          animation: bodyAnim,
        }}
      >
        {/* Wave arms (over PNG arms) */}
        {waving && size === "lg" && (
          <>
            <Box
              sx={{
                position: "absolute",
                right: "-2%",
                top: "42%",
                width: "22%",
                height: "9%",
                borderRadius: 99,
                bgcolor: "#f8fafc",
                border: "2px solid #e2e8f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transformOrigin: "left center",
                animation: "armWaveRight 2.4s ease-in-out",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                left: "-2%",
                top: "44%",
                width: "18%",
                height: "8%",
                borderRadius: 99,
                bgcolor: "#f1f5f9",
                border: "2px solid #e2e8f0",
                transformOrigin: "right center",
                animation: "armWaveLeft 2.4s ease-in-out",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          </>
        )}

        <Box
          component="img"
          src={BOT_IMG}
          alt=""
          sx={{
            width: dim.w,
            height: "auto",
            display: "block",
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
            position: "relative",
            zIndex: 1,
          }}
        />


      </Box>
    </Box>
  );
}
