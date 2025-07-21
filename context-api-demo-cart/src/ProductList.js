import React from "react";
import { useCart } from "./CartContext";

const sampleProducts = [
  { id: 1, name: "iPhone 15", price: 999 },
  { id: 2, name: "MacBook Pro", price: 1999 },
  { id: 3, name: "AirPods Pro", price: 249 },
];

const ProductList = () => {
  const { addToCart } = useCart();

  return (
    <div>
      <h3>Products</h3>
      <ul>
        {sampleProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ₹{product.price}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
