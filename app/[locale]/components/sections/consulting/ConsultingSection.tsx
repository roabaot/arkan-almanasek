import React from "react";
import Container from "../../common/Container";
import Image from "next/image";
import SectionTitle from "../../common/SectionTitle";
import { useTranslations } from "next-intl";

const features = [
  {
    number: "01",
    title: "title_1",
    desc: "description_1",
  },
  {
    number: "02",
    title: "title_2",
    desc: "description_2",
  },
  {
    number: "03",
    title: "title_3",
    desc: "description_3",
  },
  {
    number: "04",
    title: "title_4",
    desc: "description_4",
  },
];

const ConsultingSection: React.FC = () => {
  const t = useTranslations("features");
  return (
    <section className="bg-white section-gap">
      <Container>
        <SectionTitle
          label={t("title")}
          title={t("description")}
          align="center"
        />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:mt-15 mt-12">
          {/* Left Content */}
          <div className="lg:w-[50%] w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 md:mt-15 mt-12">
              {features.map((step) => (
                <div key={step.number} className="flex flex-col">
                  <h2 className="text-[66px] font-secondary font-semibold text-number z-30 relative">
                    {step.number}
                  </h2>

                  <h3 className="xl:text-[28px] text-[24px] font-bold font-primary text-primary mb-2 mt-[-27px] ml-5 z-0 relative">
                    {t(`list.${step.title}`)}
                  </h3>
                  <p className="ml-5">{t(`list.${step.desc}`)}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Right Image */}
          <div className="lg:w-[43%] w-full">
            <Image
              src={"/assets/digital-service/banner.jpeg"}
              alt="Consulting"
              className="w-full rounded-[10px] xl:aspect-[11/9] lg:aspect-square object-cover"
              width={540}
              height={600}
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ConsultingSection;
