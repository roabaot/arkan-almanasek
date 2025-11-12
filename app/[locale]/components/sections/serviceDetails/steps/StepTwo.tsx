import React, { useMemo } from "react";
import AnimatedDiv from "../../../ui/animation/AnimatedDiv";
import { useFormContext } from "react-hook-form";
import { ServiceFormInputsT } from "../../../ui/form/serviceFormSchema";
import { useTranslations } from "next-intl";

const StepTwo = ({ direction }: { direction: number }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<ServiceFormInputsT>();

  const role = watch("role");
  const t = useTranslations();

  const roleFields: Record<string, (keyof ServiceFormInputsT)[]> = {
    individual: ["first_name", "last_name", "email", "city"],
    institution: [
      "first_name",
      "last_name",
      "email",
      "city",
      "institution_name",
      "unified_number",
      "employee_count",
    ],
    company: [
      "first_name",
      "last_name",
      "email",
      "city",
      "company_name",
      "unified_number",
      "employee_count",
    ],
  };

  const activeFields = roleFields[role as string] || [];

  type FieldMeta = {
    name: keyof ServiceFormInputsT;
    placeholder: string;
    type?: string;
    variant?: string;
    options?: { value: string; label: string }[];
  };

  // Options for employee count (used by unified_number select per current schema design)
  const employeeCountOptions = useMemo(
    () => [
      { value: "1-10" },
      { value: "11-50" },
      { value: "51-100" },
      { value: "101-250" },
      { value: "more" },
    ],
    []
  );

  const saudiCities = useMemo(
    () => [
      { value: "riyadh" },
      { value: "makkah" },
      { value: "madinah" },
      { value: "jeddah" },
      { value: "dammam" },
      { value: "najran" },
      { value: "alhasa" },
      { value: "qassim" },
      { value: "tabuk" },
      { value: "abha" },
      { value: "hail" },
      { value: "jouf" },
      { value: "baha" },
      { value: "taif" },
      { value: "khobar" },
      { value: "dhahran" },
      { value: "jubail" },
      { value: "jazan" },
      { value: "other" },
    ],
    []
  );

  const allFieldMeta: FieldMeta[] = useMemo(
    () => [
      {
        name: "first_name",
        placeholder: t("services.form.placeholders.first_name"),
      },
      {
        name: "last_name",
        placeholder: t("services.form.placeholders.last_name"),
      },
      {
        name: "email",
        placeholder: t("services.form.placeholders.email"),
        type: "email",
      },
      {
        name: "city",
        placeholder: t("services.form.placeholders.city"),
        variant: "select",
        options: saudiCities.map((city) => ({
          value: city.value,
          label: t(`services.form.Saudi_citizen.options.${city.value}`),
        })),
      },
      {
        name: "company_name",
        placeholder: t("services.form.placeholders.company_name"),
      },
      {
        name: "institution_name",
        placeholder: t("services.form.placeholders.institution_name"),
      },
      {
        name: "unified_number",
        placeholder: t("services.form.placeholders.unified_number"),
      },
      {
        name: "employee_count",
        placeholder: t("services.form.placeholders.employee_count"),
        variant: "select",
        options: employeeCountOptions.map((o) => ({
          value: o.value,
          label: t(`services.form.employee_count.options.${o.value}`),
        })),
      },
    ],
    [t, employeeCountOptions, saudiCities]
  );

  const inputClass = (field: keyof ServiceFormInputsT) =>
    `w-full border-b-2 pb-3 text-[16px] text-textColor font-normal font-secondary outline-none duration-300 ease-in-out ${
      errors[field]
        ? "border-red-500"
        : "border-primaryBorder hover:border-b-primary focus:border-b-primaryBlue"
    }`;

  return (
    <AnimatedDiv className="flex flex-col gap-7" direction={direction}>
      <div>
        <h2 className="mb-2 text-2xl font-medium">
          {t("services.form.step_2.title")}
        </h2>
        <p className="text-sm text-gray-500">
          {t("services.form.step_2.description")}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-[30px]">
        {allFieldMeta
          .filter((f) => activeFields.includes(f.name))
          .map((f) => (
            <div key={f.name}>
              {f.variant === "select" ? (
                <select
                  {...register(f.name)}
                  className={`${inputClass(f.name)} ${
                    !watch(f.name) ? "!text-[#b3b5b9]" : ""
                  }`}
                >
                  <option value="">
                    {t(`services.form.select_default`, {
                      selector: f.placeholder,
                    })}
                  </option>
                  {f.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type || "text"}
                  {...register(f.name)}
                  className={inputClass(f.name)}
                  placeholder={f.placeholder}
                />
              )}
              {errors[f.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[f.name]?.message as string}
                </p>
              )}
            </div>
          ))}
      </div>
    </AnimatedDiv>
  );
};

export default StepTwo;
