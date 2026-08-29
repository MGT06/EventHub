import { X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function ModalLogout({ isClose }) {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div
      className={`fixed inset-0 bg-[#00000030] flex justify-center items-center z-50`}
    >
      <div className="bg-white rounded-2xl lg:w-2/7">
        <div className="p-6 flex justify-between border-b border-b-gray-200">
          <p className="font-semibold">Logout</p>
          <X className="cursor-pointer" onClick={isClose} />
        </div>
        <div className="py-8 px-6 grid justify-center">
          <p className="text-sm text-manatee">
            Are you sure you want to logout from your account?
          </p>
        </div>
        <div className="flex gap-3 justify-end pb-6 px-6">
          <button
            className="py-2 px-4 bg-orange text-white text-sm font-medium rounded-lg"
            onClick={() => {
                handleLogout()
                isClose()
            }}
          >
            Logout
          </button>
          <button
            className="py-2 px-4 bg-gray-200 text-sm font-medium rounded-lg"
            onClick={isClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalLogout;
