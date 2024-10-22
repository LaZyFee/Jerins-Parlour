// PayPalButton.jsx
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-hot-toast";
import axios from "axios";

const PayPalButton = ({ totalPrice, orderItems, userId }) => {
  const handleApprove = async (data, actions) => {
    try {
      const { data: paymentData } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/payment/paypal`,
        {
          totalPrice,
          orderItems,
          userId,
        }
      );
      window.location.href = paymentData.redirectUrl;
    } catch (error) {
      console.error("Error initiating PayPal payment:", error);
      toast.error("Failed to initiate PayPal payment");
    }
  };

  return (
    <PayPalButtons
      createOrder={handleApprove}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          toast.success(
            `Transaction completed by ${details.payer.name.given_name}`
          );
        });
      }}
      onError={(err) => {
        toast.error("PayPal payment failed");
      }}
    />
  );
};

export default PayPalButton;
