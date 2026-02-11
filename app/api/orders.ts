import { apiFetch } from "./base";

export type CartItem = {
  product_id: number;
  quantity: number;
};

export type CheckoutPayload = {
  user: {
    name: string;
    phone: string;
    national_id?: string;
  };
  items: CartItem[];
};

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
