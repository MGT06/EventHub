import { MoveLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router";

function LayoutCreateEvent() {
  const { step } = useSelector((state) => state.createEventState);

  return (
    <>
      <div className="py-3 px-4 flex items-center gap-4 border-b border-gray-300 lg:px-65.5">
        <Link to={"/dashboard-organizer"}>
          <div className="text-manatee flex text-sm gap-1.5">
            <MoveLeft width={16} />
            <p>Back</p>
          </div>
        </Link>
        <p className="font-semibold">Create Event</p>
        <div className="grow flex gap-2 items-center justify-end">
          <span
            className={`rounded-full text-xs font-semibold grid items-center justify-center w-6 h-6 ${
              step >= 1 ? "bg-orange text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            1
          </span>
          <span
            className={`w-8 h-0.5 ${step > 1 ? "bg-orange" : "bg-gray-300"}`}
          ></span>
          <span
            className={`rounded-full text-xs font-semibold grid items-center justify-center w-6 h-6 ${
              step >= 2 ? "bg-orange text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            2
          </span>
          <span
            className={`w-8 h-0.5 ${step > 2 ? "bg-orange" : "bg-gray-300"}`}
          ></span>
          <span
            className={`rounded-full text-xs font-semibold grid items-center justify-center w-6 h-6 ${
              step >= 3 ? "bg-orange text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
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
