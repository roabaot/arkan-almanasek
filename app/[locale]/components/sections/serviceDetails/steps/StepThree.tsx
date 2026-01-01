"use client";

import Link from "next/link";
import AnimatedDiv from "../../../ui/animation/AnimatedDiv";
import { FaRegCheckCircle } from "react-icons/fa";
import Button from "../../../common/Button";
import { useLocale, useTranslations } from "next-intl";

const StepThree = ({ direction }: { direction: number }) => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <AnimatedDiv
      className="flex min-h-[396px] flex-col items-center justify-center text-center"
      direction={direction}
    >
      <FaRegCheckCircle
        aria-hidden="true"
        size={128}
        className="mb-4 text-primaryBlue drop-shadow-sm"
      />
      <h2 className="mb-7 mt-4 text-2xl font-semibold">
        {t("services.form.step_3.title")}
      </h2>
      <p className="max-w-[474px] text-sm text-myGray-500">
        {t("services.form.step_3.description")}
      </p>

      <Link href={`/${locale}`}>
        <Button
          hoverBgColorClass="bg-primaryBlue"
          className="bg-transparent border border-primaryBlue text-primaryBlue duration-300 ease-in-out"
        >
          {t("services.form.step_3.back_home")}
        </Button>
      </Link>
    </AnimatedDiv>
  );
};

export default StepThree;
