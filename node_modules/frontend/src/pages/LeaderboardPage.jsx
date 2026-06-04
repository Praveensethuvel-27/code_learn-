import { useEffect, useState } from "react";
import {
  Alert, Box, Button, Chip, Paper, Stack, Tab, Tabs, Typography,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Link as RouterLink } from "react-router-dom";
import { api } from "../lib/apiClient";
import { useAuth } from "../providers/authContext";

function RankRow({ row, isMe }) {
  const medal = row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : row.rank === 3 ? "🥉" : `#${row.rank}`;
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.8, borderRadius: 2.5,
        borderColor: isMe ? "#a5b4fc" : "#e2e8f0",
        bgcolor: isMe ? "#eef2ff" : "#fff",
        boxShadow: isMe ? "0 0 0 2px #c7d2fe" : "none",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography sx={{ fontSize: 22, width: 48, textAlign: "center", fontWeight: 900 }}>{medal}</Typography>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }} noWrap>
            {row.name}{isMe ? " (You)" : ""}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#64748b" }}>{row.label}</Typography>
        </Box>
        <Chip label={`Lv ${row.level}`} size="small" sx={{ fontWeight: 700, bgcolor: "#f1f5f9" }} />
      </Stack>
    </Paper>
  );
}

export function LeaderboardPage() {
  const { isAuthed } = useAuth();
  const [period, setPeriod] = useState("alltime");
  const [rows, setRows] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setError("");
      try {
        const res = await api.get("/gamification/leaderboard", {
          params: { period, limit: 30 },
        });
        setRows(res.data.leaderboard || []);
        setMyRank(res.data.myRank || null);
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load leaderboard");
      }
    })();
  }, [period]);

  return (
    <Stack spacing={3}>
      <Box>
        <Stack direction="row" alignItems="center" gap={1} mb={0.5}>
          <EmojiEventsIcon sx={{ color: "#f59e0b" }} />
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a" }}>Leaderboard</Typography>
        </Stack>
        <Typography color="text.secondary" fontSize={14}>
          Compete by XP (all-time) or problems solved this week.
        </Typography>
      </Box>

      <Tabs value={period} onChange={(_, v) => setPeriod(v)} sx={{ bgcolor: "#fff", borderRadius: 2, px: 1 }}>
        <Tab value="alltime" label="All-time XP" sx={{ fontWeight: 700, textTransform: "none" }} />
        <Tab value="weekly" label="This week" sx={{ fontWeight: 700, textTransform: "none" }} />
      </Tabs>

      {error && <Alert severity="error">{error}</Alert>}

      {!isAuthed && (
        <Alert severity="info">
          <Button component={RouterLink} to="/login" size="small">Login</Button> to see your rank highlighted.
        </Alert>
      )}

      {myRank && (
        <Alert severity="success" sx={{ borderRadius: 2 }}>
          Your rank: <strong>#{myRank.rank}</strong> — {myRank.label}
        </Alert>
      )}

      <Stack spacing={1.2}>
        {rows.length === 0 && !error && (
          <Typography color="text.secondary">No rankings yet. Be the first to solve a problem!</Typography>
        )}
        {rows.map((r) => (
          <RankRow key={String(r.userId)} row={r} isMe={myRank && String(r.userId) === String(myRank.userId)} />
        ))}
      </Stack>
    </Stack>
  );
}
