import { apiFetch, apiFetchViaProxy } from "./base";

export type BadelTypeT = "OnBehalfHajj" | "OnBehalfUmrah";

export type BadelT = {
  id: number;
  type: BadelTypeT;
  kind: string;
  name: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
};

export type GetBadelResT = {
  on_behalves: BadelT[];
};

export type BadelPayload = {
  customer: {
    name: string;
    phone: string;
    country: string;
    email?: string;
    dob: string;
    performed_hajj: boolean;
  };
};

export const getBadels = () => {
  return apiFetch<GetBadelResT>("/on_behalf");
};

export const postBadelRequest = (payload: BadelPayload) => {
  return apiFetch("/on_behalf/request", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const editBadelRequest = (payload: BadelPayload) => {
  return apiFetchViaProxy("/on_behalf/update_request", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};
