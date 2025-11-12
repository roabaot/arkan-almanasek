import { ComponentProps, forwardRef, useId, ReactNode } from "react";

type RadioProps = { label: string; icon: ReactNode } & ComponentProps<"input">;

// Tailwind v4-friendly radio component using peer variants instead of :has()
const Radio = forwardRef<HTMLInputElement, RadioProps>(function (
  { label, icon, id, value, name, ...props },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className="flex w-full flex-col gap-1 text-sm">
      {/* Hidden native radio to leverage peer-checked utilities */}
      <input
        ref={ref}
        id={inputId}
        name={name}
        type="radio"
        value={value ?? label}
        className="peer sr-only"
        {...props}
      />
      <label
        htmlFor={inputId}
        className="flex h-[69px] cursor-pointer select-none items-center gap-4 rounded-[10px] border px-4 font-medium transition-colors hover:bg-primaryBlue/5 active:bg-primaryBlue/10 peer-checked:border-primaryBlue peer-checked:bg-primaryBlue/5 peer-checked:border-2"
      >
        <span className="flex size-[34px] items-center justify-center rounded-full bg-primaryBlue text-white">
          {/* <Image src={icon} alt="" width={24} height={24} /> */}
          {icon}
        </span>
        <span>{label}</span>
      </label>
    </div>
  );
});

Radio.displayName = "Radio";

export default Radio;
