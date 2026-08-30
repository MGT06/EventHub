import { Calendar, Flag, UserRound, UsersRound } from "lucide-react";

function OverviewAdmin() {
  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl p-5 border border-gray-300 ">
          <div className="flex justify-between items-center">
            <p className="font-medium text-manatee text-xs">TOTAL USERS</p>
            <Calendar width={16} className="text-manatee" />
          </div>
          <p className="mt-3 font-bold text-2xl">12,841</p>
          <p className="text-manatee text-xs">+284 this month</p>
        </div>
        <div className="rounded-xl p-5 border border-gray-300">
          <div className="flex justify-between items-center">
            <p className="font-medium text-manatee text-xs">TOTAL EVENTS</p>
            <UserRound width={16} className="text-manatee" />
          </div>
          <p className="mt-3 font-bold text-2xl">12</p>
          <p className="text-manatee text-xs">8 upcoming</p>
        </div>
        <div className="rounded-xl p-5 border border-gray-300">
          <div className="flex justify-between items-center">
            <p className="font-medium text-manatee text-xs">COMMUNITIES</p>
            <UsersRound width={16} className="text-manatee" />
          </div>
          <p className="mt-3 font-bold text-2xl">8</p>
          <p className="text-manatee text-xs">All active</p>
        </div>
        <div className="rounded-xl p-5 border border-gray-300">
          <div className="flex justify-between items-center">
            <p className="font-medium text-manatee text-xs">AVG FILL RATE</p>
            <Flag width={16} className="text-manatee" />
          </div>
          <p className="mt-3 font-bold text-2xl">74%</p>
          <p className="text-manatee text-xs">Across all events</p>
        </div>
      </div>
      <div className="mt-6 rounded-xl p-5 border border-gray-300">
        <p className="font-semibold text-sm">Recent Platform Activity</p>
        <div className="pt-4 grid gap-3 grid-">
            <div className="flex gap-3 items-center justify-between">
                <UsersRound width={16} className="text-green-500"/>
                <p className="text-sm lg:grow">284 new users registered this month</p>
                <p className="text-xs text-manatee">Today</p>
            </div>
            <div className="flex gap-3 items-center justify-between">
                <Calendar width={16} className="text-blue-500"/>
                <p className="text-sm sm:w-60 lg:grow">"AI Product Design Summit" reached 234 registrations</p>
                <p className="text-xs text-manatee ">2h ago</p>
            </div>
            <div className="flex gap-3 items-center justify-between">
                <Flag width={16} className="text-orange"/>
                <p className="text-sm sm:w-60 lg:grow">3 new organizer applications received</p>
                <p className="text-xs text-manatee">5h ago</p>
            </div>
            <div className="flex gap-3 items-center justify-between">
                <UsersRound width={16} className="text-green-500"/>
                <p className="text-sm sm:w-60 lg:grow">Jakarta AI & ML Club crossed 2,000 members</p>
                <p className="text-xs text-manatee">1d ago</p>
            </div>
        </div>
      </div>
    </>
  );
}

export default OverviewAdmin;
