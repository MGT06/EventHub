import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

function ProtectedRoute({ roles }) {
  const { isAuthenticated, role } = useAuth();
  const { loggedUser } = useSelector((state) => state.loggedUserState);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  if (!loggedUser) return null

  if (!roles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
