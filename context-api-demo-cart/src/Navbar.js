import React from "react";
import { useCart } from "./CartContext";

const Navbar = () => {
  const { cartItems } = useCart();

  return (
    <nav>
      <h2>🛍 My Store</h2>
      <span>🛒 Cart: {cartItems.length} items</span>
    </nav>
  );
};

export default Navbar;
