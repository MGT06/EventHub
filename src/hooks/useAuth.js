import { useDispatch, useSelector } from "react-redux";
import { changePasswordThunk, signUpThunk } from "../redux/slices/dataUserSlices.js";
import { signInThunk, signOutThunk } from "../redux/slices/loggedUserSlices.js";

export function useAuth() {
  const dispatch = useDispatch();
  const { loggedUser, token } = useSelector((state) => state.loggedUserState);

  const signIn = (dataInput) => {
    return dispatch(signInThunk(dataInput)).unwrap();
  };

  const signOut = () => {
    dispatch(signOutThunk());
  };

  const signUp = (dataInput) => {
    return dispatch(signUpThunk(dataInput)).unwrap();
  };

  const changePassword = (dataInput) => {
    return dispatch(changePasswordThunk(dataInput)).unwrap()
  }


  return {
    userActive: loggedUser,
    isAuthenticated: !!token,
    role: loggedUser?.role ?? null,
    signUp,
    signIn,
    signOut,
    changePassword,
  };
}
