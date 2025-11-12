"use client";
import { useEffect } from "react";
import { ServiceT } from "@/app/[locale]/actions/services";
import Container from "../../common/Container";
import ServiceSidebar from "./ServiceSidebar";
import { useTranslations } from "next-intl";
import ServiceItemCard from "../../ui/cards/ServiceItemCard";
import ServiceForm from "../../ui/form/ServiceForm";

const ServiceDetailsInfo = ({ service }: { service?: ServiceT | null }) => {
  const t = useTranslations();
  const details = [
    {
      id: 1,
      label: t("services.details.description"),
      value: service?.conditions,
      icon: "/icons/services/icon-1.svg",
    },
    {
      id: 2,
      label: t("services.details.cost"),
      value: service?.cost,
      icon: "/icons/services/icon-2.svg",
    },
    {
      id: 3,
      label: t("services.details.duration"),
      value: service?.duration,
      icon: "/icons/services/icon-3.svg",
    },
    {
      id: 4,
      label: t("services.details.government_fees"),
      value: service?.government_fees,
      icon: "/icons/services/icon-4.svg",
    },
  ];
  const requiredDocuments = {
    title: t("services.details.required_documents"),
    points: service?.required_documents || [],
  };

  const benefits = {
    title: t("services.details.benefits"),
    points: service?.benefits || [],
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [service]);

  if (!service) return <div>Service not found!</div>;

  return (
    <section className="section-gap">
      <Container className="flex flex-col lg:flex-row gap-[30px]">
        {/* left part */}
        <div className="lg:w-[70%] w-full">
          {/* <Image
            className="w-full h-auto rounded-[10px]"
            src={currentService?.image}
            width={850}
            height={445}
            priority
            alt="Service image"
          /> */}
          <div className="flex flex-col gap-y-[30px] mt-[30px]">
            <div>
              <h2>{service?.name_i18n}</h2>

              {/* <div className="flex flex-col gap-5 mt-5">
                {service?.paragraphs?.map((p, index) => (
                  <div key={index}>
                    <p>{p}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3>Empowering Your Digital Future</h3>
              <div className="flex flex-col gap-5 mt-[30px]">
                {service?.points?.map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FiChevronsRight className="text-[#E5E8F2] w-5 h-5 mt-1 flex-shrink-0" />
                    <span className="text-textColor text-[16px] font-normal leading-7 font-secondary tracking-[-0.36px]">
                      {point}
                    </span>
                  </div>
                ))}
              </div> */}

              <p className="my-[30px]">{service?.description_i18n}</p>
            </div>

            {/* Connecting You to Tomorrow */}
            <div>
              {/* <ConnectingService /> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] my-[30px]">
                {details.map((detail) => (
                  <ServiceItemCard
                    key={detail.id}
                    title={detail.label}
                    icon={detail.icon}
                    description={detail.value}
                  />
                ))}
              </div>
            </div>

            <ServiceForm />
          </div>
        </div>

        {/* right part */}
        <div className="lg:w-[30%] w-full">
          <ServiceSidebar
            requiredDocuments={requiredDocuments}
            benefits={benefits}
          />
        </div>
      </Container>
    </section>
  );
};

export default ServiceDetailsInfo;
