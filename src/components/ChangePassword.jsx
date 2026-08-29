import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";
import { Check } from "lucide-react";

function ChangePassword() {
  const [openEye, setOpenEye] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const { error } = useSelector((state) => state.dataUserState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { changePassword } = useAuth();
  const onSubmit = async (dataInput) => {
    try {
      await toast.promise(
        changePassword({
          ...dataInput,
          email: location.state,
        }),
        {
          pending: "Proses change password",
          success: "Change password success",
          error: "Change password fail",
        },
        {
          autoClose: 2000,
        },
      );
      setIsSuccess(true);
    } catch (e) {
      return e;
    }
  };

  return (
    <article className="h-screen px-4 py-11 lg:grow">
      {!isSuccess ? (
        <div className="flex flex-col gap-5 justify-center h-full lg:mx-60">
          <div className="lg:hidden">
            <span className="bg-orange rounded-xl px-4 py-2 mr-2 text-sm text-white font-bold">
              E
            </span>
            <h1 className="inline-block font-bold">Event Hub</h1>
          </div>
          <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <label
                htmlFor="password"
                className="font-medium text-sm block mb-1"
              >
                New Password
              </label>
              <input
                type={openEye ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Must be 8 char" },
                })}
                id="password"
                placeholder="At least 8 characters"
                className="border border-manatee py-2 px-1 rounded-lg w-full"
              />
              {openEye ? (
                <Eye
                  className="absolute top-1/2 right-5"
                  onClick={() => setOpenEye(false)}
                />
              ) : (
                <EyeClosed
                  className="absolute top-1/2 right-5"
                  onClick={() => setOpenEye(true)}
                />
              )}
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="confirm"
                className="font-medium text-sm block mb-1"
              >
                Confirm New Password
              </label>
              <input
                type={openConfirm ? "text" : "password"}
                {...register("confirm", {
                  required: "Must be confirm",
                })}
                id="confirm"
                placeholder="Re-enter your password"
                className="border border-manatee py-2 px-1 rounded-lg w-full"
              />
              {openConfirm ? (
                <Eye
                  className="absolute top-1/2 right-5"
                  onClick={() => setOpenConfirm(false)}
                />
              ) : (
                <EyeClosed
                  className="absolute top-1/2 right-5"
                  onClick={() => setOpenConfirm(true)}
                />
              )}
              {errors.confirm && (
                <p className="text-red-500 text-xs">{errors.confirm.message}</p>
              )}
              {error?.typeError === "password" && (
                <p className="text-red-500 text-xs">{error.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-orange py-2 rounded-lg text-white text-sm font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center gap-4 grow">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-7 h-7 text-green-600" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold">Check your email</h2>
          <p className="text-sm text-manatee">
            We sent a reset link to{" "}
            <span className="font-semibold text-black">{location.state}</span>
          </p>
          <Link
            to="/auth/login"
            className="text-orange text-sm font-medium mt-2"
          >
            Back to sign in
          </Link>
        </div>
      )}
    </article>
  );
}

export default ChangePassword;
