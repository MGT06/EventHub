import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ roles }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const hasAccess  = roles.includes(role)

  if(!hasAccess){
    return <Navigate to="/" replace/>
  }
  return <Outlet />;
}

export default ProtectedRoute;
