import { useState } from "react";
import { Outlet, Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Stack,
  IconButton,
  AppBar,
  Toolbar,
  Tooltip,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ExtensionIcon from "@mui/icons-material/Extension";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useAuth } from "../providers/authContext";

const SIDEBAR_WIDTH = 230;

const navItems = [
  { label: "Users",     icon: <PeopleAltIcon fontSize="small" />,  to: "/admin/users"     },
  { label: "Problems",  icon: <ExtensionIcon fontSize="small" />,  to: "/admin/problems"  },
  { label: "Dashboard", icon: <DashboardIcon fontSize="small" />,  to: "/dashboard"       },
];

const pageTitles = {
  "/admin/users":    "Users",
  "/admin/problems": "Problems",
  "/dashboard":      "Dashboard",
};

export function AdminLayout() {
  const { user } = useAuth();
  const location = useLocation();

  const currentTitle = pageTitles[location.pathname] ?? "Admin";
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AD";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* ── Sidebar ── */}
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
            color: "#fff",
            border: "none",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ px: 2.5, py: 2.5, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Typography
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#fff",
              fontWeight: 800,
              fontSize: 15.5,
              letterSpacing: -0.2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1.5,
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                boxShadow: "0 8px 18px rgba(124,58,237,0.35)",
              }}
            >
              {"<>"}
            </Box>
            CodeLearn
          </Typography>
          <Typography sx={{ fontSize: 10.5, color: "rgba(255,255,255,0.42)", mt: 0.6, ml: 0.5 }}>
            Admin Panel
          </Typography>
        </Box>

        {/* Nav */}
        <Box sx={{ flex: 1, px: 1.5, py: 1.5 }}>
          <Typography sx={sectionLabelSx}>Main</Typography>
          <List dense disablePadding>
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <ListItem key={item.label} disablePadding sx={{ mb: 0.25 }}>
                  <ListItemButton
                    component={RouterLink}
                    to={item.to}
                    sx={{
                      borderRadius: 2,
                      py: 0.9,
                      px: 1.25,
                      color: active ? "#ddd6fe" : "rgba(255,255,255,0.62)",
                      bgcolor: active ? "rgba(124,58,237,0.28)" : "transparent",
                      borderLeft: active ? "2px solid #8b5cf6" : "2px solid transparent",
                      "&:hover": {
                        bgcolor: active ? "rgba(124,58,237,0.32)" : "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.9)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontSize: 13.5, fontWeight: active ? 600 : 400 }}>
                          {item.label}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

        </Box>

        {/* User Footer */}
        <Box sx={{ px: 2, py: 2, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background: "linear-gradient(135deg, #6d28d9, #0ea5e9)",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {initials}
            </Avatar>
            <Box sx={{ overflow: "hidden" }}>
              <Typography
                sx={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.2 }}
                noWrap
              >
                {user?.name ?? "Admin"}
              </Typography>
              <Typography sx={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.2 }}>
                Admin
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Drawer>

      {/* ── Main content ── */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid",
            borderColor: "divider",
            color: "text.primary",
          }}
        >
          <Toolbar sx={{ minHeight: 56, px: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, flex: 1, letterSpacing: -0.2 }}>
              {currentTitle}
            </Typography>
            <Tooltip title="Notifications">
              <IconButton size="small">
                <NotificationsNoneIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box sx={{ flex: 1, p: 3, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

const sectionLabelSx = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "rgba(255,255,255,0.35)",
  textTransform: "uppercase",
  px: 1,
  mb: 0.5,
};