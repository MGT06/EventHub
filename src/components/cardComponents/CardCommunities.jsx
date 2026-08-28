import { useState } from "react";
import { UsersRound, Calendar, Check } from "lucide-react";
import Modal from "../Modal";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";
import useJoin from "../../hooks/useJoin";
import { toast } from "react-toastify";

function CardCommunities({ community }) {
  const [modal, setModal] = useState(false);
  const { isJoined, addJoined } = useJoin("joinedCommunities");
  const { isAuthenticated, userActive } = useAuth();

  const alreadyJoined = isJoined(userActive?.email, community.members);

  function joinHandled() {
    toast.promise(
      addJoined("community", community.id, userActive.email),
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
  return (
    <div className="rounded-lg border border-gray-300 h-full flex flex-col">
      <Link to={`/communities/detail/${community.id}`} className="relative">
        <img
          src={community.image}
          alt=""
          className="rounded-t-lg w-full h-44 object-cover"
        />
        {alreadyJoined && (
          <p className="px-4 py-1.5 bg-green-600 absolute rounded-full text-white text-xs top-4 right-4">
            Joined
          </p>
        )}
      </Link>
      <div className="grid gap-3 p-4 grow">
        <p className="font-semibold">{community.name}</p>
        <p className="text-xs text-manatee">{community.description}</p>

        <div>
          {community.tags.map((t, idx) => {
            return (
              <span
                key={idx}
                className="py-0.5 px-2 text-blue-700 bg-[#3363ff1a] rounded-4xl text-xs mr-3"
              >
                {t}
              </span>
            );
          })}
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <UsersRound width={9} />
            <p className="text-xs text-manatee">
              {community.members.length} members
            </p>
          </div>
          <div className="flex  items-center gap-2">
            <Calendar width={9} />
            <p className="text-xs text-manatee">
              {community.upcomingEvents} upcoming
            </p>
          </div>
        </div>

        <button
          className={`flex justify-center py-1.5 px-3 rounded-lg text-sm text-white cursor-pointer ${
            alreadyJoined ? "bg-green-500" : "bg-orange"
          }`}
          onClick={() => {
            isAuthenticated ? joinHandled() : setModal(true);
          }}
        >
          {alreadyJoined && <Check />}
          {alreadyJoined ? "Joined" : "Join Community"}
        </button>
      </div>
      {modal && <Modal isClose={() => setModal(false)} />}
    </div>
  );
}

export default CardCommunities;
