import Link from "next/link";
import { FaHandshake, FaMosque, FaPassport } from "react-icons/fa6";
import { RiBookOpenLine, RiHandHeartLine } from "react-icons/ri";

type ServiceCard = {
  title: string;
  description: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const SERVICES: ServiceCard[] = [
  {
    title: "الهدي والأضاحي",
    description:
      "خدمة موثوقة لذبح وتوزيع الهدي والأضاحي على فقراء الحرم، تتم بإشراف كامل وأمانة لضمان وصولها لمستحقيها.",
    href: "/services/hadi-and-udhiyah",
    Icon: RiHandHeartLine,
  },
  {
    title: "دليل المناسك",
    description:
      "دليل شامل وخطوات مصورة وتفاعلية لأداء مناسك الحج والعمرة بشكل صحيح وفق السنة النبوية المطهرة.",
    href: "/services/pilgrimage-guide",
    Icon: RiBookOpenLine,
  },
  {
    title: "استخراج تصاريح الحج والعمرة",
    description:
      "نساعدك في استخراج كافة التصاريح الرسمية اللازمة عبر القنوات المعتمدة بسرعة وسهولة تامة.",
    href: "/services/permits",
    Icon: FaPassport,
  },
  {
    title: "الاستشارات الشرعية",
    description:
      "تواصل مباشر مع نخبة من العلماء والدعاة للإجابة على استفساراتكم الفقهية أثناء أداء المناسك.",
    href: "/services/sharia-consultations",
    Icon: FaMosque,
  },
  {
    title: "الحج والعمرة عن الغير",
    description:
      "تنفيذ المناسك عن العاجز أو المتوفى بأيدي طلبة علم ثقات مع توثيق كامل لكل مرحلة من مراحل النسك.",
    href: "/services/hajj-and-umrah-on-behalf",
    Icon: FaHandshake,
  },
];

export default function HomeServices() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-primary text-3xl font-black text-[#111811] md:text-5xl">
            خدماتنا المميزة
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            نقدم باقة متكاملة من الخدمات الشرعية واللوجستية لتيسير رحلة الحج
            والعمرة عليكم
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {SERVICES.map(({ title, description, href, Icon }) => (
            <Link
              key={title}
              href={href}
              className="group flex w-full flex-col items-center rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
            >
              <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-primary/5 text-primary shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <Icon className="text-4xl" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {description}
              </p>
            </Link>
          ))}

          {/* Spacer card to match the original 6-card layout if needed */}
          {/* <div className="hidden w-full md:block md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]" /> */}
        </div>
      </div>
    </section>
  );
}
