export function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 19);
  const groups = digits.match(/.{1,4}/g) ?? [];
  return groups.join(" ");
}

export function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  const mm = digits.slice(0, 2);
  const yy = digits.slice(2, 4);
  return [mm, yy].filter(Boolean).join("/");
}
