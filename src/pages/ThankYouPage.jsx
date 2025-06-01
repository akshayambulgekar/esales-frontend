import React from "react";
import { useLocation } from "react-router-dom";
import './ThankYouPage.css';

const ThankYouPage = () => {
  const { state } = useLocation();
  const { orderId, product, variant, quantity, customer, status } = state;

  return (
    <div className="thank-you-page">
      <div className="thank-you-box">
        <h1>Thank You for Your Order!</h1>
        <p className="order-id"><strong>Order ID:</strong> {orderId}</p>

        <div className="section">
          <h2>Product Details</h2>
          <p><strong>Product:</strong> {product.title}</p>
          <p><strong>Variant:</strong> {variant}</p>
          <p><strong>Quantity:</strong> {quantity}</p>
        </div>

        <div className="section">
          <h2>Customer Information</h2>
          <p><strong>Name:</strong> {customer.fullName}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Address:</strong> {customer.address}, {customer.city}, {customer.state} - {customer.zip}</p>
        </div>

        {/* <div className="section">
          <h2>Payment Info</h2>
          <p><strong>Card Holder:</strong> {customer.Nameoncard}</p>
          <p><strong>Card Number:</strong> **** **** **** {customer.cardNumber.slice(-4)}</p>
          <p><strong>Expiry:</strong> {customer.expiry}</p>
          <p><strong>Payment Status:</strong> {customer.paymentFlow}</p>
        </div> */}

        <p className="order-status"><strong>Order Status:</strong> {status}</p>
      </div>
    </div>
  );
};

export default ThankYouPage;
