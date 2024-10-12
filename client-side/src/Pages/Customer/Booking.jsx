import { useState, useEffect } from "react";
import { useAuth } from "../../Store/AuthStore";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

function Booking() {
  const location = useLocation();
  const service = location.state?.service; // Get service from location.state
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const [booking, setBooking] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    setBooking(data);
    console.log("Booking data:", data);
    // navigate("/booking-list"); // Uncomment to navigate after submission
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-5">
        Confirm Your Booking
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-screen lg:w-1/2 mx-auto"
      >
        <div className="form-control w-full">
          {/* Name Input */}
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full bg-white text-black"
            {...register("name", {
              required: {
                value: true,
                message: "Name is Required",
              },
            })}
            readOnly={!!user} // Make readonly if user is logged in
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>

          {/* Email Input */}
          <input
            type="text"
            placeholder="Your Email"
            className="input input-bordered w-full bg-white text-black"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            readOnly={!!user} // Make readonly if user is logged in
          />
          <label className="label">
            {errors.email?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
          </label>

          {/* Phone Input */}
          <input
            type="number"
            placeholder="Your Phone"
            className="input input-bordered w-full bg-white text-black"
            {...register("phone", {
              required: {
                value: true,
                message: "Phone is Required",
              },
            })}
            readOnly={!!user} // Make readonly if user is logged in
          />
          <label className="label">
            {errors.phone?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.phone.message}
              </span>
            )}
          </label>

          {/* Service Input */}
          <input
            type="text"
            readOnly
            placeholder="Service"
            className="input input-bordered w-full bg-white text-black"
            value={service || "No service selected"} // Dynamically set service
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Submit Booking
        </button>
      </form>
    </>
  );
}

export default Booking;
