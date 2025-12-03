import { cn } from "../../../lib/utils";
import { TextFade } from "../ui/animation/TextFade";

interface SectionTitleProps {
  label?: string;
  title?: string;
  description?: string;
  align?: "left" | "center" | "right" | "start" | "end";
  className?: string;
  color?: string;
  delay?: number;
  inView?: boolean;
  inherit?: boolean;
}

const SectionTitle = ({
  label,
  title,
  description,
  align = "left",
  className,
  color = "text-secondaryColor",
  delay = 0,
  inView,
  inherit,
}: SectionTitleProps) => {
  const alignClass = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
    start: "text-start",
    end: "text-end mr-auto",
  }[align ?? "left"];

  return (
    <TextFade
      direction="up"
      delay={delay}
      inView={inView}
      inherit={inherit}
      className={cn("max-w-[740px]", alignClass, className)}
    >
      {label ? <span className="section-label block mb-2">{label}</span> : null}
      {title && (
        <h2
          className={`xl:text-[36px] lg:text-[32px] md:text-[28px] text-[24px] ${color}`}
        >
          {title}
        </h2>
      )}
      {description ? <p className="mt-3">{description}</p> : null}
    </TextFade>
  );
};

export default SectionTitle;
