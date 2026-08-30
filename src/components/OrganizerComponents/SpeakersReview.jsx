import { Check, Plus, X, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useRef, useState } from "react";
import {
  prevStep,
  removeSpeakers,
  resetState,
  setSpeakers,
} from "../../redux/slices/eventSlices";
import { createEventThunk } from "../../redux/slices/eventSlices";
import { useAuth } from "../../hooks/useAuth";

function SpeakersReview() {
  const dispatch = useDispatch();
  const { register, resetField, getValues } = useForm();
  const { basic, dateLocation, speakers, attendees } = useSelector(
    (state) => state.eventState.createEvent,
  );
  const { userActive } = useAuth();
  const navigate = useNavigate();
  const [speakerAvatar, setSpeakerAvatar] = useState("");
  const fileInputRef = useRef(null);

  const handleAddSpeaker = (e) => {
    e.preventDefault();
    const name = getValues("speakers");
    const role = getValues("role");

    if (!name) return;

    dispatch(
      setSpeakers({
        name,
        role: role || "",
        avatar: speakerAvatar,
      }),
    );

    resetField("speakers");
    resetField("role");
    setSpeakerAvatar("");
  };

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

        <div className="flex gap-2 items-start">
          <div
            className="w-11 h-11 rounded-full bg-gray-200 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setSpeakerAvatar(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
            {speakerAvatar ? (
              <img
                src={speakerAvatar}
                alt="Speaker"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera size={16} className="text-manatee" />
              </div>
            )}
          </div>

          <div className="grid gap-2 grow">
            <input
              type="text"
              id="text"
              {...register("speakers")}
              className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg w-full"
              placeholder="Speaker name"
            />
            <input
              type="text"
              {...register("role")}
              className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg w-full"
              placeholder="Speaker title/role (e.g. CEO, Founder)"
            />
          </div>

          <button
            onClick={handleAddSpeaker}
            className="py-2 px-4 border border-gray-300 rounded-lg font-medium text-sm shrink-0"
          >
            Add
          </button>
        </div>

        <div className="flex gap-2 flex-wrap mt-2">
          {speakers.length > 0 &&
            speakers.map((ele, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 py-1 px-3 rounded-full bg-gray-200 w-max"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden shrink-0">
                    {ele.avatar && (
                      <img
                        src={ele.avatar}
                        alt={ele.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="leading-tight">
                    <span className="text-sm block">{ele.name}</span>
                    {ele.role && (
                      <span className="text-xs text-manatee block">
                        {ele.role}
                      </span>
                    )}
                  </div>
                  <X
                    width={20}
                    className="text-manatee cursor-pointer"
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
          <Link
            to={"/create-event/details"}
            onClick={() => dispatch(prevStep())}
          >
            <button className=" py-2 px-4 text-black rounded-lg">Back</button>
          </Link>
          <button
            type="submit"
            className="flex gap-2 py-2 px-4 text-white bg-green-500 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              const {community, ...newBasic} = basic
              dispatch(
                createEventThunk({
                  ...newBasic,
                  ...dateLocation,
                  speakers: speakers,
                  attendees: attendees,
                  organizer: {
                    avatar: "",
                    name: userActive.name,
                    community
                  },
                  userSaved: [],
                  status: "open"
                }),
              );
              dispatch(resetState());
              navigate("/dashboard-organizer");
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
