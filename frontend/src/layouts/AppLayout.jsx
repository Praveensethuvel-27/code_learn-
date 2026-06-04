import { Outlet, Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import { CodeLearnLogo } from "../components/CodeLearnLogo";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CodeIcon from "@mui/icons-material/Code";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";
import ExtensionIcon from "@mui/icons-material/Extension";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RouteIcon from "@mui/icons-material/Route";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useAuth } from "../providers/authContext";

const SIDEBAR_WIDTH = 240;

// Practice Paths sub-items
const PRACTICE_PATHS = [
  { label: "Practice Paths", to: "/practice-paths", icon: <RouteIcon fontSize="small" /> },
  { label: "All Problems", to: "/problems", icon: <ExtensionIcon fontSize="small" /> },
];

const MAIN_NAV = [
  { label: "Home", to: "/", icon: <HomeIcon fontSize="small" />, exact: true },
];

export function AppLayout() {
  const { isAuthed, user, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [practiceOpen, setPracticeOpen] = useState(true);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";
  const dashboardPath = "/dashboard";
  const authNav = [
    { label: "Dashboard", to: dashboardPath, icon: <DashboardIcon fontSize="small" /> },
    { label: "AI Learn", to: "/ai-learn", icon: <AutoAwesomeIcon fontSize="small" /> },
    { label: "AI Chat", to: "/ai-chat", icon: <SmartToyOutlinedIcon fontSize="small" /> },
    { label: "Editor", to: "/editor", icon: <CodeIcon fontSize="small" /> },
    { label: "Leaderboard", to: "/leaderboard", icon: <EmojiEventsIcon fontSize="small" /> },
    { label: "XP & Badges", to: "/rewards", icon: <MilitaryTechIcon fontSize="small" /> },
    { label: "Streak", to: "/streak", icon: <WhatshotIcon fontSize="small" /> },
    { label: "Saved Codes", to: "/saved-codes", icon: <BookmarkIcon fontSize="small" /> },
  ];

  const isActive = (to, exact = false) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  const sidebar = (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0f172a",
        color: "#fff",
      }}
    >
      {/* Logo + collapse button */}
      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "#fff", display: "flex", alignItems: "center" }}
        >
          <CodeLearnLogo size={30} dark />
        </Box>
        <IconButton
          size="small"
          onClick={() => setSidebarOpen(false)}
          sx={{ color: "rgba(255,255,255,0.4)", "&:hover": { color: "#fff" } }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Nav */}
      <Box sx={{ flex: 1, px: 1.5, py: 1.5, overflow: "auto" }}>
        {/* Main links */}
        <Typography sx={sectionLabelSx}>Menu</Typography>
        <List dense disablePadding>
          {MAIN_NAV.map((item) => (
            <SidebarItem
              key={item.to}
              item={item}
              active={isActive(item.to, item.exact)}
            />
          ))}
          {isAuthed &&
            authNav.map((item) => {
              let active = isActive(item.to);
              if (item.to === dashboardPath) {
                active =
                  location.pathname === dashboardPath &&
                  location.hash !== "#manage-users";
              }
              return (
                <SidebarItem
                  key={item.to}
                  item={item}
                  active={active}
                />
              );
            })}
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", my: 1.5 }} />

        {/* Practice Paths collapsible */}
        <Typography sx={sectionLabelSx}>Practice</Typography>
        <List dense disablePadding>
          <ListItem disablePadding sx={{ mb: 0.25 }}>
            <ListItemButton
              onClick={() => setPracticeOpen((p) => !p)}
              sx={{
                borderRadius: 2,
                py: 0.9,
                px: 1.25,
                color: practiceOpen ? "#c4b5fd" : "rgba(255,255,255,0.65)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.9)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                <RouteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography sx={{ fontSize: 13.5, fontWeight: 600 }}>Practice Paths</Typography>}
              />
              {practiceOpen ? (
                <ExpandLessIcon fontSize="small" sx={{ opacity: 0.6 }} />
              ) : (
                <ExpandMoreIcon fontSize="small" sx={{ opacity: 0.6 }} />
              )}
            </ListItemButton>
          </ListItem>

          <Collapse in={practiceOpen} timeout="auto" unmountOnExit>
            <List dense disablePadding sx={{ pl: 1 }}>
              {PRACTICE_PATHS.map((item) => {
                const active = isActive(item.to);
                return (
                  <ListItem key={item.to} disablePadding sx={{ mb: 0.25 }}>
                    <ListItemButton
                      component={RouterLink}
                      to={item.to}
                      sx={{
                        borderRadius: 2,
                        py: 0.8,
                        px: 1.25,
                        color: active ? "#c4b5fd" : "rgba(255,255,255,0.55)",
                        bgcolor: active ? "rgba(124,99,255,0.18)" : "transparent",
                        borderLeft: active
                          ? "2px solid #7c3aed"
                          : "2px solid transparent",
                        "&:hover": {
                          bgcolor: active
                            ? "rgba(124,99,255,0.22)"
                            : "rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.9)",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 30, color: "inherit" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={{ fontSize: 13, fontWeight: active ? 600 : 400 }}>
                            {item.label}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        </List>

        {/* Admin link */}
        {user?.role === "admin" && (
          <>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", my: 1.5 }} />
            <Typography sx={sectionLabelSx}>Admin</Typography>
            <List dense disablePadding>
              <SidebarItem
                item={{
                  label: "Admin Panel",
                  to: "/admin",
                  icon: <AdminPanelSettingsIcon fontSize="small" />,
                }}
                active={isActive("/admin")}
              />
              <SidebarItem
                item={{
                  label: "Admin • Users",
                  to: "/dashboard#manage-users",
                  icon: <PeopleAltIcon fontSize="small" />,
                }}
                active={
                  location.pathname === dashboardPath &&
                  location.hash === "#manage-users"
                }
              />
              <SidebarItem
                item={{
                  label: "Streak tips",
                  to: "/dashboard#streak-milestones-admin",
                  icon: <EditNoteIcon fontSize="small" />,
                }}
                active={
                  location.pathname === dashboardPath &&
                  location.hash === "#streak-milestones-admin"
                }
              />
            </List>
          </>
        )}
      </Box>

      {/* User footer */}
      {isAuthed && (
        <Box
          sx={{
            px: 2,
            py: 2,
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.25}
            sx={{ mb: 1 }}
          >
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
            <Box sx={{ overflow: "hidden", flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.2,
                }}
                noWrap
              >
                {user?.name ?? "User"}
              </Typography>
              <Typography
                sx={{
                  fontSize: 10.5,
                  color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.2,
                }}
                noWrap
              >
                {user?.email}
              </Typography>
            </Box>
          </Stack>
          <Button
            fullWidth
            size="small"
            startIcon={<LogoutIcon fontSize="small" />}
            onClick={() => {
              logout();
              nav("/");
            }}
            sx={{
              color: "rgba(255,255,255,0.5)",
              justifyContent: "flex-start",
              fontSize: 12,
              "&:hover": {
                color: "#f87171",
                bgcolor: "rgba(239,68,68,0.1)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Permanent sidebar */}
      <Drawer
        variant="permanent"
        open={sidebarOpen}
        sx={{
          width: sidebarOpen ? SIDEBAR_WIDTH : 0,
          flexShrink: 0,
          transition: "width 0.25s ease",
          "& .MuiDrawer-paper": {
            width: sidebarOpen ? SIDEBAR_WIDTH : 0,
            overflow: "hidden",
            boxSizing: "border-box",
            border: "none",
            transition: "width 0.25s ease",
          },
        }}
      >
        {sidebar}
      </Drawer>

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid",
            borderColor: "divider",
            color: "text.primary",
          }}
        >
          <Toolbar sx={{ px: { xs: 2, md: 3 }, minHeight: 56 }}>
            {/* Toggle sidebar */}
            {!sidebarOpen && (
              <IconButton
                size="small"
                onClick={() => setSidebarOpen(true)}
                sx={{ mr: 1.5 }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            )}

            {/* Logo (shown when sidebar closed) */}
            {!sidebarOpen && (
              <Box
                component={RouterLink}
                to="/"
                sx={{ textDecoration: "none", color: "text.primary", display: "flex", alignItems: "center", mr: 2 }}
              >
                <CodeLearnLogo size={26} />
              </Box>
            )}

            <Box sx={{ flex: 1 }} />

            {/* Auth actions */}
            {isAuthed ? (
              <>
                <Tooltip title={user?.name ?? "Profile"}>
                  <IconButton
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    sx={{ p: 0.5 }}
                  >
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
                    <Typography fontWeight={700} fontSize={14}>
                      {user?.name}
                    </Typography>
                    <Typography fontSize={11} color="text.secondary">
                      {user?.email}
                    </Typography>
                  </Box>
                  <Divider />
                  <MenuItem
                    component={RouterLink}
                    to="/profile"
                    onClick={() => setAnchorEl(null)}
                  >
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  {user?.role === "admin" && (
                    <MenuItem
                      component={RouterLink}
                      to="/dashboard#manage-users"
                      onClick={() => setAnchorEl(null)}
                    >
                      <ListItemIcon>
                        <PeopleAltIcon fontSize="small" />
                      </ListItemIcon>
                      Admin • Users
                    </MenuItem>
                  )}
                  {user?.role === "admin" && (
                    <MenuItem
                      component={RouterLink}
                      to="/admin"
                      onClick={() => setAnchorEl(null)}
                    >
                      <ListItemIcon>
                        <AdminPanelSettingsIcon fontSize="small" />
                      </ListItemIcon>
                      Admin Panel
                    </MenuItem>
                  )}
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      logout();
                      nav("/");
                    }}
                    sx={{ color: "error.main" }}
                  >
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
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

        {/* Page content */}
        <Box sx={{ flex: 1, p: { xs: 2, md: 3 }, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

// Reusable sidebar nav item
function SidebarItem({ item, active }) {
  return (
    <ListItem disablePadding sx={{ mb: 0.25 }}>
      <ListItemButton
        component={RouterLink}
        to={item.to}
        sx={{
          borderRadius: 2,
          py: 0.9,
          px: 1.25,
          color: active ? "#c4b5fd" : "rgba(255,255,255,0.6)",
          bgcolor: active ? "rgba(124,99,255,0.2)" : "transparent",
          "&:hover": {
            bgcolor: active
              ? "rgba(124,99,255,0.25)"
              : "rgba(255,255,255,0.07)",
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
}

const sectionLabelSx = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "rgba(255,255,255,0.3)",
  textTransform: "uppercase",
  px: 1,
  mb: 0.5,
};