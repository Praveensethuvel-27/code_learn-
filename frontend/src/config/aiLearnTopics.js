import PsychologyIcon from "@mui/icons-material/Psychology";
import HubIcon from "@mui/icons-material/Hub";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import CalculateIcon from "@mui/icons-material/Calculate";
import MemoryIcon from "@mui/icons-material/Memory";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ChatIcon from "@mui/icons-material/Chat";
import GavelIcon from "@mui/icons-material/Gavel";
import AppsIcon from "@mui/icons-material/Apps";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

/** AI learning path modules (sync with backend aiCurriculum) */
export const AI_PATH_MODULES = [
  { id: "intro_ai", order: 1, title: "Introduction to Artificial Intelligence" },
  { id: "understanding_models", order: 2, title: "Understanding Models" },
  { id: "machine_learning", order: 3, title: "Machine Learning" },
  { id: "math_ai", order: 4, title: "Mathematics for AI" },
  { id: "deep_learning", order: 5, title: "Deep Learning" },
  { id: "transformers", order: 6, title: "Transformers" },
  { id: "llm", order: 7, title: "Large Language Models" },
  { id: "ai_ethics", order: 8, title: "AI Ethics & Responsible AI" },
  { id: "ai_apps", order: 9, title: "Building AI Applications" },
  { id: "ai_career", order: 10, title: "AI Career & Portfolio" },
];

export const TOPIC_META = {
  intro_ai: {
    label: "Intro to AI",
    color: "#7c3aed",
    bg: "#f5f3ff",
    Icon: PsychologyIcon,
  },
  understanding_models: {
    label: "Models",
    color: "#4f46e5",
    bg: "#eef2ff",
    Icon: HubIcon,
  },
  machine_learning: {
    label: "Machine Learning",
    color: "#0891b2",
    bg: "#ecfeff",
    Icon: ModelTrainingIcon,
  },
  math_ai: {
    label: "Math for AI",
    color: "#d97706",
    bg: "#fffbeb",
    Icon: CalculateIcon,
  },
  deep_learning: {
    label: "Deep Learning",
    color: "#db2777",
    bg: "#fdf2f8",
    Icon: MemoryIcon,
  },
  transformers: {
    label: "Transformers",
    color: "#059669",
    bg: "#ecfdf5",
    Icon: AccountTreeIcon,
  },
  llm: {
    label: "LLMs",
    color: "#dc2626",
    bg: "#fef2f2",
    Icon: ChatIcon,
  },
  ai_ethics: {
    label: "Ethics",
    color: "#9333ea",
    bg: "#faf5ff",
    Icon: GavelIcon,
  },
  ai_apps: {
    label: "AI Apps",
    color: "#2563eb",
    bg: "#eff6ff",
    Icon: AppsIcon,
  },
  ai_career: {
    label: "Career",
    color: "#0d9488",
    bg: "#f0fdfa",
    Icon: WorkHistoryIcon,
  },
};

export function getTopicMeta(topic) {
  return (
    TOPIC_META[topic] || {
      label: "AI",
      color: "#7c3aed",
      bg: "#f5f3ff",
      Icon: PsychologyIcon,
    }
  );
}
