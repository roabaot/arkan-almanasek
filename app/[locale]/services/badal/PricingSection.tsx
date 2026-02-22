"use client";
import { MdCheck, MdModeNight, MdMosque } from "react-icons/md";

import BadalRequestButton from "./BadalRequestButton";
import { GetBadelResT, getBadels } from "@/app/api/badel";
import { useQuery } from "@tanstack/react-query";
import SarAmount from "@/app/components/ui/SarAmount";

export default function PricingSection({
  initialBadels,
}: {
  initialBadels: GetBadelResT;
}) {
  const { data: badelsRes } = useQuery({
    queryKey: ["badels"],
    queryFn: getBadels,
    initialData: initialBadels,
    staleTime: 1000 * 60,
  });

  console.log("badel: ", badelsRes);

  const badels = badelsRes?.on_behalves || [];
  const hajjBadel = badels.find((b) => b.type === "OnBehalfHajj");
  const umrahBadel = badels.find((b) => b.type === "OnBehalfUmrah");

  return (
    <section
      className="py-20 bg-background-light dark:bg-background-dark relative"
      id="pricing"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            اختر الباقة المناسبة
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            أسعار شفافة وشاملة لكافة الخدمات
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Umrah Card */}
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary/50 transition-colors">
            <div className="h-full flex flex-col p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {umrahBadel?.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {umrahBadel?.description}
                  </p>
                </div>
                <div className="flex bg-primary/10 text-primary p-2 rounded-lg">
                  <MdModeNight className="text-2xl" aria-hidden />
                </div>
              </div>

              <div className="text-3xl font-bold text-primary mb-6">
                {umrahBadel?.price != null ? (
                  <SarAmount
                    value={Number(umrahBadel.price)}
                    className="text-3xl font-bold text-primary"
                    symbolClassName="inline-block h-[0.9em] w-auto"
                  />
                ) : null}
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <MdCheck className="text-green-500 text-lg" aria-hidden />
                  نية وتلبية بالاسم
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <MdCheck className="text-green-500 text-lg" aria-hidden />
                  طواف وسعي وحلق/تقصير
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <MdCheck className="text-green-500 text-lg" aria-hidden />
                  فيديو للدعاء عند الكعبة
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <MdCheck className="text-green-500 text-lg" aria-hidden />
                  إنجاز خلال ٤٨ ساعة
                </li>
              </ul>

              <div className="mt-auto">
                <BadalRequestButton
                  serviceType="umrah"
                  label="طلب عمرة بدل"
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Hajj Card */}
          <div className="bg-surface-dark dark:bg-black rounded-2xl shadow-xl overflow-hidden border border-primary relative">
            <div className="absolute top-0 ltr:left-0 rtl:right-0 bg-primary text-white text-xs px-3 py-1 ltr:rounded-br-lg rtl:rounded-bl-lg font-bold">
              الأكثر طلباً
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {hajjBadel?.name}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">
                    {hajjBadel?.description}
                  </p>
                </div>
                <div className="flex bg-primary/20 text-primary p-2 rounded-lg">
                  <MdMosque className="text-2xl" aria-hidden />
                </div>
              </div>

              <div className="text-3xl font-bold text-primary mb-6">
                {hajjBadel?.price != null ? (
                  <SarAmount
                    value={Number(hajjBadel.price)}
                    className="text-3xl font-bold text-primary"
                    symbolClassName="inline-block h-[0.9em] w-auto"
                  />
                ) : null}
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-200">
                  <MdCheck className="text-primary text-lg" aria-hidden />
                  حج مفرد أو متمتع
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-200">
                  <MdCheck className="text-primary text-lg" aria-hidden />
                  الوقوف بعرفة والمبيت بمنى
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-200">
                  <MdCheck className="text-primary text-lg" aria-hidden />
                  الهدي (الأضحية)
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-200">
                  <MdCheck className="text-primary text-lg" aria-hidden />
                  توثيق شامل لكافة المشاعر
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-200">
                  <MdCheck className="text-primary text-lg" aria-hidden />
                  شهادة حج معتمدة
                </li>
              </ul>

              <BadalRequestButton
                serviceType="hajj"
                label="طلب حج بدل"
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
