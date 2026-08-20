import { Check, Plus, X } from "lucide-react";
import { Link } from "react-router";

function SpeakersReview() {
  return (
    <div>
      <div>
        <p className="font-bold text-xl">Speakers & Review</p>
        <p className="text-sm text-manatee mt-1">
          Add speakers and confirm your event details.
        </p>
      </div>
      <form className="grid gap-2 mt-6">
        <label htmlFor="speakers" className="font-medium text-sm">
          Speakers (optional)
        </label>
        <div className="flex gap-2">
          <input
            type="speakers"
            id="text"
            className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg grow"
            placeholder="Speaker name and title"
          />
          <button className="py-2 px-4 border border-gray-300 rounded-lg font-medium text-sm">
            Add
          </button>
        </div>
        <div className="flex items-center py-1 px-3 rounded-full bg-gray-200 w-max">
          <span className="text-sm">Alwi</span>
          <X width={20} className="text-manatee" />
        </div>
      </form>
      <div className="grid gap-2 rounded-xl border border-gray-300 mt-6 px-4 py-1.5">
        <div className="flex justify-between items-center py-3 border-b border-b-gray-300">
          <p className="font-medium text-manatee text-xs">Title</p>
          <p className="text-sm ">My Event</p>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-b-gray-300">
          <p className="font-medium text-manatee text-xs">Category</p>
          <p className="font-medium text-xs pt-0.5 px-2 bg-gray-200 rounded-full">
            Technology
          </p>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-b-gray-300">
          <p className="font-medium text-manatee text-xs">Date</p>
          <p className="text-sm ">2026-08-27</p>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-b-gray-300">
          <p className="font-medium text-manatee text-xs">Time</p>
          <p className="text-sm ">11:11 – 12:12 WIB</p>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-b-gray-300">
          <p className="font-medium text-manatee text-xs">Location</p>
          <p className="text-sm ">Legenda Wisata</p>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-b-gray-300">
          <p className="font-medium text-manatee text-xs">Capacity</p>
          <p className="text-sm ">400 attendees</p>
        </div>
        <div className="flex justify-between items-center py-3">
          <p className="font-medium text-manatee text-xs">Speakers</p>
          <p className="text-sm ">1 added</p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-t-gray-300 flex justify-between">
        <button className=" py-2 px-4 text-black rounded-lg">Cancel</button>
        <Link to={"/create-event/speaker-review"}>
          <button className="flex gap-2 py-2 px-4 text-white bg-green-500 rounded-lg">
            <Check /> Publish Event
          </button>
        </Link>
      </div>
      <div className="fixed bottom-10 right-10 w-12 h-12 bg-orange flex justify-center items-center rounded-full text-white">
        <Plus />
      </div>
    </div>
  );
}

export default SpeakersReview;
