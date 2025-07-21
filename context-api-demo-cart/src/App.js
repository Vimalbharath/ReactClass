import React from "react";
import { CartProvider } from "./CartContext";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import CartPage from "./CartPage";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <ProductList />
      <CartPage />
    </CartProvider>
  );
}

export default App;
