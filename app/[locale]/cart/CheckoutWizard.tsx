"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Step1CartReview from "./steps/Step1CartReview";
import Step2CustomerInfo from "./steps/Step2CustomerInfo";
import Step3Payment from "./steps/Step3Payment";
import { type CartItem } from "./CartItemCard";

type Step = 1 | 2 | 3;

function parseStep(value: string | null): Step | null {
  if (!value) return null;
  const num = Number(value);
  if (num === 1 || num === 2 || num === 3) return num;
  return null;
}

const cartItems: CartItem[] = [
  {
    id: "hajj-package-economy",
    title: "باقة الحج الميسر (اقتصادي)",
    description: "شامل تذاكر الطيران، السكن في العزيزية، والمواصلات.",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuByysn7fb9JQ3GYSUi5V4XVzCWi1taeveZESDlx57YiafAEkK2OnHJCNluclQyhgVrS3fCU5-bYF1OaC6s7fGv6QeVi96QKUTjj7uo14-AFVApqt7CTihfCIq0e0GyLEJUcZarJA5FolaR49VQ6kt5jE_8Ys5NokPAV7jLSosaO8CPT3mSqMMuMlrC6fGU0gp1b6Z07Od_3VgNcAjbWvqltpmH0PuxTTyuaJaQluej_7MXZifbLH0KpMC5b1WkmNb_1-h3Qg9pGt58O",
      alt: "Holy Kaaba in Mecca with pilgrims circumambulating",
    },
    quantity: 1,
    priceLabel: "12,500 ر.س",
    badge: {
      icon: "flight",
      label: "مغادرة: جدة",
    },
  },
  {
    id: "vip-airport-pickup",
    title: "خدمة الاستقبال الخاص",
    description: "استقبال من المطار وسيارة خاصة إلى الفندق.",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC9-2NAT9QKWfPXiX-qcTVD7sGA5kxh55dHhNoLZx_SiV20H726aNH4qLGL1tv8sVXVuExC14I14SGoybJL1euGyWgADZGV0omTCWBD1iR-1m1VJDuQQBGZFt6wz2DnV3wRhr4nL38smfANrhlCVFcHjzEqsN-CoyDam8nWPF-MJRQK3QHb-EbQ6aWkdP6kOLT3NO3Iok9tXXomQLB7l_OfNLRmQLIcLA4qWdTpzBjr8ZSoB_EjcKPVLuazPLBlVIF--qUuLBRnC0J",
      alt: "Modern hotel room interior in Mecca",
    },
    quantity: 1,
    priceLabel: "500 ر.س",
  },
];

