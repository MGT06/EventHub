import useJoin from "../hooks/useJoin";
import dummy from "../data/dummy.json";
import CardEvent from "./cardComponents/CardEvent";
import { Link } from "react-router";
import { Bookmark } from "lucide-react";

function SavedList() {
  const { list } = useJoin("savedEvents");

  const getDataSaved = list.map((save) => {
    return dummy.event.find((event) => event.id === save.id);
  });

  return (
    <>
      <section >
        <div className="grid gap-4 lg:grid-cols-3">
          {getDataSaved.length === 0 ? (
            <div className="flex flex-col gap-2 justify-center lg:col-start-2  items-center"> 
              <Bookmark  className="text-manatee"/>
              <p className="font-semibold">No saved events</p>
              <p className="text-sm text-manatee">
                Bookmark events you're interested in.
              </p>
              <Link to={"/event"} className="py-2 px-4 bg-orange text-white rounded-lg mt-3">Explore Events</Link>
            </div>
          ) : (
            getDataSaved.map((event) => {
              return <CardEvent key={event.id} event={event} />;
            })
          )}
        </div>
      </section>
    </>
  );
}

export default SavedList;
