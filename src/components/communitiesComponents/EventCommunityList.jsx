import { useEffect } from "react";
import CardEvent from "../cardComponents/CardEvent";
import { useDispatch, useSelector } from "react-redux";
import { getEventCommunity } from "../../redux/slices/communitySlices";
import { useParams } from "react-router";

function EventCommunityList() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventCommunity(id));
  }, [dispatch, id]);

  const { detailCommunity } = useSelector((state) => state.communityState);

  if (!detailCommunity.communityEvents) {
    return <div>Loading data community...</div>;
  }

  return (
    <div className="pt-6">
      <p className="font-semibold text-sm text-manatee">UPCOMING</p>
      <div className="pt-4 grid lg:grid-cols-3 ">
        {detailCommunity.communityEvents.map((e) => (
          <CardEvent key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}

export default EventCommunityList;
