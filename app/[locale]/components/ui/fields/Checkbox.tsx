import { ComponentProps, forwardRef } from "react";

import CheckmarkIcon from "@assets/checkmark.svg";
import Image from "next/image";

type CheckboxProps = { label: string } & ComponentProps<"input">;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function (
  { label, id, ...props },
  ref
) {
  return (
    <div className="flex w-full flex-col  gap-1 text-sm">
      <label
        className="flex h-[69px] cursor-pointer select-none items-center gap-4 rounded-[10px] border px-4 font-medium hover:bg-gray-50  active:bg-gray-100 peer-checked:border-myOrange-500 has-[:checked]:border-myOrange-500"
        htmlFor={id}
      >
        <span className="flex size-[20px] items-center justify-center rounded-md border border-myBlack-800 has-[:checked]:border-myOrange-500 has-[:checked]:bg-myOrange-500 ">
          <input
            type="checkbox"
            value={label}
            id={id}
            className="peer absolute appearance-none"
            ref={ref}
            {...props}
          />
          <Image
            src={CheckmarkIcon}
            alt=""
            className="hidden peer-checked:block"
          />
        </span>
        <span>{label}</span>
      </label>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
