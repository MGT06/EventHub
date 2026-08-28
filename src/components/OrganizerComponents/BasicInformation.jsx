import { MoveRight, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  nextStep,
  removeCategory,
  setBasic,
  setCategory,
} from "../../redux/slices/createEventSlices";

const categories = [
  "Technology",
  "Design",
  "Business",
  "Career",
  "AI",
  "Programming",
  "Music",
];

function BasicInformation() {
  const [preview, setPreview] = useState();

  const { dataCommunity } = useSelector((state) => state.communityState);
  const { basic } = useSelector((state) => state.createEventState);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        console.log(reader);
      };
      reader.readAsDataURL(file)
    },
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const onSubmit = (dataInput) => {
    dispatch(
      setBasic({
        ...dataInput,
        coverImage: preview,
      }),
    );
    dispatch(nextStep());
    navigate("details");
  };

  return (
    <div>
      <div>
        <p className="font-bold text-xl">Basic Information</p>
        <p className="text-sm text-manatee mt-1">
          Tell attendees what your event is about.
        </p>
      </div>
      <form className="grid gap-6 mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="font-medium text-sm">Cover Image</p>
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 mt-3 text-center cursor-pointer ${
              isDragActive
                ? "border-orange-400 bg-orange-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <input {...getInputProps()} />

            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full  rounded-xl"
              />
            ) : (
              <>
                <UploadCloud className="text-gray-400" size={28} />
                <p className="text-sm text-gray-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG up to 10MB · 16:9 recommended
                </p>
              </>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="title" className="font-medium text-sm">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
            placeholder="Go Concurrency Workshop"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="desc" className="font-medium text-sm">
            Description
          </label>
          <textarea
            id="desc"
            {...register("desc", { required: true })}
            rows="5"
            className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
            placeholder="What will attendees learn or experience?"
          ></textarea>
        </div>
        <div className="grid gap-2">
          <label htmlFor="desc" className="font-medium text-sm">
            Category
          </label>
          <select
            name=""
            id="category"
            onChange={(e) => {
              dispatch(setCategory(e.target.value));
            }}
            className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
            defaultValue={"category"}
          >
            <option value="category" disabled className="text-sm w-max">
              Select a category
            </option>
            {categories.map((ele, idx) => {
              return (
                <option key={idx} value={ele} className="text-sm w-max">
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex gap-2 flex-wrap">
          {basic.category.length > 0 &&
            basic.category.map((ele, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center py-1 px-3 rounded-full bg-gray-200 w-max"
                >
                  <span className="text-sm">{ele}</span>
                  <X
                    width={20}
                    className="text-manatee"
                    onClick={() => dispatch(removeCategory(ele))}
                  />
                </div>
              );
            })}
        </div>
        <div className="grid gap-2">
          <label htmlFor="desc" className="font-medium text-sm">
            Community (optional)
          </label>
          <select
            {...register("community")}
            id="desc"
            className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
            defaultValue={"community"}
          >
            <option value="community" disabled className="text-sm w-max">
              No community
            </option>
            {dataCommunity.map((ele) => {
              return (
                <option key={ele.id} value={ele.name} className="text-sm w-max">
                  {ele.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mt-8 pt-6 border-t border-t-gray-300 flex justify-between">
          <Link to={"/dashboard-organizer"}>
            <button className=" py-2 px-4 text-black rounded-lg">Cancel</button>
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

export default BasicInformation;
