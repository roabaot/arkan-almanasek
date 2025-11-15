import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import ServiceDetailsInfo from "@/app/[locale]/components/sections/serviceDetails/ServiceDetailsInfo";
import { Metadata } from "next";
import { getServiceById } from "../../actions/services";
import { getTranslations } from "next-intl/server";
import { handleServiceBreadcrumbs } from "@/app/lib/utils";
import dynamic from "next/dynamic";

const MotionWrapper = dynamic(
  () => import("@/app/[locale]/components/common/MotionWrapper"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Service Details | Putech – Business & IT Solutions Next.js Template",
  description:
    "Get in-depth information about our services at Putech – Business & IT Solutions Next.js template. Learn how our tailored IT and business solutions can help you grow.",
};

const ServiceDetails = async ({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) => {
  const { serviceId } = await params;

  const service = await getServiceById(serviceId);
  const t = await getTranslations();

  const breadcrumbs = handleServiceBreadcrumbs(service?.breadcrumbs ?? []);

  return (
    <div>
      {/************* Breadcrumb section start here **************/}
      <MotionWrapper>
        <Breadcrumb
          title={service?.name_i18n || "Service"}
          breadcrumb={[
            { name: t("common.home"), href: "/" },
            { name: t("services.title"), href: "/category" },
            ...(breadcrumbs ?? []),
          ]}
        />
      </MotionWrapper>

      {/************* Service details section start here **************/}
      <MotionWrapper>
        <ServiceDetailsInfo service={service} />
      </MotionWrapper>

      {/* pagination start */}
      {/* <Pagination /> */}
    </div>
  );
};

export default ServiceDetails;
