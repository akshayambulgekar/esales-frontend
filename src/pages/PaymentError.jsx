import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentError.css";

const PaymentError = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderId = state?.orderId || "N/A";
  const product = state.product;
  const variant = state.variant;
  const quantity = state.quantity;

  return (
    <div className="payment-error-container">
      <h1 className="payment-error-title">Gateway Error</h1>
      <p className="payment-error-message">
        There was a problem with the payment gateway. Please try again or contact support if the issue persists.
      </p>
      <p className="payment-error-orderid">Order ID: {orderId}</p>
      <button
        className="payment-error-button"
        onClick={() =>
          navigate("/checkout", {
            state: { product, variant, quantity },
          })
        }
      >
        Retry Payment
      </button>
    </div>
  );
};

export default PaymentError;
