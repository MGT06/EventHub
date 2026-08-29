import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Register() {
  const [openEye, setOpenEye] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.dataUserState);
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataInput) => {
    try {
      await toast.promise(signUp(dataInput), {
        pending: "Proses register",
        success: "Register success",
        error: "Register fail"
      }, {
        autoClose: 2000,
      });
      
      navigate("/auth/login");
    } catch (e) {
      return e;
    }
  };

  return (
    <article className="h-screen px-4 py-11 lg:grow">
      <div className="flex flex-col gap-5 justify-center h-full lg:mx-60">
        <div className="lg:hidden">
          <span className="bg-orange rounded-xl px-4 py-2 mr-2 text-sm text-white font-bold">
            E
          </span>
          <h1 className="inline-block font-bold">Event Hub</h1>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="text-sm text-manatee">
            Already have an account?
            <Link
              to={"/auth/login"}
              className="text-orange text-sm font-medium"
            >
              {" "}
              Sign in
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="rounded-lg px-4 py-3 border-[#e4e4e7] shadow text-sm font-medium"
          >
            Google
          </button>
          <button
            type="button"
            className="rounded-lg px-4 py-3 border-[#e4e4e7] shadow text-sm font-medium"
          >
            Github
          </button>
        </div>
        <div className="flex">
          <div className="self-center grow">
            <div className="border w-auto border-gray-200"></div>
          </div>
          <p className="mx-2 text-cente text-manatee text-xs">
            or continue with email
          </p>
          <div className="self-center grow">
            <div className="border w-auto border-gray-200"></div>
          </div>
        </div>
        <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="font-medium text-sm block mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              id="name"
              placeholder="Alex Kim"
              className="border border-manatee py-2 px-1 rounded-lg w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="font-medium text-sm block mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              id="email"
              placeholder="alex@example.com"
              className="border border-manatee py-2 px-1 rounded-lg w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
            {error?.typeError === "email" && (
              <p className="text-red-500 text-xs">{error.message}</p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="font-medium text-sm block mb-1"
            >
              Password
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
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="confirm" className="font-medium text-sm block mb-1">
              Confirm Password
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
          <div>
            <input
              id="terms"
              type="checkbox"
              {...register("terms", {
                required: "The terms must be accepted.",
              })}
              className="align-middle"
            />
            <label
              htmlFor="terms"
              className="text-manatee text-xs inline-block ml-2"
            >
              I agree to the{" "}
              <span className="text-orange"> Terms of Service</span> and{" "}
              <span className="text-orange">Privacy Policy</span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-xs">{errors.terms.message}</p>
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
    </article>
  );
}

export default Register;
