import { z } from "zod";

const allowedSubjects = ["haj", "umrah", "support", "other"] as const;

type AllowedSubject = (typeof allowedSubjects)[number];

type TranslationFn = (key: string) => string;

export function createContactUsSchema(t: TranslationFn) {
  return z.object({
    fullName: z
      .string({ message: t("validation.fullNameRequired") })
      .trim()
      .min(2, t("validation.fullNameRequired"))
      .max(80, t("validation.fullNameTooLong")),
    email: z
      .string({ message: t("validation.emailRequired") })
      .trim()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
    phone: z
      .string({ message: t("validation.phoneRequired") })
      .trim()
      .min(1, t("validation.phoneRequired"))
      .transform((value) => value.replace(/\s+/g, ""))
      .refine((value) => /^\+?\d{7,15}$/.test(value), t("validation.phoneInvalid")),
    subject: z
      .string({ message: t("validation.subjectRequired") })
      .trim()
      .min(1, t("validation.subjectRequired"))
      .refine(
        (value): value is AllowedSubject =>
          (allowedSubjects as readonly string[]).includes(value),
        t("validation.subjectRequired"),
      ),
    message: z
      .string({ message: t("validation.messageTooShort") })
      .trim()
      .min(10, t("validation.messageTooShort"))
      .max(1000, t("validation.messageTooLong")),
  });
}

export type ContactUsSchema = ReturnType<typeof createContactUsSchema>;
export type ContactUsValues = z.infer<ContactUsSchema>;
