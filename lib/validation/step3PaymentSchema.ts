import { z } from "zod";

export type PaymentMethod = "card" | "bank";

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

const base = z.object({
  method: z.enum(["card", "bank"], {
    message: "يرجى اختيار طريقة الدفع",
  }),
});

const cardSchema = base.extend({
  method: z.literal("card"),
  cardholder: z
    .string({ message: "يرجى إدخال اسم حامل البطاقة" })
    .trim()
    .min(2, "يرجى إدخال اسم حامل البطاقة"),
  cardNumber: z
    .string({ message: "يرجى إدخال رقم البطاقة" })
    .trim()
    .min(12, "يرجى إدخال رقم بطاقة صحيح")
    .transform((v) => v.replace(/\s+/g, ""))
    .refine((digits) => /^\d{12,19}$/.test(digits), "يرجى إدخال رقم بطاقة صحيح")
    .refine((digits) => luhnCheck(digits), "رقم البطاقة غير صحيح"),
  expiry: z
    .string({ message: "يرجى إدخال تاريخ الانتهاء" })
    .trim()
    .min(1, "يرجى إدخال تاريخ الانتهاء")
    .refine((v) => isValidExpiryMMYY(v), "تاريخ الانتهاء غير صحيح"),
  cvc: z
    .string({ message: "يرجى إدخال رمز الأمان" })
    .trim()
    .min(3, "يرجى إدخال رمز أمان صحيح")
    .refine((v) => /^\d{3,4}$/.test(v), "يرجى إدخال رمز أمان صحيح"),
});

const receiptSchema = z
  .instanceof(File, { message: "يرجى إرفاق إيصال التحويل" })
  .refine(
    (f) =>
      f.type === "application/pdf" ||
      f.type.startsWith("image/") ||
      // Some browsers may provide an empty type; allow it for now.
      f.type === "",
    "نوع الملف غير مدعوم",
  )
  .refine((f) => f.size <= 10 * 1024 * 1024, "حجم الملف كبير جدًا (الحد 10MB)");

const bankSchema = base.extend({
  method: z.literal("bank"),
  receipt: receiptSchema,
});

export const step3PaymentSchema = z.discriminatedUnion("method", [
  cardSchema,
  bankSchema,
]);

export type Step3PaymentValues = z.infer<typeof step3PaymentSchema>;
