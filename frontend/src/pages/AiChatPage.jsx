import { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Drawer,
  List,
  ListItemButton,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import InfoIcon from "@mui/icons-material/Info";
import BrushIcon from "@mui/icons-material/Brush";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { api } from "../lib/apiClient";
import { AI_MODELS, getStoredAiModel, setStoredAiModel } from "../config/aiModels";
import { ChatBotAnimation } from "../components/ai-chat/ChatBotAnimation";
import { ChatComposer } from "../components/ai-chat/ChatComposer";
import { AnimatedRobot } from "../components/ai-chat/AnimatedRobot";

const WELCOME =
  "Hello! 👋 I'm your CodeLearn AI tutor. Ask anytime — coding doubts, bugs, DSA, practice problems, or AI/ML concepts. How can I help?";

// ── Copy Code Button ─────────────────────────────────────────────────────────
function CopyCodeBtn({ content }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Box onClick={handleCopy} sx={{
      display: "flex", alignItems: "center", gap: 0.6,
      px: 1.4, py: 0.5, borderRadius: 1.5, cursor: "pointer",
      fontSize: 11, fontWeight: 600,
      color:   copied ? "#4ade80" : "#94a3b8",
      bgcolor: copied ? "rgba(74,222,128,0.1)" : "rgba(148,163,184,0.08)",
      border:  `1px solid ${copied ? "rgba(74,222,128,0.3)" : "rgba(148,163,184,0.15)"}`,
      transition: "all 0.2s",
      "&:hover": { color: "#e2e8f0", bgcolor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" },
    }}>
      {copied
        ? <><CheckCircleIcon sx={{ fontSize: 12 }} /> Copied!</>
        : <><ContentCopyIcon sx={{ fontSize: 12 }} /> Copy</>}
    </Box>
  );
}

// ── Markdown Parser with Code Block Copy support ──────────────────────────────
function AIResponse({ text }) {
  const parts = [];
  const regex = /```(\w*)\n?([\s\S]*?)```/g;
  let lastIndex = 0, match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
    parts.push({ type: "code", lang: match[1] || "code", content: match[2].trim() });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push({ type: "text", content: text.slice(lastIndex) });

  return (
    <Box sx={{ width: "100%" }}>
      {parts.map((p, i) =>
        p.type === "code" ? (
          <Box key={i} sx={{
            my: 2, borderRadius: 2.5, overflow: "hidden",
            border: "1px solid #334155",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.04)",
            background: "linear-gradient(180deg,#1e2d3d 0%,#0f172a 100%)",
          }}>
            {/* Code block header */}
            <Box sx={{
              px: 2, py: 1,
              background: "linear-gradient(90deg,#1e293b,#1a2744)",
              borderBottom: "1px solid #334155",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              backdropFilter: "blur(8px)",
            }}>
              {/* Lang badge */}
              <Box sx={{
                px: 1.2, py: 0.3, borderRadius: 1, fontSize: 10, fontWeight: 700,
                letterSpacing: 1, textTransform: "uppercase",
                bgcolor: "rgba(99,102,241,0.18)", color: "#a5b4fc",
                border: "1px solid rgba(99,102,241,0.3)",
              }}>{p.lang || "code"}</Box>

              {/* Action buttons */}
              <Stack direction="row" gap={1}>
                <CopyCodeBtn content={p.content} />
              </Stack>
            </Box>

            {/* Code content */}
            <Box sx={{
              p: 2, overflowX: "auto",
              fontFamily: "'IBM Plex Mono','Fira Code',monospace",
              fontSize: 13.5, lineHeight: 1.8, color: "#e2e8f0",
              whiteSpace: "pre",
              background: "linear-gradient(180deg,#0f172a 0%,#0a0f1e 100%)",
            }}>
              {p.content}
            </Box>
          </Box>
        ) : (
          <Typography key={i} component="div" sx={{ fontSize: 15, lineHeight: 1.7, color: "#0f172a", whiteSpace: "pre-wrap", mb: 0.5 }}>
            {p.content.trim().split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
              seg.startsWith("**") && seg.endsWith("**")
                ? <Box component="span" key={j} sx={{ fontWeight: 800, color: "#0f172a" }}>{seg.slice(2, -2)}</Box>
                : seg
            )}
          </Typography>
        )
      )}
    </Box>
  );
}

