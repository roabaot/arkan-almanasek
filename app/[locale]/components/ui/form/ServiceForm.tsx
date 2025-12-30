"use client";
import { AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProgressBar from "../animation/ProgressBar";
import AnimatedDiv from "../animation/AnimatedDiv";
import StepOne from "../../sections/serviceDetails/steps/StepOne";
import StepTwo from "../../sections/serviceDetails/steps/StepTwo";
import Button from "../../common/Button";
import { AudienceType, postService } from "@/app/[locale]/actions/services";
import StepThree from "../../sections/serviceDetails/steps/StepThree";
import {
  createServiceFormSchema,
  ServiceFormInputsT,
} from "@/app/[locale]/lib/schemas/serviceFormSchema";

interface ServiceFormProps {
  targetAudience?: AudienceType[];
}

const ServiceForm = ({ targetAudience }: ServiceFormProps) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const [direction, setDirection] = useState(1);

  // Build translated schema per current locale
  const t = useTranslations();
  const translatedSchema = createServiceFormSchema((key) => t(key));

  const methods = useForm<ServiceFormInputsT>({
    resolver: zodResolver(translatedSchema),
  });
  const { handleSubmit, trigger, getValues } = methods;

  const nextStepsHandler = async () => {
    let goNext = false;
    if (step === 0) {
      goNext = await trigger(["role"]);
    } else if (step === 1) {
      // Dynamically validate only the fields relevant to the selected role
      const role = getValues("role");
      const roleFields: Record<string, (keyof ServiceFormInputsT)[]> = {
        individual: ["first_name", "last_name", "email"],
        institution: [
          "first_name",
          "last_name",
          "email",
          "institution_name",
          "unified_number",
          "employee_count",
        ],
        company: [
          "first_name",
          "last_name",
          "email",
          "company_name",
          "unified_number",
          "employee_count",
        ],
      };
      const fieldsToValidate = roleFields[role] || [
        "first_name",
        "last_name",
        "email",
      ];
      goNext = await trigger(fieldsToValidate as (keyof ServiceFormInputsT)[]);
    }
    if (goNext) {
      setStep((prev) => {
        setDirection(1);
        return prev + 1;
      });
    }
  };

  const onSubmitServiceForm = async (data: ServiceFormInputsT) => {
    try {
      setLoading(true);
      await postService(data);
      setStep((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white p-3 shadow-[0px_0px_15px_-3px_var(--tw-shadow-color,_rgb(0_0_0_/_0.1)),_0_4px_6px_-4px_var(--tw-shadow-color,_rgb(0_0_0_/_0.1))] xs:p-5 md:p-8 ">
      <AnimatePresence custom={1} mode="wait">
        <ProgressBar step={step} stepsCount={3} />
      </AnimatePresence>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitServiceForm)}>
          <div className="py-8">
            <AnimatePresence custom={direction} mode="wait">
              {step === 0 ? (
                <StepOne
                  direction={direction}
                  key="one"
                  nextBtnRef={nextBtnRef}
                  targetAudience={targetAudience}
                />
              ) : null}
              {step === 1 ? <StepTwo direction={direction} key="two" /> : null}
              {step === 2 ? (
                <StepThree direction={direction} key="three" />
              ) : null}
              {/* {step === 2 ? (
                    <StepThree direction={direction} key="three" />
                  ) : null}
                  {step === 3 ? (
                    <StepFour direction={direction} key="four" />
                  ) : null}
                  {step === 4 ? <StepFive key="five" /> : null} */}
              {/* {RenderStep()} */}
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            {step < 2 && (
              <AnimatedDiv
                key="buttons"
                direction={1}
                className="flex flex-row-reverse justify-between border-t-2 border-gray-200 pt-8"
              >
                {step === 0 ? (
                  <Button
                    type="button"
                    onClick={nextStepsHandler}
                    ref={nextBtnRef}
                    variant={"primary"}
                  >
                    {t("common.next_step")}
                  </Button>
                ) : null}
                {step === 1 ? (
                  <Button type="submit" variant={"primary"} disabled={loading}>
                    {t("common.submit")}
                  </Button>
                ) : null}

                {step !== 0 ? (
                  <Button
                    type="button"
                    onClick={() =>
                      setStep((prev) => {
                        setDirection(-1);
                        return prev - 1;
                      })
                    }
                    variant={"secondary"}
                    disabled={loading}
                  >
                    {t("common.previous_step")}
                  </Button>
                ) : null}
              </AnimatedDiv>
            )}
          </AnimatePresence>
        </form>
      </FormProvider>
    </div>
  );
};

export default ServiceForm;
