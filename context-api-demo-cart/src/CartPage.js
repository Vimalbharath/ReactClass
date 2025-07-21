import React from "react";
import { useCart } from "./CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <h3>Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} (x{item.qty}) - ₹{item.price * item.qty}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button onClick={clearCart}>Clear Cart</button>
      )}
    </div>
  );
};

export default CartPage;
