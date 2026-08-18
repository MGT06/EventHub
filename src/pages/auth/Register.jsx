import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Register() {
  const [error, setError] = useState({
    typeError: "",
    message: "",
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      terms: "",
    },
  });

  const onSubmit = (data) => {
    const dataExist = JSON.parse(localStorage.getItem("dataUser")) || [];
    for (const dataLocal of dataExist) {
      if (dataLocal.email === data.email) {
        setError({
          typeError: "email",
          message: "Email is exist",
        });
        return;
      }
    }

    if (data.password !== data.confirm) {
      setError({
        typeError: "password",
        message: "Password do not match",
      });
      return;
    }

    // eslint-disable-next-line no-unused-vars
    const { confirm, ...newData } = data;
    dataExist.push({ ...newData, access: "attendee" });
    localStorage.setItem("dataUser", `${JSON.stringify(dataExist)}`);
    navigate("/auth/login");

    reset();
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
              <p className="text-red-500">{errors.name.message}</p>
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
              <p className="text-red-500">{errors.email.message}</p>
            )}
            {error.typeError === "email" && (
              <p className="text-red-500">{error.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="font-medium text-sm block mb-1"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Must be 8 char" },
              })}
              id="password"
              placeholder="At least 8 characters"
              className="border border-manatee py-2 px-1 rounded-lg w-full"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirm" className="font-medium text-sm block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirm", {
                required: "Must be confirm",
              })}
              id="confirm"
              placeholder="Re-enter your password"
              className="border border-manatee py-2 px-1 rounded-lg w-full"
            />
            {errors.confirm && (
              <p className="text-red-500">{errors.confirm.message}</p>
            )}
            {error.typeError === "password" && (
              <p className="text-red-500">{error.message}</p>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              {...register("terms", {
                required: "The terms must be accepted.",
              })}
              className="align-middle"
            />
            <p className="text-manatee text-xs inline-block ml-2">
              I agree to the{" "}
              <span className="text-orange"> Terms of Service</span> and{" "}
              <span className="text-orange">Privacy Policy</span>
            </p>
            {errors.terms && (
              <p className="text-red-500">{errors.terms.message}</p>
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
