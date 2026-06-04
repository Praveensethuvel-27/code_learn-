import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../providers/authContext";

export function PublicOnlyRoute({ children }) {
  const { loading, isAuthed, user } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthed) {
    return <Navigate to={user?.role === "admin" ? "/admin/users" : "/dashboard"} replace />;
  }

  return children;
}
