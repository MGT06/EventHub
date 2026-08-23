import { Bookmark, Calendar, Check, MapPin, UsersRound } from "lucide-react";
import Modal from "../Modal";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";
import useJoin from "../../hooks/useJoin";

function CardEvent({ event }) {
  const { isAuthenticated, userActive } = useAuth();
  const { isJoined, addJoined, addSaved, isSaved } = useJoin("joinedEvents");
  const [modal, setModal] = useState(false);

  const alreadyJoined = isJoined(userActive?.email, event.attendees);
  const alreadySaved = isSaved(userActive?.email, event.userSaved);

  function saveHandled() {
    addSaved(event.id, userActive.email)
  }

  function joinHandled() {
    addJoined("event", event.id, userActive.email);
  }

  const percentage = Math.trunc(
    (event.attendees.length / event.capacity) * 100,
  );
  const barColor =
    event.status === "ended"
      ? "bg-gray-400"
      : event.status === "full"
        ? "bg-red-500"
        : percentage < 80
          ? "bg-green-500"
          : "bg-yellow-500";

  return (
    <div className="border border-gray-200 rounded-xl flex flex-col">
      <Link to={`/event/detail/${event.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="rounded-t-lg w-full object-cover "
          />
          <div className="absolute bottom-3 left-2  ">
            {event.tags.map((t, idx) => {
              return (
                <span
                  key={idx}
                  className="py-0.5 px-2 text-blue-700 bg-[#3363ff1a] rounded-4xl text-xs"
                >
                  {t}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
      <div className="flex flex-col grow gap-3 p-4">
        <p className="font-semibold mb-auto">{event.title}</p>
        <div>
          <div className="flex items-center gap-2">
            <Calendar width={9} />
            <p className="text-xs text-manatee">{event.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin width={9} />
            <p className="text-xs text-manatee">{event.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <UsersRound width={9} />
            <p className="text-xs text-manatee">
              {event.attendees.length} / {event.capacity} attendees
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p className="text-xs text-manatee">
              {event.attendees.length} attendees
            </p>
            <p className="text-xs text-manatee">{event.capacity} capacity</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 my-2">
          <div
            className={`h-1.5 rounded-full ${barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex gap-2 pt-1 items-center">
          <button
            disabled={event.status === "full" || alreadyJoined}
            className={`py-1.5 col-span-5 rounded-lg cursor-pointer grow ${
              event.status === "full" || event.status === "ended"
                ? "bg-gray-200 text-gray-600 cursor-not-allowed "
                : alreadyJoined
                  ? "bg-green-500 text-white  flex justify-center"
                  : "bg-orange text-white"
            }`}
            onClick={() => {
              isAuthenticated ? joinHandled() : setModal(true);
            }}
          >
            {alreadyJoined && <Check />}
            {event.status === "full"
              ? "Full"
              : alreadyJoined
                ? "Joined"
                : "Join Event"}
          </button>
          <div
            className={`p-1.5 rounded-lg border cursor-pointer text-manatee ${
              event.status === "ended"
                ? "cursor-not-allowed"
                : alreadySaved && "text-orange"
            }`}
            onClick={() => {
              isAuthenticated ? saveHandled() : setModal(true);
            }}
          >
            <Bookmark size={18} fill={alreadySaved ? "#ff5f22" : "#fff"} />
          </div>
        </div>
      </div>
      {modal && <Modal isClose={() => setModal(false)} />}
    </div>
  );
}
export default CardEvent;
