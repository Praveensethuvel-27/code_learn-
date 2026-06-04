import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../../lib/apiClient";

export function AdminLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    language: "javascript",
    topic: "basics",
    title: "",
    contentMarkdown: "",
    codeExample: "",
    order: 0,
    isPublished: true,
  });

  const load = async () => {
    const res = await api.get("/admin/lessons");
    setLessons(res.data.lessons || []);
  };

  useEffect(() => {
    (async () => {
      try {
        await load();
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load lessons");
      }
    })();
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        Admin • Lessons
      </Typography>
      {error ? <Alert severity="error">{error}</Alert> : null}

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 900, mb: 1 }}>Create lesson</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Language"
              value={form.language}
              onChange={(e) => setForm((p) => ({ ...p, language: e.target.value }))}
            >
              <MenuItem value="c">c</MenuItem>
              <MenuItem value="cpp">cpp</MenuItem>
              <MenuItem value="java">java</MenuItem>
              <MenuItem value="python">python</MenuItem>
              <MenuItem value="javascript">javascript</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Topic"
              value={form.topic}
              onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
            >
              <MenuItem value="basics">basics</MenuItem>
              <MenuItem value="loops">loops</MenuItem>
              <MenuItem value="functions">functions</MenuItem>
              <MenuItem value="oop">oop</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              type="number"
              fullWidth
              label="Order"
              value={form.order}
              onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={async () => {
                await api.post("/admin/lessons", form);
                setForm((p) => ({ ...p, title: "", contentMarkdown: "", codeExample: "" }));
                await load();
              }}
            >
              Create
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content (Markdown/plain text)"
              value={form.contentMarkdown}
              onChange={(e) => setForm((p) => ({ ...p, contentMarkdown: e.target.value }))}
              multiline
              minRows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Code example"
              value={form.codeExample}
              onChange={(e) => setForm((p) => ({ ...p, codeExample: e.target.value }))}
              multiline
              minRows={4}
            />
          </Grid>
        </Grid>
      </Paper>

      <Stack spacing={1}>
        {lessons.map((l) => (
          <Paper key={l._id} variant="outlined" sx={{ p: 2 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
              <Stack sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 900 }}>{l.title}</Typography>
                <Typography color="text.secondary">
                  {l.language} • {l.topic} • order {l.order} •{" "}
                  {l.isPublished ? "published" : "draft"}
                </Typography>
              </Stack>
              <Button
                color="error"
                variant="outlined"
                onClick={async () => {
                  await api.delete(`/admin/lessons/${l._id}`);
                  await load();
                }}
              >
                Delete
              </Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}

