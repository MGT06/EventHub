import { MoveRight, UploadCloud } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router";

function BasicInformation() {
  const [preview, setPreview] = useState();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setPreview(URL.createObjectURL(file));
    },
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  return (
      <div>
        <div>
          <p className="font-bold text-xl">Basic Information</p>
          <p className="text-sm text-manatee mt-1">
            Tell attendees what your event is about.
          </p>
        </div>
        <form className="grid gap-6 mt-6">
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
                  className="h-32 w-32 object-cover rounded-xl"
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
              className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
              placeholder="Go Concurrency Workshop"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="desc" className="font-medium text-sm">
              Description
            </label>
            <textarea
              name=""
              id="desc"
              rows="5"
              className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
              placeholder="What will attendees learn or experience?"
            ></textarea>
          </div>
          <div className="grid gap-2">
            <label htmlFor="desc" className="font-medium text-sm">
              Description
            </label>
            <select
              name=""
              id="desc"
              className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
            >
              <option value="" disabled selected className="text-sm w-max">
                Select a category
              </option>
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="desc" className="font-medium text-sm">
              Community (optional)
            </label>
            <select
              name=""
              id="desc"
              className="px-3 py-2.5 border outline-none border-gray-300 rounded-lg"
            >
              <option value="" disabled selected className="text-sm w-max">
                No community
              </option>
            </select>
          </div>
          <div className="mt-8 pt-6 border-t border-t-gray-300 flex justify-between">
            <button className=" py-2 px-4 text-black rounded-lg">Cancel</button>
            <Link to={"details"}>
              <button className="flex gap-2 py-2 px-4 text-white bg-orange rounded-lg">
                Continue <MoveRight />
              </button>
            </Link>
          </div>
        </form>
      </div>
  );
}

export default BasicInformation;
