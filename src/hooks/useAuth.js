import { useState } from "react";
import { useNavigate } from "react-router";

export function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    return loggedUser;
  });

  const login = (dataInput) => {
    const dataExist = JSON.parse(localStorage.getItem("dataUser")) || [];
    for (const dataLocal of dataExist) {
      if (
        dataLocal.email === dataInput.email &&
        dataLocal.password === dataInput.password
      ) {
        const dataUser = JSON.parse(localStorage.getItem("dataUser")).find(
          (data) => data.email === dataInput.email,
        );

        localStorage.setItem("loggedUser", JSON.stringify(dataUser));
        navigate("/");
        return;
      }
      return false
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    role: user?.access ?? null,
    login,
    logout,
  };
}
