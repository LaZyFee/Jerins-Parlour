/* eslint-disable react/prop-types */

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-hot-toast";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeButton = ({ totalPrice, orderItems, userId }) => {
  const handleStripePayment = async () => {
    try {
      const { data: sessionData } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/payment/stripe`,
        {
          orderItems,
          totalPrice,
          userId,
        }
      );

      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionData.sessionId,
      });

      if (error) {
        toast.error("Error redirecting to Stripe checkout");
        console.error(error);
      }
    } catch (error) {
      toast.error("Failed to initiate Stripe payment");
      console.error("Error creating Stripe session:", error);
    }
  };

  return (
    <button onClick={handleStripePayment} className="btn btn-primary">
      Pay with Stripe
    </button>
  );
};

export default StripeButton;
