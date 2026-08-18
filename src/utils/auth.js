export function auth() {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  const login = (userData) => {
    const dataExist = JSON.parse(localStorage.getItem("dataUser"));
    for (const dataLocal of dataExist) {
      if (
        dataLocal.email === userData.email ||
        dataLocal.password === userData.password
      ) {
        const dataUser = JSON.parse(localStorage.getItem("dataUser")).find(
          (data) => data.email === userData.email,
        );
        localStorage.setItem("loggedUser", JSON.stringify(dataUser));
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
  };

  const hasRole = (role) => {
    if (!loggedUser) return false;
    return Array.isArray(role)
      ? role.includes(loggedUser.access)
      : loggedUser.access === role;
  };

  return {
    loggedUser,
    isAuthenticated: !!loggedUser,
    role: loggedUser?.access ?? null,
    login,
    logout,
    hasRole,
  };
}
