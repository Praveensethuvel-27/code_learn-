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

export function AdminProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    slug: "",
    title: "",
    difficulty: "easy",
    descriptionMarkdown: "",
    inputDescription: "",
    outputDescription: "",
    constraints: "",
    tags: [],
    testCases: [
      { input: "1 2\n", expectedOutput: "3\n", isHidden: false },
      { input: "10 20\n", expectedOutput: "30\n", isHidden: true },
    ],
    starterCode: {
      javascript:
        "const fs = require('fs');\nconst input = fs.readFileSync(0,'utf8').trim().split(/\\s+/).map(Number);\nconst a=input[0]||0,b=input[1]||0;\nconsole.log(a+b);\n",
      python: "import sys\nnums=list(map(int,sys.stdin.read().split()))\na=nums[0] if len(nums)>0 else 0\nb=nums[1] if len(nums)>1 else 0\nprint(a+b)\n",
      java:
        "import java.io.*;import java.util.*;\npublic class Main{public static void main(String[] args)throws Exception{Scanner sc=new Scanner(System.in);long a=sc.hasNextLong()?sc.nextLong():0;long b=sc.hasNextLong()?sc.nextLong():0;System.out.println(a+b);}}\n",
      c: "#include <stdio.h>\nint main(){ long a=0,b=0; if(scanf(\"%ld %ld\",&a,&b)!=2){a=0;b=0;} printf(\"%ld\\n\",a+b); return 0; }\n",
      cpp: "#include <bits/stdc++.h>\nusing namespace std;\nint main(){ long long a=0,b=0; if(!(cin>>a>>b)){a=0;b=0;} cout<<a+b<<\"\\n\"; }\n",
    },
    isPublished: true,
  });

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

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        Admin • Problems
      </Typography>
      {error ? <Alert severity="error">{error}</Alert> : null}

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 900, mb: 1 }}>Create problem</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Slug (kebab-case)"
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Title"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              select
              fullWidth
              label="Difficulty"
              value={form.difficulty}
              onChange={(e) => setForm((p) => ({ ...p, difficulty: e.target.value }))}
            >
              <MenuItem value="easy">easy</MenuItem>
              <MenuItem value="medium">medium</MenuItem>
              <MenuItem value="hard">hard</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={async () => {
                const payload = { ...form, tags: Array.isArray(form.tags) ? form.tags : [] };
                await api.post("/admin/problems", payload);
                setForm((p) => ({ ...p, slug: "", title: "", descriptionMarkdown: "" }));
                await load();
              }}
            >
              Create
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description (Markdown/plain text)"
              value={form.descriptionMarkdown}
              onChange={(e) => setForm((p) => ({ ...p, descriptionMarkdown: e.target.value }))}
              multiline
              minRows={4}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Input description"
              value={form.inputDescription}
              onChange={(e) => setForm((p) => ({ ...p, inputDescription: e.target.value }))}
              multiline
              minRows={3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Output description"
              value={form.outputDescription}
              onChange={(e) => setForm((p) => ({ ...p, outputDescription: e.target.value }))}
              multiline
              minRows={3}
            />
          </Grid>
        </Grid>
      </Paper>

      <Stack spacing={1}>
        {problems.map((p) => (
          <Paper key={p._id} variant="outlined" sx={{ p: 2 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
              <Stack sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 900 }}>{p.title}</Typography>
                <Typography color="text.secondary">
                  {p.slug} • {p.difficulty} • {p.isPublished ? "published" : "draft"}
                </Typography>
              </Stack>
              <Button
                color="error"
                variant="outlined"
                onClick={async () => {
                  await api.delete(`/admin/problems/${p._id}`);
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

