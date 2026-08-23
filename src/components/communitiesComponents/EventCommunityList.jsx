import CardEvent from "../cardComponents/CardEvent";
import { useOutletContext } from "react-router";
import { useSelector } from "react-redux";

function EventCommunityList() {
  const { nameCommunity } = useOutletContext();
  const { dataEvent } = useSelector((state) => state.eventState);

  const haveEvent = dataEvent.filter(
    (data) => data.organizer.community == nameCommunity,
  );
  
  return (
    <div className="pt-6">
      <p className="font-semibold text-sm text-manatee">UPCOMING</p>
      <div className="pt-4 grid lg:grid-cols-3 ">
        {haveEvent.map((e) => (
          <CardEvent key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}

export default EventCommunityList;
