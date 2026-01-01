"use client";
import { Fragment, useEffect } from "react";
import { ServiceT } from "@/app/[locale]/actions/services";
import Container from "../../common/Container";
import ServiceSidebar from "./ServiceSidebar";
import { useTranslations } from "next-intl";
import ServiceItemCard from "../../ui/cards/ServiceItemCard";
import ServiceForm from "../../ui/form/ServiceForm";
import MotionWrapper from "../../common/MotionWrapper";

const ServiceDetailsInfo = ({ service }: { service?: ServiceT | null }) => {
  const t = useTranslations();
  const details = [
    {
      id: 1,
      label: t("services.details.cost"),
      value: service?.cost,
      icon: "/icons/services/icon-2.svg",
    },
    {
      id: 2,
      label: t("services.details.duration"),
      value: service?.duration,
      icon: "/icons/services/icon-3.svg",
    },
    {
      id: 3,
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

  const conditions = {
    title: t("services.details.conditions"),
    points: service?.conditions || [],
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
          <div className="flex flex-col gap-y-[30px] mt-[30px]">
            <MotionWrapper>
              <div>
                <h2>{service?.name_i18n}</h2>
                <p className="my-[30px]">{service?.description_i18n}</p>
              </div>
            </MotionWrapper>

            {/* Connecting You to Tomorrow */}
            <MotionWrapper>
              <div>
                {/* <ConnectingService /> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] my-[30px]">
                  {details.map((detail, idx) => (
                    <Fragment key={detail.id}>
                      {detail.value && (
                        <MotionWrapper delay={idx * 0.06}>
                          <ServiceItemCard
                            key={detail.id}
                            title={detail.label}
                            icon={detail.icon}
                            description={detail.value}
                          />
                        </MotionWrapper>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </MotionWrapper>

            <MotionWrapper>
              <ServiceForm targetAudience={service?.target_audience} />
            </MotionWrapper>
          </div>
        </div>

        {/* right part */}
        <div className="lg:w-[30%] w-full">
          <ServiceSidebar
            requiredDocuments={requiredDocuments}
            benefits={benefits}
            conditions={conditions}
          />
        </div>
      </Container>
    </section>
  );
};

export default ServiceDetailsInfo;