function AssistantBubble({ children, imageSrc }) {
  return (
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start", maxWidth: "100%" }}>
      <Box sx={{ flexShrink: 0, pt: 0.25 }}>
        <AnimatedRobot size="sm" thinking={false} showShadow={false} />
      </Box>
      <Box sx={{ flex: 1, overflow: "hidden", pt: 0.5 }}>
        <AIResponse text={children} />
        {imageSrc && (
          <Box sx={{ mt: 2, borderRadius: 2.5, overflow: "hidden", border: "1.5px solid #e2e8f0", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", maxWidth: 500 }}>
            <Box component="img" src={imageSrc} alt="AI Generated" sx={{ width: "100%", height: "auto", display: "block" }} />
            <Box sx={{ p: 1.5, bgcolor: "#f8fafc", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontSize: 12, color: "#64748b", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                <BrushIcon sx={{ fontSize: 14, color: "#3b82f6" }} /> Generated by Pollinations AI
              </Typography>
              <a href={imageSrc} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <Box sx={{ px: 1.5, py: 0.5, bgcolor: "#3b82f6", color: "#fff", borderRadius: 1.5, fontSize: 11, fontWeight: 700, cursor: "pointer", "&:hover": { bgcolor: "#2563eb" } }}>
                  📥 Open / Save
                </Box>
              </a>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export function AiChatPage() {
  const [model, setModel] = useState(getStoredAiModel);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Manage multiple chat sessions in sessionStorage
  const [sessions, setSessions] = useState(() => {
    const saved = sessionStorage.getItem("codelearn_ai_chat_sessions");
    if (saved) return JSON.parse(saved);
    return [
      { id: "session_default", title: "New Chat", messages: [{ role: "assistant", content: WELCOME }] }
    ];
  });
  const [currentSessionId, setCurrentSessionId] = useState(() => {
    const savedId = sessionStorage.getItem("codelearn_ai_current_session_id");
    return savedId || "session_default";
  });

  const [waving, setWaving] = useState(true);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const bottomRef = useRef(null);

  // Retrieve current active session details
  const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];
  const messages = currentSession.messages;
  const hasUserMessage = messages.some((m) => m.role === "user");

  useEffect(() => {
    const t = setTimeout(() => setWaving(false), 2800);
    return () => clearTimeout(t);
  }, []);

  // Save sessions to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("codelearn_ai_chat_sessions", JSON.stringify(sessions));
    sessionStorage.setItem("codelearn_ai_current_session_id", currentSessionId);
  }, [sessions, currentSessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleModelChange = (e) => {
    const key = e.target.value;
    setModel(key);
    setStoredAiModel(key);
  };

  // Helper to update current session's message list & dynamically set its title
  const updateCurrentSessionMessages = (newMessages) => {
    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        let newTitle = s.title;
        if (s.title === "New Chat" || s.title.startsWith("Chat ")) {
          const firstUserMsg = newMessages.find(m => m.role === "user");
          if (firstUserMsg) {
            newTitle = firstUserMsg.content.slice(0, 24) + (firstUserMsg.content.length > 24 ? "..." : "");
          }
        }
        return { ...s, title: newTitle, messages: newMessages };
      }
      return s;
    }));
  };

  // Start a new fresh chat session
  const handleNewChat = () => {
    const newId = "session_" + Date.now();
    const newSession = {
      id: newId,
      title: `Chat ${sessions.length + 1}`,
      messages: [{ role: "assistant", content: WELCOME }]
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setMobileOpen(false);
  };

  // Delete a specific session
  const handleDeleteSession = (sessionId, e) => {
    e.stopPropagation();
    if (sessions.length === 1) {
      // If deleting the last session, just clear it
      setSessions([
        { id: "session_default", title: "New Chat", messages: [{ role: "assistant", content: WELCOME }] }
      ]);
      setCurrentSessionId("session_default");
      return;
    }
    const filtered = sessions.filter(s => s.id !== sessionId);
    setSessions(filtered);
    if (currentSessionId === sessionId) {
      setCurrentSessionId(filtered[0].id);
    }
  };

  const handleClearAllHistory = () => {
    setSessions([
      { id: "session_default", title: "New Chat", messages: [{ role: "assistant", content: WELCOME }] }
    ]);
    setCurrentSessionId("session_default");
    setClearDialogOpen(false);
  };

  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank");
    const chatHtml = messages.map(m => `
      <div style="margin-bottom: 20px; padding: 15px; border-radius: 8px; background-color: ${m.role === 'user' ? '#f4f4f5' : '#eff6ff'}; border-left: 5px solid ${m.role === 'user' ? '#71717a' : '#3b82f6'};">
        <strong style="color: ${m.role === 'user' ? '#27272a' : '#1d4ed8'}; font-family: sans-serif; font-size: 14px;">
          ${m.role === 'user' ? '👤 User' : '🤖 CodeLearn AI Tutor'}
        </strong>
        <div style="margin-top: 8px; font-family: sans-serif; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #1f2937;">
          ${m.content}
        </div>
        ${m.imageSrc ? `<div style="margin-top: 12px;"><img src="${m.imageSrc}" style="max-width: 350px; border-radius: 6px; border: 1px solid #ddd;" /></div>` : ''}
      </div>
    `).join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>CodeLearn AI Chat History - ${currentSession.title}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #374151; }
            h1 { text-align: center; color: #1e3a8a; margin-bottom: 5px; }
            .subtitle { text-align: center; color: #6b7280; font-size: 14px; margin-bottom: 40px; }
            .footer { text-align: center; font-size: 11px; color: #9ca3af; margin-top: 60px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
          </style>
        </head>
        <body>
          <h1>CodeLearn AI Tutor</h1>
          <div class="subtitle">${currentSession.title} — exported ${new Date().toLocaleDateString()}</div>
          ${chatHtml}
          <div class="footer">Generated by CodeLearn Learning Platform</div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleExportWord = () => {
    const chatHtml = messages.map(m => `
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #3b82f6;">
        <p style="font-weight: bold; color: #1d4ed8; font-family: Arial, sans-serif; margin-bottom: 4px;">
          ${m.role === 'user' ? 'User' : 'CodeLearn AI Tutor'}
        </p>
        <p style="font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.5; white-space: pre-wrap;">
          ${m.content}
        </p>
        ${m.imageSrc ? `<p><a href="${m.imageSrc}">View Generated Image (${m.imageSrc})</a></p>` : ''}
      </div>
    `).join("");

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><title>${currentSession.title} Export</title></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #1e3a8a; text-align: center;">CodeLearn AI Tutor Chat Log - ${currentSession.title}</h2>
          <p style="text-align: center; color: #666; font-size: 10pt; margin-bottom: 30px;">Date: ${new Date().toLocaleDateString()}</p>
          ${chatHtml}
        </body>
      </html>
    `;
    const blob = new Blob(['\ufeff' + content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentSession.title.replace(/\s+/g, "_")}_Export_${new Date().toISOString().slice(0,10)}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const send = async (customPrompt) => {
    const trimmed = (customPrompt || input).trim();
    if (!trimmed || loading) return;
    setInput("");

    // Check if user wants to generate an image
    const imageKeywords = ["draw", "paint", "generate image", "create image", "generate picture", "create picture", "generate a wallpaper", "create wallpaper"];
    const isImageReq = imageKeywords.some(keyword => trimmed.toLowerCase().includes(keyword));

    if (isImageReq) {
      const userMsg = { role: "user", content: trimmed };
      const nextMessages = [...messages, userMsg];
      updateCurrentSessionMessages(nextMessages);
      setLoading(true);
      
      try {
        let promptText = trimmed.replace(/(draw|paint|generate image|create image|generate picture|create picture|generate a wallpaper|create wallpaper)/gi, "").trim();
        if (promptText.startsWith("of ")) promptText = promptText.substring(3);
        if (!promptText) promptText = "a futuristic learning robot coding";

        const seed = Math.floor(Math.random() * 100000);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=800&height=800&seed=${seed}&nologo=true`;

        await new Promise(r => setTimeout(r, 2000));

        const assistantMsg = {
          role: "assistant",
          content: `Here is the image I generated for **"${promptText}"**:`,
          imageSrc: imageUrl
        };
        updateCurrentSessionMessages([...nextMessages, assistantMsg]);
      } catch {
        updateCurrentSessionMessages([...nextMessages, { role: "assistant", content: "⚠️ Failed to generate image. Please try again!" }]);
      } finally {
        setLoading(false);
      }
      return;
    }

    const userMsg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    updateCurrentSessionMessages(next);
    setLoading(true);
    try {
      const toSend = next
        .filter((m, i) => !(i === 0 && m.role === "assistant"))
        .map((m) => ({ role: m.role, content: m.content }));
      const res = await api.post("/ai/chat", {
        messages: toSend,
        model,
        tutorMode: "codelearn",
        problemTitle: "CodeLearn AI Chat",
        problemDesc: "General coding and learning help on CodeLearn platform.",
      });
      updateCurrentSessionMessages([...next, { role: "assistant", content: res.data.result || "No response." }]);
    } catch {
      updateCurrentSessionMessages([
        ...next,
        { role: "assistant", content: "Something went wrong. Try again or switch model." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const selectedModel = AI_MODELS.find((m) => m.key === model) || AI_MODELS[0];

  // Sleek Sidebar layout
  const sidebarContent = (
    <Box sx={{ width: 260, bgcolor: "#0f172a", height: "100%", display: "flex", flexDirection: "column", color: "#f8fafc" }}>
      {/* Sidebar Header */}
      <Box sx={{ p: 2, display: "flex", gap: 1, alignItems: "center" }}>
        <Button
          variant="outlined"
          onClick={handleNewChat}
          startIcon={<AddIcon />}
          sx={{
            flex: 1,
            py: 1.1,
            borderRadius: 2,
            borderColor: "rgba(255,255,255,0.2)",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            fontSize: 14,
            justifyContent: "flex-start",
            px: 2,
            "&:hover": {
              borderColor: "#fff",
              bgcolor: "rgba(255,255,255,0.08)",
            }
          }}
        >
          New Chat
        </Button>
        {/* Toggle Collapse Button inside Sidebar */}
        <Tooltip title="Collapse sidebar">
          <IconButton
            onClick={() => {
              if (window.innerWidth >= 900) {
                setSidebarOpen(false);
              } else {
                setMobileOpen(false);
              }
            }}
            size="small"
            sx={{
              color: "#94a3b8",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 2,
              p: 1.1,
              "&:hover": {
                color: "#fff",
                bgcolor: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.3)"
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* History List */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 1.5, pb: 2 }}>
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8, px: 1, mb: 1 }}>
          Recent Chats
        </Typography>
        <List sx={{ p: 0, display: "flex", flexDirection: "column", gap: 0.5 }}>
          {sessions.map((s) => {
            const isSelected = s.id === currentSessionId;
            return (
              <ListItemButton
                key={s.id}
                onClick={() => {
                  setCurrentSessionId(s.id);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 1.5,
                  bgcolor: isSelected ? "rgba(255,255,255,0.12)" : "transparent",
                  color: isSelected ? "#fff" : "#94a3b8",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "#f8fafc",
                    "& .delete-btn": { opacity: 1 }
                  }
                }}
              >
                <Typography noWrap sx={{ fontSize: 13.5, fontWeight: isSelected ? 600 : 500, flex: 1, pr: 1 }}>
                  💬 {s.title}
                </Typography>
                <IconButton
                  className="delete-btn"
                  onClick={(e) => handleDeleteSession(s.id, e)}
                  size="small"
                  sx={{
                    opacity: isSelected ? 1 : 0,
                    p: 0.2,
                    color: "#64748b",
                    transition: "opacity 0.15s",
                    "&:hover": { color: "#ef4444" }
                  }}
                >
                  <DeleteIcon fontSize="inherit" sx={{ fontSize: 14 }} />
                </IconButton>
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Sidebar Footer */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          size="small"
          onClick={() => setClearDialogOpen(true)}
          startIcon={<DeleteIcon />}
          sx={{
            color: "#ef4444",
            textTransform: "none",
            fontSize: 12.5,
            fontWeight: 600,
            justifyContent: "flex-start",
            px: 1
          }}
        >
          Clear all chats
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        mx: { xs: -2, md: -3 },
        mt: -3,
        mb: -3,
        height: "calc(100vh - 56px)",
        display: "flex",
        position: "relative",
        bgcolor: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Desktop Left Sidebar (ChatGPT Style) with Smooth Transition */}
      <Box 
        sx={{ 
          display: { xs: "none", md: "block" }, 
          width: sidebarOpen ? 260 : 0,
          minWidth: sidebarOpen ? 260 : 0,
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          height: "100%", 
          borderRight: sidebarOpen ? "1px solid #e2e8f0" : "none",
          overflow: "hidden",
          bgcolor: "#0f172a",
        }}
      >
        {sidebarContent}
      </Box>

      {/* Floating Border Toggle Handle (Notion/VS-Code Style) in vertical center */}
      <Box
        onClick={() => setSidebarOpen(p => !p)}
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          top: "50%",
          left: sidebarOpen ? 260 : 0,
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          width: 24,
          height: 24,
          borderRadius: "50%",
          bgcolor: "#ffffff",
          border: "1px solid #cbd5e1",
          boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s, background-color 0.2s",
          "&:hover": {
            bgcolor: "#f8fafc",
            transform: "translate(-50%, -50%) scale(1.15)",
            boxShadow: "0 6px 14px rgba(0,0,0,0.16)",
          }
        }}
      >
        <Typography sx={{ fontSize: 10.5, color: "#64748b", fontWeight: 800, userSelect: "none" }}>
          {sidebarOpen ? "◀" : "▶"}
        </Typography>
      </Box>

      {/* Mobile Drawer Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 260 },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Main Chat Panel (Right Side) */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
        {/* Header */}
        <Box sx={{ flexShrink: 0, borderBottom: "1px solid #f0f0f0", bgcolor: "#fff", px: { xs: 2, md: 3 }, py: 1.25 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ maxWidth: 768, mx: "auto", width: "100%" }}>
            {/* Sidebar Toggle Button (Only shows in header if sidebar is closed on desktop) */}
            <IconButton
              onClick={() => {
                if (window.innerWidth >= 900) {
                  setSidebarOpen(p => !p);
                } else {
                  setMobileOpen(p => !p);
                }
              }}
              size="small"
              sx={{
                display: {
                  xs: "inline-flex",
                  md: sidebarOpen ? "none" : "inline-flex"
                },
                color: "#64748b"
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>

            <IconButton component={RouterLink} to="/dashboard" size="small" sx={{ color: "#64748b" }}>
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#0f172a", lineHeight: 1.2 }}>
                {currentSession.title}
              </Typography>
              <Typography sx={{ fontSize: 11, color: "#94a3b8" }}>Coding · DSA · bugs · AI topics</Typography>
            </Box>

            <Stack direction="row" spacing={0.5} alignItems="center">
              {/* Export actions */}
              <Tooltip title="Export Chat as PDF">
                <IconButton onClick={handleExportPDF} size="small" sx={{ color: "#ef4444" }}>
                  <PictureAsPdfIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export Chat as Word (Doc)">
                <IconButton onClick={handleExportWord} size="small" sx={{ color: "#2b579a" }}>
                  <ArticleIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={model}
                onChange={handleModelChange}
                variant="standard"
                disableUnderline
                sx={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}
              >
                {AI_MODELS.map((m) => (
                  <MenuItem key={m.key} value={m.key}>
                    {m.icon} {m.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>

        {/* Local storage warning banner */}
        <Box sx={{ bgcolor: "#fef3c7", borderBottom: "1px solid #fde68a", py: 0.8, px: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ maxWidth: 768, mx: "auto", width: "100%" }}>
            <InfoIcon sx={{ fontSize: 15, color: "#d97706" }} />
            <Typography sx={{ fontSize: 11.5, color: "#b45309", fontWeight: 500 }}>
              Caution: Chat history is saved for this active session. Refreshing is safe, but closing this browser tab will delete all chat history.
            </Typography>
          </Stack>
        </Box>

        {/* Messages list */}
        <Box sx={{ flex: 1, overflowY: "auto", bgcolor: "#fff" }}>
          <Box sx={{ maxWidth: 768, mx: "auto", width: "100%", px: { xs: 2, md: 3 }, py: 3 }}>
            {!hasUserMessage && !loading && (
              <Box sx={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChatBotAnimation
                  loading={false}
                  waving={waving}
                  subtitle={`${selectedModel.label} · Type your doubt below (arrow shows when you type).`}
                />
              </Box>
            )}

            {(hasUserMessage || loading) && (
              <Stack spacing={3}>
                {messages.map((m, i) => (
                  <Box key={i}>
                    {m.role === "user" ? (
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Box
                          sx={{
                            maxWidth: "85%",
                            px: 2,
                            py: 1.25,
                            borderRadius: "20px",
                            bgcolor: "#f4f4f4",
                            color: "#0f172a",
                            fontSize: 15,
                            lineHeight: 1.65,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {m.content}
                        </Box>
                      </Box>
                    ) : (
                      <AssistantBubble imageSrc={m.imageSrc}>{m.content}</AssistantBubble>
                    )}
                  </Box>
                ))}

                {loading && (
                  <Box sx={{ py: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Box sx={{ flexShrink: 0 }}>
                        <AnimatedRobot size="sm" thinking showShadow={false} />
                      </Box>
                      <Box sx={{ pt: 1.5 }}>
                        <Typography sx={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>
                          Thinking…
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                )}
                <div ref={bottomRef} />
              </Stack>
            )}
          </Box>
        </Box>

        {/* Composer */}
        <Box sx={{ flexShrink: 0, borderTop: "1px solid #f0f0f0", bgcolor: "#fff", pt: 1.5 }}>
          <ChatComposer
            value={input}
            onChange={setInput}
            onSend={() => send()}
            loading={loading}
            placeholder="Ask a coding doubt, error, or concept… (Type 'draw ...' to generate image)"
          />
        </Box>
      </Box>

      {/* Clear History Confirmation Dialog */}
      <Dialog open={clearDialogOpen} onClose={() => setClearDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: 800 }}>Clear All Chat History?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all active chat sessions? This action is permanent for your current browser session.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearDialogOpen(false)} sx={{ color: "#64748b", fontWeight: 600 }}>Cancel</Button>
          <Button onClick={handleClearAllHistory} color="error" variant="contained" sx={{ fontWeight: 600 }}>Clear All</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
