import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState({});
  const [quantities, setQuantities] = useState({});


  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        console.log(data.products, "products")
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  const setVariant = (productId, variant) => {
    setVariants((prev) => ({ ...prev, [productId]: variant }));
  };

  const setQuantity = (productId, quantity) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };
 

  const handleBuy = (product) => {
    const variant = variants[product.id];
    const quantity = quantities[product.id] || 1;
    // const thumbnail = 
console.log(product,"product")
    navigate("/checkout", {
      state: { product, variant, quantity },
    });
  };

  const viewdetails = (product) => {
    // const variant = variants[product.id];
    // const quantity = quantities[product.id] || 1;
    // const thumbnail = 
    console.log(product,"product")
    navigate("/product-page", {
      state: { product },
    });
  };

  return (
    <div className="landing-container">
      <h1 className="page-title">Product Store</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            setVariant={(v) => setVariant(product.id, v)}
            setQuantity={(q) => setQuantity(product.id, q)}
            onBuy={() => viewdetails(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
