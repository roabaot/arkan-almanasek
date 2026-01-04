import * as z from "zod";

// Factory to create a translated service form schema.
// Pass a translation function `t` (e.g. from `useTranslations('validation')`).
// If no `t` is provided, it falls back to English keys for backward compatibility.
export const createServiceFormSchema = (
  t: (key: string) => string = (k) => k
) =>
  z.object({
    role: z.enum(["individuals", "institutions", "companies"], {
      error: t("validation.role.invalid"),
    }),
    // Step Two now only accepts name (first_name) and phone.
    // first_name: z
    //   .string()
    //   .min(2, { message: t("validation.first_name.min") })
    //   .max(36, { message: t("validation.first_name.max") }),
    // New consolidated name field replacing first_name in the UI.
    name: z
      .string()
      .min(2, { message: t("validation.first_name.min") })
      .max(36, { message: t("validation.first_name.max") }),
    // last_name: z
    //   .string()
    //   .min(2, { message: t("validation.last_name.min") })
    //   .max(36, { message: t("validation.last_name.max") }),
    // email: z
    //   .string()
    //   .email({ message: t("validation.email.invalid") })
    //   .optional(),
    // company_name: z.string().optional(),
    // institution_name: z.string().optional(),
    // unified_number: z
    //   .string()
    //   .min(7, { message: t("validation.unified_number.min") })
    //   .max(10, { message: t("validation.unified_number.max") })
    //   .optional(),
    // employee_count: z.string().optional(),
    // city: z.string().optional(),
    // country: z.string().optional(),
    phone: z
      .string()
      .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
        message: t("validation.phone.invalid"),
      }),
    // idNumber: z.string().optional(),
    // portfolioGithubLink: z.string().optional(),
    // skillLevel: z.string().optional(), // legacy optional
    // challengePref: z.string().array().nonempty().optional(),
  });
// Additional requirements for company/institution specific fields
// are no longer enforced because those fields are not part of
// Step Two at the moment.
// .superRefine((data, ctx) => {
//   const needsCompanyFields =
//     data.role === "institutions" || data.role === "companies";
//   if (needsCompanyFields) {
//     if (!data.company_name && data.role === "companies") {
//       ctx.addIssue({
//         code: "custom",
//         path: ["company_name"],
//         message: t("validation.company_name.required"),
//       });
//     }
//     if (!data.institution_name && data.role === "institutions") {
//       ctx.addIssue({
//         code: "custom",
//         path: ["institution_name"],
//         message: t("validation.institution_name.required"),
//       });
//     }
//     if (!data.unified_number) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["unified_number"],
//         message: t("validation.unified_number.required"),
//       });
//     }
//     if (!data.employee_count) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["employee_count"],
//         message: t("validation.employee_count.required"),
//       });
//     }
//   }
// });

// Backward-compatible default (English keys will appear if no translator used)
const serviceFormSchema = createServiceFormSchema();

export type ServiceFormInputsT = z.infer<typeof serviceFormSchema>;

export default serviceFormSchema;
