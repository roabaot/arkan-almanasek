import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: React.ReactNode;
  className?: ClassValue;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={twMerge(clsx("md:max-w-[750px] lg:max-w-[1024px] xl:max-w-[1290px] mx-auto px-3 lg:px-5 2xl:px-0", className))}>
      {children ?? null}
    </div>
  );
};

export default Container;
