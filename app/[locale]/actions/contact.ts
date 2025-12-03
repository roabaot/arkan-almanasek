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
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    phone: z
      .string()
      .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
        message: "Please enter a valid phone number",
      }),
    consultationType: z
      .string()
      .min(1, { message: "Please select a consultation type" }),
    details: z
      .string()
      .min(10, { message: "Details must be at least 10 characters" })
      .max(1000, { message: "Details must be less than 1000 characters" }),
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
