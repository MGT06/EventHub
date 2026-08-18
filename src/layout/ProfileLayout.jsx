import { MapPin, Calendar, Pencil } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import EditProfileModal from "../components/EditProfileModal";
import { useState } from "react";
import useJoin from "../hooks/useJoin";
import { useAuth } from "../hooks/useAuth";

function ProfileLayout() {
  const [editOpen, setEditOpen] = useState(false);
  const { user } = useAuth();

  const { list: events } = useJoin("joinedEvents");
  const { list: community } = useJoin("joinedCommunities");
  const { list: saved } = useJoin("savedEvents");

  const tabActive = ({ isActive }) =>
    `text-sm px-4 py-2.5 font-medium ${
      isActive
        ? "border-b border-b-orange text-orange"
        : "text-gray-500 hover:text-gray-900"
    }`;
  return (
    <>
      <section className="py-8 px-4 lg:px-61">
        <div className=" flex gap-4">
          <div className="relative h-max w-max">
            <img
              src="https://i.pravatar.cc/150?img=13"
              alt=""
              className="w-10 h-10 rounded-full bg-gray-200"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div className="grid gap-3 flex-1 lg:grid-cols-7">
            <div>
              <h2 className="font-bold text-xl capitalize">{user.name}</h2>
              <p className="text-manatee text-sm">{user.email}</p>
            </div>

            <button
              onClick={() => setEditOpen(true)}
              className="py-1.5 px-3 rounded-lg border border-gray-300 w-max flex items-center gap-2 text-sm font-medium lg:col-start-7 "
            >
              <Pencil size={16} /> Edit Profile
            </button>

            <div className="lg:col-span-3 flex flex-col gap-2">
              <div className="flex gap-3 col-start-2">
                <div className="flex items-center gap-1 w-max">
                  <MapPin size={14} className="text-manatee" />
                  <span className="text-manatee text-xs">
                    Bandung, Indonesia
                  </span>
                </div>
                <div className="flex items-center gap-1 w-max">
                  <Calendar size={14} className="text-manatee" />
                  <span className="text-manatee text-xs">
                    Joined March 2025
                  </span>
                </div>
              </div>

              <span className="py-1 px-3 rounded-full text-xs font-medium w-max bg-orange-100 text-orange capitalize">
                {user.access}
              </span>

              <p className="text-sm text-gray-700">
                Backend engineer & community builder. Passionate about Go,
                distributed systems, and connecting people through events.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-1">
          <div className="flex flex-col gap-2 items-center px-3 grow">
            <p className="font-bold text-2xl">{events?.length || 0}</p>
            <p className="text-sm text-manatee">Events</p>
          </div>
          <div className="flex flex-col gap-2 items-center px-3 grow border-x border-x-gray-300">
            <p className="font-bold text-2xl">{community?.length || 0}</p>
            <p className="text-sm text-manatee">Communities</p>
          </div>
          <div className="flex flex-col gap-2 items-center px-3 grow">
            <p className="font-bold text-2xl">{saved?.length || 0}</p>
            <p className="text-sm text-manatee">Saved</p>
          </div>
        </div>
        <div className="mt-4 flex gap-1">
          <NavLink to={`/profile`} end className={tabActive}>
            Events
          </NavLink>
          <NavLink to={`/profile/communities`} className={tabActive}>
            Communities
          </NavLink>
          <NavLink to={`/profile/saved`} className={tabActive}>
            Saved
          </NavLink>
        </div>
        {editOpen && (
          <EditProfileModal
            isClose={() => setEditOpen(false)}
            initialData={{
              name: user.name,
              location: "Bandung, Indonesia",
              bio: "Backend engineer & community builder...",
              avatar: "https://i.pravatar.cc/150?img=13",
            }}
            onSave={(data) => console.log("saved:", data)}
          />
        )}
      </section>
      <section className="pb-5 px-4 lg:px-61">
        <Outlet />
      </section>
    </>
  );
}

export default ProfileLayout;
