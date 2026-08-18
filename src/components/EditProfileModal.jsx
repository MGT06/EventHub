import { useState } from "react";
import { X } from "lucide-react";

function EditProfileModal({ isClose, initialData, onSave }) {
  const [fullName, setFullName] = useState(initialData?.name ?? "Alex Kim");
  const [location, setLocation] = useState(
    initialData?.location ?? "Bandung, Indonesia",
  );
  const [bio, setBio] = useState(initialData?.bio ?? "");

  function handleSave() {
    onSave?.({ name: fullName, location, bio });
    isClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10 p-0 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-md ">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="font-bold text-lg">Edit Profile</h2>
          <button onClick={isClose} className="cursor-pointer">
            <X className="text-manatee" size={20} />
          </button>
        </div>
        <div className="px-5 py-5 flex flex-col gap-5">
          <img
            src={initialData?.avatar ?? "https://i.pravatar.cc/150?img=13"}
            alt=""
            className="w-16 h-16 rounded-full self-center bg-gray-200"
          />

          <div>
            <label className="text-sm font-medium block mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full py-2.5 px-3 rounded-lg border border-gray-300 outline-none focus:border-orange text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full py-2.5 px-3 rounded-lg border border-gray-300 outline-none focus:border-orange text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
            onClick={handleSave}
            className="py-2 px-4 rounded-lg bg-orange text-white text-sm font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;