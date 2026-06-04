import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../../lib/apiClient";

export function AdminStudentWorkPage() {
  const [tab, setTab] = useState(0);
  const [submissions, setSubmissions] = useState([]);
  const [savedCodes, setSavedCodes] = useState([]);
  const [error, setError] = useState("");
  const [filterUser, setFilterUser] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [subRes, savedRes] = await Promise.all([
          api.get("/admin/submissions"),
          api.get("/admin/savedcodes"),
        ]);
        setSubmissions(subRes.data.submissions || []);
        setSavedCodes(savedRes.data.savedCodes || []);
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load student work");
      }
    })();
  }, []);

  const statusColor = (s) => {
    if (s === "accepted") return "success";
    if (s === "wrong_answer") return "warning";
    if (s === "compile_error" || s === "runtime_error") return "error";
    return "default";
  };

  const allUsers = [
    ...new Set([
      ...submissions.map((s) => s.user?.name).filter(Boolean),
      ...savedCodes.map((s) => s.user?.name).filter(Boolean),
    ]),
  ].sort();

  const filteredSubs = filterUser
    ? submissions.filter((s) => s.user?.name === filterUser)
    : submissions;

  const filteredSaved = filterUser
    ? savedCodes.filter((s) => s.user?.name === filterUser)
    : savedCodes;

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        Admin • Student Work Monitor
      </Typography>
      {error ? <Alert severity="error">{error}</Alert> : null}

      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          select
          label="Filter by Student"
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          sx={{ minWidth: 220 }}
          size="small"
        >
          <MenuItem value="">All Students</MenuItem>
          {allUsers.map((u) => (
            <MenuItem key={u} value={u}>{u}</MenuItem>
          ))}
        </TextField>
        <Typography color="text.secondary" variant="body2">
          {filteredSubs.length} submissions • {filteredSaved.length} saved codes
        </Typography>
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label={`Submissions (${filteredSubs.length})`} />
          <Tab label={`Saved Codes (${filteredSaved.length})`} />
        </Tabs>
      </Box>

      {tab === 0 && (
        <Stack spacing={1}>
          {filteredSubs.map((s) => (
            <Paper key={s._id} variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ fontWeight: 900 }}>
                    👤 {s.user?.name} ({s.user?.email})
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(s.createdAt).toLocaleString()}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography sx={{ fontWeight: 700 }}>
                    {s.problem?.title}
                  </Typography>
                  <Chip size="small" label={s.problem?.difficulty} />
                  <Chip size="small" label={s.language} />
                  <Chip size="small" label={s.status} color={statusColor(s.status)} />
                  <Typography variant="caption" color="text.secondary">
                    {s.summary?.passed}/{s.summary?.total} tests passed
                  </Typography>
                </Stack>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1,
                    bgcolor: "grey.50",
                    fontFamily: "monospace",
                    fontSize: 12,
                    whiteSpace: "pre-wrap",
                    maxHeight: 100,
                    overflow: "auto",
                  }}
                >
                  {s.sourceCode}
                </Paper>
              </Stack>
            </Paper>
          ))}
          {!filteredSubs.length && (
            <Typography color="text.secondary">No submissions found.</Typography>
          )}
        </Stack>
      )}

      {tab === 1 && (
        <Stack spacing={1}>
          {filteredSaved.map((s) => (
            <Paper key={s._id} variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ fontWeight: 900 }}>
                    👤 {s.user?.name} ({s.user?.email})
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(s.createdAt).toLocaleString()}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography sx={{ fontWeight: 700 }}>{s.title}</Typography>
                  <Chip size="small" label={s.language} />
                </Stack>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1,
                    bgcolor: "grey.50",
                    fontFamily: "monospace",
                    fontSize: 12,
                    whiteSpace: "pre-wrap",
                    maxHeight: 100,
                    overflow: "auto",
                  }}
                >
                  {s.sourceCode}
                </Paper>
              </Stack>
            </Paper>
          ))}
          {!filteredSaved.length && (
            <Typography color="text.secondary">No saved codes found.</Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
}
