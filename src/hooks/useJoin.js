import { useDispatch } from "react-redux";
import {
  joinEventThunk,
  savedEventThunk,
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

    return dispatch(
      selectThunk({
        id,
        email,
      }),
    ).unwrap();
  };

  const joinCommunity = (id) => {
    return dispatch(joinCommunityThunk(id)).unwrap()
  }

  const joinEvent = (id) => {
    return dispatch(joinEventThunk(id)).unwrap()
  }

  const savedEvent = (id) => {
    return dispatch(savedEventThunk(id)).unwrap();
  };

  const isJoined = (userActive, listUserJoin) =>
    listUserJoin?.includes(userActive);

  const isMemberCommunity = (listJoinUser, communityId) =>
    listJoinUser?.includes(communityId);

  const isJoinEvent = (listJoinUser, eventId) =>
    listJoinUser?.includes(eventId);

  const isSavedEvent = (listSaveUser, eventId) =>
    listSaveUser?.includes(eventId);

  return {
    addJoined,
    joinCommunity,
    joinEvent,
    savedEvent,
    isJoined,
    isMemberCommunity,
    isJoinEvent,
    isSavedEvent,
  };
}

export default useJoin;
