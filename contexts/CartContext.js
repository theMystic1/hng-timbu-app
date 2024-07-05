import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function ContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(cartItem) {
    setCart((prevCart) => [...prevCart, cartItem]);
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.unique_id !== id));
  }

  // Calculate the total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.current_price[0].GBP[0],
    0
  );

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalPrice, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (context === undefined)
    throw new Error("Cart context was used outside cart Context provider");

  return context;
}

export { useCart, ContextProvider };
