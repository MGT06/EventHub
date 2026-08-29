import {
  MessageSquare,
  MoveLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Bookmark,
  Share2,
  SendHorizonal,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router";
import CardEvent from "./cardComponents/CardEvent";
import useJoin from "../hooks/useJoin";
import ModalGuest from "./modal/ModalGuest";
import { toast } from "react-toastify";

function DetailEvent() {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const { isJoined, addJoined, addSaved, isSaved, removeJoin } =
    useJoin("joinedEvents");
  const { isAuthenticated, userActive } = useAuth();
  const { dataEvent } = useSelector((state) => state.eventState);

  const dataDetail = dataEvent.find((detail) => detail.id == id);

  const getRelatedEvents = dataEvent
    .filter(
      (e) =>
        e.id !== dataDetail.id &&
        e.status !== "ended" &&
        e.category.some((tag) => dataDetail.category.includes(tag)),
    )
    .slice(0, 3);

  const alreadyJoined = isJoined(userActive.email, dataDetail.attendees);
  const alreadySaved = isSaved(userActive.email, dataDetail.userSaved);

  function saveHandled() {
    toast.promise(
      addSaved(dataDetail.id, userActive.email),
      {
        pending: "Save procces",
        success: "Save success",
        error: "Save failed",
      },
      {
        autoClose: 2000,
        position: "bottom-right",
      },
    );
  }

  function joinHandled() {
    toast.promise(
      addJoined("event", dataDetail.id, userActive.email),
      {
        pending: "Save procces",
        success: "Save success",
        error: "Save failed",
      },
      {
        autoClose: 2000,
        position: "bottom-right",
      },
    );
  }

  function unJoin() {
    toast.promise(
      removeJoin(dataDetail.id, userActive.email),
      {
        pending: "Unjoin procces",
        success: "Unjoin success",
        error: "Unjoin failed",
      },
      {
        autoClose: 2000,
        position: "bottom-right",
      },
    );
  }

  const percentage = Math.trunc(
    (dataDetail.attendees.length / dataDetail.capacity) * 100,
  );
  const barColor =
    dataDetail.status === "full"
      ? "bg-red-500"
      : percentage < 80
        ? "bg-green-500"
        : "bg-yellow-500";

  return (
    <section>
      <div className="py-3 px-4 border-b border-b-gray-300 flex items-center">
        <Link to={"/event"} className="w-fit flex items-center gap-3">
          <MoveLeft className="text-manatee" />
          <p className="text-manatee text-sm">Back to Events</p>
        </Link>
      </div>
      <div className="py-6 px-4 lg:px-16 xl:px-29 grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-6">
        <img
          src={dataDetail.coverImage}
          alt=""
          className="rounded-xl w-full lg:col-start-1 lg:col-end-5"
        />
        <div className="lg:col-start-1 lg:col-end-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {dataDetail.category.map((t, idx) => {
              return (
                <span
                  key={idx}
                  className="py-0.5 px-2 bg-blue-300/50 rounded-full text-blue-600 font-medium text-xs"
                >
                  {t}
                </span>
              );
            })}
          </div>
          <h2 className="font-bold text-xl sm:text-2xl">{dataDetail.title}</h2>
        </div>
        <div className="grid gap-3 lg:col-start-5 lg:col-end-7 lg:row-start-1 lg:row-end-3">
          <div className="grid gap-2 p-4 border border-gray-300 rounded-xl">
            <p className="text-xs font-semibold text-manatee tracking-wide">
              EVENT INFO
            </p>
            <div className="grid gap-2 pb-3 border-b border-b-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-manatee shrink-0" />
                <span>{dataDetail.eventDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-manatee shrink-0" />
                <span>
                  {dataDetail.startTime} – {dataDetail.endTime}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-manatee shrink-0" />
                <span>{dataDetail.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-manatee">
              <Users size={16} className="shrink-0" />
              <span>
                {percentage}% full ·{" "}
                {dataDetail.capacity - dataDetail.attendees.length} spots left
              </span>
            </div>

            <div className="flex justify-between">
              <p className="text-xs text-manatee">
                {dataDetail.attendees.length} attendees
              </p>
              <p className="text-xs text-manatee">
                {dataDetail.capacity} capacity
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 my-2">
              <div
                className={`h-1.5 rounded-full ${barColor}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="grid gap-2">
              <button
                className={`py-2 px-4 rounded-lg text-white cursor-pointer ${alreadyJoined ? " bg-green-600" : "bg-orange"}`}
                onClick={() => {
                  isAuthenticated ? joinHandled() : setModal(true);
                }}
              >
                {alreadyJoined ? "Registered" : "Join Event"}
              </button>
              {alreadyJoined && (
                <button
                  className="py-2 px-4 rounded-lg bg-gray-100 border border-gray-300 cursor-pointer"
                  onClick={() => {
                    unJoin();
                  }}
                >
                  Cancel Registered
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div
                className={`flex justify-center items-center gap-2 p-1.5 rounded-lg border cursor-pointer transition-colors ${
                  alreadySaved
                    ? "border-orange text-orange"
                    : "border-gray-300 text-manatee hover:bg-gray-100"
                }`}
                onClick={() =>
                  isAuthenticated ? saveHandled() : setModal(true)
                }
              >
                <Bookmark
                  size={18}
                  color={alreadySaved ? "#f97316" : "grey"}
                  fill={alreadySaved ? "#f97316" : "none"}
                />
                <p
                  className={`text-sm ${
                    alreadySaved ? "text-orange" : "text-black"
                  }`}
                >
                  {alreadySaved ? "Saved" : "Save"}
                </p>
              </div>
              <button className="py-2 px-4 rounded-lg border border-gray-300 flex items-center justify-center gap-2 text-sm">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
          <div className="grid gap-2 p-4 border border-gray-300 rounded-xl">
            <p className="font-semibold text-xs text-manatee">ORGANIZED BY</p>
            <div className="flex gap-3 items-center">
              <img
                src={dataDetail.organizer?.avatar}
                alt=""
                className="rounded-full w-8 h-8"
              />
              <div>
                <p className="font-semibold text-sm">
                  {dataDetail.organizer?.name}
                </p>
                <p className="text-xs text-blue-400">
                  {dataDetail.organizer?.community}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-start-1 lg:col-end-5">
          <p className="font-semibold text-lg">About this event</p>
          <p className="text-manatee">{dataDetail.description}</p>
        </div>
        <div className="lg:col-start-1 lg:col-end-5">
          <p className="font-semibold text-lg">Speakers</p>
          <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2">
            {dataDetail?.speakers.map((speak, idx) => {
              return (
                <div
                  key={idx}
                  className="p-4 flex gap-3 border border-gray-200 rounded-xl"
                >
                  <img
                    src={speak.avatar}
                    alt=""
                    className="rounded-full w-8 h-8"
                  />
                  <div>
                    <p className="font-semibold text-sm">{speak.name}</p>
                    <p className="text-manatee text-sm">{speak.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:col-start-1 lg:col-end-5">
          <div className="flex gap-2 items-center">
            <MessageSquare width={18} />
            <p className="font-semibold text-lg">Discussion</p>
            <p className="text-manatee text-sm">
              (
              {dataDetail.discussions
                ? dataDetail.discussions.length
                : "Tidak ada discussion"}
              )
            </p>
          </div>
          <div className="grid gap-3 mt-4">
            {dataDetail.discussions?.map((dis) => {
              return (
                <div key={dis.id} className="flex gap-3">
                  <img
                    src={dis.avatar}
                    alt=""
                    className="rounded-full w-6 h-6 shrink-0"
                  />
                  <div className="py-3 px-4 rounded-xl border border-gray-300 grow">
                    <div className="flex gap-3 items-center">
                      <p className="font-semibold text-sm">{dis.name}</p>
                      <p className="text-xs text-manatee">{dis.timeAgo}</p>
                    </div>
                    <p className="text-gray-700 text-sm">{dis.message}</p>
                  </div>
                </div>
              );
            })}
            <div className="flex gap-3">
              <img
                src="https://i.pravatar.cc/100?img=2"
                alt="You"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 grow">
                <input
                  type="text"
                  placeholder="Start a discussion..."
                  className="min-w-0 flex-1 border-none text-sm text-gray-700 placeholder:text-gray-400 outline-none"
                />
                <SendHorizonal className="text-orange" />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-start-1 lg:col-end-5 pt-8 border-t border-gray-200">
          <p className="font-semibold text-lg mb-4">You might also like</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getRelatedEvents.map((e) => (
              <CardEvent key={e.id} event={e} />
            ))}
          </div>
        </div>
      </div>
      {modal && <ModalGuest isClose={() => setModal(false)} />}
    </section>
  );
}

export default DetailEvent;
