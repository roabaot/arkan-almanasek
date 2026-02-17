import { apiFetch, apiFetchViaProxy } from "./base";

export type HadiTypeT = {
  id: number;
  name: string;
  description?: string | null;
  classefication?: "sheep" | "cow" | "camel";
  price: number;
  quantity?: number | null;
  created_at?: string;
  updated_at?: string;
};

export type HadiT = {
  id: number;
  name: string;
  description?: string | null;
  types: HadiTypeT[];
  created_at?: string;
  updated_at?: string;
};

export type GetHadiResT = {
  hadi: HadiT[];
};

type ItemTypeT = {
  type_id: number;
  quantity: number;
};

export type QurbaniPayload = {
  customer: {
    name: string;
    phone: string;
    email?: string;
    country?: string;
    dob?: string;
    performed_hajj?: boolean;
  };
  items: ItemTypeT[];
};

export const getHadi = () => {
  return apiFetch<GetHadiResT>("/hadi");
};

export const postHadiRequest = (payload: QurbaniPayload) => {
  return apiFetch("/hadi/request", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const editHadiRequest = (payload: QurbaniPayload) => {
  return apiFetchViaProxy("/hadi/update_request", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export function buyQurbani(payload: QurbaniPayload) {
  return apiFetch("/qurbani", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
