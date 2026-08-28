import { UsersRound, Calendar, Check, MoveLeft } from "lucide-react";
import { Link, NavLink, Outlet, useParams } from "react-router";
import useJoin from "../hooks/useJoin";
import { useState } from "react";
import Modal from "../components/Modal";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CommunitieDetailLayout() {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const { isAuthenticated, userActive } = useAuth();

  const { dataCommunity } = useSelector((state) => state.communityState);

  const dataDetail = dataCommunity.find((detail) => detail.id == id);

  const { isJoined, addJoined } = useJoin("joinedCommunities");

  const alreadyJoined = isJoined(userActive.email, dataDetail.members);

  function joinHandled() {
    toast.promise(
      addJoined("community", dataDetail.id, userActive.email),
      {
        pending: "Join procces",
        success: "Join success",
        error: "Join failed",
      },
      {
        autoClose: 2000,
        position: "bottom-right",
      },
    );
  }

  const tabActive = ({ isActive }) =>
    `text-sm px-4 py-2.5 font-medium ${
      isActive
        ? "border-b border-b-orange text-orange"
        : "text-gray-500 hover:text-gray-900"
    }`;

  return (
    <>
      <div className="py-3 px-4 border-b border-b-gray-300 flex items-center">
        <Link to={"/communities"} className="w-fit flex items-center gap-3">
          <MoveLeft className="text-manatee" />
          <p className="text-manatee text-sm">Back to Communities</p>
        </Link>
      </div>
      <div className="relative w-full h-48 lg:h-69">
        <img
          src={dataDetail.image}
          alt={dataDetail.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4 lg:left-20 lg:right-20 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-white font-bold text-xl lg:text-2xl">
              {dataDetail.name}
            </h1>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1.5">
                <UsersRound size={14} className="text-white/80" />
                <p className="text-xs text-white/80">
                  {dataDetail.members.length} members
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-white/80" />
                <p className="text-xs text-white/80">
                  {dataDetail.upcomingEvents} upcoming events
                </p>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                isAuthenticated ? joinHandled() : setModal(true);
              }}
              className={`flex items-center w-max justify-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-lg cursor-pointer ${
                alreadyJoined
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-orange text-white hover:bg-orange/90"
              }`}
            >
              {alreadyJoined ? (
                <>
                  <Check size={16} />
                  Joined
                </>
              ) : (
                <>Join Community</>
              )}
            </button>
          </div>
        </div>
      </div>
      <section className="py-2 px-3 lg:px-30">
        <div className="rounded-xl border border-gray-300 p-5">
          <p className="text-sm text-gray-900 ">
            The premier Go programming community in Bandung — weekly meetups,
            workshops, and mentoring for Gophers at all levels.
          </p>
          <div className="pt-3 flex gap-4">
            {dataDetail.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-400/30 py-0.5 px-2 text-blue-600 rounded-2xl "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="border-b border-gray-200 pt-6">
          <div className="flex gap-7">
            <NavLink to={`/communities/detail/${id}`} end className={tabActive}>
              Events
            </NavLink>
            <NavLink
              to={`/communities/detail/${id}/members`}
              className={tabActive}
            >
              Members
            </NavLink>
            <NavLink
              to={`/communities/detail/${id}/discussion`}
              className={tabActive}
            >
              Discussion
            </NavLink>
          </div>
          {modal && <Modal isClose={() => setModal(false)} />}
        </div>
        <Outlet context={{ nameCommunity: dataDetail.name }} />
      </section>
    </>
  );
}
export default CommunitieDetailLayout;
