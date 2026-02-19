import { apiFetch, apiFetchViaProxy } from "./base";

export type CartItem = {
  id: number;
  quantity: number;
};

export type CheckoutPayload = {
  customer: {
    name: string;
    phone: string;
    national_id?: string;

    // Optional extra fields (used by /requests/create pre-checkout capture)
    email?: string;
    country?: string;
    dob?: string;
    performed_hajj_or_umrah_before?: string;
    phone_country?: string;
  };
  cart: CartItem[];
};

export type RequestT = {
  customer: unknown;
  cart: CartItem[];
};

export type RequestCartResT = {
  cart: {
    products: unknown[];
    services: unknown[];
    [key: string]: unknown;
  };
  customer: {
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

type AddRequestResT = {
  token: string;
  [key: string]: unknown;
};

type ProductT = {
  id: number;
  code?: string;
  name?: string;
  sub_title?: string | null;
  description?: string;
  details?: string;
  price?: number;
  discount_price?: number | null;
  quantity?: number;
  available?: boolean;
  category?: string | null;
  tag?: string | null;
  images?: string[];
  image?: string | null;
  specifications?: string[];
  created_at?: string;
  updated_at?: string;
};

export type CartItemsByIdsResT = {
  products: ProductT[];
};

export function getCartItemsByIds(ids: number[]): Promise<CartItemsByIdsResT> {
  if (ids.length === 0) return Promise.resolve({ products: [] });

  return apiFetch<CartItemsByIdsResT>("/carts/items", {
    method: "POST",
    body: JSON.stringify({ product_ids: ids }),
  });
}

export function addRequest(payload: CheckoutPayload) {
  return apiFetch<AddRequestResT>("/requests/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function checkoutCart(payload: CheckoutPayload) {
  return apiFetch<{ order_id: number }>("/cart/checkout", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function payOrder(orderId: number, paymentMethod: string) {
  return apiFetch("/orders/pay", {
    method: "POST",
    body: JSON.stringify({
      order_id: orderId,
      payment_method: paymentMethod,
    }),
  });
}

// Uses Next.js proxy so the request token can be taken from HttpOnly cookie
// and forwarded to Ruby API as a query param `token`.
export function getRequestCart() {
  return apiFetchViaProxy<RequestCartResT>("/requests/cart");
}
