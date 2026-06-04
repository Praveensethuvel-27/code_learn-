import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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
import Editor from "@monaco-editor/react";
import { api } from "../lib/apiClient";

const LANGS = [
  { key: "javascript", label: "JavaScript", monaco: "javascript" },
  { key: "python", label: "Python", monaco: "python" },
  { key: "java", label: "Java", monaco: "java" },
  { key: "c", label: "C", monaco: "c" },
  { key: "cpp", label: "C++", monaco: "cpp" },
];

export function ProblemDetailPage() {
  const { slug } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const monacoLanguage = useMemo(
    () => LANGS.find((l) => l.key === language)?.monaco || "plaintext",
    [language],
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/problems/${slug}`);
        const p = res.data.problem;
        setProblem(p);
        setLanguage("javascript");
        setCode(p?.starterCode?.javascript || "");
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load problem");
      }
    })();
  }, [slug]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!problem) return null;

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        {problem.title}
      </Typography>
      <Typography color="text.secondary">{problem.difficulty}</Typography>

      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>{problem.descriptionMarkdown}</Typography>
        {problem.inputDescription ? (
          <>
            <Typography sx={{ fontWeight: 900, mt: 2 }}>Input</Typography>
            <Typography sx={{ whiteSpace: "pre-wrap" }}>{problem.inputDescription}</Typography>
          </>
        ) : null}
        {problem.outputDescription ? (
          <>
            <Typography sx={{ fontWeight: 900, mt: 2 }}>Output</Typography>
            <Typography sx={{ whiteSpace: "pre-wrap" }}>{problem.outputDescription}</Typography>
          </>
        ) : null}
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Language"
              value={language}
              onChange={(e) => {
                const l = e.target.value;
                setLanguage(l);
                setCode(problem?.starterCode?.[l] || "");
              }}
            >
              {LANGS.map((l) => (
                <MenuItem key={l.key} value={l.key}>
                  {l.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                variant="contained"
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  setError("");
                  setResult(null);
                  try {
                    const res = await api.post(`/submissions/problem/${problem.slug}`, {
                      language,
                      sourceCode: code,
                    });
                    setResult(res.data.submission);
                  } catch (e) {
                    setError(e?.response?.data?.message || "Submit failed");
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                Submit solution
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {error ? <Alert severity="error">{error}</Alert> : null}
      {result ? (
        <Alert severity={result.status === "accepted" ? "success" : "warning"}>
          {result.status} • {result.summary.passed}/{result.summary.total} passed
        </Alert>
      ) : null}

      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Editor
          height="55vh"
          language={monacoLanguage}
          theme="vs-light"
          value={code}
          onChange={(v) => setCode(v ?? "")}
          options={{ minimap: { enabled: false }, fontSize: 14 }}
        />
      </Paper>
    </Stack>
  );
}

