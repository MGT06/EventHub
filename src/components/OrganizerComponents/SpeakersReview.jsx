import { Check, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  removeSpeakers,
  resetState,
  setSpeakers,
} from "../../redux/slices/createEventSlices";
import { createEventThunk } from "../../redux/slices/eventSlices";

function SpeakersReview() {
  const dispatch = useDispatch();
  const { register, resetField, getValues } = useForm();
  const { basic, dateLocation, speakers, attendees } = useSelector(
    (state) => state.createEventState,
  );
  const navigate = useNavigate()

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
            {...register("speakers")}
            className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg grow"
            placeholder="Speaker name and title"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(setSpeakers({
                name:getValues("speakers"),
                role: "",
                avatar: ""
              }));
              resetField("speakers");
            }}
            className="py-2 px-4 border border-gray-300 rounded-lg font-medium text-sm"
          >
            Add
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {speakers.length > 0 &&
            speakers.map((ele, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center py-1 px-3 rounded-full bg-gray-200 w-max"
                >
                  <span className="text-sm">{ele.name}</span>
                  <X
                    width={20}
                    className="text-manatee"
                    onClick={() => dispatch(removeSpeakers(ele.name))}
                  />
                </div>
              );
            })}
        </div>
        <div className="rounded-xl border border-gray-300 mt-6 px-4 py-1.5">
          <div className="flex justify-between items-center py-3 border-b border-b-gray-300">
            <p className="font-medium text-manatee text-xs">Event</p>
            <p className="text-sm ">{basic.title}</p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-b-gray-300">
            <p className="font-medium text-manatee text-xs">Category</p>
            <div className="text-sm flex flex-wrap justify-end gap-1.5 max-w-55">
              {basic.category.map((ele, idx) => {
                return (
                  <p
                    key={idx}
                    className="font-medium text-xs pt-0.5 px-2 bg-gray-200 rounded-full"
                  >
                    {ele}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-b-gray-300">
            <p className="font-medium text-manatee text-xs">Date</p>
            <p className="text-sm ">{dateLocation.eventDate}</p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-b-gray-300">
            <p className="font-medium text-manatee text-xs">Time</p>
            <p className="text-sm ">
              {" "}
              {dateLocation.startTime} – {dateLocation.endTime} WIB
            </p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-b-gray-300">
            <p className="font-medium text-manatee text-xs">Format</p>
            <p className="text-sm ">
              {dateLocation.format === "in-location"
                ? dateLocation.location
                : dateLocation.format}
            </p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-b-gray-300">
            <p className="font-medium text-manatee text-xs">Capacity</p>
            <p className="text-sm ">{dateLocation.capacity} attendees</p>
          </div>
          <div className="flex justify-between items-center py-3">
            <p className="font-medium text-manatee text-xs">Speakers</p>
            <p className="text-sm ">{speakers.length} added</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-t-gray-300 flex justify-between">
          <Link to={"/create-event/details"}>
            <button className=" py-2 px-4 text-black rounded-lg">Back</button>
          </Link>
          <button
            type="submit"
            className="flex gap-2 py-2 px-4 text-white bg-green-500 rounded-lg"
            onClick={(e) => {
              e.preventDefault()
              dispatch(createEventThunk({...basic, ...dateLocation,  ...speakers, attendees: attendees }))
              dispatch(resetState())
              navigate("/dashboard-organizer")
            }}
          >
            <Check /> Publish Event
          </button>
        </div>
      </form>
      <div className="fixed bottom-10 right-10 w-12 h-12 bg-orange flex justify-center items-center rounded-full text-white">
        <Plus />
      </div>
    </div>
  );
}

export default SpeakersReview;
