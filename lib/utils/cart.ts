/* ================== Types ================== */

type CartItemTypeT = "product" | "service";

export type CartItem = {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  quantity: number;
  type: CartItemTypeT;
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

export function addToCart(
  item: CartItem,
  mode: "increment" | "replace" = "increment",
) {
  const cart = getCart();

  const existingIndex = cart.findIndex((p) => p.id === item.id);

  // المنتج غير موجود
  if (existingIndex === -1) {
    cart.push(item);
    saveCart(cart);
    return cart;
  }

  const existingItem = cart[existingIndex];

  // نفس الكمية بالضبط → لا نغير شيء
  if (existingItem.quantity === item.quantity && mode === "replace") {
    return cart;
  }

  // تحديث حسب الوضع
  if (mode === "increment") {
    existingItem.quantity += item.quantity;
  } else {
    existingItem.quantity = item.quantity;
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
