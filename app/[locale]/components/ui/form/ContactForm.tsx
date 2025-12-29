"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../common/Button";
import { toast } from "react-toastify";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  number: z.string().min(1, "Number is required"),
  chooseOption: z.string().min(1, "Please choose an option"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    try {
      // const payload = {
      //   name: data.name,
      //   email: data.email,
      //   option: data.chooseOption,
      //   message: data.message,
      // };
      // const res = await postConsultation(payload);
      // if (res?.success) {
      //   toast.success(res.message ?? "Form submitted successfully!");
      //   reset();
      // } else {
      //   toast.error(res?.message ?? "Submission failed. Please try again.");
      // }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full border-b pb-3 text-[16px] text-textColor font-normal font-secondary outline-none duration-300 ease-in-out ${
      errors[field]
        ? "border-red-500"
        : "border-primaryBorder hover:border-b-primary focus:border-b-primary"
    }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 md:mt-15 mt-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-[30px]">
        <div>
          <input
            type="text"
            {...register("name")}
            className={inputClass("name")}
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            {...register("email")}
            className={inputClass("email")}
            placeholder="Your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register("number")}
            className={inputClass("number")}
            placeholder="Your Number"
          />
          {errors.number && (
            <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
          )}
        </div>

        <div>
          <select
            {...register("chooseOption")}
            className={inputClass("chooseOption")}
          >
            <option value="">Choose a Reason</option>
            <option value="support">Customer Support</option>
            <option value="quote">Request a Quote</option>
            <option value="feedback">Give Feedback</option>
            <option value="partnership">Partnership Inquiry</option>
            <option value="other">Other</option>
          </select>
          {errors.chooseOption && (
            <p className="text-red-500 text-sm mt-1">
              {errors.chooseOption.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <textarea
          {...register("message")}
          className={inputClass("message")}
          placeholder="Message here.."
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="md:mt-12 mt-7">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send A Message"}
        </Button>
      </div>
    </form>
  );
}
