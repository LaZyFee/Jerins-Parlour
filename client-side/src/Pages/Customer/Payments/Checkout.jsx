import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import Stripe from "./Stripe";
import { BsFillCreditCard2FrontFill, BsPaypal } from "react-icons/bs";
import PayPalButton from "../../../Components/PaypalButton";
import StripeButton from "../../../Components/StripeButton";
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // Import PayPalScriptProvider
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);

function Checkout() {
  const location = useLocation();
  const { booking } = location.state || {};

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const { total, service, name } = booking || {};
  const totalPrice = total;
  const orderItems = booking?.items || [];
  const userId = booking?.userId || "";

  return (
    <>
      <div className="card shadow-xl mx-auto my-5">
        <div className="card-body">
          <h2 className="card-title">Hello, {name}</h2>
          <p className="text-lg font-serif font-semibold">
            Thank you for choosing{" "}
            <span className="font-bold text-[#F63E7B]">{service}</span> <br />
            Please confirm your booking. <br /> You have to pay{" "}
            <span className="font-bold text-[#F63E7B]"> ${totalPrice}</span>
          </p>
          <div className="card-actions">
            <p className="text-lg">Please choose your payment method</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="creditCard"
                name="payment"
                className="radio"
                value="creditCard"
                checked={selectedPaymentMethod === "creditCard"}
                onChange={handlePaymentMethodChange}
              />
              <label className="label" htmlFor="creditCard">
                <span className="label-text flex items-center space-x-2">
                  <BsFillCreditCard2FrontFill className="text-3xl text-blue-500" />{" "}
                  <span>Credit Card</span>
                </span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="paypal"
                name="payment"
                className="radio"
                value="paypal"
                checked={selectedPaymentMethod === "paypal"}
                onChange={handlePaymentMethodChange}
              />
              <label className="label" htmlFor="paypal">
                <span className="label-text flex items-center space-x-2">
                  <BsPaypal className="text-3xl text-blue-500" />{" "}
                  <span>Paypal</span>
                </span>
              </label>
            </div>
          </div>

          {selectedPaymentMethod === "creditCard" && (
            <Elements stripe={stripePromise}>
              <Stripe booking={booking} />
              <StripeButton
                totalPrice={totalPrice}
                orderItems={orderItems}
                userId={userId}
              />
            </Elements>
          )}

          {selectedPaymentMethod === "paypal" && (
            <PayPalScriptProvider
              options={{
                "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                components: "buttons",
              }}
            >
              <PayPalButton
                totalPrice={totalPrice}
                orderItems={orderItems}
                userId={userId}
              />
            </PayPalScriptProvider>
          )}
        </div>
      </div>
    </>
  );
}

export default Checkout;
