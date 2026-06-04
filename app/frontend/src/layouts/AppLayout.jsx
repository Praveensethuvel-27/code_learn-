import { Outlet, Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CodeIcon from "@mui/icons-material/Code";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAuth } from "../providers/authContext";

const NAV_LINKS = [
  { label: "Languages", to: "/languages" },
  { label: "Problems", to: "/problems" },
];

export function AppLayout() {
  const { isAuthed, user, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
          {/* Logo */}
          <Typography
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "text.primary",
              fontWeight: 900,
              letterSpacing: -0.8,
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: 1.5,
                background: "linear-gradient(135deg, #6d28d9, #0ea5e9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                color: "#fff",
                fontWeight: 800,
              }}
            >
              {"<>"}
            </Box>
            CodeLearn
          </Typography>

          <Box sx={{ flex: 1 }} />

          {/* Nav links */}
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mr: 1 }}>
            {NAV_LINKS.map((link) => {
              const active = location.pathname.startsWith(link.to);
              return (
                <Button
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  sx={{
                    fontWeight: active ? 700 : 500,
                    color: active ? "primary.main" : "text.secondary",
                    fontSize: 14,
                    px: 1.5,
                    "&:hover": { color: "primary.main", bgcolor: "rgba(109,40,217,0.05)" },
                  }}
                >
                  {link.label}
                </Button>
              );
            })}

            {isAuthed && (
              <>
                <Button
                  component={RouterLink}
                  to="/dashboard"
                  sx={{
                    fontWeight: location.pathname === "/dashboard" ? 700 : 500,
                    color: location.pathname === "/dashboard" ? "primary.main" : "text.secondary",
                    fontSize: 14,
                    px: 1.5,
                    "&:hover": { color: "primary.main", bgcolor: "rgba(109,40,217,0.05)" },
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  component={RouterLink}
                  to="/editor"
                  sx={{
                    fontWeight: location.pathname === "/editor" ? 700 : 500,
                    color: location.pathname === "/editor" ? "primary.main" : "text.secondary",
                    fontSize: 14,
                    px: 1.5,
                    "&:hover": { color: "primary.main", bgcolor: "rgba(109,40,217,0.05)" },
                  }}
                >
                  Editor
                </Button>
              </>
            )}
          </Stack>

          {/* Auth actions */}
          {isAuthed ? (
            <>
              <Tooltip title={user?.name ?? "Profile"}>
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      background: "linear-gradient(135deg, #6d28d9, #0ea5e9)",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {initials}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{ sx: { mt: 1, minWidth: 180, borderRadius: 2.5 } }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography fontWeight={700} fontSize={14}>{user?.name}</Typography>
                  <Typography fontSize={11} color="text.secondary">{user?.email}</Typography>
                </Box>
                <Divider />
                <MenuItem component={RouterLink} to="/dashboard" onClick={() => setAnchorEl(null)}>
                  <ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>
                  Dashboard
                </MenuItem>
                <MenuItem component={RouterLink} to="/editor" onClick={() => setAnchorEl(null)}>
                  <ListItemIcon><CodeIcon fontSize="small" /></ListItemIcon>
                  Editor
                </MenuItem>
                <MenuItem component={RouterLink} to="/profile" onClick={() => setAnchorEl(null)}>
                  <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                  Profile
                </MenuItem>
                {user?.role === "admin" && (
                  <MenuItem component={RouterLink} to="/admin/users" onClick={() => setAnchorEl(null)}>
                    <ListItemIcon><AdminPanelSettingsIcon fontSize="small" /></ListItemIcon>
                    Admin Panel
                  </MenuItem>
                )}
                <Divider />
                <MenuItem
                  onClick={() => { setAnchorEl(null); logout(); nav("/"); }}
                  sx={{ color: "error.main" }}
                >
                  <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                size="small"
                sx={{ fontWeight: 600 }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/signup"
                variant="contained"
                size="small"
                sx={{
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #6d28d9, #7c3aed)",
                }}
              >
                Sign up
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
