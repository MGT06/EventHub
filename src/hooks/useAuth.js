import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../redux/slices/signUpSlices.js";
import { loginThunk, logout as signOut } from "../redux/slices/signInSlices.js";

export function useAuth() {
  const dispatch = useDispatch();
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


  return {
    userActive: loggedUser,
    isAuthenticated: !!loggedUser,
    role: loggedUser?.access ?? null,
    signUp,
    login,
    logout,
  };
}
