import { z } from "zod";

const allowedSubjects = ["haj", "umrah", "support", "other"] as const;

type AllowedSubject = (typeof allowedSubjects)[number];

export const contactUsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "الاسم الكامل مطلوب")
    .max(80, "الاسم طويل جداً"),
  email: z
    .string()
    .trim()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
  phone: z
    .string()
    .trim()
    .min(1, "رقم الهاتف مطلوب")
    .transform((value) => value.replace(/\s+/g, ""))
    .refine(
      (value) => /^\+?\d{7,15}$/.test(value),
      "رقم الهاتف غير صحيح",
    ),
  subject: z
    .string()
    .trim()
    .min(1, "اختر موضوع الاستفسار")
    .refine(
      (value): value is AllowedSubject =>
        (allowedSubjects as readonly string[]).includes(value),
      "اختر موضوع الاستفسار",
    ),
  message: z
    .string()
    .trim()
    .min(10, "الرسالة قصيرة جداً")
    .max(1000, "الرسالة طويلة جداً"),
});

export type ContactUsValues = z.infer<typeof contactUsSchema>;
