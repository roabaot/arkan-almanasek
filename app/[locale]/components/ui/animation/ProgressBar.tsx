import { cn, useIsLocaleRtl } from "@/app/lib/utils";
import AnimatedDiv from "./AnimatedDiv";
import { Fragment } from "react";

export default function ProgressBar({
  step,
  stepsCount,
}: {
  step: number;
  stepsCount: number;
}) {
  return (
    <AnimatedDiv
      direction={1}
      className="flex select-none items-center justify-between gap-4 border-b-2 border-gray-200 px-5 pb-8"
    >
      {Array.from({ length: stepsCount }, (_, i) => i + 1).map((s, idx) => (
        <Fragment key={s}>
          <StepCircle step={s} fill={step + 1 >= s} />
          {idx < stepsCount - 1 && <StepBar fill={step + 1 >= s + 1} />}
        </Fragment>
      ))}
    </AnimatedDiv>
  );
}

function StepCircle({ step, fill }: { step: number; fill: boolean }) {
  const isRTL = useIsLocaleRtl();
  return (
    <div
      className={cn(
        " relative size-[34px] shrink-0  overflow-hidden rounded-full"
      )}
    >
      <span className="absolute flex h-full w-full items-center justify-center bg-gray-300 text-primary">
        {step}
      </span>
      <span
        className={cn(
          "absolute flex h-full w-full items-center justify-center bg-primaryBlue text-white duration-150",
          fill ? "delay-150" : "delay-0"
        )}
        // Use inline style for clip-path since Tailwind arbitrary variant may not be configured
        style={{
          clipPath: fill
            ? "inset(0 0 0 0)"
            : isRTL
            ? "inset(0 0 0 100%)"
            : "inset(0 100% 0 0)",
          transition: "clip-path 150ms",
        }}
      >
        {step}
      </span>
    </div>
  );
}

function StepBar({ fill }: { fill: boolean }) {
  return (
    <div
      className={cn(
        "relative hidden h-[6px] w-full overflow-hidden rounded-[50px] bg-gray-300 sm:block",
        "before:absolute ltr:before:-left-full rtl:before:-right-full before:h-[6px] before:w-full before:bg-primaryBlue before:duration-200 before:content-['']",
        fill ? "ltr:before:left-0 rtl:before:right-0" : "before:delay-150"
      )}
    ></div>
  );
}
