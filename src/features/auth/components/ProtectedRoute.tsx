import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (location.pathname.startsWith("/admin") && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (location.pathname.startsWith("/dashboard") && user.role !== "customer") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
