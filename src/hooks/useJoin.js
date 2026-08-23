import { useDispatch } from "react-redux";
import {
  joinEventThunk,
  savedEventThunk,
  unjoinEventThunk,
} from "../redux/slices/eventSlices";
import { joinCommunityThunk } from "../redux/slices/communitySlices";

function useJoin() {
  const dispatch = useDispatch();

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

  const isJoined = (userActive, listUserJoin) =>
    listUserJoin?.includes(userActive);

  const isSaved = (userActive, eventSaved) =>
    eventSaved?.includes(userActive);

  return {
    addJoined,
    addSaved,
    removeJoin,
    isJoined,
    isSaved,
  };
}

export default useJoin;
