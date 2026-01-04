import { RefObject, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LuUser, LuGraduationCap, LuBuilding2 } from "react-icons/lu";
import { useFormContext } from "react-hook-form";
import AnimatedDiv from "../../../ui/animation/AnimatedDiv";
import Radio from "../../../ui/fields/Radio";
import { ServiceFormInputsT } from "@/app/[locale]/lib/schemas/serviceFormSchema";
import { AudienceType } from "@/app/[locale]/actions/services";

interface StepOneProps {
  direction: number;
  nextBtnRef: RefObject<HTMLButtonElement | null>;
  targetAudience?: AudienceType[];
}

const StepOne = ({ direction, nextBtnRef, targetAudience }: StepOneProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<ServiceFormInputsT>();

  // When role selected, focus next button for smoother UX
  const roleValue = watch("role");
  useEffect(() => {
    if (roleValue && nextBtnRef?.current) {
      nextBtnRef.current.focus();
    }
  }, [roleValue, nextBtnRef]);
  const t = useTranslations();
  return (
    <AnimatedDiv className="flex flex-col gap-7" direction={direction}>
      <div>
        <h2 className="mb-2 text-2xl font-medium">
          {t("services.form.step_1.title")}
        </h2>
        <p className="text-sm text-myGray-500">
          {/* Please tell us about your skill level in frontend development. */}
          {t("services.form.step_1.description")}
        </p>
      </div>
      {targetAudience && targetAudience.length === 0 ? (
        <p className="text-sm text-red-500 text-center -mb-8">
          {t("services.form.no_audience_available")}
        </p>
      ) : null}
      <div className="grid gap-x-10 gap-y-6 md:grid-cols-2 ">
        {targetAudience?.includes("individuals") && (
          <Radio
            id="individuals"
            value="individuals"
            label={t("services.form.individual")}
            icon={<LuUser size={20} />}
            {...register("role")}
          />
        )}
        {targetAudience?.includes("institutions") && (
          <Radio
            id="institutions"
            value="institutions"
            label={t("services.form.institution")}
            icon={<LuGraduationCap size={20} />}
            {...register("role")}
          />
        )}
        {targetAudience?.includes("companies") && (
          <Radio
            id="companies"
            value="companies"
            label={t("services.form.company")}
            icon={<LuBuilding2 size={20} />}
            {...register("role")}
          />
        )}
      </div>
      {errors.role && (
        <p className="text-xs text-red-500" role="alert">
          {errors.role.message || t("validation.role.invalid")}
        </p>
      )}
    </AnimatedDiv>
  );
};

export default StepOne;
