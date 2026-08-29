import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Eye, EyeClosed } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Login() {
  const [openEye, setOpenEye] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.loggedUserState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (dataInput) => {
    try {
      await toast.promise(login(dataInput), {
        pending: "Proses login",
        success: "Login success",
        error: "Login fail"
      }, {
        autoClose: 2000,
        position: "bottom-right"
      })
      navigate("/")
    } catch (e) {
      reset({ password: "" });
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
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm text-manatee">
            Don`t have an account?{" "}
            <Link
              to={"/auth/register"}
              className="text-orange text-sm font-medium"
            >
              Sign up
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
          <label htmlFor="email" className="font-medium text-sm">
            Email
          </label>
          <div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              id="email"
              placeholder="alex@example.com"
              className="border w-full border-manatee py-2 px-1 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="font-medium text-sm">
              Password
            </label>
            <p className="text-orange text-xs">
              <Link to={"/auth/forgot"}>Forgot paswword?</Link>
            </p>
          </div>
          <div className="relative">
            <input
              type={openEye ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
              })}
              id="password"
              placeholder="••••••••"
              className="border w-full border-manatee py-2 px-1 rounded-lg"
            />
            {openEye ? (
              <Eye
                className="absolute top-2.5 right-5"
                onClick={() => setOpenEye(false)}
              />
            ) : (
              <EyeClosed
                className="absolute top-2.5 right-5"
                onClick={() => setOpenEye(true)}
              />
            )}
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
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

export default Login;
