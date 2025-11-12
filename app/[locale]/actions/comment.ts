"use server";
import { z } from "zod";

const commentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  option: z.string().min(1),
  message: z.string().min(1),
});

export async function submitCommentForm(data: unknown) {
  const parsedData = commentSchema.parse(data);

  console.log("Server-side submitted comment:", parsedData);

  // এখানে চাইলে DB insert বা email send করতে পারেন
  return { success: true, message: "Form submitted successfully!" };
}
