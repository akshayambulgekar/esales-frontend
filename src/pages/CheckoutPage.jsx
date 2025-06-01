import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import "./CheckoutPage.css";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^\d{10}$/, "Invalid phone number").required("Phone is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("ZIP is required"),
  cardNumber: yup.string().matches(/^\d{16}$/, "Invalid card number").required(),
  // expiry: yup.string().required("Expiry date is required"),
  expiry: yup
    .string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
    .test("not-in-past", "Expiry date cannot be in the past", function (value) {
      if (!value) return false;
      const [month, year] = value.split("/").map(Number);
      if (!month || !year) return false;

      const inputDate = new Date(2000 + year, month - 1); // 2000 + year = full year
      const currentDate = new Date();
      // Set to end of current month
      currentDate.setDate(1);
      currentDate.setHours(0, 0, 0, 0);

      return inputDate >= currentDate;
    }),
  cvv: yup.string().matches(/^\d{3}$/, "Invalid CVV").required(),
  Nameoncard: yup.string().required("Full name is required"),
  paymentFlow: yup.string().required("select payment flow ")
});

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const option = ["Approved", "Declined", "Gateway Failure"]


const onSubmit = async (data) => {
  const orderId = uuidv4();
  const payload = {
    orderId,
    product: state.product,
    variant: state.variant,
    quantity: state.quantity,
    customer: data
  };

  let paymentResult = "error";

  // 1. Handle payment simulation
  try {
    paymentResult = await simulatePayment(data?.paymentFlow);
  } catch (error) {
    console.error("❌ simulatePayment failed:", error);
    paymentResult = "error";
  }

  // 2. Save order to DB (non-blocking)
  (async () => {
    try {
      await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phonenumber: data.phone,
          street: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          status: paymentResult,
          orderno: orderId,
          productname: state.product.title,
          variant: state.variant,
          quantity: state.quantity,
          ordervalue: (state.quantity * state.product.price * 1.18).toFixed(2)
        })
      });
    } catch (error) {
      console.error("❌ Error saving user data:", error);
    }
  })();

  // 3. Send email (non-blocking)
  (async () => {
    try {
      await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          subject: `Order ${orderId} - ${paymentResult.toUpperCase()}`,
          status: paymentResult,
          order: {
            orderId,
            product: state.product.title,
            variant: state.variant,
            quantity: state.quantity,
            total: (state.quantity * state.product.price * 1.18).toFixed(2)
          },
          failureReason: paymentResult === "success" ? null : "Transaction failed"
        })
      });
    } catch (error) {
      console.error("❌ Error sending email:", error);
    }
  })();

  // ✅ 4. Always navigate based on payment result
  if (paymentResult === "success") {
    navigate("/thank-you", { state: { ...payload, status: "success" } });
  } else if (paymentResult === "declined") {
    navigate("/payment-declined", { state: { ...payload, status: "declined" } });
  } else {
    navigate("/payment-error", { state: { ...payload, status: "error" } });
  }
};



  const simulatePayment = async (payload) => {
 


    if (payload == "Approved") {
      return "success"; // Simulate successful payment
    } else if (payload == "Declined") {
      return "declined"; // Simulate declined payment
    } else {
      throw new Error("Payment gateway error"); // Simulate gateway error
    }
  };


  const total = state.quantity * state.product.price;
  const tax = total * 0.18;

  return (
    <div className="checkout-wrapper">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-two-column">
        {/* LEFT SIDE - FORM */}
        {/* <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
          <h4>Shipping & Payment</h4>
          {["fullName", "email", "phone", "address", "city", "state", "zip", "cardNumber", "expiry", "cvv"].map(field => (
            <div className="form-group" key={field}>
              <input placeholder={field} {...register(field)} />
              {errors[field] && <p className="error">{errors[field].message}</p>}
            </div>
          ))}
          <button type="submit" className="submit-btn">Place Order</button>
        </form> */}

        <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Shipping Details */}
          <h4>Shipping Details</h4>
          <div className="form-group">
            <input placeholder="Full Name" {...register("fullName")} />
            <p className="error">{errors.fullName?.message}</p>
          </div>
          <div className="form-group">
            <input placeholder="Email Address" {...register("email")} />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <input placeholder="Phone Number" {...register("phone")} />
            <p className="error">{errors.phone?.message}</p>
          </div>
          <div className="form-group">
            <input placeholder="Street Address" {...register("address")} />
            <p className="error">{errors.address?.message}</p>
          </div>
          <div className="form-group">
            <input placeholder="City" {...register("city")} />
            <p className="error">{errors.city?.message}</p>
          </div>
          <div className="form-group">
            <input placeholder="State" {...register("state")} />
            <p className="error">{errors.state?.message}</p>
          </div>
          <div className="form-group">
            <input placeholder="ZIP Code" {...register("zip")} />
            <p className="error">{errors.zip?.message}</p>
          </div>

          {/* Payment Details */}
          <h4>Payment Details</h4>

          <div className="form-group">
            <input placeholder="Card Number (16 digits)" {...register("cardNumber")} />
            <p className="error">{errors.cardNumber?.message}</p>
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <input placeholder="Expiry Date (MM/YY)" {...register("expiry")} />
              <p className="error">{errors.expiry?.message}</p>
            </div>
            <div className="form-group half-width">
              <input placeholder="CVV (3 digits)" {...register("cvv")} />
              <p className="error">{errors.cvv?.message}</p>
            </div>

          </div>
          <div className="form-group">
            <input placeholder="Name on Card" {...register("Nameoncard")} />
            <p className="error">{errors.Nameoncard?.message}</p>
          </div>
          <div className="form-group">
            <label>Payment Flow:</label>
            <select {...register("paymentFlow")} defaultValue="">
              <option value="">Select payment flow</option>
              {option.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <p className="error">{errors.paymentFlow?.message}</p>
          </div>

          <button type="submit" className="submit-btn">Place Order</button>

        </form>



        {/* RIGHT SIDE - PRODUCT & SUMMARY */}
        <div className="checkout-summary">
          {/* <div className="product-summary">
  <h3>{state.product.title}</h3>
  <div className="product-meta">
    <p><strong>Price:</strong> ₹{state.product.price.toFixed(2)}</p>
    <p><strong>Variant:</strong> {state.variant}</p>
    <p><strong>Quantity:</strong> {state.quantity}</p>
  </div>
</div> */}

          <div className="product-summary-container">
            <img
              src={state?.product?.thumbnail}
              alt={state.product.title}
              className="product-summary-image"
            />
            <div className="product-summary-details">
              <h3>{state.product.title}</h3>
              <p><strong>Price:</strong> ₹{state.product.price}</p>
              <p><strong>Variant:</strong> {state.variant}</p>
              <p><strong>Quantity:</strong> {state.quantity}</p>
            </div>
          </div>


          <div className="summary-section">
            <h4>Order Summary</h4>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping:</span>
              <span className="text-muted">₹  0</span>
            </div>
            <div className="summary-item">
              <span>Estimated Taxes:</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="summary-item total-row">
              <span>Total:</span>
              <span className="total-amount">₹{(total + tax).toFixed(2)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
