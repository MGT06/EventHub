import useJoin from "../../hooks/useJoin";
import dummy from "../../data/dummy.json";
import CardEvent from "../cardComponents/CardEvent";
import { Bookmark } from "lucide-react";
import { Link } from "react-router";

function UpComingEvent() {
  const { list } = useJoin("joinedEvents");
  console.log(list);

  const getDataEvent = list.map((join) => {
    return dummy.event.find((event) => event.id === join.id);
  });

  console.log(getDataEvent);
  return (
    <>
      <section>
        <div className="grid gap-4 lg:grid-cols-3">
          {getDataEvent ? (
            getDataEvent.map((event) => {
              return <CardEvent key={event.id} event={event} />;
            })
          ) : (
            <div>
              <Bookmark />
              <p className="font-semibold">No saved events</p>
              <p className="text-sm text-manatee">Bookmark events you're interested in.</p>
              <Link to={"/event"}>
                Explore Events
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default UpComingEvent;
