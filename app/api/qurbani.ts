import { apiFetch } from "./base";

export type QurbaniPayload = {
  user: {
    name: string;
    phone: string;
  };
  type: string;
  count: number;
};

export function buyQurbani(payload: QurbaniPayload) {
  return apiFetch("/qurbani", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
