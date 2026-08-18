import CardEvent from "../cardComponents/CardEvent";
import dummy from "../../data/dummy.json";
import { useOutletContext } from "react-router";

function EventCommunityList() {
  const { nameCommunity } = useOutletContext();
  const haveEvent = dummy.event.filter(
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
