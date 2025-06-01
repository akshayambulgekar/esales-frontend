import React from "react";
import "./ProductCard.css"; // Make sure this file is in the same folder

const ProductCard = ({ product, variant, quantity, setVariant, setQuantity, onBuy }) => {
  // const isBuyDisabled = !variant || quantity < 1;

  return (
    <div className="product-card">
      <img className="product-image" src={product.thumbnail} alt={product.title} />
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>

      {/* <div className="form-group">
        <label>Variant:</label>
        <select value={variant} onChange={(e) => setVariant(e.target.value)}>
          <option value="">Select Variant</option>
          {product.variants.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div> */}

      {/* <div className="form-group">
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div> */}

      <button
        className="buy-button"
        onClick={onBuy}
        // disabled={isBuyDisabled}
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
