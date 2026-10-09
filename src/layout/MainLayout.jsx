import { Outlet } from "react-router";
import Header from "../components/Header";
import { useEffect } from "react";
import { getEventThunk } from "../redux/slices/eventSlices.js";
import dummy from "../data/dummy.json";
import { useDispatch } from "react-redux";
import { getCommunityThunk } from "../redux/slices/communitySlices.js";
import { useAuth } from "../hooks/useAuth.js";
import { getInfoUserThunk } from "../redux/slices/loggedUserSlices.js";

function MainLayout() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getInfoUserThunk());
    }
    
    dispatch(getEventThunk(dummy.event));
    dispatch(getCommunityThunk());
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
