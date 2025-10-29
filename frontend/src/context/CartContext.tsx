import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../api";
import type { Product } from "@/types";

interface CartContextType {
  cart: Product[];
  total: number;
  refreshCart: () => Promise<void>;
}

/* eslint-disable react-refresh/only-export-components */
const CartContext = createContext<CartContextType>({
  cart: [],
  total: 0,
  refreshCart: async () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  const refreshCart = async () => {
    const res = await getCart();
    setCart(res.data.cart);
    setTotal(res.data.total);
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, total, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
