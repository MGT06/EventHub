import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { getAllUsers } from "../utils/dataUser";
import { useDispatch } from "react-redux";
import {
  joinEventThunk,
  savedEventThunk,
  unjoinEventThunk,
} from "../redux/slices/eventSlices";
import { joinCommunityThunk } from "../redux/slices/communitySlices";

function useJoin(targetList) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const currentUserEmail = user?.email;

  const fetchUserList = useCallback(
    (email) => {
      if (!email) return [];
      const allUsers = getAllUsers();
      const currentUser = allUsers.find((user) => user.email === email);
      return currentUser?.[targetList] || [];
    },
    [targetList],
  );

  const [joinedItems, setJoinedItems] = useState(() =>
    fetchUserList(currentUserEmail),
  );

  useEffect(() => {
    (() => {
      const currentList = fetchUserList(currentUserEmail);
      setJoinedItems(currentList);
    })();
  }, [currentUserEmail, fetchUserList]);

  const addJoined = (type, id, email) => {
    const thunkObj = {
      event: joinEventThunk,
      community: joinCommunityThunk
    }

    const selectThunk = thunkObj[type]

    dispatch(
      selectThunk({
        id,
        email,
      }),
    );
  };

  const addSaved = (idEvent, email) => {
    dispatch(
      savedEventThunk({
        id: idEvent,
        email,
      }),
    );
  };

  const removeJoin = (idEvent, email) => {
    dispatch(
      unjoinEventThunk({
        id: idEvent,
        email,
      }),
    );
  };

  const isJoined = (userActive, eventAttendees) =>
    eventAttendees?.includes(userActive);

  const isSaved = (userActive, eventSaved) =>
    eventSaved?.includes(userActive);

  return {
    list: joinedItems,
    addJoined,
    addSaved,
    removeJoin,
    isJoined,
    isSaved,
  };
}

export default useJoin;
