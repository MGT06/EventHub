import CardEvent from "./cardComponents/CardEvent";
import { Link } from "react-router";
import { Bookmark } from "lucide-react";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";

function SavedList() {
   const { userActive } = useAuth();
 
   const { dataEvent } = useSelector(state => state.eventState)
 
   const saved = dataEvent.filter((ele) => ele.userSaved?.includes(userActive.email))

  return (
    <>
      <section >
        <div className="grid gap-4 lg:grid-cols-3">
          {saved.length === 0 ? (
            <div className="flex flex-col gap-2 justify-center lg:col-start-2  items-center"> 
              <Bookmark  className="text-manatee"/>
              <p className="font-semibold">No saved events</p>
              <p className="text-sm text-manatee">
                Bookmark events you're interested in.
              </p>
              <Link to={"/event"} className="py-2 px-4 bg-orange text-white rounded-lg mt-3">Explore Events</Link>
            </div>
          ) : (
            saved.map((event) => {
              return <CardEvent key={event.id} event={event} />;
            })
          )}
        </div>
      </section>
    </>
  );
}

export default SavedList;
