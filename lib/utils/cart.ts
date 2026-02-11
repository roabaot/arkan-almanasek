/* ================== Types ================== */

export type CartItem = {
  id: number;
  name?: string;
  price?: number;
  image?: string;
  quantity: number;
};

const CART_KEY = "manasik_cart";

/* ================== Helpers ================== */

function isBrowser() {
  return typeof window !== "undefined";
}

function saveCart(cart: CartItem[]) {
  if (!isBrowser()) return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ================== Core Functions ================== */

export function getCart(): CartItem[] {
  if (!isBrowser()) return [];

  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function addToCart(item: CartItem) {
  const cart = getCart();

  const existingIndex = cart.findIndex((p) => p.id === item.id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  return cart;
}

export function updateQuantity(productId: number, quantity: number) {
  const cart = getCart();

  const updated = cart.map((item) =>
    item.id === productId ? { ...item, quantity } : item,
  );

  saveCart(updated);
  return updated;
}

export function removeFromCart(productId: number) {
  const cart = getCart();
  const updated = cart.filter((item) => item.id !== productId);

  saveCart(updated);
  return updated;
}

export function clearCart() {
  if (!isBrowser()) return;
  localStorage.removeItem(CART_KEY);
}

export function getCartTotal() {
  const cart = getCart();

  return cart.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0,
  );
}

export function getCartCount() {
  const cart = getCart();

  return cart.reduce((count, item) => count + item.quantity, 0);
}
