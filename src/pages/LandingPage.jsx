import React, { useState } from "react";
import { useNavigate, useLocation, useActionData } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const { state } = useLocation();
  const [variant, setVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [button, setbutton] = useState(false)
  const navigate = useNavigate();
  const option = ["Black", "Silver", "Rose Gold"];
  const product = state.product;

  const handleBuy = () => {
    navigate("/checkout", {
      state: { product, variant, quantity }
    });
  };

  return (
    <div className="landing-container">
      <div className="landing-two-column">
        {/* Left - Product Image */}
        <div className="landing-image-section">
          <img
            className="product-image"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        {/* Right - Product Details */}
        <div className="landing-details-section">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">₹{product.price}</p>

          <div className="form-group">
            <label>Variant</label>
            <select value={variant} onChange={(e) => setVariant(e.target.value)}>
              <option value="">Select Variant</option>
              {option.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <button className="buy-button" onClick={handleBuy} disabled={!variant}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
