import { Calendar, Shield, UsersRound } from "lucide-react";
import { NavLink, Outlet } from "react-router";

const tabActive = ({ isActive }) =>
  `flex gap-1 items-center text-sm px-4 py-2.5 font-medium ${
    isActive
      ? "border-b border-b-orange text-orange"
      : "text-gray-500 hover:text-gray-900"
  }`;
function DashboardAdminLayout() {
  return (
    <>
      <section className="py-8 px-4">
        <div className="flex gap-3 items-center">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-orange/25 text-orange">
            <Shield width={20} />
          </div>
          <div>
            <h2 className="font-bold text-2xl">Admin Dashboard</h2>
            <p className="text-xs text-manatee">
              Platform management and moderation
            </p>
          </div>
        </div>
        <div className="mt-4 flex overflow-scroll">
          <NavLink to={`/dashboard-admin`} end className={tabActive}>
            <Shield />
            Overview
          </NavLink>
          <NavLink to={`users`} className={tabActive}>
            <UsersRound />
            Users
          </NavLink>
          <NavLink to={`event`} className={tabActive}>
            <Calendar />
            Events
          </NavLink>
          <NavLink to={`community`} className={tabActive}>
            <UsersRound />
            Community
          </NavLink>
        </div>
        <div>
          <Outlet />
        </div>
      </section>
    </>
  );
}

export default DashboardAdminLayout;
