import CardEvent from "../cardComponents/CardEvent";
import { useSelector } from "react-redux";

function PastEvent() {
  const { dataEvent } = useSelector(state => state.eventState)
  return (
    <section>
        <div className="grid gap-4 lg:grid-cols-3">
          {dataEvent.filter((e) => e.status === "ended").map((event) => {
            return <CardEvent key={event.id} event={event} />;
          })}
        </div>
    </section>
  );
}

export default PastEvent;
