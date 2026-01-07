import { z } from "zod";

// Zod validation schema
// const contactSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   number: z.string().min(1, "Number is required"),
//   chooseOption: z.string().min(1, "Please choose an option"),
//   message: z.string().min(1, "Message is required"),
// });

export const createConsultationSchema = (
  t: (key: string) => string = (k) => k
) =>
  z.object({
    name: z.string().min(2, { message: t("validation.name.min") }),
    email: z
      .string()
      .email({ message: t("validation.email.invalid") })
      .or(z.literal(""))
      .optional(),
    phone: z.string().regex(/^(?:\+966|00966|0)?5[0-9]{8}$/, {
      message: t("validation.phone.invalid"),
    }),
    consultationType: z.string().optional(),
    message: z
      .string()
      .max(1000, { message: t("validation.details.max") })
      .optional(),
  });

const consultationSchema = createConsultationSchema();

export type ConsultationFormDataT = z.infer<typeof consultationSchema>;

export default consultationSchema;

// server-side form handler
// export async function submitContactForm(data: unknown) {
//   const parsedData = contactSchema.parse(data);

//   console.log("Server-side submitted data:", parsedData);

//   return { success: true, message: "Form submitted successfully!" };
// }
