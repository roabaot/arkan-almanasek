"use client";

import { useId, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  RiBankCardLine,
  RiBankLine,
  RiLock2Line,
  RiUploadCloud2Line,
} from "react-icons/ri";

import { createStep3PaymentSchema, type PaymentMethod } from "@/lib/validation";

import { formatCardNumber, formatExpiry, formatFileSize } from "@/lib/utils";

type CardData = {
  cardholder: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

type FieldErrorKey =
  | "method"
  | "cardholder"
  | "cardNumber"
  | "expiry"
  | "cvc"
  | "receipt";

type CardFieldKey = keyof CardData;

type CardField = {
  key: CardFieldKey;
  label: string;
  placeholder: string;
  type: "text" | "password";
  dir: "rtl" | "ltr";
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "search"
    | "email"
    | "url";
  autoComplete?: string;
};

export default function Step3Payment({
  onBack,
  onConfirm,
}: {
  onBack: () => void;
  onConfirm: () => void;
}) {
  const t = useTranslations("cart.step3");
  const groupName = useId();
  const bankReceiptInputId = useId();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [errors, setErrors] = useState<Partial<Record<FieldErrorKey, string>>>(
    {},
  );

  const optionBase =
    "relative flex items-center p-4 rounded-xl cursor-pointer transition-all";
  const optionSelected = "border-2 border-primary bg-primary/5 shadow-sm";
  const optionUnselected =
    "border border-gray-200 dark:border-[#332e25] hover:bg-gray-50 dark:hover:bg-[#221d14]";

  const inputBase =
    "w-full rounded-lg border border-gray-200 dark:border-[#332e25] bg-background-light dark:bg-background-dark px-4 py-3 text-sm focus:border-primary focus:ring-primary";

  const inputErrorClass =
    "border-red-500 focus:border-red-500 focus:ring-red-500";

  const cardFields = useMemo<CardField[]>(
    () => [
      {
        key: "cardholder",
        label: t("card.fields.cardholder.label"),
        placeholder: t("card.fields.cardholder.placeholder"),
        type: "text" as const,
        dir: "rtl" as const,
      },
      {
        key: "cardNumber",
        label: t("card.fields.cardNumber.label"),
        placeholder: t("card.fields.cardNumber.placeholder"),
        type: "text" as const,
        dir: "ltr" as const,
        inputMode: "numeric" as const,
        autoComplete: "cc-number" as const,
      },
      {
        key: "expiry",
        label: t("card.fields.expiry.label"),
        placeholder: t("card.fields.expiry.placeholder"),
        type: "text" as const,
        dir: "ltr" as const,
        inputMode: "numeric" as const,
        autoComplete: "cc-exp" as const,
      },
      {
        key: "cvc",
        label: t("card.fields.cvc.label"),
        placeholder: t("card.fields.cvc.placeholder"),
        type: "password" as const,
        dir: "ltr" as const,
        inputMode: "numeric" as const,
        autoComplete: "cc-csc" as const,
      },
    ],
    [t],
  );

  const [cardData, setCardData] = useState<CardData>({
    cardholder: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [bankReceipt, setBankReceipt] = useState<File | null>(null);

  const validateAndConfirm = () => {
    const values =
      method === "card"
        ? {
            method,
            ...cardData,
          }
        : {
            method,
            receipt: bankReceipt,
          };

    const schema = createStep3PaymentSchema((key) => t(key));
    const result = schema.safeParse(values);
    if (result.success) {
      setErrors({});
      onConfirm();
      return;
    }

    const nextErrors: Partial<Record<FieldErrorKey, string>> = {};
    for (const issue of result.error.issues) {
      const key = (issue.path[0] ?? "method") as FieldErrorKey;
      if (!nextErrors[key]) nextErrors[key] = issue.message;
    }
    setErrors(nextErrors);
  };

  return (
    <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft p-6 border border-gray-100 dark:border-[#332e25]">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-[#332e25]">
        <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
          3
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {t("title")}
        </h3>
      </div>

      <div className="space-y-4">
        <label
          className={`${optionBase} ${
            method === "card" ? optionSelected : optionUnselected
          }`}
        >
          <input
            checked={method === "card"}
            onChange={() => {
              setMethod("card");
              setErrors((s) => ({
                ...s,
                method: undefined,
                receipt: undefined,
              }));
            }}
            className="size-5 text-primary focus:ring-primary border-gray-300"
            name={groupName}
            type="radio"
          />
          <div className="mr-4 flex-1">
            <span className="block font-bold text-gray-900 dark:text-white">
              {t("methods.card.title")}
            </span>
            <span className="block text-sm text-gray-500 dark:text-gray-400">
              {t("methods.card.description")}
            </span>
          </div>
          <div className="flex gap-2 text-gray-400">
            <RiBankCardLine aria-hidden />
          </div>
        </label>

        <label
          className={`${optionBase} ${
            method === "bank" ? optionSelected : optionUnselected
          }`}
        >
          <input
            checked={method === "bank"}
            onChange={() => {
              setMethod("bank");
              setErrors((s) => ({
                ...s,
                method: undefined,
                cardholder: undefined,
                cardNumber: undefined,
                expiry: undefined,
                cvc: undefined,
              }));
            }}
            className="size-5 text-primary focus:ring-primary border-gray-300"
            name={groupName}
            type="radio"
          />
          <div className="mr-4 flex-1">
            <span className="block font-bold text-gray-900 dark:text-white">
              {t("methods.bank.title")}
            </span>
            <span className="block text-sm text-gray-500 dark:text-gray-400">
              {t("methods.bank.description")}
            </span>
          </div>
          <div className="flex gap-2 text-gray-400">
            <RiBankLine aria-hidden />
          </div>
        </label>
      </div>

      {method === "card" ? (
        <div className="mt-6 rounded-2xl border border-gray-100 dark:border-[#332e25] bg-background-light/60 dark:bg-background-dark/40 p-5">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h4 className="text-lg font-extrabold text-gray-900 dark:text-white">
              {t("card.title")}
            </h4>
            <div className="text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-2">
              <RiLock2Line className="text-base" aria-hidden />
              <span>{t("card.secureHint")}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cardFields.map((f) => {
              const isFull = f.key === "cardholder" || f.key === "cardNumber";
              return (
                <label
                  key={f.key}
                  className={isFull ? "sm:col-span-2" : "sm:col-span-1"}
                >
                  <span className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                    {f.label}
                  </span>
                  <input
                    dir={f.dir}
                    className={
                      inputBase +
                      (errors[f.key] ? ` ${inputErrorClass}` : "") +
                      (f.dir === "ltr" ? " text-left" : "")
                    }
                    placeholder={f.placeholder}
                    type={f.type}
                    inputMode={f.inputMode}
                    autoComplete={f.autoComplete}
                    value={cardData[f.key]}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setErrors((s) => ({ ...s, [f.key]: undefined }));
                      if (f.key === "cardNumber") {
                        setCardData((s) => ({
                          ...s,
                          cardNumber: formatCardNumber(raw),
                        }));
                        return;
                      }
                      if (f.key === "expiry") {
                        setCardData((s) => ({
                          ...s,
                          expiry: formatExpiry(raw),
                        }));
                        return;
                      }
                      if (f.key === "cvc") {
                        const digits = raw.replace(/\D/g, "").slice(0, 4);
                        setCardData((s) => ({ ...s, cvc: digits }));
                        return;
                      }
                      setCardData((s) => ({ ...s, [f.key]: raw }));
                    }}
                  />

                  {errors[f.key] ? (
                    <p className="mt-2 text-xs font-medium text-red-600">
                      {errors[f.key]}
                    </p>
                  ) : null}
                </label>
              );
            })}
          </div>

          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            {t("card.note")}
          </p>
        </div>
      ) : null}

      {method === "bank" ? (
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-gray-100 dark:border-[#332e25] bg-background-light/60 dark:bg-background-dark/40 p-5">
            <h4 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">
              {t("bank.title")}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {t("bank.description")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-gray-200 dark:border-[#332e25] bg-surface-light dark:bg-surface-dark px-4 py-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {t("bank.details.bankNameLabel")}
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {t("bank.details.bankNameValue")}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-[#332e25] bg-surface-light dark:bg-surface-dark px-4 py-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {t("bank.details.beneficiaryNameLabel")}
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  {t("bank.details.beneficiaryNameValue")}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-[#332e25] bg-surface-light dark:bg-surface-dark px-4 py-3 sm:col-span-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {t("bank.details.ibanLabel")}
                </div>
                <div
                  className="font-bold text-gray-900 dark:text-white"
                  dir="ltr"
                >
                  {t("bank.details.ibanValue")}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 dark:border-[#332e25] bg-background-light/60 dark:bg-background-dark/40 p-5">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h4 className="text-lg font-extrabold text-gray-900 dark:text-white">
                {t("bank.receipt.title")}
              </h4>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {t("bank.receipt.formats")}
              </span>
            </div>

            <input
              id={bankReceiptInputId}
              type="file"
              className="sr-only"
              accept="application/pdf,image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setBankReceipt(file);
                setErrors((s) => ({ ...s, receipt: undefined }));
              }}
            />

            <label
              htmlFor={bankReceiptInputId}
              className={
                "block rounded-2xl border-2 border-dashed bg-surface-light dark:bg-surface-dark px-4 py-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#221d14] transition-colors " +
                (errors.receipt
                  ? "border-red-500"
                  : "border-gray-300 dark:border-[#332e25]")
              }
            >
              <div className="flex items-start gap-3">
                <RiUploadCloud2Line
                  className="text-gray-500 dark:text-gray-400"
                  aria-hidden
                />
                <div className="flex-1">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {bankReceipt
                      ? t("bank.receipt.chosen")
                      : t("bank.receipt.upload")}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {bankReceipt
                      ? `${bankReceipt.name}${formatFileSize(bankReceipt.size) ? ` • ${formatFileSize(bankReceipt.size)}` : ""}`
                      : t("bank.receipt.chooseFromDevice")}
                  </div>
                </div>
              </div>
            </label>

            {errors.receipt ? (
              <p className="mt-2 text-xs font-medium text-red-600">
                {errors.receipt}
              </p>
            ) : null}

            {bankReceipt ? (
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {t("bank.receipt.wrongFileHint")}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBankReceipt(null);
                    setErrors((s) => ({ ...s, receipt: undefined }));
                  }}
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-[#332e25] bg-surface-light dark:bg-surface-dark text-gray-700 dark:text-gray-200 text-sm font-bold hover:bg-gray-50 dark:hover:bg-[#221d14] transition-colors"
                >
                  {t("bank.receipt.removeFile")}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-xl border border-gray-200 dark:border-[#332e25] bg-surface-light dark:bg-background-dark text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-50 dark:hover:bg-[#221d14] transition-colors"
        >
          {t("actions.back")}
        </button>
        <button
          type="button"
          onClick={validateAndConfirm}
          className="px-5 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/30 transition-all"
        >
          {t("actions.confirm")}
        </button>
      </div>
    </section>
  );
}
