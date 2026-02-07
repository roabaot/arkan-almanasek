import { z } from "zod";

type TranslationFn = (key: string) => string;

function isValidBirthDateDDMMYYYY(value: string) {
  const match = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.exec(
    value,
  );
  if (!match) return false;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const dt = new Date(year, month - 1, day);
  return (
    dt.getFullYear() === year &&
    dt.getMonth() === month - 1 &&
    dt.getDate() === day
  );
}

export function createStep2CustomerInfoSchema(
  t: TranslationFn,
  allowedCountryValues: readonly string[],
) {
  return z.object({
    fullName: z.string().trim().min(1, t("validation.fullNameRequired")),
    phoneCountry: z
      .string()
      .trim()
      .min(1, t("validation.phoneCountryRequired")),
    phone: z
      .string()
      .trim()
      .min(1, t("validation.phoneRequired"))
      .transform((value) => value.replace(/\s+/g, ""))
      .refine(
        (value) => /^\d{8,12}$/.test(value),
        t("validation.phoneInvalid"),
      ),
    email: z
      .string()
      .trim()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
    country: z
      .string()
      .trim()
      .min(1, t("validation.countryRequired"))
      .refine(
        (value) => allowedCountryValues.includes(value),
        t("validation.countryRequired"),
      ),
    birthDate: z
      .string()
      .trim()
      .min(1, t("validation.birthDateRequired"))
      .refine(
        (value) => isValidBirthDateDDMMYYYY(value),
        t("validation.birthDateInvalid"),
      ),
    performedHajjOrUmrahBefore: z
      .string()
      .trim()
      .min(1, t("validation.performedHajjOrUmrahBeforeRequired"))
      .refine(
        (value) => value === "yes" || value === "no",
        t("validation.performedHajjOrUmrahBeforeRequired"),
      ),
  });
}

export type Step2CustomerInfoValues = z.infer<
  ReturnType<typeof createStep2CustomerInfoSchema>
>;
