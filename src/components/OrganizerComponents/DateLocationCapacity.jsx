import { MoveRight, Plus } from "lucide-react";
import { Link } from "react-router";

function DateLocationCapacity() {
  return (
      <div>
        <div>
          <p className="font-bold text-xl">Date, Location & Capacity</p>
          <p className="text-sm text-manatee mt-1">
            When and where is your event?
          </p>
        </div>
        <form className="grid gap-6 mt-6">
          <div className="grid gap-2">
            <label htmlFor="date" className="font-medium text-sm">
              Event Date
            </label>
            <input
              type="date"
              id="date"
              className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex gap-3">
            <div className="grid gap-2 grow">
              <label htmlFor="start" className="font-medium text-sm">
                Start Time
              </label>
              <input
                type="time"
                id="start"
                className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
              />
            </div>
            <div className="grid gap-2 grow">
              <label htmlFor="end" className="font-medium text-sm">
                End Time
              </label>
              <input
                type="time"
                id="end"
                className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="location" className="font-medium text-sm">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
              placeholder="Legenda Wisata"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="capacity" className="font-medium text-sm">
              capacity
            </label>
            <input
              type="text"
              id="capacity"
              className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
              placeholder="Legenda Wisata"
            />
          </div>
          <div className="mt-8 pt-6 border-t border-t-gray-300 flex justify-between">
            <button className=" py-2 px-4 text-black rounded-lg">Cancel</button>
            <Link to={"/create-event/speaker-review"}>
              <button className="flex gap-2 py-2 px-4 text-white bg-orange rounded-lg">
                Continue <MoveRight />
              </button>
            </Link>
          </div>
        </form>
        <div className="fixed bottom-10 right-10 w-12 h-12 bg-orange flex justify-center items-center rounded-full text-white">
            <Plus />
        </div>
      </div>
  );
}



export default DateLocationCapacity;
