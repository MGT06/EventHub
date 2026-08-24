import { NavLink, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

function MyEventLayout() {
  const { userActive } = useAuth();

  const { dataEvent } = useSelector((state) => state.eventState);
  console.log(userActive);
  const events = dataEvent.filter(
    (ele) =>
      ele.status !== "ended" && ele.attendees?.includes(userActive.email),
  );
  console.log(events)
  const saved = dataEvent.filter((ele) =>
    ele.userSaved?.includes(userActive.email),
  );

  const tabActive = ({ isActive }) =>
    `text-sm px-4 py-2.5 font-medium ${
      isActive
        ? "border-b border-b-orange text-orange"
        : "text-gray-500 hover:text-gray-900"
    }`;
  return (
    <>
      <section className="px-4 pt-6 border border-gray-300 lg:mb-4 lg:px-45">
        <h2 className="font-bold text-2xl">My Event</h2>
        <div className="mt-4 flex gap-1">
          <NavLink to={`/my-events`} end className={tabActive}>
            Upcoming ({events.length})
          </NavLink>
          <NavLink to={`/my-events/past`} className={tabActive}>
            Past (2)
          </NavLink>
          <NavLink to={`/my-events/saved`} className={tabActive}>
            Saved ({saved.length})
          </NavLink>
        </div>
      </section>
      <section className="py-5 px-8 lg:px-45">
        <Outlet />
      </section>
    </>
  );
}

export default MyEventLayout;
