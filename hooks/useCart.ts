"use client";

import { useState, useEffect } from "react";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartTotal,
  getCartCount,
  CartItem,
} from "../lib/utils/cart";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleAdd = (item: CartItem) => {
    const updated = addToCart(item);
    setCart(updated);
  };

  const handleRemove = (id: number) => {
    const updated = removeFromCart(id);
    setCart(updated);
  };

  const handleUpdate = (id: number, quantity: number) => {
    const updated = updateQuantity(id, quantity);
    setCart(updated);
  };

  const handleClear = () => {
    clearCart();
    setCart([]);
  };

  return {
    cart,
    addProduct: handleAdd,
    removeProduct: handleRemove,
    updateProduct: handleUpdate,
    clearCart: handleClear,
    total: getCartTotal(),
    count: getCartCount(),
  };
}
