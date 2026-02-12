"use client";

import { useSyncExternalStore } from "react";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  CartItem,
} from "../lib/utils/cart";

let cartCache: CartItem[] | null = null;
const subscribers = new Set<() => void>();

function getSnapshot(): CartItem[] {
  if (cartCache === null) {
    cartCache = getCart();
  }
  return cartCache;
}

function getServerSnapshot(): CartItem[] {
  return [];
}

function subscribe(listener: () => void) {
  subscribers.add(listener);
  return () => {
    subscribers.delete(listener);
  };
}

function emitChange(nextCart: CartItem[]) {
  cartCache = nextCart;
  for (const listener of subscribers) listener();
}

function computeTotal(cart: CartItem[]) {
  return cart.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0,
  );
}

function computeCount(cart: CartItem[]) {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function useCart() {
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleAdd = (
    item: CartItem,
    mode: "increment" | "replace" = "increment",
  ) => {
    const updated = addToCart(item, mode);
    emitChange(updated);
  };

  const handleRemove = (id: number) => {
    const updated = removeFromCart(id);
    emitChange(updated);
  };

  const handleUpdate = (id: number, quantity: number) => {
    const updated = updateQuantity(id, quantity);
    emitChange(updated);
  };

  const handleClear = () => {
    clearCart();
    emitChange([]);
  };

  return {
    cart,
    addProduct: handleAdd,
    removeProduct: handleRemove,
    updateProduct: handleUpdate,
    clearCart: handleClear,
    total: computeTotal(cart),
    count: computeCount(cart),
  };
}
