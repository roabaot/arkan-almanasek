"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RiArrowDownSLine, RiCalendar2Line } from "react-icons/ri";

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
type CountryFieldValue = "" | CountryValue;

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

function CountrySelect({
  options,
  value,
  onChange,
  placeholder,
  hasError,
}: {
  options: CountryOption[];
  value: CountryFieldValue;
  onChange: (v: CountryFieldValue) => void;
  placeholder: string;
  hasError: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.value === value) ?? null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const target = e.target as Node;
      if (!containerRef.current.contains(target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const triggerBase =
    "w-full rounded-xl border bg-white px-4 py-3 inline-flex items-center justify-between gap-3 focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className={
          triggerBase +
          " " +
          (hasError ? "border-red-400" : "border-[var(--color-accent)]")
        }
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-3 min-w-0">
          {selected ? <span className={`fi fi-${selected.flag}`} aria-hidden /> : null}
          <span
            className={
              "text-sm font-medium min-w-0 truncate " +
              (selected ? "text-[#111811]" : "text-black/50")
            }
          >
            {selected ? selected.label : placeholder}
          </span>
        </span>
        <RiArrowDownSLine
          className={
            "text-base shrink-0 " + (hasError ? "text-red-600" : "text-black/50")
          }
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute top-full left-0 mt-2 w-full rounded-xl border border-[var(--color-accent)] bg-white shadow-[var(--shadow-soft)] overflow-hidden z-50"
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
                "w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-white/70 transition-colors " +
                (opt.value === value
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "text-[#111811]")
              }
            >
              <span className={`fi fi-${opt.flag}`} aria-hidden />
              <span className="flex-1 text-right">{opt.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

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
          (hasError ? "text-red-600" : "text-[#111811]")
        }
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`fi fi-${selected.flag}`} aria-hidden />
        <span className="text-sm font-medium" dir="ltr">
          {selected.dial}
        </span>
        <RiArrowDownSLine className="text-base" aria-hidden />
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-[var(--color-accent)] bg-white shadow-[var(--shadow-soft)] overflow-hidden z-50"
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
                "w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-white/70 transition-colors " +
                (opt.value === value
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "text-[#111811]")
              }
            >
              <span className={`fi fi-${opt.flag}`} aria-hidden />
              <span className="flex-1 text-right">{opt.label}</span>
              <span className="text-black/50" dir="ltr">
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
  formId,
  initialValues,
  submitError,
  isSaving,
}: {
  onBack: () => void;
  onNext: (values: Step2CustomerInfoValues) => void | Promise<void>;
  formId?: string;
  initialValues?: Partial<Step2CustomerInfoValues>;
  submitError?: string | null;
  isSaving?: boolean;
}) {
  const t = useTranslations("cart.step2");
  const resolvedFormId = formId ?? "customer-info-form";

  const countryOptions = useMemo<CountryOption[]>(
    () => [
      { value: "id", dial: "+62", flag: "id", label: t("options.countries.id") },
      { value: "ms", dial: "+60", flag: "my", label: t("options.countries.ms") },
      { value: "tr", dial: "+90", flag: "tr", label: t("options.countries.tr") },
      { value: "lk", dial: "+94", flag: "lk", label: t("options.countries.lk") },
    ],
    [t],
  );

  const phoneCountryOptions = useMemo<PhoneCountryOption[]>(
    () => [
      { value: "sa", dial: "+966", flag: "sa", label: t("options.phoneCountries.sa") },
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

  const baseDefaultValues = useMemo<Step2CustomerInfoValues>(
    () => ({
      fullName: "",
      phoneCountry: "sa",
      phone: "",
      email: "",
      country: "",
      birthDate: "",
      performedHajjOrUmrahBefore: "",
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Step2CustomerInfoValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
      ? { ...baseDefaultValues, ...initialValues }
      : baseDefaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!initialValues) return;
    reset({ ...baseDefaultValues, ...initialValues });
  }, [baseDefaultValues, initialValues, reset]);

  const onSubmit = async (values: Step2CustomerInfoValues) => {
    await onNext(values);
  };

  const birthDateValue = watch("birthDate");
  const birthDatePickerRef = useRef<HTMLInputElement | null>(null);

  const fieldBaseClassName =
    "w-full rounded-xl border bg-white px-4 py-3 text-[#111811] focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]";

  return (
    <section className="rounded-3xl bg-white/60 backdrop-blur border border-[var(--color-accent)] p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-accent)]">
        <div className="size-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
          2
        </div>
        <h3 className="text-xl font-bold text-[#111811]">{t("title")}</h3>
      </div>

      <form id={resolvedFormId} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-black/60">
              {t("fields.fullNameLabel")}
            </label>
            <input
              {...register("fullName")}
              className={`${fieldBaseClassName} ${errors.fullName ? "border-red-400 focus:ring-red-500/30 focus:border-red-500" : "border-[var(--color-accent)]"}`}
              placeholder={t("fields.fullNamePlaceholder")}
              type="text"
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName?.message ? (
              <p className="text-sm text-red-600">{errors.fullName.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black/60">
              {t("fields.phoneLabel")}
            </label>
            <div dir="ltr">
              <div
                className={
                  "w-full min-w-0 rounded-xl border bg-white flex items-stretch focus-within:ring-2 focus-within:ring-[var(--color-primary)]/30 focus-within:border-[var(--color-primary)] " +
                  (errors.phone || errors.phoneCountry
                    ? "border-red-400"
                    : "border-[var(--color-accent)]")
                }
              >
                <div className="shrink-0 border-r border-[var(--color-accent)] bg-white/50 flex items-stretch">
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
                  className="min-w-0 w-0 flex-1 bg-white px-4 py-3 text-[#111811] focus:outline-none"
                  placeholder={t("fields.phonePlaceholder")}
                  type="tel"
                  inputMode="numeric"
                  aria-invalid={Boolean(errors.phone)}
                />
              </div>
            </div>
            {errors.phone?.message ? (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            ) : null}
            {errors.phoneCountry?.message ? (
              <p className="text-sm text-red-600">{errors.phoneCountry.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black/60">
              {t("fields.emailLabel")}
            </label>
            <input
              {...register("email")}
              className={`${fieldBaseClassName} ${errors.email ? "border-red-400 focus:ring-red-500/30 focus:border-red-500" : "border-[var(--color-accent)]"}`}
              placeholder={t("fields.emailPlaceholder")}
              type="email"
              dir="ltr"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email?.message ? (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black/60">
              {t("fields.countryLabel")}
            </label>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <CountrySelect
                  options={countryOptions}
                  value={(field.value ?? "") as CountryFieldValue}
                  onChange={(v) => field.onChange(v)}
                  placeholder={t("fields.countryPlaceholder")}
                  hasError={Boolean(errors.country)}
                />
              )}
            />
            {errors.country?.message ? (
              <p className="text-sm text-red-600">{errors.country.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black/60">
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
                className={`${fieldBaseClassName} pr-12 ${errors.birthDate ? "border-red-400 focus:ring-red-500/30 focus:border-red-500" : "border-[var(--color-accent)]"}`}
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
                    typeof (el as unknown as { showPicker?: () => void }).showPicker ===
                    "function"
                  ) {
                    (el as unknown as { showPicker: () => void }).showPicker();
                    return;
                  }
                  el.focus();
                  el.click();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-[#111811]"
                aria-label={t("fields.birthDateLabel")}
              >
                <RiCalendar2Line className="text-[20px]" aria-hidden />
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
              <p className="text-sm text-red-600">{errors.birthDate.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-black/60">
              {t("fields.performedHajjOrUmrahBeforeLabel")}
            </span>

            <div
              className={
                "w-full rounded-xl border bg-white px-4 py-3 flex items-center gap-6 focus-within:ring-2 focus-within:ring-[var(--color-primary)]/30 focus-within:border-[var(--color-primary)] " +
                (errors.performedHajjOrUmrahBefore
                  ? "border-red-400"
                  : "border-[var(--color-accent)]")
              }
              role="radiogroup"
              aria-invalid={Boolean(errors.performedHajjOrUmrahBefore)}
            >
              <label className="inline-flex items-center gap-2 text-[#111811]">
                <input
                  type="radio"
                  value="yes"
                  {...register("performedHajjOrUmrahBefore")}
                  className="accent-[var(--color-primary)]"
                />
                <span>{t("options.yesNo.yes")}</span>
              </label>
              <label className="inline-flex items-center gap-2 text-[#111811]">
                <input
                  type="radio"
                  value="no"
                  {...register("performedHajjOrUmrahBefore")}
                  className="accent-[var(--color-primary)]"
                />
                <span>{t("options.yesNo.no")}</span>
              </label>
            </div>

            {errors.performedHajjOrUmrahBefore?.message ? (
              <p className="text-sm text-red-600">
                {errors.performedHajjOrUmrahBefore.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-3 rounded-xl border border-[var(--color-accent)] bg-white text-black/60 font-bold hover:text-[#111811] hover:bg-white/80 transition-colors"
          >
            {t("actions.back")}
          </button>

          {submitError ? (
            <p className="sm:order-3 sm:ml-auto sm:self-center text-sm text-red-600">
              {submitError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting || Boolean(isSaving)}
            className="px-5 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold shadow-sm hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-primary)]"
          >
            {t("actions.next")}
          </button>
        </div>
      </form>
    </section>
  );
}
