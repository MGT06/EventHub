import { MoveLeft } from "lucide-react";
import { Outlet } from "react-router";

function LayoutCreateEvent() {
  return (
    <>
      <div className="py-3 px-4 flex items-center gap-4 border-b border-gray-300 lg:px-65.5">
        <div className="text-manatee flex text-sm gap-1.5">
          <MoveLeft width={16} />
          <p>Back</p>
        </div>
        <p className="font-semibold">Create Event</p>
        <div className="grow flex gap-2 items-center justify-end">
          <span className="rounded-full text-white text-xs font-semibold bg-orange grid items-center justify-center w-6 h-6">
            1
          </span>
          <span className="w-8 bg-gray-300 h-0.5"></span>
          <span className="rounded-full text-xs font-semibold bg-gray-300  grid items-center justify-center w-6 h-6">
            2
          </span>
          <span className="w-8 bg-gray-300 h-0.5"></span>
          <span className="rounded-full text-xs font-semibold bg-gray-300   grid items-center justify-center w-6 h-6">
            3
          </span>
        </div>
      </div>
      <section className="px-4 py-8 lg:px-77.5">
        <Outlet />
      </section>
    </>
  );
}

export default LayoutCreateEvent;