function Stepper({ step }: { step: Step }) {
  const steps = useMemo(
    () => [
      { n: 1 as const, label: "مراجعة السلة" },
      { n: 2 as const, label: "معلومات العميل" },
      { n: 3 as const, label: "طريقة الدفع" },
    ],
    [],
  );

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm md:text-base font-medium">
      {steps.map((s, index) => {
        const isActive = s.n === step;
        const isDone = s.n < step;

        return (
          <div key={s.n} className="flex items-center gap-2">
            <div
              className={
                isActive
                  ? "flex items-center gap-2 text-primary"
                  : isDone
                    ? "flex items-center gap-2 text-gray-500 dark:text-gray-400"
                    : "flex items-center gap-2 text-gray-400 dark:text-gray-500"
              }
            >
              <span
                className={
                  isActive
                    ? "flex items-center justify-center size-6 rounded-full bg-primary text-white text-xs"
                    : isDone
                      ? "flex items-center justify-center size-6 rounded-full bg-primary/15 text-primary text-xs border border-primary/25"
                      : "flex items-center justify-center size-6 rounded-full border border-gray-300 dark:border-gray-600 text-xs"
                }
              >
                {s.n}
              </span>
              <span>{s.label}</span>
            </div>

            {index < steps.length - 1 ? (
              <span className="text-gray-300 dark:text-gray-600 material-symbols-outlined text-sm">
                chevron_left
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function ProgressBar({ step }: { step: Step }) {
  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="mb-10">
      <div className="flex justify-between mb-2 text-sm font-medium">
        <span className="text-primary">الخطوة {step} من 3</span>
        <span className="text-gray-500 dark:text-gray-400">
          {progress}% مكتمل
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function CheckoutWizard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const stepFromUrl = parseStep(searchParams.get("step")) ?? 1;
  const [step, setStep] = useState<Step>(stepFromUrl);

  useEffect(() => {
    setStep(stepFromUrl);
  }, [stepFromUrl]);

  const setStepAndSyncUrl = (next: Step) => {
    setStep(next);

    const params = new URLSearchParams(searchParams.toString());
    if (next === 1) params.delete("step");
    else params.set("step", String(next));

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="bg-surface-light dark:bg-background-dark border-b border-gray-100 dark:border-[#332e25]">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
            إتمام الطلب
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">
            أكمل خطوات الحجز لإتمام رحلتك المباركة
          </p>

          <Stepper step={step} />
        </div>

        <ProgressBar step={step} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            {step === 1 ? <Step1CartReview items={cartItems} /> : null}

            {step === 2 ? (
              <Step2CustomerInfo
                onBack={() => setStepAndSyncUrl(1)}
                onNext={() => setStepAndSyncUrl(3)}
              />
            ) : null}

            {step === 3 ? (
              <Step3Payment
                onBack={() => setStepAndSyncUrl(2)}
                onConfirm={() => {
                  // placeholder for submitting payment
                }}
              />
            ) : null}
          </div>

          <div className="lg:w-96 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft p-6 border border-gray-100 dark:border-[#332e25]">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  ملخص الطلب
                </h3>

                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>المجموع الفرعي</span>
                    <span>13,000 ر.س</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>ضريبة القيمة المضافة (15%)</span>
                    <span>1,950 ر.س</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>رسوم الخدمة</span>
                    <span>0.00 ر.س</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-[#332e25] pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      الإجمالي
                    </span>
                    <span className="text-2xl font-black text-primary">
                      14,950 ر.س
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <input
                    className="flex-1 rounded-lg border border-gray-200 dark:border-[#332e25] bg-background-light dark:bg-background-dark px-4 py-3 text-sm focus:border-primary focus:ring-primary"
                    placeholder="كود الخصم"
                    type="text"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 dark:bg-[#1a160e] text-gray-700 dark:text-gray-200 rounded-lg text-sm font-bold hover:bg-gray-300 dark:hover:bg-[#221d14] transition-colors"
                  >
                    تطبيق
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setStepAndSyncUrl(step === 1 ? 2 : step === 2 ? 3 : 3)
                  }
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>
                    {step === 1
                      ? "متابعة لمعلومات العميل"
                      : step === 2
                        ? "متابعة للدفع"
                        : "تأكيد الدفع"}
                  </span>
                  <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
                    arrow_left_alt
                  </span>
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <span className="material-symbols-outlined text-sm">
                    lock
                  </span>
                  <span>مدفوعات آمنة ومشفرة 100%</span>
                </div>
              </div>

              <div className="bg-[#201b12] rounded-2xl p-6 text-white bg-[url('https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/80" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="size-10 rounded-full bg-white/20 flex items-center justify-center mb-3 backdrop-blur-sm">
                    <span className="material-symbols-outlined">
                      support_agent
                    </span>
                  </div>
                  <h4 className="font-bold mb-1">هل تحتاج مساعدة؟</h4>
                  <p className="text-sm opacity-90 mb-4">
                    فريقنا متاح 24/7 لمساعدتك في إتمام حجزك
                  </p>
                  <button
                    type="button"
                    className="bg-white text-primary text-sm font-bold px-6 py-2 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    تواصل معنا
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
