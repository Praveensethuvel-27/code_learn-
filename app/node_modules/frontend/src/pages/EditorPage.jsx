import { useMemo, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Editor from "@monaco-editor/react";
import { api } from "../lib/apiClient";

const DEFAULT_CODE = {
  javascript: `console.log("Hello, MERN Learn!");\n`,
  python: `print("Hello, MERN Learn!")\n`,
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, MERN Learn!");\n  }\n}\n`,
  c: `#include <stdio.h>\nint main(){\n  printf("Hello, MERN Learn!\\n");\n  return 0;\n}\n`,
  cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){\n  cout << "Hello, MERN Learn!" << "\\n";\n  return 0;\n}\n`,
};

export function EditorPage() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Save dialog
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState("");

  const monacoLanguage = useMemo(() => {
    if (language === "cpp") return "cpp";
    if (language === "c") return "c";
    if (language === "javascript") return "javascript";
    if (language === "python") return "python";
    if (language === "java") return "java";
    return "plaintext";
  }, [language]);

  const handleSave = async () => {
    if (!saveTitle.trim()) return;
    setSaving(true);
    try {
      await api.post("/savedcodes", {
        title: saveTitle.trim(),
        language,
        sourceCode: code,
      });
      setSaveOpen(false);
      setSaveTitle("");
      setSnack("Code saved! Check your Dashboard.");
    } catch (e) {
      setSnack(e?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        Code Editor
      </Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Language"
              value={language}
              onChange={(e) => {
                const l = e.target.value;
                setLanguage(l);
                setCode(DEFAULT_CODE[l] || "");
              }}
            >
              <MenuItem value="c">C</MenuItem>
              <MenuItem value="cpp">C++</MenuItem>
              <MenuItem value="java">Java</MenuItem>
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="javascript">JavaScript</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                disabled={busy}
                onClick={() => {
                  setSaveTitle(`${language} snippet`);
                  setSaveOpen(true);
                }}
              >
                💾 Save Code
              </Button>
              <Button
                variant="contained"
                disabled={busy}
                onClick={async () => {
                  setError("");
                  setBusy(true);
                  try {
                    const res = await api.post("/submissions/run", {
                      language,
                      sourceCode: code,
                      stdin,
                    });
                    const r = res.data.result;
                    setOutput(
                      [
                        r.compile_output ? `Compile:\n${r.compile_output}` : null,
                        r.stderr ? `Stderr:\n${r.stderr}` : null,
                        r.stdout ? `Stdout:\n${r.stdout}` : null,
                        r.message ? `Message:\n${r.message}` : null,
                      ]
                        .filter(Boolean)
                        .join("\n\n") || "(no output)",
                    );
                  } catch (e) {
                    setError(e?.response?.data?.message || "Run failed");
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                ▶ Run code
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {error ? <Alert severity="error">{error}</Alert> : null}

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

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 900 }}>Input (stdin)</Typography>
          <TextField
            placeholder="Optional input..."
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            multiline
            minRows={3}
          />
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 900, mb: 1 }}>Output</Typography>
        <Paper
          variant="outlined"
          sx={{ p: 2, bgcolor: "grey.50", whiteSpace: "pre-wrap", fontFamily: "monospace" }}
        >
          {output || "Run code to see output."}
        </Paper>
      </Paper>

      {/* Save Dialog */}
      <Dialog open={saveOpen} onClose={() => setSaveOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 900 }}>Save Code</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Title"
            fullWidth
            value={saveTitle}
            onChange={(e) => setSaveTitle(e.target.value)}
            sx={{ mt: 1 }}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving || !saveTitle.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success snackbar */}
      <Snackbar
        open={!!snack}
        autoHideDuration={3000}
        onClose={() => setSnack("")}
        message={snack}
      />
    </Stack>
  );
}
