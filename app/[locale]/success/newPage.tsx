"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaRegCheckCircle as Check } from "react-icons/fa";

const SuccessPage = () => {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   // Redirect back to the localized home page after 5 seconds
    //   if (locale) {
    //     router.push(`/${locale}`);
    //   } else {
    //     router.push("/");
    //   }
    // }, 5000);
    // return () => clearTimeout(timer);
  }, [locale, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <Check className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">تم بنجاح!</h1>
        <p className="text-gray-600 mb-4">
          تم استقبال طلبك بنجاح. سنتواصل معك قريباً على البريد الإلكتروني أو رقم
          الجوال المسجل.
        </p>
        <div className="flex flex-col items-center gap-3 mt-4">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">
            سيتم تحويلك إلى الصفحة الرئيسية خلال بضع ثوانٍ...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
