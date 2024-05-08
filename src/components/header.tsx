import React from "react";
import { useCart } from "../provider/cart-provider";

const Header: React.FC = () => {
  const { cart } = useCart();

  return (
    <header>
      <h1>Sweet Apple Acres</h1>
      <nav className="cart-nav">
        <a href="/cart">Cart ({cart.length})</a>
      </nav>
    </header>
  );
};

export default Header;
