import CardEvent from "../cardComponents/CardEvent";
import { Bookmark } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";

function UpComingEvent() {
  const { userActive } = useAuth();
  const { listEvent } = useSelector((state) => state.eventState);

  if (!userActive) return null;

  const events = listEvent.filter((ele) =>
    userActive.event_join.includes(ele.id) && new Date(ele.end_at) >= new Date()
  );

  return (
    <>
      <section>
        <div className="grid gap-4 lg:grid-cols-3">
          {events ? (
            events.map((event) => {
              return <CardEvent key={event.id} event={event} />;
            })
          ) : (
            <div>
              <Bookmark />
              <p className="font-semibold">No join events</p>
              <p className="text-sm text-manatee">
                Bookmark events you're interested in.
              </p>
              <Link to={"/event"}>Explore Events</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default UpComingEvent;
