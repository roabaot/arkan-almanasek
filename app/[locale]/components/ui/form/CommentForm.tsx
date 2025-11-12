"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoIosArrowDown } from "react-icons/io";
import Button from "../../common/Button";
import { toast } from "react-toastify";
import { submitCommentForm } from "@/app/[locale]/actions/comment";

// Zod schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  option: z.string().min(1, "Please select an option"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof schema>;

const CommentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await submitCommentForm(data); // **Server Action call**
      if (res.success) {
        toast.success(res.message);
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <input
              {...register("name")}
              type="text"
              placeholder="Your Name"
              className="border-b border-primaryBorder text-[16px] text-textColor font-normal font-secondary placeholder:text-textColor focus:outline-none focus:border-primaryBlue py-2 w-full duration-300 ease-in-out"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Your Email"
              className="border-b border-primaryBorder text-[16px] text-textColor font-normal font-secondary placeholder:text-textColor focus:outline-none focus:border-primaryBlue py-2 w-full duration-300 ease-in-out"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              {...register("phone")}
              type="text"
              placeholder="Phone Number"
              className="border-b border-primaryBorder text-[16px] text-textColor font-normal font-secondary placeholder:text-textColor focus:outline-none focus:border-primaryBlue py-2 w-full duration-300 ease-in-out"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Select */}
          <div className="relative">
            <select
              {...register("option")}
              className="appearance-none border-b border-primaryBorder text-[16px] text-textColor font-normal font-secondary placeholder:text-textColor focus:outline-none focus:border-primaryBlue py-2 w-full duration-300 ease-in-out bg-transparent"
            >
              <option value="" disabled hidden>
                Choose An Option
              </option>
              <option value="Feedback">Feedback</option>
              <option value="Inquiry">Inquiry</option>
              <option value="Support">Support</option>
            </select>
            <IoIosArrowDown className="absolute right-2 top-3 text-sm text-textColor pointer-events-none" />
            {errors.option && (
              <p className="text-red-500 text-sm mt-1">
                {errors.option.message}
              </p>
            )}
          </div>
        </div>

        {/* Textarea */}
        <div>
          <textarea
            {...register("message")}
            placeholder="Message here.."
            className="border-b border-primaryBorder text-[16px] text-textColor font-normal font-secondary placeholder:text-textColor focus:outline-none focus:border-primaryBlue py-2 w-full duration-300 ease-in-out resize-none h-24"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send A Message"}
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
