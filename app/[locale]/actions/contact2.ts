"use server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Valid email is required"),
  option: z.string().min(1, "Please select an option"),
  message: z.string().min(1, "Message is required"),
});

export async function submitContactForm2(data: unknown) {
  const parsedData = contactSchema.parse(data);

  console.log("Server-side submitted data:", parsedData);

  return { success: true, message: "Form submitted successfully!" };
}
