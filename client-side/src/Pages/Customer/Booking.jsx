import { useState, useEffect } from "react";
import { useAuth } from "../../Store/AuthStore";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillCreditCard2FrontFill, BsPaypal } from "react-icons/bs";

function Booking() {
  const location = useLocation();
  const service = location.state?.service;
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
    // navigate("/booking-list");
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
            className={`input input-bordered w-full my-2 bg-white text-black ${
              errors.name ? "border-red-500" : ""
            }`} // Red border if error
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            readOnly={!!user}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}

          {/* Email Input */}
          <input
            type="email"
            placeholder="Your Email"
            className={`input input-bordered w-full my-2 bg-white text-black ${
              errors.email ? "border-red-500" : ""
            }`} // Red border if error
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            readOnly={!!user}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          {/* Phone Input */}
          <input
            type="number"
            placeholder="Your Phone"
            className={`input input-bordered w-full my-2 bg-white text-black ${
              errors.phone ? "border-red-500" : ""
            }`} // Red border if error
            {...register("phone", {
              required: {
                value: true,
                message: "Phone is required",
              },
            })}
            readOnly={!!user}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}

          {/* Service Input */}
          <input
            type="text"
            readOnly
            placeholder="Service"
            className="input input-bordered w-full my-2 bg-white text-black"
            value={service || "No service selected"} // Dynamically set service
          />
        </div>

        {/* Payment */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="payment"
              name="payment"
              className="radio"
              defaultChecked
            />
            <label className="label">
              <span className="label-text flex items-center space-x-2">
                <BsFillCreditCard2FrontFill className="text-3xl text-blue-500" />{" "}
                <span>Credit Card</span>
              </span>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="payment"
              name="payment"
              className="radio"
              value="Paypal"
              disabled
            />
            <label className="label">
              <span className="label-text flex items-center space-x-2">
                <BsPaypal className="text-3xl text-blue-500" />{" "}
                <span>Paypal</span>
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex space-x-2 mt-4 justify-between items-center">
          <p>
            Your service charge will be{" "}
            <span className="font-bold"> $0.00</span>
          </p>

          <button
            type="submit"
            className="btn bg-[#F63E7B] px-8 py-2 text-white"
          >
            Pay
          </button>
        </div>
      </form>
    </>
  );
}

export default Booking;
