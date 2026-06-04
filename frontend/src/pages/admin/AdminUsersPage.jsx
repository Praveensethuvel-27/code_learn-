import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../../lib/apiClient";

const USER_CARD_SX = {
  p: 2,
  borderRadius: 2,
  bgcolor: "#fff",
  border: "1px solid",
  borderColor: "#e5e7eb",
  boxShadow: "none",
};

export function AdminUsersPage({ embedded = false, refreshKey }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/admin/users");
        if (!cancelled) setUsers(res.data.users || []);
      } catch (e) {
        if (!cancelled) setError(e?.response?.data?.message || "Failed to load users");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="baseline" justifyContent="space-between" flexWrap="wrap" gap={1}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: -0.5 }}>
          Admin • Users
        </Typography>
        {embedded && !loading && !error && users.length > 0 && (
          <Chip size="small" variant="outlined" label={`${users.length} total`} sx={{ fontWeight: 600 }} />
        )}
      </Stack>
      {error ? <Alert severity="error">{error}</Alert> : null}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress size={28} />
        </Box>
      ) : (
        <Stack
          spacing={1.5}
          sx={{
            maxHeight: embedded ? "min(70vh, 640px)" : "none",
            overflowY: embedded ? "auto" : "visible",
            pr: embedded ? 0.5 : 0,
          }}
        >
          {users.map((u) => (
            <Paper key={u._id} variant="outlined" sx={USER_CARD_SX}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }} justifyContent="space-between">
                <Stack sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 900, color: "#0f172a" }}>{u.name}</Typography>
                  <Typography color="text.secondary" fontSize={14}>{u.email}</Typography>
                </Stack>
                <TextField
                  select
                  label="Role"
                  size="small"
                  value={u.role}
                  onChange={async (e) => {
                    const role = e.target.value;
                    const res = await api.patch(`/admin/users/${u._id}/role`, { role });
                    setUsers((prev) =>
                      prev.map((x) => (x._id === u._id ? { ...x, role: res.data.user.role } : x)),
                    );
                  }}
                  sx={{ width: { xs: "100%", sm: 180 }, flexShrink: 0 }}
                >
                  <MenuItem value="user">user</MenuItem>
                  <MenuItem value="admin">admin</MenuItem>
                </TextField>
              </Stack>
            </Paper>
          ))}
          {!users.length && (
            <Typography color="text.secondary" fontSize={14} sx={{ py: 2, textAlign: "center" }}>
              No users returned from the server.
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
}
