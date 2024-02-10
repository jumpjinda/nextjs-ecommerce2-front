import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [ls,cartProducts]);

  useEffect(() => {
    // if (ls) {
    //   setCartProducts(JSON.parse(ls.getItem('cart')))
    // }
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  const addProducts = (productId) => {
    setCartProducts((prev) => [...prev, productId]);
  };

  const removeProducts = (productId) => {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProducts,
        removeProducts,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
