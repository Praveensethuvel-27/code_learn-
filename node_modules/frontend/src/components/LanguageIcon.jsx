import { Box, Typography } from "@mui/material";
import { getLangMeta } from "../config/languages";

/** Devicon CDN — brand-accurate language logos */
const ICON_SRC = {
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/javascript/javascript-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/typescript/typescript-original.svg",
  python:     "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/python/python-original.svg",
  java:       "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/java/java-original.svg",
  c:          "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/c/c-original.svg",
  cpp:        "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/cplusplus/cplusplus-original.svg",
  csharp:     "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/csharp/csharp-original.svg",
  go:         "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/go/go-original.svg",
  rust:       "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/rust/rust-original.svg",
  php:        "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/php/php-original.svg",
  ruby:       "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/ruby/ruby-original.svg",
  fsharp:     "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/fsharp/fsharp-original.svg",
  haskell:    "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/haskell/haskell-original.svg",
  html:       "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/html5/html5-original.svg",
  css:        "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/css3/css3-original.svg",
  sql:        "https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/postgresql/postgresql-original.svg",
};

export function LanguageIcon({ langKey, size = 22, showLabel = false }) {
  const meta = getLangMeta(langKey);
  const src = ICON_SRC[langKey];
  const abbr = meta?.abbr || langKey?.slice(0, 2).toUpperCase();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
      <Box
        sx={{
          width: size,
          height: size,
          flexShrink: 0,
          borderRadius: 1.25,
          overflow: "hidden",
          bgcolor: meta?.bg || "#f1f5f9",
          border: `1px solid ${meta?.border || "#e2e8f0"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 0.35,
        }}
      >
        {src ? (
          <Box
            component="img"
            src={src}
            alt=""
            sx={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ) : (
          <Typography sx={{ fontSize: size * 0.38, fontWeight: 800, color: meta?.color || "#475569", lineHeight: 1 }}>
            {abbr}
          </Typography>
        )}
      </Box>
      {showLabel && meta && (
        <Typography noWrap sx={{ fontSize: 12.5, fontWeight: 700, color: "inherit" }}>
          {meta.full}
        </Typography>
      )}
    </Box>
  );
}
