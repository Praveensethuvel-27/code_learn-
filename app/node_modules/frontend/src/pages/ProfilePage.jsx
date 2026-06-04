import { Paper, Stack, Typography } from "@mui/material";
import { useAuth } from "../providers/authContext";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        Profile
      </Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Row label="Name" value={user?.name} />
          <Row label="Email" value={user?.email} />
          <Row label="Role" value={user?.role} />
        </Stack>
      </Paper>
    </Stack>
  );
}

function Row({ label, value }) {
  return (
    <Stack direction="row" spacing={2}>
      <Typography sx={{ width: 120, color: "text.secondary" }}>{label}</Typography>
      <Typography sx={{ fontWeight: 800 }}>{value || "-"}</Typography>
    </Stack>
  );
}

