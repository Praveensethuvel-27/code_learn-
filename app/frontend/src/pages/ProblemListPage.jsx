import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Chip,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../lib/apiClient";

export function ProblemListPage() {
  const [difficulty, setDifficulty] = useState("");
  const [q, setQ] = useState("");
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get("/problems", {
        params: { difficulty: difficulty || undefined, q: q || undefined },
      });
      setProblems(res.data.problems || []);
    })();
  }, [difficulty, q]);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        Problems
      </Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {problems.map((p) => (
          <Grid item xs={12} md={6} key={p.slug}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 900 }}>{p.title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip size="small" label={p.difficulty} />
                  {(p.tags || []).slice(0, 3).map((t) => (
                    <Chip key={t} size="small" variant="outlined" label={t} />
                  ))}
                </Stack>
                <Typography
                  component={RouterLink}
                  to={`/problems/${p.slug}`}
                  sx={{ textDecoration: "none", fontWeight: 800 }}
                >
                  Solve →
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

