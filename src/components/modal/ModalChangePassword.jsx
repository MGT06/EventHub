import { X, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { changePasswordThunk } from "../../redux/slices/signUpSlices";

function ChangePasswordModal({ isClose }) {
  const { userActive } = useAuth();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const changePassword = (dataInput) => {
    return dispatch(
      changePasswordThunk({
        ...dataInput,
        email: userActive.email,
      }),
    ).unwrap();
  };

  const onSubmit = async (dataInput) => {
    try {
      await toast.promise(
        changePassword(dataInput),
        {
          pending: "Proses change password",
          success: "Change password success",
          error: "Change password fail"
        },
        {
          autoClose: 2000,
        },
      );
      isClose();
    } catch (e) {
      return e;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100 p-0 sm:p-4">
      <div className="bg-white rounded-2xl mt-5 w-full max-w-md">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Lock size={18} className="text-manatee" />
            Change Password
          </h2>
          <button onClick={isClose} className="cursor-pointer">
            <X className="text-manatee" size={20} />
          </button>
        </div>

        <form>
          <div className="px-5 py-5 flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">
                New Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter new password"
                className="w-full py-2.5 px-3 rounded-lg border border-gray-300 outline-none focus:border-orange text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirm")}
                placeholder="Confirm new password"
                className="w-full py-2.5 px-3 rounded-lg border border-gray-300 outline-none focus:border-orange text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 px-5 py-4 border-t border-gray-200">
            <button
              type="button"
              onClick={isClose}
              className="py-2 px-4 rounded-lg bg-gray-100 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="py-2 px-4 rounded-lg bg-orange text-white text-sm font-medium"
            >
              Save Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;