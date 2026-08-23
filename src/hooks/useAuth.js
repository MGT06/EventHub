import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import { registerThunk } from "../redux/slices/signUpSlices.js";
import { loginThunk, logout as signOut } from "../redux/slices/signInSlices.js";

export function useAuth() {
  const dispatch = useDispatch();
  const { dataUser } = useSelector((state) => state.dataUserState);
  const { loggedUser } = useSelector((state) => state.loggedUserState);

  const login = (dataInput) => {
    return dispatch(loginThunk(dataInput)).unwrap();
  };

  const logout = () => {
    dispatch(signOut());
  };

  const signUp = (dataInput) => {
    return dispatch(registerThunk(dataInput)).unwrap();
  };

  const userActive = dataUser.find((data) => data.email === loggedUser);

  return {
    userActive,
    isAuthenticated: !!loggedUser,
    role: userActive?.access ?? null,
    signUp,
    login,
    logout,
  };
}
