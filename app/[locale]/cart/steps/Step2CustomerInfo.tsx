"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  createStep2CustomerInfoSchema,
  type Step2CustomerInfoValues,
} from "@/lib/validation";

import {
  ddmmyyyyFromISODate,
  formatBirthDateInput,
  isoDateFromDDMMYYYY,
} from "@/lib/utils";

type CountryValue = "id" | "ms" | "tr" | "lk";
type PhoneCountryValue = "sa" | CountryValue;

type CountryOption = {
  value: CountryValue;
  dial: string;
  flag: string;
  label: string;
};

type PhoneCountryOption = {
  value: PhoneCountryValue;
  dial: string;
  flag: string;
  label: string;
};

function PhoneCountrySelect({
  options,
  value,
  onChange,
  hasError,
}: {
  options: PhoneCountryOption[];
  value: PhoneCountryValue;
  onChange: (v: PhoneCountryValue) => void;
  hasError: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.value === value) ?? options[0]!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const target = e.target as Node;
      if (!containerRef.current.contains(target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative h-full flex">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className={
          "h-full px-3 py-3 gap-2 inline-flex items-center justify-center whitespace-nowrap " +
          (hasError ? "text-red-600" : "text-gray-700 dark:text-gray-200")
        }
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`fi fi-${selected.flag}`} aria-hidden />
        <span className="text-sm font-medium" dir="ltr">
          {selected.dial}
        </span>
        <span className="material-symbols-outlined text-base" aria-hidden>
          expand_more
        </span>
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-gray-200 dark:border-[#332e25] bg-surface-light dark:bg-surface-dark shadow-soft overflow-hidden z-50"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={
                "w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-gray-50 dark:hover:bg-[#221d14] transition-colors " +
                (opt.value === value
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-200")
              }
            >
              <span className={`fi fi-${opt.flag}`} aria-hidden />
              <span className="flex-1 text-right">{opt.label}</span>
              <span className="text-gray-500 dark:text-gray-400" dir="ltr">
                {opt.dial}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function Step2CustomerInfo({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const t = useTranslations("cart.step2");

  const countryOptions = useMemo<CountryOption[]>(
    () => [
      {
        value: "id",
        dial: "+62",
        flag: "id",
        label: t("options.countries.id"),
      },
      {
        value: "ms",
        dial: "+60",
        flag: "my",
        label: t("options.countries.ms"),
      },
      {
        value: "tr",
        dial: "+90",
        flag: "tr",
        label: t("options.countries.tr"),
      },
      {
        value: "lk",
        dial: "+94",
        flag: "lk",
        label: t("options.countries.lk"),
      },
    ],
    [t],
  );

  const phoneCountryOptions = useMemo<PhoneCountryOption[]>(
    () => [
      {
        value: "sa",
        dial: "+966",
        flag: "sa",
        label: t("options.phoneCountries.sa"),
      },
      ...countryOptions.map((c) => ({
        value: c.value,
        dial: c.dial,
        flag: c.flag,
        label: c.label,
      })),
    ],
    [countryOptions, t],
  );

  const allowedCountryValues = useMemo<CountryValue[]>(
    () => countryOptions.map((c) => c.value),
    [countryOptions],
  );

  const schema = useMemo(
    () => createStep2CustomerInfoSchema(t, allowedCountryValues),
    [t, allowedCountryValues],
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Step2CustomerInfoValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phoneCountry: "sa",
      phone: "",
      email: "",
      country: "",
      birthDate: "",
      performedHajjOrUmrahBefore: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = () => {
    onNext();
  };

  const birthDateValue = watch("birthDate");
  const birthDatePickerRef = useRef<HTMLInputElement | null>(null);

  const fieldBaseClassName =
    "w-full rounded-xl border bg-background-light dark:bg-background-dark px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary";

  const selectBaseClassName =
    "w-full rounded-xl border bg-background-light dark:bg-background-dark px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary";

  return (
    <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft p-6 border border-gray-100 dark:border-[#332e25]">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-[#332e25]">
        <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
          2
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          بيانات العميل
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("fields.fullNameLabel")}
            </label>
            <input
              {...register("fullName")}
              className={`${fieldBaseClassName} ${errors.fullName ? "border-red-400 dark:border-red-500 focus:ring-red-500/30 focus:border-red-500" : "border-gray-200 dark:border-[#332e25]"}`}
              placeholder={t("fields.fullNamePlaceholder")}
              type="text"
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName?.message ? (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("fields.phoneLabel")}
            </label>
            <div dir="ltr">
              <div
                className={
                  "w-full rounded-xl border bg-background-light dark:bg-background-dark flex items-stretch focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary " +
                  (errors.phone || errors.phoneCountry
                    ? "border-red-400 dark:border-red-500"
                    : "border-gray-200 dark:border-[#332e25]")
                }
              >
                <div className="border-r border-gray-200 dark:border-[#332e25] bg-surface-light/50 dark:bg-background-dark flex items-stretch">
                  <Controller
                    control={control}
                    name="phoneCountry"
                    render={({ field }) => (
                      <PhoneCountrySelect
                        options={phoneCountryOptions}
                        value={(field.value || "sa") as PhoneCountryValue}
                        onChange={(v) => field.onChange(v)}
                        hasError={Boolean(errors.phoneCountry)}
                      />
                    )}
                  />
                </div>

                <input
                  {...register("phone")}
                  className="flex-1 bg-transparent px-4 py-3 text-gray-900 dark:text-white focus:outline-none"
                  placeholder={t("fields.phonePlaceholder")}
                  type="tel"
                  inputMode="numeric"
                  aria-invalid={Boolean(errors.phone)}
                />
              </div>
            </div>
            {errors.phone?.message ? (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            ) : null}
            {errors.phoneCountry?.message ? (
              <p className="text-sm text-red-500">
                {errors.phoneCountry.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("fields.emailLabel")}
            </label>
            <input
              {...register("email")}
              className={`${fieldBaseClassName} ${errors.email ? "border-red-400 dark:border-red-500 focus:ring-red-500/30 focus:border-red-500" : "border-gray-200 dark:border-[#332e25]"}`}
              placeholder={t("fields.emailPlaceholder")}
              type="email"
              dir="ltr"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email?.message ? (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("fields.countryLabel")}
            </label>
            <select
              {...register("country")}
              className={`${selectBaseClassName} ${errors.country ? "border-red-400 dark:border-red-500 focus:ring-red-500/30 focus:border-red-500" : "border-gray-200 dark:border-[#332e25]"}`}
              aria-invalid={Boolean(errors.country)}
            >
              <option value="">{t("fields.countryPlaceholder")}</option>
              {countryOptions.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {errors.country?.message ? (
              <p className="text-sm text-red-500">{errors.country.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("fields.birthDateLabel")}
            </label>
            <div className="relative">
              <input
                {...register("birthDate", {
                  onChange: (e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = formatBirthDateInput(target.value);
                  },
                })}
                className={`${fieldBaseClassName} pr-12 ${errors.birthDate ? "border-red-400 dark:border-red-500 focus:ring-red-500/30 focus:border-red-500" : "border-gray-200 dark:border-[#332e25]"}`}
                placeholder={t("fields.birthDatePlaceholder")}
                type="text"
                dir="ltr"
                inputMode="numeric"
                autoComplete="bday"
                aria-invalid={Boolean(errors.birthDate)}
              />

              <button
                type="button"
                onClick={() => {
                  const el = birthDatePickerRef.current;
                  if (!el) return;
                  if (
                    typeof (el as unknown as { showPicker?: () => void })
                      .showPicker === "function"
                  ) {
                    (el as unknown as { showPicker: () => void }).showPicker();
                    return;
                  }
                  el.focus();
                  el.click();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                aria-label={t("fields.birthDateLabel")}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  aria-hidden
                >
                  calendar_month
                </span>
              </button>

              <input
                ref={birthDatePickerRef}
                type="date"
                tabIndex={-1}
                value={isoDateFromDDMMYYYY(birthDateValue || "")}
                onChange={(e) => {
                  setValue("birthDate", ddmmyyyyFromISODate(e.target.value), {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                }}
                className="absolute inset-0 opacity-0 pointer-events-none"
                aria-hidden
              />
            </div>
            {errors.birthDate?.message ? (
              <p className="text-sm text-red-500">{errors.birthDate.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("fields.performedHajjOrUmrahBeforeLabel")}
            </span>

            <div
              className={
                "w-full rounded-xl border bg-background-light dark:bg-background-dark px-4 py-3 flex items-center gap-6 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary " +
                (errors.performedHajjOrUmrahBefore
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-200 dark:border-[#332e25]")
              }
              role="radiogroup"
              aria-invalid={Boolean(errors.performedHajjOrUmrahBefore)}
            >
              <label className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <input
                  type="radio"
                  value="yes"
                  {...register("performedHajjOrUmrahBefore")}
                  className="accent-primary"
                />
                <span>{t("options.yesNo.yes")}</span>
              </label>
              <label className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <input
                  type="radio"
                  value="no"
                  {...register("performedHajjOrUmrahBefore")}
                  className="accent-primary"
                />
                <span>{t("options.yesNo.no")}</span>
              </label>
            </div>

            {errors.performedHajjOrUmrahBefore?.message ? (
              <p className="text-sm text-red-500">
                {errors.performedHajjOrUmrahBefore.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-3 rounded-xl border border-gray-200 dark:border-[#332e25] bg-surface-light dark:bg-background-dark text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-50 dark:hover:bg-[#221d14] transition-colors"
          >
            {t("actions.back")}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {t("actions.next")}
          </button>
        </div>
      </form>
    </section>
  );
}
