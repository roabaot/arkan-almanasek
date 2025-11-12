"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Button from "../../common/Button";
import { submitContactForm2 } from "@/app/[locale]/actions/contact2";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Valid email is required"),
  option: z.string().min(1, "Please select an option"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof schema>;

export default function ContactFormTwo() {
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
      const res = await submitContactForm2(data); // server-side execution
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
      <form className="space-y-7 mt-11" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row md:gap-7">
          <div className="flex-1">
            <input
              type="text"
              {...register("name")}
              placeholder="Your Name"
              className="w-full rounded-full px-4 py-3 border border-white text-[16px] font-secondary bg-white placeholder-textColor text-textColor outline-none hover:border-primaryBlue focus:border-primaryBlue duration-300 ease-in-out"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex-1 mt-4 md:mt-0">
            <input
              type="email"
              {...register("email")}
              placeholder="Your Email"
              className="w-full rounded-full px-4 py-3 border border-white text-[16px] font-secondary bg-white placeholder-textColor text-textColor outline-none hover:border-primaryBlue focus:border-primaryBlue duration-300 ease-in-out"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <select
            {...register("option")}
            className="w-full rounded-full px-4 py-3 border border-white text-[16px] font-secondary bg-white placeholder-textColor text-textColor outline-none hover:border-primaryBlue focus:border-primaryBlue duration-300 ease-in-out"
          >
            <option value="" disabled>
              Choose a Option
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
          {errors.option && (
            <p className="text-red-500 text-sm mt-1">{errors.option.message}</p>
          )}
        </div>

        <div>
          <textarea
            rows={4}
            {...register("message")}
            placeholder="Message here.."
            className="w-full rounded-lg px-4 py-3 border border-white text-[16px] font-secondary bg-white placeholder-textColor text-textColor outline-none hover:border-primaryBlue focus:border-primaryBlue duration-300 ease-in-out"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="bg-primaryBlue text-white hover:bg-secondaryColor transition duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Send Now"}
        </Button>
      </form>
    </div>
  );
}
