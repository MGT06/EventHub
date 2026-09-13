import { useDispatch, useSelector } from "react-redux";
import { changePasswordThunk, signUpThunk } from "../redux/slices/dataUserSlices.js";
import { signInThunk, signOutAction } from "../redux/slices/loggedUserSlices.js";

export function useAuth() {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.loggedUserState);

  const signIn = (dataInput) => {
    return dispatch(signInThunk(dataInput)).unwrap();
  };

  const signOut = () => {
    dispatch(signOutAction());
  };

  const signUp = (dataInput) => {
    return dispatch(signUpThunk(dataInput)).unwrap();
  };

  const changePassword = (dataInput) => {
    return dispatch(changePasswordThunk(dataInput)).unwrap()
  }


  return {
    userActive: loggedUser,
    isAuthenticated: !!loggedUser,
    role: loggedUser?.access ?? null,
    signUp,
    signIn,
    signOut,
    changePassword
  };
}
