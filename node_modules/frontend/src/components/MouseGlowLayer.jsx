import { useRef, useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";

/**
 * Cursor-following glow (antigravity-style). Wrap any panel; children stay interactive.
 */
export function MouseGlowLayer({
  children,
  glowColor = "99, 102, 241",
  intensity = 0.14,
  blurSize = 320,
  sx,
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: -400, y: -400 });

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [onMove]);

  const half = blurSize / 2;

  return (
    <Box ref={ref} sx={{ position: "relative", overflow: "hidden", ...sx }}>
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `radial-gradient(${blurSize + 180}px circle at ${pos.x}px ${pos.y}px, rgba(${glowColor}, ${intensity}), transparent 45%)`,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          width: blurSize,
          height: blurSize,
          left: pos.x - half,
          top: pos.y - half,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
          background: `radial-gradient(circle, rgba(${glowColor}, ${intensity * 2}) 0%, transparent 68%)`,
          filter: "blur(12px)",
          transition: "left 0.1s ease-out, top 0.1s ease-out",
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1, height: "100%" }}>{children}</Box>
    </Box>
  );
}
