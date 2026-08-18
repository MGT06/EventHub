import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Check } from "lucide-react";

function ForgotPassword() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();

  let handleSuccess = () => {
    setSuccess("true"); 
  };
  return !success ? (
    <article className="h-screen px-4 py-11 lg:grow">
      <div className="flex flex-col gap-5 justify-center h-full lg:mx-60">
        <div className="lg:hidden">
          <span className="bg-orange rounded-xl px-4 py-2 mr-2 text-sm text-white font-bold">
            E
          </span>
          <h1 className="inline-block font-bold">Event Hub</h1>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Reset your password</h2>
          <p className="text-sm text-manatee">
            Enter your email and we'll send a link.
          </p>
        </div>
        <form className="grid gap-3" onSubmit={handleSubmit(handleSuccess)}>
          <label htmlFor="email" className="font-medium text-sm">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            id="email"
            placeholder="alex@example.com"
            className="border border-manatee py-2 px-1 rounded-lg"
          />

          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <button
            type="submit"
            className="bg-orange py-2 rounded-lg text-white text-sm font-semibold"
          >
            Send reset link
          </button>
        </form>
      </div>
    </article>
  ) : (
    <div className="flex flex-col items-center justify-center text-center gap-4 grow">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <Check className="w-7 h-7 text-green-600" strokeWidth={3} />
      </div>

      <h2 className="text-2xl font-bold">Check your email</h2>

      <p className="text-sm text-manatee">
        We sent a reset link to <span className="font-semibold text-black">{getValues("email")}</span>
      </p>

      <Link to="/auth/login" className="text-orange text-sm font-medium mt-2">
        Back to sign in
      </Link>
    </div>
  );
}

export default ForgotPassword;
