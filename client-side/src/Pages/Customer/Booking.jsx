{
  /* eslint-disable no-unused-vars */
}
import { useAuth } from "../../Store/AuthStore";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillCreditCard2FrontFill, BsPaypal } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
function Booking() {
  const location = useLocation();
  const { service } = location.state || {};

  const { handleSubmit } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const bookingData = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        service: service.name,
        total: service.price,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/addBooking`,
        bookingData
      );
      console.log("Booking response:", response.data);

      navigate("booking-list");
    } catch (error) {
      error.response && toast.error(error.response.data.message);
      console.error("Error while booking:", error.message);
    }
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
          <input
            placeholder={user?.name}
            className={`input input-bordered w-full my-2 bg-white text-black`}
            readOnly
          />

          {/* Email Input */}
          <input
            placeholder={user?.email}
            className={`input input-bordered w-full my-2 bg-white text-black`}
            readOnly
          />

          {/* Phone Input */}
          <input
            placeholder={user?.phone}
            className={`input input-bordered w-full my-2 bg-white text-black`}
            readOnly
          />
          {/* Service Input */}
          <input
            type="text"
            readOnly
            placeholder="Service"
            className="input input-bordered w-full my-2 bg-white text-black"
            value={service?.name || "Please Visit Avaialble Service page "}
          />
        </div>

        {/* Submit Button */}
        <div className="flex space-x-2 mt-4 justify-between items-center">
          <p>
            Your service charge will be{" "}
            <span className="font-bold">${service?.price}</span>
          </p>

          <button
            type="submit"
            className="btn bg-[#F63E7B] px-8 py-2 text-white"
          >
            Book
          </button>
        </div>
      </form>
    </>
  );
}

export default Booking;

//  {/* Payment */}
//  <div className="flex items-center space-x-4">
//  <div className="flex items-center space-x-2">
//    <input
//      type="radio"
//      id="payment"
//      name="payment"
//      className="radio"
//      defaultChecked
//    />
//    <label className="label">
//      <span className="label-text flex items-center space-x-2">
//        <BsFillCreditCard2FrontFill className="text-3xl text-blue-500" />{" "}
//        <span>Credit Card</span>
//      </span>
//    </label>
//  </div>

//  <div className="flex items-center space-x-2">
//    <input
//      type="radio"
//      id="payment"
//      name="payment"
//      className="radio"
//      value="Paypal"
//      disabled
//    />
//    <label className="label">
//      <span className="label-text flex items-center space-x-2">
//        <BsPaypal className="text-3xl text-blue-500" />{" "}
//        <span>Paypal</span>
//      </span>
//    </label>
//  </div>
// </div>
