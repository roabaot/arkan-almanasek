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
  items: CartItem[];
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
