import { useState } from "react";
import { useNavigate } from "react-router";

const organizer = {
  name: import.meta.env.VITE_ORGANIZER_NAME,
  email: import.meta.env.VITE_ORGANIZER_EMAIL,
  password: import.meta.env.VITE_ORGANIZER_PASSWORD,
  access: import.meta.env.VITE_ORGANIZER_ACCESS,
};

const admin = {
  name: import.meta.env.VITE_ADMIN_NAME,
  email: import.meta.env.VITE_ADMIN_EMAIL,
  password: import.meta.env.VITE_ADMIN_PASSWORD,
  access: import.meta.env.VITE_ADMIN_ACCESS,
};

export function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    return loggedUser;
  });

  const login = (dataInput) => {
    const dataExist = JSON.parse(localStorage.getItem("dataUser")) || [];
    if (
      dataInput.email === organizer.email &&
      dataInput.password === organizer.password
    ) {
      localStorage.setItem("loggedUser", JSON.stringify(organizer));
      navigate("/");
      return true;
    }
    if (
      dataInput.email === admin.email &&
      dataInput.password === admin.password
    ) {
      localStorage.setItem("loggedUser", JSON.stringify(admin));
      navigate("/");
      return true;
    }
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
    }
    return false;
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
