import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { api } from "../lib/apiClient";
import { useAuth } from "../providers/authContext";

export function LessonPage() {
  const { id } = useParams();
  const { isAuthed } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/lessons/${id}`);
        setLesson(res.data.lesson);
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load lesson");
      }
    })();
  }, [id]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!lesson) return null;

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        {lesson.title}
      </Typography>
      <Typography color="text.secondary">
        {lesson.language} • {lesson.topic}
      </Typography>
      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>{lesson.contentMarkdown}</Typography>
      </Paper>
      {lesson.codeExample ? (
        <Paper variant="outlined" sx={{ p: 2.5 }}>
          <Typography sx={{ fontWeight: 800, mb: 1 }}>Example</Typography>
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 2,
              borderRadius: 2,
              bgcolor: "grey.100",
              overflow: "auto",
            }}
          >
            {lesson.codeExample}
          </Box>
        </Paper>
      ) : null}

      {isAuthed ? (
        <Button
          variant="contained"
          onClick={async () => {
            await api.post(`/lessons/${lesson._id}/complete`);
            setDone(true);
          }}
        >
          Mark as completed
        </Button>
      ) : (
        <Alert severity="info">Login to track completed lessons.</Alert>
      )}
      {done ? <Alert severity="success">Marked as completed.</Alert> : null}
    </Stack>
  );
}

