"use client";
import { motion, useInView } from "framer-motion";
import { ServiceCategoryT } from "../../../actions/services";
import ServiceItemCard from "../../ui/cards/ServiceItemCard";
import React from "react";
import SectionTitle from "../../common/SectionTitle";
import { useTranslations } from "next-intl";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
      // delay children by 0.5 seconds after container becomes visible
      delayChildren: 0.5,
    },
  },
};

// titleVariants removed (unused)

const ServiceHomeClient = ({
  services,
}: {
  services: (ServiceCategoryT & { service_category_ids?: string[] })[];
}) => {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");
  const isEmpty = !services || services.length === 0;
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });
  return (
    <motion.div
      ref={ref}
      className="py-16 bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${"/assets/about/pattern.png"})` }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* section title start here */}
      <SectionTitle
        label={t("title")}
        title={t("description")}
        align="center"
        delay={0.4}
        inView={isInView}
        inherit={true}
      />

      {/* all services */}
      <div className="md:mt-[60px] mt-12">
        {isEmpty ? (
          <div className="text-center py-10 border border-dashed border-primaryBorder rounded-lg">
            <p className="text-gray-600">{tCommon("empty")}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.9 }} // 0.4s title delay + 0.5s title duration
          >
            {services.map((service, index: number) => (
              <ServiceItemCard
                key={service.id}
                link={
                  service.service_category_ids
                    ? `/category/${service.service_category_ids[0]}`
                    : `/service/${service.id}`
                }
                title={service.name_i18n}
                icon={service.icon_url}
                order={index + 1 < 10 ? `0${index + 1}` : index + 1}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceHomeClient;
