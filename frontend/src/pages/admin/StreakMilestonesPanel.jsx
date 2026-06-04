import { useEffect, useState } from "react";
import { Alert, Button, Paper, Stack, TextField, Typography, CircularProgress } from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { api } from "../../lib/apiClient";

/** Admin editor for streak tips (saved via /admin/engagement). */
export function StreakMilestonesPanel({ onSaved }) {
  const [tipsText, setTipsText] = useState("");
  const [storedMilestones, setStoredMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [okMsg, setOkMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const engRes = await api.get("/admin/engagement");
      const cfg = engRes.data.config || {};
      setTipsText((cfg.streakTips || []).join("\n"));
      setStoredMilestones(cfg.milestones || []);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load config");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setOkMsg("");
    try {
      const streakTips = tipsText.split("\n").map((t) => t.trim()).filter(Boolean);
      if (!streakTips.length) throw new Error("Add at least one streak tip");
      await api.put("/admin/engagement", {
        streakTips,
        milestones: storedMilestones,
      });
      setOkMsg("Saved successfully");
      onSaved?.();
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <CircularProgress size={22} />;

  return (
    <Stack spacing={2.5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={1}>
          <EmojiObjectsIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
          <Typography fontWeight={900} fontSize={16}>Streak tips</Typography>
        </Stack>
        <Button variant="contained" size="small" onClick={handleSave} disabled={saving}
          sx={{ fontWeight: 700, bgcolor: "#4f46e5", borderRadius: 2 }}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </Stack>

      {error && <Alert severity="error" onClose={() => setError("")}>{error}</Alert>}
      {okMsg && <Alert severity="success" onClose={() => setOkMsg("")}>{okMsg}</Alert>}

      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2.5, borderColor: "#e2e8f0" }}>
        <Typography fontWeight={800} fontSize={13} mb={1}>
          Tips shown on the Streak page{" "}
          <Typography component="span" fontSize={11} color="text.secondary">(one per line)</Typography>
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={5}
          value={tipsText}
          onChange={(e) => setTipsText(e.target.value)}
          placeholder={"Solve at least 1 problem every day.\nComplete all practice problems for +1 streak bonus."}
          sx={{ "& .MuiInputBase-root": { fontSize: 13 } }}
        />
      </Paper>
    </Stack>
  );
}
