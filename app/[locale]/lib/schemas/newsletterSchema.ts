import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(
      1,
      "البريد الإلكتروني مطلوب" /** default Arabic, can be overridden via i18n */
    )
    .email("بريد إلكتروني غير صالح"),
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;
