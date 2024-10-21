import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import Stripe from "./Stripe";
import { BsFillCreditCard2FrontFill, BsPaypal } from "react-icons/bs";
const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);

function Checkout() {
  const location = useLocation();
  const { booking } = location.state || {};
  return (
    <>
      <div className="card shadow-xl mx-auto my-5">
        <div className="card-body">
          <h2 className="card-title">Hello, {booking.name}</h2>
          <p className="text-lg font-serif font-semibold">
            Thank you for choosing{" "}
            <span className="font-bold text-[#F63E7B]">{booking.service}</span>{" "}
            <br />
            Please confirm your booking. <br /> You have to Pay{" "}
            <span className="font-bold text-[#F63E7B]"> ${booking.total}</span>
          </p>
          <div className="card-actions">
            <p className="text-lg">Please choose your payment method</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="payment"
                name="payment"
                className="radio"
              />
              <label className="label">
                <span className="label-text  flex items-center space-x-2">
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
                defaultValue="Paypal"
              />
              <label className="label">
                <span className="label-text  flex items-center space-x-2">
                  <BsPaypal className="text-3xl text-blue-500" />{" "}
                  <span>Paypal</span>
                </span>
              </label>
            </div>
          </div>
          <Elements stripe={stripePromise}>
            <Stripe booking={booking} />
          </Elements>
        </div>
      </div>
    </>
  );
}

export default Checkout;
