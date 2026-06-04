import { useEffect, useState } from "react";
import {
  Alert,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../../lib/apiClient";

export function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data.users || []);
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load users");
      }
    })();
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        Admin • Users
      </Typography>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <Stack spacing={1}>
        {users.map((u) => (
          <Paper key={u._id} variant="outlined" sx={{ p: 2 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
              <Stack sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 900 }}>{u.name}</Typography>
                <Typography color="text.secondary">{u.email}</Typography>
              </Stack>
              <TextField
                select
                label="Role"
                value={u.role}
                onChange={async (e) => {
                  const role = e.target.value;
                  const res = await api.patch(`/admin/users/${u._id}/role`, { role });
                  setUsers((prev) =>
                    prev.map((x) => (x._id === u._id ? { ...x, role: res.data.user.role } : x)),
                  );
                }}
                sx={{ width: 180 }}
              >
                <MenuItem value="user">user</MenuItem>
                <MenuItem value="admin">admin</MenuItem>
              </TextField>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}

