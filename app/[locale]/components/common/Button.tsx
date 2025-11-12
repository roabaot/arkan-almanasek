import { forwardRef } from "react";
import { cn } from "@/app/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hoverBgColorClass?: string;
  variant?: "primary" | "secondary" | "ghost";
}

const variantClasses = {
  primary: "bg-primaryBlue text-white",
  secondary: "bg-white text-primaryBlue border border-primaryBlue",
  ghost: "bg-transparent text-primaryBlue",
} as const;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      hoverBgColorClass = "bg-secondaryColor",
      variant = "primary",
      type = "button",
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-disabled={disabled}
        className={cn(
          "relative overflow-hidden group px-[30px] py-3 rounded-full md:text-[18px] text-[16px] font-primary font-medium leading-8 capitalize cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          className
        )}
        {...rest}
      >
        <span
          className={cn(
            "absolute inset-0 rounded-[30px] scale-y-0 origin-center transition-transform duration-300 ease-out group-hover:scale-y-100 z-0",
            hoverBgColorClass
          )}
        />
        <span className="relative z-10 group-hover:text-white">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
