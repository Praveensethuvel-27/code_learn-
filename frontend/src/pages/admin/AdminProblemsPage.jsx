import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { api } from "../../lib/apiClient";
function isSumTemplate(testCases) {
  if (!testCases?.length || testCases.length !== 2) return false;
  const n = (s) => String(s ?? "").replace(/\r\n/g, "\n").trim();
  return (
    n(testCases[0]?.input) === "1 2" &&
    n(testCases[0]?.expectedOutput) === "3" &&
    n(testCases[1]?.input) === "10 20" &&
    n(testCases[1]?.expectedOutput) === "30"
  );
}

const emptyTestCase = () => ({ input: "", expectedOutput: "", isHidden: false });

const defaultStarter = () => ({
  javascript:
    'const input = (() => { const b = new Uint8Array(65536); const n = Deno.stdin.readSync(b); return n > 0 ? new TextDecoder().decode(b.subarray(0, n)) : ""; })().trim();\nconst n = Number(input.split(/\\s+/)[0] ?? 0);\n// TODO\nconsole.log(n);\n',
  python: "import sys\nn = int(sys.stdin.read().strip().split()[0] or 0)\n# TODO\nprint(n)\n",
  java: "import java.util.*;\npublic class Main { public static void main(String[] a) { Scanner sc = new Scanner(System.in); long n = sc.hasNextLong() ? sc.nextLong() : 0; System.out.println(n); } }\n",
  c: '#include <stdio.h>\nint main(){ long n=0; scanf("%ld",&n); printf("%ld\\n",n); return 0;}\n',
  cpp: '#include <bits/stdc++.h>\nusing namespace std;\nint main(){ long long n=0; cin>>n; cout<<n<<"\\n";}\n',
});

function newForm() {
  return {
    slug: "",
    title: "",
    difficulty: "easy",
    descriptionMarkdown: "",
    inputDescription: "",
    outputDescription: "",
    constraints: "",
    tags: [],
    testCases: [emptyTestCase()],
    starterCode: defaultStarter(),
    isPublished: true,
    problemType: "practice_problem",
  };
}

export function AdminProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState(newForm);

  const load = async () => {
    const res = await api.get("/admin/problems");
    setProblems(res.data.problems || []);
  };

  useEffect(() => {
    (async () => {
      try {
        await load();
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load problems");
      }
    })();
  }, []);

  const updateTc = (idx, field, value) =>
    setForm((p) => ({
      ...p,
      testCases: p.testCases.map((t, i) => (i === idx ? { ...t, [field]: value } : t)),
    }));

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>Admin • Problems</Typography>
      <Alert severity="info" sx={{ borderRadius: 2 }}>
        Do not use the old default <strong>1 2 → 3</strong> test cases unless the problem is Sum Two Numbers.
        Match each problem&apos;s real input/output.
      </Alert>
      {error ? <Alert severity="error" onClose={() => setError("")}>{error}</Alert> : null}

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 900, mb: 1 }}>Create problem</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Slug" value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Title" value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField select fullWidth label="Difficulty" value={form.difficulty}
              onChange={(e) => setForm((p) => ({ ...p, difficulty: e.target.value }))}>
              <MenuItem value="easy">easy</MenuItem>
              <MenuItem value="medium">medium</MenuItem>
              <MenuItem value="hard">hard</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField select fullWidth label="Type" value={form.problemType}
              onChange={(e) => setForm((p) => ({ ...p, problemType: e.target.value }))}>
              <MenuItem value="practice_problem">Practice</MenuItem>
              <MenuItem value="lesson_problem">Lesson</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline minRows={3} label="Description"
              value={form.descriptionMarkdown}
              onChange={(e) => setForm((p) => ({ ...p, descriptionMarkdown: e.target.value }))} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Input description" value={form.inputDescription}
              onChange={(e) => setForm((p) => ({ ...p, inputDescription: e.target.value }))} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Output description" value={form.outputDescription}
              onChange={(e) => setForm((p) => ({ ...p, outputDescription: e.target.value }))} />
          </Grid>
        </Grid>

        <Typography fontWeight={800} fontSize={13} mt={2} mb={1}>
          Test cases {isSumTemplate(form.testCases) && !form.slug.includes("sum") ? (
            <Typography component="span" color="error.main"> — wrong template!</Typography>
          ) : null}
        </Typography>
        <Stack spacing={1} mb={1}>
          {form.testCases.map((tc, idx) => (
            <Stack key={idx} direction={{ xs: "column", md: "row" }} spacing={1}>
              <TextField label="Input (stdin)" size="small" fullWidth value={tc.input}
                onChange={(e) => updateTc(idx, "input", e.target.value)} />
              <TextField label="Expected output" size="small" fullWidth value={tc.expectedOutput}
                onChange={(e) => updateTc(idx, "expectedOutput", e.target.value)} />
              <IconButton color="error" onClick={() =>
                setForm((p) => ({ ...p, testCases: p.testCases.filter((_, i) => i !== idx) }))}
                disabled={form.testCases.length <= 1}>🗑️</IconButton>
            </Stack>
          ))}
        </Stack>
        <Button size="small" startIcon={<AddIcon />} onClick={() =>
          setForm((p) => ({ ...p, testCases: [...p.testCases, emptyTestCase()] }))}>
          Add test case
        </Button>

        <Stack direction="row" spacing={1} mt={2}>
          <Button variant="contained" onClick={async () => {
            try {
              setError("");
              if (isSumTemplate(form.testCases) && !form.slug.includes("sum")) {
                setError("Fix test cases — they still look like Sum (1 2 → 3).");
                return;
              }
              await api.post("/admin/problems", { ...form, tags: [] });
              setForm(newForm());
              await load();
            } catch (e) {
              setError(e?.response?.data?.message || "Failed to create problem");
            }
          }}>
            Create
          </Button>
        </Stack>
      </Paper>

      <Stack spacing={1}>
        {problems.map((p) => (
          <Paper key={p._id} variant="outlined" sx={{ p: 2 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
              <Stack sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 900 }}>{p.title}</Typography>
                <Typography color="text.secondary" fontSize={12}>
                  {p.slug} • {p.difficulty} • {p.testCases?.length ?? 0} tests
                  {p.testCases?.some((t) => t.input?.includes("1 2") && t.expectedOutput?.trim() === "3")
                    ? " ⚠️ check test cases" : ""}
                </Typography>
              </Stack>
              <Button color="error" variant="outlined" onClick={async () => {
                await api.delete(`/admin/problems/${p._id}`);
                await load();
              }}>
                Delete
              </Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}
