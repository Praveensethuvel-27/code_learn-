import { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../providers/authContext";
import { api } from "../lib/apiClient";
import CodeIcon from "@mui/icons-material/Code";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export function DashboardPage() {
  const { user } = useAuth();
  const [subs, setSubs] = useState([]);
  const [savedCodes, setSavedCodes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [subsRes, savedRes] = await Promise.all([
          api.get("/submissions/me"),
          api.get("/savedcodes/me"),
        ]);
        setSubs(subsRes.data.submissions || []);
        setSavedCodes(savedRes.data.savedCodes || []);
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load dashboard");
      }
    })();
  }, []);

  const accepted = subs.filter((s) => s.status === "accepted").length;
  const completedLessons = (user?.completedLessons || []).length;

  const statusColor = (s) => {
    if (s === "accepted") return "success";
    if (s === "wrong_answer") return "warning";
    if (s === "compile_error" || s === "runtime_error") return "error";
    return "default";
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <Stack spacing={3}>
      {error ? <Alert severity="error">{error}</Alert> : null}

      {/* Welcome header */}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 3,
          background:
            "linear-gradient(135deg, rgba(109,40,217,0.06) 0%, rgba(14,165,233,0.04) 100%)",
          border: "1px solid rgba(109,40,217,0.12)",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} spacing={2}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              background: "linear-gradient(135deg, #6d28d9, #0ea5e9)",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
              Welcome back, {user?.name?.split(" ")[0] ?? "Student"}! 👋
            </Typography>
            <Typography color="text.secondary" fontSize={14}>
              Keep up the momentum — you&apos;re doing great.
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/editor"
            variant="contained"
            startIcon={<CodeIcon />}
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #6d28d9, #7c3aed)",
              whiteSpace: "nowrap",
            }}
          >
            Open Editor
          </Button>
        </Stack>
      </Paper>

      {/* Stats */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<SchoolIcon />}
            color="#6d28d9"
            bg="rgba(109,40,217,0.08)"
            label="Lessons Done"
            value={completedLessons}
            sub="Keep learning!"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<EmojiEventsIcon />}
            color="#f59e0b"
            bg="rgba(245,158,11,0.08)"
            label="Problems Solved"
            value={accepted}
            sub={`out of ${subs.length} submitted`}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<BookmarkIcon />}
            color="#0ea5e9"
            bg="rgba(14,165,233,0.08)"
            label="Saved Codes"
            value={savedCodes.length}
            sub="Your snippets"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* Saved Codes */}
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <BookmarkIcon sx={{ color: "#0ea5e9", fontSize: 20 }} />
                <Typography fontWeight={800} fontSize={16}>
                  Saved Codes
                </Typography>
                <Chip label={savedCodes.length} size="small" sx={{ height: 18, fontSize: 10 }} />
              </Stack>
              <Button
                component={RouterLink}
                to="/editor"
                size="small"
                endIcon={<OpenInNewIcon fontSize="small" />}
                sx={{ fontSize: 12 }}
              >
                Editor
              </Button>
            </Stack>
            <Stack spacing={1.5}>
              {savedCodes.slice(0, 5).map((s) => (
                <Paper
                  key={s._id}
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    "&:hover": { bgcolor: "grey.50" },
                    transition: "background 0.15s",
                  }}
                >
                  <Stack direction="row" alignItems="flex-start" spacing={1.5}>
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 1.5,
                        bgcolor: "rgba(14,165,233,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <CodeIcon sx={{ fontSize: 16, color: "#0ea5e9" }} />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography fontWeight={700} fontSize={13} noWrap>
                        {s.title}
                      </Typography>
                      <Stack direction="row" spacing={1} mt={0.3} alignItems="center">
                        <Chip label={s.language} size="small" sx={{ height: 16, fontSize: 10 }} />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(s.createdAt).toLocaleDateString()}
                        </Typography>
                      </Stack>
                    </Box>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={async () => {
                          try {
                            await api.delete(`/savedcodes/${s._id}`);
                            setSavedCodes((prev) => prev.filter((x) => x._id !== s._id));
                          } catch {
                            // ignore
                          }
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Paper>
              ))}
              {!savedCodes.length && (
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <BookmarkIcon sx={{ fontSize: 36, color: "text.disabled", mb: 1 }} />
                  <Typography color="text.secondary" fontSize={13}>
                    No saved codes yet.{" "}
                    <RouterLink to="/editor" style={{ color: "#6d28d9" }}>
                      Open the editor
                    </RouterLink>{" "}
                    and save your first snippet!
                  </Typography>
                </Box>
              )}
            </Stack>
          </Paper>
        </Grid>

        {/* Recent Submissions */}
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, height: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <EmojiEventsIcon sx={{ color: "#f59e0b", fontSize: 20 }} />
                <Typography fontWeight={800} fontSize={16}>
                  Recent Submissions
                </Typography>
                <Chip label={subs.length} size="small" sx={{ height: 18, fontSize: 10 }} />
              </Stack>
              <Button
                component={RouterLink}
                to="/problems"
                size="small"
                endIcon={<OpenInNewIcon fontSize="small" />}
                sx={{ fontSize: 12 }}
              >
                Problems
              </Button>
            </Stack>
            <Stack spacing={1.5}>
              {subs.slice(0, 5).map((s) => (
                <Paper
                  key={s._id}
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    "&:hover": { bgcolor: "grey.50" },
                    transition: "background 0.15s",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 1.5,
                        bgcolor:
                          s.status === "accepted"
                            ? "rgba(16,185,129,0.1)"
                            : "rgba(239,68,68,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <CheckCircleIcon
                        sx={{
                          fontSize: 16,
                          color: s.status === "accepted" ? "#10b981" : "#ef4444",
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography fontWeight={700} fontSize={13} noWrap>
                        {s.problem?.title ?? "Unknown Problem"}
                      </Typography>
                      <Stack direction="row" spacing={1} mt={0.3} alignItems="center">
                        <Chip
                          label={s.status}
                          size="small"
                          color={statusColor(s.status)}
                          sx={{ height: 16, fontSize: 10 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {s.summary?.passed}/{s.summary?.total} • {s.language}
                        </Typography>
                      </Stack>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                      {new Date(s.createdAt).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
              {!subs.length && (
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <EmojiEventsIcon sx={{ fontSize: 36, color: "text.disabled", mb: 1 }} />
                  <Typography color="text.secondary" fontSize={13}>
                    No submissions yet.{" "}
                    <RouterLink to="/problems" style={{ color: "#6d28d9" }}>
                      Try a problem
                    </RouterLink>{" "}
                    to get started!
                  </Typography>
                </Box>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick actions */}
      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
        <Typography fontWeight={800} fontSize={15} mb={2}>
          Quick Actions
        </Typography>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" gap={1}>
          <Button
            component={RouterLink}
            to="/languages"
            variant="outlined"
            startIcon={<SchoolIcon />}
            sx={{ fontWeight: 600 }}
          >
            Browse Lessons
          </Button>
          <Button
            component={RouterLink}
            to="/problems"
            variant="outlined"
            startIcon={<EmojiEventsIcon />}
            sx={{ fontWeight: 600 }}
          >
            Solve Problems
          </Button>
          <Button
            component={RouterLink}
            to="/editor"
            variant="outlined"
            startIcon={<CodeIcon />}
            sx={{ fontWeight: 600 }}
          >
            Open Editor
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

function StatCard({ icon, color, bg, label, value, sub }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(0,0,0,0.08)" },
      }}
    >
      <Stack direction="row" alignItems="flex-start" spacing={1.5}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            bgcolor: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography fontSize={12} color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
            {value}
          </Typography>
          <Typography fontSize={11} color="text.secondary" mt={0.3}>
            {sub}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
