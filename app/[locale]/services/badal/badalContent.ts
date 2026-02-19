import type { IconType } from "react-icons";
import {
  MdAccessible,
  MdSavings,
  MdSentimentDissatisfied,
} from "react-icons/md";

export const steps = [
  {
    number: 1,
    title: "تقديم الطلب",
    description: "تعبئة بيانات المستفيد ونوع النسك (حج أو عمرة).",
  },
  {
    number: 2,
    title: "التحقق والدفع",
    description: "مراجعة الطلب وتأكيد الدفع إلكترونياً بأمان.",
  },
  {
    number: 3,
    title: "تعيين المؤدي",
    description: "اختيار طالب علم مؤهل للقيام بالنسك.",
  },
  {
    number: 4,
    title: "أداء المناسك",
    description: "البدء في المناسك مع توثيق حي بالدعاء.",
  },
  {
    number: 5,
    title: "التوثيق",
    description: "استلام شهادة إتمام ومقاطع الفيديو.",
  },
] as const;

export const conditions: readonly {
  Icon: IconType;
  title: string;
  description: string;
}[] = [
  {
    Icon: MdSentimentDissatisfied,
    title: "المتوفى",
    description:
      "تجوز النيابة في الحج والعمرة عن الميت الذي لم يؤد الفريضة، أو أراد أهله التطوع عنه لزيادة أجره.",
  },
  {
    Icon: MdAccessible,
    title: "العاجز عجزاً دائماً",
    description:
      "المريض مرضاً لا يرجى شفاؤه، أو الكبير في السن الذي لا يستطيع الثبات على الراحلة والسفر.",
  },
  {
    Icon: MdSavings,
    title: "الاستطاعة المالية",
    description:
      "أن يكون الشخص الموكل (طالب الخدمة) قادراً على تحمل نفقات النائب وتوكيله.",
  },
];

export const faqs = [
  {
    question: "هل هذه الخدمة جائزة شرعاً؟",
    answer:
      "نعم، تجوز النيابة في الحج والعمرة عن الميت والعاجز عجزاً لا يرجى برؤه، وذلك باتفاق أهل العلم، وقد وردت أحاديث صحيحة تثبت جواز ذلك.",
  },
  {
    question: "كيف أتأكد من أداء النسك؟",
    answer:
      "نقوم بتزويدك بتوثيق مرئي (فيديو) للمؤدي وهو ينطق بالنية باسم صاحب الطلب، بالإضافة إلى مقاطع من الطواف والسعي والدعاء.",
  },
  {
    question: "من هم الذين يؤدون العمرة والحج؟",
    answer:
      "نتعامل مع طلاب علم وحفظة لكتاب الله مقيمين في مكة المكرمة، مشهود لهم بالصلاح والأمانة، وسبق لهم أداء الفريضة عن أنفسهم.",
  },
] as const;
