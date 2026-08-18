import dummy from "../../data/dummy.json";
import CardEvent from "../cardComponents/CardEvent";

function PastEvent() {
  return (
    <section>
      <section>
        <div className="grid gap-4 lg:grid-cols-3">
          {dummy.event.filter((e) => e.status === "ended").map((event) => {
            return <CardEvent key={event.id} event={event} />;
          })}
        </div>
      </section>
    </section>
  );
}

export default PastEvent;
