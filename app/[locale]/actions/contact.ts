"use server";
import { z } from "zod";

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  number: z.string().min(1, "Number is required"),
  chooseOption: z.string().min(1, "Please choose an option"),
  message: z.string().min(1, "Message is required"),
});

// server-side form handler
export async function submitContactForm(data: unknown) {
  const parsedData = contactSchema.parse(data);

  console.log("Server-side submitted data:", parsedData);

  return { success: true, message: "Form submitted successfully!" };
}
