import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { useAuth } from "../providers/authContext";

export function AdminRoute({ children }) {
  return (
    <ProtectedRoute>
      <AdminGate>{children}</AdminGate>
    </ProtectedRoute>
  );
}

function AdminGate({ children }) {
  const { user } = useAuth();
  if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

