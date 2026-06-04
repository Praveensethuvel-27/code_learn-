import { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/authContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ExtensionIcon from "@mui/icons-material/Extension";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CodeIcon from "@mui/icons-material/Code";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { api } from "../../lib/apiClient";
import { AdminUsersPage } from "./AdminUsersPage.jsx";
import { StreakMilestonesPanel } from "./StreakMilestonesPanel.jsx";
import { StudentDashboardPage } from "../StudentDashboardPage.jsx";

// ── Colors ───────────────────────────────────────────
const LANG_COLORS = {
  javascript: "#f59e0b",
  python: "#10b981",
  java: "#ef4444",
  cpp: "#8b5cf6",
  c: "#3b82f6",
};
const STATUS_COLORS = {
  accepted: "#10b981",
  wrong_answer: "#f59e0b",
  runtime_error: "#ef4444",
  compile_error: "#6366f1",
  error: "#94a3b8",
};
const DIFFICULTY_COLOR = { easy: "success", medium: "warning", hard: "error" };
const STATUS_CHIP_COLOR = {
  accepted: "success",
  wrong_answer: "warning",
  runtime_error: "error",
  compile_error: "error",
  error: "default",
};
const STATUS = {
  accepted: { color: "#15803d", bg: "#f0fdf4" },
  wrong_answer: { color: "#b45309", bg: "#fffbeb" },
  compile_error: { color: "#b91c1c", bg: "#fef2f2" },
  runtime_error: { color: "#b91c1c", bg: "#fef2f2" },
};
const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
const fmtDateTime = (d) => new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
const shortDay = (d) => new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric" });

// ── Admin Dashboard ───────────────────────────────────
export function AdminDashboardPage() {
  const { user } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === "admin";
  if (!isAdmin) return <StudentDashboardPage user={user} />;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [workTab, setWorkTab] = useState(0);
  const [filterUser, setFilterUser] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/admin/dashboard");
      setData(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
      <CircularProgress size={36} />
    </Box>
  );
  if (error) return <Alert severity="error">{error}</Alert>;

  const { stats, charts, topActiveUsers, topProblems, recentSubmissions, recentSavedCodes = [], recentUsers } = data;

  const barChartData = (charts.submissionsPerDay || []).map((d) => ({ day: shortDay(d._id), Total: d.count, Accepted: d.accepted }));
  const langPieData = (charts.submissionsByLanguage || []).map((d) => ({ name: d._id, value: d.count, color: LANG_COLORS[d._id] || "#94a3b8" }));
  const statusPieData = (charts.submissionsByStatus || []).map((d) => ({ name: d._id.replace(/_/g, " "), value: d.count, color: STATUS_COLORS[d._id] || "#94a3b8" }));

  const allUsers = [...new Set([
    ...recentSubmissions.map((s) => s.user?.name).filter(Boolean),
    ...recentSavedCodes.map((s) => s.user?.name).filter(Boolean),
  ])].sort();

  const filteredSubs = filterUser ? recentSubmissions.filter((s) => s.user?.name === filterUser) : recentSubmissions;
  const filteredSaved = filterUser ? recentSavedCodes.filter((s) => s.user?.name === filterUser) : recentSavedCodes;

  return (
    <Stack spacing={3}>

      {/* ── Hero ── */}
      <Box sx={{ bgcolor: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 4, p: { xs: 2.5, md: 3 }, position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #4f46e5, #0284c7, #38bdf8)", borderRadius: "4px 4px 0 0" }} />
        <Stack direction={{ xs: "column", md: "row" }} alignItems={{ md: "center" }} justifyContent="space-between" spacing={2} mt={0.5}>
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, mb: 0.5 }}>Workspace</Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: -0.4 }}>Admin Dashboard</Typography>
            <Typography sx={{ color: "#64748b", fontSize: 13, mt: 0.3 }}>Upload content, review submissions, and monitor student activity.</Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="flex-end">
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, px: 1.4, py: 0.7, borderRadius: 2, bgcolor: "#eef2ff", border: "1px solid #c7d2fe", color: "#4f46e5", fontSize: 12, fontWeight: 700 }}>
              <MenuBookIcon sx={{ fontSize: 14 }} /> Upload Content
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, px: 1.4, py: 0.7, borderRadius: 2, bgcolor: "#fffbeb", border: "1px solid #fde68a", color: "#b45309", fontSize: 12, fontWeight: 700 }}>
              <CheckCircleIcon sx={{ fontSize: 14 }} /> Student Monitor
            </Box>
            <Tooltip title="Refresh">
              <IconButton onClick={load} size="small" sx={{ bgcolor: "#fff", border: "1px solid #e2e8f0" }}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>

      {/* ── Action bar ── */}
      <Box sx={{ bgcolor: "#fff", border: "2px solid #e2e8f0", borderRadius: 3, p: 1.5 }}>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} spacing={1.5} justifyContent="space-between">
          <Stack direction="row" spacing={0.8} flexWrap="wrap" gap={0.8}>
            {[
              { to: "/admin/problems", label: "Upload Problem", color: "#166534", bg: "#f0fdf4", border: "#bbf7d0", icon: "🧩" },
              { to: "/practice-paths", label: "Practice Paths", color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe", icon: "🧭" },
              { to: "/editor", label: "Code Editor", color: "#0e7490", bg: "#ecfeff", border: "#a5f3fc", icon: "💻" },
            ].map((a) => (
              <Box key={a.to} component={RouterLink} to={a.to} sx={{ display: "flex", alignItems: "center", gap: 0.7, px: 1.4, py: 0.7, borderRadius: 2, border: "2px solid", borderColor: a.border, bgcolor: a.bg, color: a.color, fontSize: 12, fontWeight: 700, textDecoration: "none", transition: "all 0.13s", userSelect: "none", "&:hover": { filter: "brightness(0.98)" } }}>
                <span style={{ fontSize: 13 }}>{a.icon}</span> {a.label}
              </Box>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} flexShrink={0}>
            <Button component={RouterLink} to="/dashboard" variant="contained" size="small"
              sx={{ fontWeight: 700, bgcolor: "#16a34a", borderRadius: 2, "&:hover": { bgcolor: "#15803d" }, boxShadow: "0 4px 12px rgba(22,163,74,0.25)" }}>
              Review Submissions
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* ── Admin • Users (scroll target: #manage-users from sidebar) ── */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3.5, borderColor: "#e2e8f0" }} id="manage-users">
        <AdminUsersPage embedded refreshKey={`${location.pathname}${location.hash}`} />
      </Paper>
      <ScrollToManageUsers />

      {/* ── Charts ── */}
      <Grid container spacing={2.5} sx={{ width: "100%", m: 0 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3.5, borderColor: "#e2e8f0" }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <TrendingUpIcon sx={{ fontSize: 18, color: "#6d28d9" }} />
              <Typography fontWeight={800} fontSize={14}>Submissions — Last 7 Days</Typography>
              <Chip label={`${stats.submissions.last7Days} total`} size="small" sx={{ height: 18, fontSize: 10 }} />
            </Stack>
            {barChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={barChartData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <RechartsTooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }} />
                  <Bar dataKey="Total" fill="#c4b5fd" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Accepted" fill="#6d28d9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <EmptyChart label="No submissions in the last 7 days" />}
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3.5, height: "100%", borderColor: "#e2e8f0" }}>
            <Typography fontWeight={800} fontSize={14} mb={2}>By Language</Typography>
            {langPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={langPieData} cx="50%" cy="48%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                    {langPieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} formatter={(v, n) => [v, n]} />
                  <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 11 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            ) : <EmptyChart label="No data" />}
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3.5, height: "100%", borderColor: "#e2e8f0" }}>
            <Typography fontWeight={800} fontSize={14} mb={2}>By Status</Typography>
            {statusPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={statusPieData} cx="50%" cy="48%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                    {statusPieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} formatter={(v, n) => [v, n]} />
                  <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 11 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            ) : <EmptyChart label="No data" />}
          </Paper>
        </Grid>
      </Grid>

      {/* ── Top Tables ── */}
      <Grid container spacing={2.5} sx={{ width: "100%", m: 0 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3.5, borderColor: "#e2e8f0" }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <EmojiEventsIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
              <Typography fontWeight={800} fontSize={14}>Top Active Users</Typography>
              <Typography fontSize={11} color="text.secondary">(last 30 days)</Typography>
            </Stack>
            {topActiveUsers.length > 0 ? (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>User</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>Submissions</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>Accepted</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topActiveUsers.map((u, i) => (
                    <TableRow key={u._id} hover>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Avatar sx={{ width: 26, height: 26, fontSize: 10, fontWeight: 700, bgcolor: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#cd7f32" : "#e2e8f0", color: i < 3 ? "#fff" : "text.primary" }}>{i + 1}</Avatar>
                          <Box>
                            <Typography sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>{u.name}</Typography>
                            <Typography fontSize={10} color="text.secondary">{u.email}</Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell align="right"><Typography fontSize={13} fontWeight={700}>{u.submissions}</Typography></TableCell>
                      <TableCell align="right"><Chip label={u.accepted} size="small" color="success" sx={{ height: 18, fontSize: 10 }} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : <Typography color="text.secondary" fontSize={13} textAlign="center" py={2}>No activity in the last 30 days.</Typography>}
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3.5, borderColor: "#e2e8f0" }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <ExtensionIcon sx={{ fontSize: 18, color: "#6d28d9" }} />
              <Typography fontWeight={800} fontSize={14}>Most Attempted Problems</Typography>
            </Stack>
            {topProblems.length > 0 ? (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>Problem</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>Attempts</TableCell>
                    <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>Solved</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProblems.map((p) => (
                    <TableRow key={p._id} hover>
                      <TableCell>
                        <Typography sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>{p.title}</Typography>
                        <Chip label={p.difficulty} size="small" color={DIFFICULTY_COLOR[p.difficulty]} sx={{ height: 16, fontSize: 10, mt: 0.3 }} />
                      </TableCell>
                      <TableCell align="right"><Typography fontSize={13} fontWeight={700}>{p.attempts}</Typography></TableCell>
                      <TableCell align="right"><Typography fontSize={13} fontWeight={700} color="#10b981">{p.accepted}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : <Typography color="text.secondary" fontSize={13} textAlign="center" py={2}>No problem attempts yet.</Typography>}
          </Paper>
        </Grid>
      </Grid>

      {/* ── Student Work Monitor ── */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3.5, borderColor: "#e2e8f0" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ xs: "stretch", md: "center" }} justifyContent="space-between" mb={1.5}>
          <Typography fontWeight={900} fontSize={16}>Student Work Monitor</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ sm: "center" }}>
            <TextField select size="small" label="Filter by Student" value={filterUser} onChange={(e) => setFilterUser(e.target.value)} sx={{ minWidth: 220 }}>
              <MenuItem value="">All Students</MenuItem>
              {allUsers.map((u) => <MenuItem key={u} value={u}>{u}</MenuItem>)}
            </TextField>
            <Typography fontSize={12} color="text.secondary">{filteredSubs.length} submissions • {filteredSaved.length} saved codes</Typography>
          </Stack>
        </Stack>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1.5 }}>
          <Tabs value={workTab} onChange={(_, v) => setWorkTab(v)}>
            <Tab label={`Submissions (${filteredSubs.length})`} />
            <Tab label={`Saved Codes (${filteredSaved.length})`} />
          </Tabs>
        </Box>
        {workTab === 0 && (
          <Stack spacing={1}>
            {filteredSubs.map((s) => (
              <Paper key={s._id} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Stack spacing={0.6}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontSize={12} fontWeight={800}>{s.user?.name} ({s.user?.email})</Typography>
                    <Typography variant="caption" color="text.secondary">{fmtDateTime(s.createdAt)}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.8} alignItems="center" flexWrap="wrap">
                    <Typography fontSize={12} fontWeight={700}>{s.problem?.title}</Typography>
                    <Chip size="small" label={s.problem?.difficulty} />
                    <Chip size="small" label={s.language} />
                    <Chip size="small" label={s.status} color={STATUS_CHIP_COLOR[s.status] || "default"} />
                    <Typography variant="caption" color="text.secondary">{s.summary?.passed}/{s.summary?.total} tests</Typography>
                  </Stack>
                  <Paper variant="outlined" sx={{ p: 1, bgcolor: "grey.50", fontFamily: "monospace", fontSize: 11, whiteSpace: "pre-wrap", maxHeight: 90, overflow: "auto" }}>{s.sourceCode}</Paper>
                </Stack>
              </Paper>
            ))}
            {!filteredSubs.length && <Typography color="text.secondary" fontSize={13}>No submissions found.</Typography>}
          </Stack>
        )}
        {workTab === 1 && (
          <Stack spacing={1}>
            {filteredSaved.map((s) => (
              <Paper key={s._id} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Stack spacing={0.6}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontSize={12} fontWeight={800}>{s.user?.name} ({s.user?.email})</Typography>
                    <Typography variant="caption" color="text.secondary">{fmtDateTime(s.createdAt)}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.8} alignItems="center">
                    <Typography fontSize={12} fontWeight={700}>{s.title}</Typography>
                    <Chip size="small" label={s.language} />
                  </Stack>
                  <Paper variant="outlined" sx={{ p: 1, bgcolor: "grey.50", fontFamily: "monospace", fontSize: 11, whiteSpace: "pre-wrap", maxHeight: 90, overflow: "auto" }}>{s.sourceCode}</Paper>
                </Stack>
              </Paper>
            ))}
            {!filteredSaved.length && <Typography color="text.secondary" fontSize={13}>No saved codes found.</Typography>}
          </Stack>
        )}
      </Paper>

      {/* ── Recent Activity ── */}
      <Grid container spacing={2} sx={{ width: "100%", m: 0 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: "#e2e8f0" }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2} justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircleIcon sx={{ fontSize: 18, color: "#10b981" }} />
                <Typography fontWeight={800} fontSize={14}>Submission Review Feed</Typography>
                <Chip label={`${recentSubmissions.length} shown`} size="small" sx={{ height: 18, fontSize: 10 }} />
              </Stack>
              <Button component={RouterLink} to="/dashboard" size="small" variant="outlined"
                endIcon={<OpenInNewIcon sx={{ fontSize: 13 }} />} sx={{ fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
                Review All
              </Button>
            </Stack>
            {recentSubmissions.length > 0 ? (
              <Stack spacing={1} sx={{ maxHeight: 440, overflowY: "auto", pr: 0.5 }}>
                {recentSubmissions.map((s) => (
                  <Paper key={s._id} variant="outlined" sx={{ p: 1.5, borderRadius: 2, "&:hover": { bgcolor: "grey.50" } }}>
                    <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} spacing={1}>
                      <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: s.status === "accepted" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <CheckCircleIcon sx={{ fontSize: 15, color: s.status === "accepted" ? "#10b981" : "#ef4444" }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Stack direction="row" spacing={0.5} alignItems="center" flexWrap="wrap">
                          <Typography fontSize={12} fontWeight={700} noWrap>{s.user?.name ?? "Unknown"}</Typography>
                          <Typography fontSize={11} color="text.secondary">→</Typography>
                          <Typography fontSize={12} fontWeight={600} color="primary.main" noWrap>{s.problem?.title ?? "Unknown"}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.75} mt={0.3} alignItems="center">
                          <Chip label={s.status} size="small" color={STATUS_CHIP_COLOR[s.status] || "default"} sx={{ height: 16, fontSize: 10 }} />
                          <Chip label={s.language} size="small" variant="outlined" sx={{ height: 16, fontSize: 10 }} />
                          <Typography fontSize={10} color="text.secondary">{s.summary?.passed}/{s.summary?.total} tests</Typography>
                        </Stack>
                      </Box>
                      <Typography fontSize={11} color="text.secondary" sx={{ flexShrink: 0 }}>{fmtDateTime(s.createdAt)}</Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            ) : <Typography color="text.secondary" fontSize={13} textAlign="center" py={2}>No submissions yet.</Typography>}
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: "#e2e8f0" }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <PeopleAltIcon sx={{ fontSize: 18, color: "#6d28d9" }} />
              <Typography fontWeight={800} fontSize={14}>New Users</Typography>
              <Chip label={`+${stats.users.newToday} today`} size="small" color="primary" sx={{ height: 18, fontSize: 10 }} />
            </Stack>
            <Stack spacing={1.25}>
              {recentUsers.map((u) => {
                const ini = u.name ? u.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "??";
                return (
                  <Stack key={u._id} direction="row" alignItems="center" spacing={1.25}>
                    <Avatar sx={{ width: 34, height: 34, background: "linear-gradient(135deg, #6d28d9, #0ea5e9)", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{ini}</Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography fontSize={13} fontWeight={700} noWrap>{u.name}</Typography>
                      <Typography fontSize={11} color="text.secondary" noWrap>{u.email}</Typography>
                    </Box>
                    <Stack alignItems="flex-end" sx={{ flexShrink: 0 }}>
                      <Chip label={u.role} size="small" color={u.role === "admin" ? "secondary" : "default"} sx={{ height: 16, fontSize: 10 }} />
                      <Typography fontSize={10} color="text.secondary" mt={0.3}>{fmtDate(u.createdAt)}</Typography>
                    </Stack>
                  </Stack>
                );
              })}
              {!recentUsers.length && <Typography color="text.secondary" fontSize={13} textAlign="center" py={2}>No users yet.</Typography>}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={12} color="text.secondary">Total Users</Typography>
                <Typography fontSize={12} fontWeight={700}>{stats.users.total}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={12} color="text.secondary">New this week</Typography>
                <Typography fontSize={12} fontWeight={700} color="#10b981">+{stats.users.new7Days}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontSize={12} color="text.secondary">Saved Codes</Typography>
                <Typography fontSize={12} fontWeight={700}>{stats.savedCodes.total}</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* ── Streak tips (admin) ── */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3.5, borderColor: "#e2e8f0" }} id="streak-milestones-admin">
        <StreakMilestonesPanel />
      </Paper>

    </Stack>
  );
}

/** Scrolls to #manage-users after admin dashboard content is mounted (e.g. sidebar link). */
function ScrollToManageUsers() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash !== "#manage-users") return;
    const scroll = () =>
      document.getElementById("manage-users")?.scrollIntoView({ behavior: "smooth", block: "start" });
    const r1 = window.requestAnimationFrame(scroll);
    const t = window.setTimeout(scroll, 220);
    return () => {
      window.cancelAnimationFrame(r1);
      window.clearTimeout(t);
    };
  }, [hash]);
  return null;
}

// ── Stat Card ─────────────────────────────────────────
function StatCard({ icon, color, bg, label, value, sub }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, transition: "transform 0.2s, box-shadow 0.2s", "&:hover": { transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(0,0,0,0.08)" } }}>
      <Stack direction="row" alignItems="flex-start" spacing={1.5}>
        <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: bg, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>{icon}</Box>
        <Box>
          <Typography sx={{ fontSize: 11, color: "text.secondary", lineHeight: 1.3 }}>{label}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1.1, letterSpacing: -0.5 }}>{value}</Typography>
          <Typography fontSize={10} color="text.secondary" mt={0.2}>{sub}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

// ── Empty Chart ───────────────────────────────────────
function EmptyChart({ label }) {
  return (
    <Box sx={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography color="text.disabled" fontSize={13}>{label}</Typography>
    </Box>
  );
}