import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

function ProtectedRoute({ roles }) {
  const { isAuthenticated, role } = useAuth();
  const { loggedUser } = useSelector((state) => state.loggedUserState);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  if (!loggedUser)
    return (
      <div className="text-center lg:col-start-2" role="status">
        <svg
          className="mx-auto size-20 animate-spin text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>

          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>

        <p className="mt-4 font-medium text-gray-700">Loading...</p>
      </div>
    );

  if (!roles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
