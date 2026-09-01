import { Laptop, MapPin, MoveRight } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import {
  nextStep,
  prevStep,
  setDateLocation,
} from "../../redux/slices/eventSlices";
import { useEffect } from "react";

function DateLocationCapacity() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dateLocation } = useSelector((state) => state.eventState.createEvent);
  const { register, handleSubmit, control, setValue, reset } = useForm();

  const { dataEvent } = useSelector((state) => state.eventState);
  const dataEdit = dataEvent.find((data) => data.id === Number(id));
  
  useEffect(() => {
    if (id) {
      dispatch(
        setDateLocation({
          eventDate: dataEdit.eventDate,
          startTime: dataEdit.startTime,
          endTime: dataEdit.endTime,
          format: dataEdit.format,
          location: dataEdit.location,
          capacity: dataEdit.capacity
        }),
      );
    }
    if (dataEdit) {
      reset({
        format: dataEdit.format
      });
    }
  }, [dispatch, dataEdit, id, reset]);
  const selectFormat = useWatch({ control, name: "format" });

  const onSubmit = (dataInput) => {
    dispatch(setDateLocation(dataInput));
    dispatch(nextStep());
    navigate("../speaker-review");
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
            {...register("eventDate", { required: true })}
            defaultValue={dateLocation.eventDate}
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
              {...register("startTime", { required: true })}
              defaultValue={dateLocation.startTime}
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
              {...register("endTime", { required: true })}
              defaultValue={dateLocation.endTime}
              id="end"
              className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <label className="font-medium text-sm">Event Format</label>
          <div className="flex gap-2 bg-gray-100 rounded-lg w-max">
            <button
              type="button"
              onClick={() => setValue("format", "in-person")}
              className={`flex items-center gap-1.5 py-2 px-4 my-1 ml-1 rounded-lg text-sm font-medium ${
                selectFormat === "in-person"
                  ? "bg-white text-black"
                  : "text-manatee hover:bg-gray-100"
              }`}
            >
              <MapPin size={16} /> In Person
            </button>
            <button
              type="button"
              onClick={() => setValue("format", "online")}
              className={`flex items-center gap-1.5 py-2 px-4 mr-1 my-2 rounded-lg text-sm font-medium ${
                selectFormat === "online"
                  ? "bg-white text-black"
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
            {...register("location", { required: true })}
            defaultValue={dateLocation.location}
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
            {...register("capacity", { required: true })}
            defaultValue={dateLocation.capacity}
            id="capacity"
            className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
            placeholder="100"
          />
        </div>
        <div className="mt-8 pt-6 border-t border-t-gray-300 flex justify-between">
          <Link to={id ? `/edit-event/${id}` : "create-event" } onClick={() => dispatch(prevStep())}>
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
