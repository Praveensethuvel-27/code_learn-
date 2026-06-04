import { useEffect, useState } from "react";
import {
  Alert, Box, Button, Grid, IconButton,
  Paper, Stack, Tooltip, Typography, MenuItem,
  TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, Snackbar,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { api } from "../lib/apiClient";

const LANG_STYLE = {
  javascript: { bg: "#fef9c3", color: "#92400e", border: "#fde68a" },
  python:     { bg: "#dcfce7", color: "#14532d", border: "#bbf7d0" },
  java:       { bg: "#fee2e2", color: "#7f1d1d", border: "#fecaca" },
  c:          { bg: "#dbeafe", color: "#1e3a8a", border: "#bfdbfe" },
  cpp:        { bg: "#ede9fe", color: "#3b0764", border: "#ddd6fe" },
};

export function SavedCodesPage() {
  const [savedCodes, setSavedCodes] = useState([]);
  const [error,      setError]      = useState("");
  const [q,          setQ]          = useState("");
  const [langFilter, setLangFilter] = useState("");
  const [snack,      setSnack]      = useState("");
  const [preview,    setPreview]    = useState(null); // { title, language, sourceCode }

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/savedcodes/me");
        setSavedCodes(res.data.savedCodes || []);
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load saved codes");
      }
    })();
  }, []);

  const filtered = savedCodes.filter((s) => {
    const matchQ    = !q          || s.title.toLowerCase().includes(q.toLowerCase());
    const matchLang = !langFilter || s.language === langFilter;
    return matchQ && matchLang;
  });

  const uniqueLangs = [...new Set(savedCodes.map((s) => s.language))];

  const handleDelete = async (id) => {
    try {
      await api.delete(`/savedcodes/${id}`);
      setSavedCodes((prev) => prev.filter((x) => x._id !== id));
      setSnack("Deleted successfully");
    } catch {
      setSnack("Delete failed");
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setSnack("Copied to clipboard!");
  };

  return (
    <Stack spacing={0}>

      {/* ── Heading ── */}
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "flex-end" }}
        justifyContent="space-between" spacing={1} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.6, color: "#0f172a", lineHeight: 1.1 }}>
            Saved Codes
          </Typography>
          <Typography color="text.secondary" fontSize={14} mt={0.5}>
            Your personal code snippets library.
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" gap={1}>
          <Box sx={{
            px: 1.6, py: 0.55, borderRadius: 2,
            bgcolor: "#eef2ff", color: "#4f46e5",
            border: "1.5px solid #c7d2fe",
            fontSize: 13, fontWeight: 700,
          }}>
            {savedCodes.length} snippet{savedCodes.length !== 1 ? "s" : ""}
          </Box>
          <Button component={RouterLink} to="/editor" variant="contained"
            startIcon={<CodeIcon />}
            sx={{ fontWeight: 700, bgcolor: "#4f46e5", "&:hover": { bgcolor: "#4338ca" } }}>
            New Snippet
          </Button>
        </Stack>
      </Stack>

      {error && <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>{error}</Alert>}

      {/* ── Filters ── */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 3 }}>
        <Box sx={{
          flex: 1, display: "flex", alignItems: "center", gap: 1,
          px: 1.5, py: 1,
          bgcolor: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 2,
          "&:focus-within": { borderColor: "#4f46e5" }, transition: "border-color 0.15s",
        }}>
          <SearchIcon sx={{ fontSize: 18, color: "#94a3b8", flexShrink: 0 }} />
          <Box component="input" placeholder="Search snippets…" value={q}
            onChange={(e) => setQ(e.target.value)}
            sx={{ border: "none", outline: "none", bgcolor: "transparent",
              fontSize: 14, color: "#0f172a", width: "100%",
              "::placeholder": { color: "#94a3b8" } }} />
        </Box>
        <TextField select size="small" value={langFilter}
          onChange={(e) => setLangFilter(e.target.value)}
          sx={{ minWidth: 150, bgcolor: "#fff", borderRadius: 2 }}>
          <MenuItem value="">All Languages</MenuItem>
          {uniqueLangs.map((l) => (
            <MenuItem key={l} value={l}>{l}</MenuItem>
          ))}
        </TextField>
      </Stack>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 6, borderRadius: 3, textAlign: "center", bgcolor: "#f8fafc", borderColor: "#e2e8f0" }}>
          <BookmarkIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1.5 }} />
          <Typography variant="h6" fontWeight={700} color="text.secondary">
            {savedCodes.length === 0 ? "No saved codes yet" : "No results found"}
          </Typography>
          <Typography color="text.disabled" fontSize={14} mt={0.5}>
            {savedCodes.length === 0
              ? "Open the editor and save your first snippet!"
              : "Try a different search or language filter"}
          </Typography>
          {savedCodes.length === 0 && (
            <Button component={RouterLink} to="/editor" variant="contained" sx={{ mt: 2, fontWeight: 700, bgcolor: "#4f46e5" }}>
              Open Editor
            </Button>
          )}
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((s) => {
            const ls = LANG_STYLE[s.language] || { bg: "#f1f5f9", color: "#64748b", border: "#e2e8f0" };
            return (
              <Grid item xs={12} sm={6} lg={4} key={s._id}>
                <Paper variant="outlined" sx={{
                  p: 0, borderRadius: 3, overflow: "hidden",
                  borderColor: "#e2e8f0", bgcolor: "#fff", height: "100%",
                  display: "flex", flexDirection: "column",
                  transition: "transform 0.16s, box-shadow 0.16s, border-color 0.16s",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(15,23,42,0.09)", borderColor: ls.border },
                }}>
                  <Box sx={{ height: 3, bgcolor: ls.color }} />
                  <Stack sx={{ p: 2.5, flex: 1 }} spacing={1.5}>
                    {/* header */}
                    <Stack direction="row" alignItems="center" gap={1.2}>
                      <Box sx={{
                        width: 36, height: 36, borderRadius: 1.5, flexShrink: 0,
                        bgcolor: ls.bg, color: ls.color,
                        border: `1.5px solid ${ls.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <CodeIcon sx={{ fontSize: 18 }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography fontSize={14} fontWeight={800} color="#0f172a" noWrap>
                          {s.title}
                        </Typography>
                        <Stack direction="row" alignItems="center" gap={0.7} mt={0.2}>
                          <Box sx={{
                            px: 0.9, py: 0.15, borderRadius: 1,
                            bgcolor: ls.bg, color: ls.color,
                            border: `1px solid ${ls.border}`,
                            fontSize: 10, fontWeight: 700,
                          }}>
                            {s.language}
                          </Box>
                          <Typography fontSize={10} color="#94a3b8">
                            {new Date(s.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    {/* code preview */}
                    <Box sx={{
                      p: 1.5, borderRadius: 2,
                      bgcolor: "#f8fafc", border: "1px solid #e2e8f0",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11.5, color: "#374151", lineHeight: 1.7,
                      overflow: "hidden", flex: 1,
                      display: "-webkit-box", WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      whiteSpace: "pre-wrap", wordBreak: "break-all",
                    }}>
                      {s.sourceCode?.slice(0, 200)}
                      {s.sourceCode?.length > 200 ? "…" : ""}
                    </Box>

                    {/* actions */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Button size="small" startIcon={<OpenInNewIcon sx={{ fontSize: 13 }} />}
                        onClick={() => setPreview(s)}
                        sx={{ fontWeight: 700, color: "#4f46e5", fontSize: 12, px: 0 }}>
                        View
                      </Button>
                      <Stack direction="row" gap={0.5}>
                        <Tooltip title="Copy code">
                          <IconButton size="small"
                            sx={{ color: "#64748b", "&:hover": { bgcolor: "#eef2ff", color: "#4f46e5" } }}
                            onClick={() => handleCopy(s.sourceCode)}>
                            <ContentCopyIcon sx={{ fontSize: 15 }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small"
                            sx={{ color: "#64748b", "&:hover": { bgcolor: "#fef2f2", color: "#ef4444" } }}
                            onClick={() => handleDelete(s._id)}>
                            <DeleteIcon sx={{ fontSize: 15 }} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* ── Preview dialog ── */}
      <Dialog open={!!preview} onClose={() => setPreview(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
          {preview?.title}
          <Typography fontSize={12} color="text.secondary" fontWeight={400}>
            {preview?.language}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box component="pre" sx={{
            m: 0, p: 2, borderRadius: 2,
            bgcolor: "#f8fafc", border: "1px solid #e2e8f0",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13, lineHeight: 1.75,
            color: "#1e293b",
            whiteSpace: "pre-wrap", wordBreak: "break-word",
            maxHeight: 400, overflowY: "auto",
          }}>
            {preview?.sourceCode}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => handleCopy(preview?.sourceCode)}
            startIcon={<ContentCopyIcon />}
            sx={{ fontWeight: 700, color: "#4f46e5" }}>
            Copy
          </Button>
          <Button onClick={() => setPreview(null)} sx={{ color: "#64748b" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!snack} autoHideDuration={2500}
        onClose={() => setSnack("")} message={snack} />
    </Stack>
  );
}