import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { FaHandshake, FaMosque, FaPassport } from "react-icons/fa6";
import { RiBookOpenLine, RiHandHeartLine } from "react-icons/ri";

type ServiceCard = {
  key: string;
  title: string;
  description: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const SERVICES: ServiceCard[] = [
  {
    key: "hadiAndUdhiyah",
    title: "",
    description: "",
    href: "/services/hadi-and-udhiyah",
    Icon: RiHandHeartLine,
  },
  {
    key: "pilgrimageGuide",
    title: "",
    description: "",
    href: "/services/pilgrimage-guide",
    Icon: RiBookOpenLine,
  },
  {
    key: "permits",
    title: "",
    description: "",
    href: "/services/permits",
    Icon: FaPassport,
  },
  {
    key: "shariaConsultations",
    title: "",
    description: "",
    href: "/services/sharia-consultations",
    Icon: FaMosque,
  },
  {
    key: "hajjAndUmrahOnBehalf",
    title: "",
    description: "",
    href: "/services/hajj-and-umrah-on-behalf",
    Icon: FaHandshake,
  },
];

export default async function HomeServices() {
  const t = await getTranslations("home.services");

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-primary text-3xl font-black text-[#111811] md:text-5xl">
            {t("sectionTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t("sectionDescription")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {SERVICES.map(({ key, href, Icon }) => (
            <Link
              key={key}
              href={href}
              className="group flex w-full flex-col items-center rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
            >
              <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-primary/5 text-primary shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <Icon className="text-4xl" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {t(`items.${key}.description`)}
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
