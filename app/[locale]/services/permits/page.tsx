import {
  type PermitRequestT,
  getPermits,
  getPermitsWithToken,
} from "@/app/api/permit";
import AboutSection from "./AboutSection";
import CtaSection from "./CtaSection";
import HeroSection from "./HeroSection";
import NoticeSection from "./NoticeSection";
import PermitTypesSection from "./PermitTypesSection";
import RequiredDocumentsSection from "./RequiredDocumentsSection";
import StepsSection from "./StepsSection";
import { hasRequestTokenCookieServer } from "@/lib/utils/requestToken.server";

export default async function PermitsServicePage() {
  const permitCards = [
    {
      title: "تصريح الحج",
      description:
        "خدمة شاملة لإصدار تصاريح الحج للمواطنين والمقيمين، تشمل التسجيل في المسار الإلكتروني ومتابعة الموافقات.",
      icon: "landscape",
      detailsHref: "#",
    },
    {
      title: "تصريح العمرة",
      description:
        "إصدار فوري لتصاريح العمرة وزيارة الروضة الشريفة عبر التطبيقات المعتمدة، مع حلول للمجموعات والأفراد.",
      icon: "dark_mode",
      detailsHref: "#",
    },
    {
      title: "تصاريح موسمية",
      description:
        "خدمات مخصصة لمنظمي الرحلات والكوادر العاملة خلال المواسم، لضمان الدخول القانوني للمشاعر المقدسة.",
      icon: "badge",
      detailsHref: "#",
    },
  ] as const;

  const requiredDocs = [
    "صورة الهوية الوطنية / الإقامة",
    "سجل التطعيمات (لقاح كورونا والحمى الشوكية)",
    "صورة شخصية حديثة (خلفية بيضاء)",
    "جواز السفر (للقادمين من الخارج)",
    "تأشيرة دخول سارية المفعول",
    "إثبات صلة القرابة (للمحرم)",
  ] as const;

  const steps = [
    {
      number: 1,
      title: "تقديم الطلب",
      description: "تعبئة النموذج الإلكتروني ورفع المستندات الأولية.",
    },
    {
      number: 2,
      title: "مراجعة وتدقيق",
      description: "يتولى فريقنا التحقق من صحة البيانات والمرفقات.",
    },
    {
      number: 3,
      title: "الموافقة الرسمية",
      description: "إرسال الطلب للجهات المعنية وانتظار الاعتماد.",
    },
    {
      number: 4,
      title: "استلام التصريح",
      description: "يصلك التصريح عبر التطبيق أو البريد الإلكتروني.",
    },
  ] as const;

  const initialPermits = await getPermits();
  const hasToken = await hasRequestTokenCookieServer();
  let requestedPermits: PermitRequestT | null = null;
  if (hasToken) {
    try {
      requestedPermits = await getPermitsWithToken();
    } catch {
      requestedPermits = null;
    }
  }

  return (
    <main className="flex-grow w-full overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <PermitTypesSection cards={permitCards} />
      <RequiredDocumentsSection docs={requiredDocs} />
      <StepsSection steps={steps} />
      <NoticeSection />
      <CtaSection
        initialPermits={initialPermits}
        requestedPermit={requestedPermits}
      />
    </main>
  );
}
