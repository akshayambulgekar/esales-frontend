import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentDeclined.css";

const PaymentDeclined = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderId = state?.orderId || "N/A";
  const product = state.product;
  const variant = state.variant;
  const quantity = state.quantity;

  return (
    <div className="payment-declined-container">
      <h1 className="payment-declined-title">Payment Declined</h1>
      <p className="payment-declined-message">
        Unfortunately, your payment was declined. Please try again or contact support if the issue persists.
      </p>
      <p className="payment-declined-orderid">Order ID: {orderId}</p>
      <button
        className="payment-declined-button"
        onClick={() =>
          navigate("/checkout", {
            state: { product, variant, quantity },
          })
        }
      >
        Try Again
      </button>
    </div>
  );
};

export default PaymentDeclined;
