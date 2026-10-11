import { useAuth } from "../../hooks/useAuth";
import CardEvent from "../cardComponents/CardEvent";
import { useSelector } from "react-redux";

function PastEvent() {
  const { userActive } = useAuth();
  const { listEvent } = useSelector((state) => state.eventState);

  if (!userActive) return null;

  const events = listEvent.filter(
    (ele) =>
      userActive.event_join.includes(ele.id) &&
      new Date(ele.end_at) < new Date(),
  );
  return (
    <section>
      <div className="grid gap-4 lg:grid-cols-3">
        {events.map((event) => {
          return <CardEvent key={event.id} event={event} />;
        })}
      </div>
    </section>
  );
}

export default PastEvent;
