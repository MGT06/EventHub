import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function ForgotPassword() {
  const navigate = useNavigate();
  const { dataUser } = useSelector((state) => state.dataUserState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let handleChange = (dataInput) => {
    const dataUserToChange = dataUser.find(
      (data) => data.email === dataInput.email,
    );
    if (!dataUserToChange) return;

    navigate("/auth/change-password", { state: dataUserToChange.email });
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
          <h2 className="text-2xl font-bold">Reset your password</h2>
          <p className="text-sm text-manatee">
            Enter your email and we'll send a link.
          </p>
        </div>
        <form className="grid gap-3" onSubmit={handleSubmit(handleChange)}>
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
  );
}

export default ForgotPassword;
