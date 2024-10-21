/* eslint-disable no-unused-vars */

import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
function Stripe(booking) {
  const bookingInfo = booking;
  //   console.log(bookingInfo);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`,
          {
            amount: bookingInfo.total * 100,
            customer: bookingInfo.email,
          }
        );
        setClientSecret(res.data.clientSecret);
        setSubmitDisabled(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to create payment intent");
      }
    };

    createPaymentIntent();
  }, [bookingInfo.total, bookingInfo.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || submitDisabled) {
      return;
    }

    setSubmitDisabled(true);
    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setSubmitDisabled(false);
      setProcessing(false);
      return;
    }

    setCardError("");
    try {
      const { paymentIntent, error: intentError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: bookingInfo.name,
              email: bookingInfo.email,
            },
          },
        });

      if (intentError) {
        setCardError(intentError.message);
        setSubmitDisabled(false);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const payment = {
          transactionId: paymentIntent.id,
          amount: paymentIntent.amount,
          customer: bookingInfo.email,
          bookingId: bookingInfo._id,
        };

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/payments`,
          payment
        );
        setProcessing(false);
        setSuccess(true);
        setTransactionId(paymentIntent.id);
        toast.success("Payment successful!");
        navigate("/payment-success", {
          state: { transactionId: paymentIntent.id },
        });
      }
    } catch (error) {
      console.error("Error confirming card payment: ", error);
      setCardError("Payment confirmation failed");
      setSubmitDisabled(false);
      setProcessing(false);
    }
  };
  return (
    <div className="text-white">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "18px",
                color: "white",
                "::placeholder": { color: "white" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
        <button
          className="btn btn-primary mt-4 py-5 text-white my-5"
          type="submit"
          disabled={!stripe || !clientSecret || processing || submitDisabled}
        >
          {processing ? "Processing..." : "Pay"}
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
    </div>
  );
}

export default Stripe;
