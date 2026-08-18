import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import AuthSidePanel from "../components/AuthSidePanel";

function AuthLayout() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={"/"}/>
  }
  return (
    <>
      <main className="lg:flex">
        <AuthSidePanel />
        <Outlet />
      </main>
    </>
  );
}

export default AuthLayout;
