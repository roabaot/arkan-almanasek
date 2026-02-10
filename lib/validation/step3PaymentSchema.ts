import { z } from "zod";

export type PaymentMethod = "card" | "bank";

type TranslationFn = (key: string) => string;

function luhnCheck(inputDigits: string) {
  let sum = 0;
  let shouldDouble = false;

  for (let i = inputDigits.length - 1; i >= 0; i -= 1) {
    const code = inputDigits.charCodeAt(i) - 48;
    if (code < 0 || code > 9) return false;

    let digit = code;
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function isValidExpiryMMYY(value: string) {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value);
  if (!match) return false;

  const mm = Number(match[1]);
  const yy = Number(match[2]);

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  // Consider valid if the expiry month is current or in the future.
  if (yy < currentYear) return false;
  if (yy === currentYear && mm < currentMonth) return false;

  return true;
}

export function createStep3PaymentSchema(t: TranslationFn) {
  const base = z.object({
    method: z.enum(["card", "bank"], {
      message: t("validation.methodRequired"),
    }),
  });

  const cardSchema = base.extend({
    method: z.literal("card"),
    cardholder: z
      .string({ message: t("validation.cardholderRequired") })
      .trim()
      .min(2, t("validation.cardholderRequired")),
    cardNumber: z
      .string({ message: t("validation.cardNumberRequired") })
      .trim()
      .min(12, t("validation.cardNumberInvalid"))
      .transform((v) => v.replace(/\s+/g, ""))
      .refine(
        (digits) => /^\d{12,19}$/.test(digits),
        t("validation.cardNumberInvalid"),
      )
      .refine(
        (digits) => luhnCheck(digits),
        t("validation.cardNumberLuhnInvalid"),
      ),
    expiry: z
      .string({ message: t("validation.expiryRequired") })
      .trim()
      .min(1, t("validation.expiryRequired"))
      .refine((v) => isValidExpiryMMYY(v), t("validation.expiryInvalid")),
    cvc: z
      .string({ message: t("validation.cvcRequired") })
      .trim()
      .min(3, t("validation.cvcInvalid"))
      .refine((v) => /^\d{3,4}$/.test(v), t("validation.cvcInvalid")),
  });

  const receiptSchema = z
    .instanceof(File, { message: t("validation.receiptRequired") })
    .refine(
      (f) =>
        f.type === "application/pdf" ||
        f.type.startsWith("image/") ||
        // Some browsers may provide an empty type; allow it for now.
        f.type === "",
      t("validation.receiptTypeInvalid"),
    )
    .refine(
      (f) => f.size <= 10 * 1024 * 1024,
      t("validation.receiptSizeTooLarge"),
    );

  const bankSchema = base.extend({
    method: z.literal("bank"),
    receipt: receiptSchema,
  });

  return z.discriminatedUnion("method", [cardSchema, bankSchema]);
}

export type Step3PaymentSchema = ReturnType<typeof createStep3PaymentSchema>;

