import { apiFetch, apiFetchViaProxy } from "./base";

export type PermitTypeT = "PermitHajj" | "PermitUmrah";

export type PermitT = {
  id: number;
  type: PermitTypeT;
  kind: string;
  name: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
};

export type GetPermitResT = {
  permits: PermitT[];
};

export type PermitPayload = {
  customer: {
    name: string;
    phone: string;
    country: string;
    email: string;
    dob: string;
    id_number: string;
    nationality: string;
    additional_notes: string;
    permit_type: PermitTypeT;
  };
  files: {
    customer_personal_photo: File;
    customer_id_photo: File;
  };
};

function toPermitFormData(payload: PermitPayload): FormData {
  const fd = new FormData();

  // Keep nested payload shape: customer[...] and files[...]
  fd.append("customer[name]", payload.customer.name);
  fd.append("customer[phone]", payload.customer.phone);
  fd.append("customer[country]", payload.customer.country);
  fd.append("customer[email]", payload.customer.email);
  fd.append("customer[dob]", payload.customer.dob);
  fd.append("customer[id_number]", payload.customer.id_number);
  fd.append("customer[nationality]", payload.customer.nationality);
  fd.append("customer[additional_notes]", payload.customer.additional_notes);
  fd.append("customer[permit_type]", payload.customer.permit_type);

  fd.append(
    "files[customer_personal_photo]",
    payload.files.customer_personal_photo,
  );
  fd.append("files[customer_id_photo]", payload.files.customer_id_photo);

  return fd;
}

export const getPermits = () => {
  return apiFetch<GetPermitResT>("/permit");
};

export const postPermitRequest = (payload: PermitPayload) => {
  const body = toPermitFormData(payload);
  return apiFetch("/permit/request", {
    method: "POST",
    body,
  });
};

export const editPermitRequest = (payload: PermitPayload) => {
  const body = toPermitFormData(payload);
  return apiFetchViaProxy("/permit/update_request", {
    method: "PUT",
    body,
  });
};
