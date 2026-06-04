import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../providers/authContext";

export function ProtectedRoute({ children }) {
  const { loading, isAuthed } = useAuth();
  if (loading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!isAuthed) return <Navigate to="/login" replace />;
  return children;
}

