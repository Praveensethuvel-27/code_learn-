import { Box, Stack, Typography, Tooltip } from "@mui/material";
import { COMPILER_LANGS, BROWSER_LANGS } from "../config/languages";
import { LanguageIcon } from "./LanguageIcon";

function LangItem({ lang, active, onChange, showLabel }) {
  return (
    <Tooltip title={lang.full} placement="right" disableHoverListener={showLabel}>
      <Box
        onClick={() => onChange(lang.key)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: showLabel ? 1.25 : 0.75,
          py: 0.85,
          mx: showLabel ? 0.5 : 0.25,
          borderRadius: 1.75,
          cursor: "pointer",
          flexShrink: 0,
          bgcolor: active ? "rgba(99,102,241,0.35)" : "transparent",
          borderLeft: showLabel && active ? `3px solid ${lang.color}` : "3px solid transparent",
          outline: !showLabel && active ? `2px solid ${lang.color}` : "none",
          color: active ? "#fff" : "rgba(255,255,255,0.7)",
          transition: "all 0.12s",
          "&:hover": { bgcolor: "rgba(255,255,255,0.1)", color: "#fff" },
        }}
      >
        <LanguageIcon langKey={lang.key} size={showLabel ? 20 : 22} />
        {showLabel && (
          <Typography sx={{ fontSize: 12, fontWeight: active ? 700 : 500, whiteSpace: "nowrap" }}>
            {lang.full}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
}

/**
 * @param {"all"|"compiler"} mode
 * @param {"sidebar"|"bar"} variant — sidebar: vertical (desktop); bar: horizontal scroll (mobile)
 */
export function LanguageSidebar({ language, onChange, mode = "all", variant = "sidebar" }) {
  const browser = mode === "all" ? BROWSER_LANGS : [];
  const sections = [
    { title: "Code", items: COMPILER_LANGS },
    ...(browser.length ? [{ title: "Web & SQL", items: browser }] : []),
  ];

  const isBar = variant === "bar";

  return (
    <Box
      sx={{
        flexShrink: 0,
        bgcolor: "#0f172a",
        ...(isBar
          ? {
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              overflowX: "auto",
              overflowY: "hidden",
              py: 1,
              px: 1,
              gap: 0.25,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              WebkitOverflowScrolling: "touch",
              "&::-webkit-scrollbar": { height: 4 },
              "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.2)", borderRadius: 2 },
            }
          : {
              width: 168,
              display: "flex",
              flexDirection: "column",
              alignSelf: "stretch",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              py: 1,
              overflowY: "auto",
              overflowX: "hidden",
              "&::-webkit-scrollbar": { width: 4 },
              "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.15)", borderRadius: 2 },
            }),
      }}
    >
      {sections.map((sec) => (
        <Box
          key={sec.title}
          sx={{
            display: isBar ? "flex" : "block",
            flexDirection: isBar ? "row" : undefined,
            alignItems: isBar ? "center" : undefined,
            gap: isBar ? 0.25 : 0,
            flexShrink: isBar ? 0 : undefined,
            width: isBar ? "auto" : "100%",
          }}
        >
          {!isBar && (
            <Typography
              sx={{
                px: 1.5,
                pt: sec.title === "Web & SQL" ? 1 : 0,
                pb: 0.5,
                fontSize: 9.5,
                fontWeight: 700,
                color: "rgba(255,255,255,0.38)",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {sec.title}
            </Typography>
          )}
          {isBar && sec.title === "Web & SQL" && (
            <Box sx={{ width: 1, height: 24, bgcolor: "rgba(255,255,255,0.12)", mx: 0.5, flexShrink: 0 }} />
          )}
          {sec.items.map((l) => (
            <LangItem
              key={l.key}
              lang={l}
              active={language === l.key}
              onChange={onChange}
              showLabel={!isBar}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export { langStyle } from "../config/languages";
