import { useRef, useState } from "react";
import { X, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../redux/slices/signUpSlices";

function EditProfileModal({ isClose }) {
  const { userActive } = useAuth();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const { dataUser } = useSelector((state) => state.dataUserState);
  const getPhoto = dataUser.find((data) => data.email === userActive.email);

  const { register, handleSubmit } = useForm();
  const fileInputRef = useRef(null);

  function handleSave(dataInput) {
    dispatch(
      editUser({
        email: userActive.email,
        ...dataInput,
        profile: avatar,
      }),
    );
    isClose();
  }
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100 p-0 sm:p-4">
      <div className="bg-white rounded-2xl mt-5 w-full max-w-md ">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="font-bold text-lg">Edit Profile</h2>
          <button onClick={isClose} className="cursor-pointer">
            <X className="text-manatee" size={20} />
          </button>
        </div>
        <form>
          <div className="px-5 py-5 flex flex-col gap-5">
            <div
              className="relative self-center w-20 h-20 bg-orange rounded-2xl cursor-pointer group"
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
                      setAvatar(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
              {avatar || getPhoto.profile ? (
                <img
                  src={avatar || getPhoto.profile}
                  alt="Profile"
                  className="w-20 h-20 rounded-2xl bg-gray-200 object-cover"
                />
              ) : (
                <span className="text-3xl w-full h-full flex items-center justify-center capitalize text-white">
                  {userActive.email.charAt(0)}
                </span>
              )}
              <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition">
                <Camera
                  className="text-white opacity-0 group-hover:opacity-100 transition"
                  size={18}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                {...register("name")}
                defaultValue={userActive.name}
                className="w-full py-2.5 px-3 rounded-lg border border-gray-300 outline-none focus:border-orange text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">
                Location
              </label>
              <input
                type="text"
                defaultValue={userActive?.location}
                {...register("location")}
                className="w-full py-2.5 px-3 rounded-lg border border-gray-300 outline-none focus:border-orange text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">Bio</label>
              <textarea
                {...register("bio")}
                defaultValue={userActive?.bio}
                placeholder="Tell the community a little about yourself..."
                rows={4}
                className="w-full py-2.5 px-3 rounded-lg border border-gray-300 outline-none focus:border-orange text-sm resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 px-5 py-4 border-t border-gray-200">
            <button
              onClick={isClose}
              className="py-2 px-4 rounded-lg bg-gray-100 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(handleSave)}
              className="py-2 px-4 rounded-lg bg-orange text-white text-sm font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
