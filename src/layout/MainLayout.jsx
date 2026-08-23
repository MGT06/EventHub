import { Outlet } from "react-router";
import Header from "../components/Header";
import { useEffect } from "react";
import { getEventThunk } from "../redux/slices/eventSlices.js";
import dummy from "../data/dummy.json";
import { useDispatch } from "react-redux";
import { getCommunityThunk } from "../redux/slices/communitySlices.js";

function MainLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventThunk(dummy.event));
    dispatch(getCommunityThunk(dummy.communities));
  }, [dispatch]);

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
