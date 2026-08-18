import { useState } from "react";
export function useAuth() {
  const [user, setUser] = useState(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    return loggedUser;
  });

  const logout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };


  return {
    user,
    isAuthenticated: !!user,
    role: user?.access ?? null,
    logout,
  };
}
