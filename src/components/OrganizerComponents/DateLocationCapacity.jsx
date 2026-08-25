import { Laptop, MapPin, MoveRight } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  nextStep,
  setDateLocation,
} from "../../redux/slices/createEventSlices";

function DateLocationCapacity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      format: "in-person",
    },
  });

  const selectFormat = useWatch({ control, name: "format" });

  const onSubmit = (dataInput) => {
    dispatch(setDateLocation(dataInput));
    dispatch(nextStep());
    navigate("/create-event/speaker-review");
  };
  return (
    <div>
      <div>
        <p className="font-bold text-xl">Date, Location & Capacity</p>
        <p className="text-sm text-manatee mt-1">
          When and where is your event?
        </p>
      </div>
      <form className="grid gap-6 mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <label htmlFor="date" className="font-medium text-sm">
            Event Date
          </label>
          <input
            type="date"
            id="date"
            {...register("eventDate")}
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
              {...register("startTime")}
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
              {...register("endTime")}
              id="end"
              className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <label className="font-medium text-sm">Event Format</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setValue("format", "in-person")}
              className={`flex items-center gap-1.5 py-2 px-4 rounded-lg text-sm font-medium ${
                selectFormat === "in-person"
                  ? "bg-orange text-white"
                  : "text-manatee hover:bg-gray-100"
              }`}
            >
              <MapPin size={16} /> In Person
            </button>
            <button
              type="button"
              onClick={() => setValue("format", "online")}
              className={`flex items-center gap-1.5 py-2 px-4 rounded-lg text-sm font-medium ${
                selectFormat === "online"
                  ? "bg-orange text-white"
                  : "text-manatee hover:bg-gray-100"
              }`}
            >
              <Laptop size={16} /> Online
            </button>
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="location" className="font-medium text-sm">
            Location
          </label>
          <input
            type="text"
            {...register("location")}
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
            type="number"
            {...register("capacity")}
            id="capacity"
            className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
            placeholder="100"
          />
        </div>
        <div className="mt-8 pt-6 border-t border-t-gray-300 flex justify-between">
          <Link to={"/create-event"}>
            <button className=" py-2 px-4 text-black rounded-lg">Back</button>
          </Link>
          <button
            type="submit"
            className="flex gap-2 py-2 px-4 text-white bg-orange rounded-lg"
          >
            Continue <MoveRight />
          </button>
        </div>
      </form>
    </div>
  );
}

export default DateLocationCapacity;
