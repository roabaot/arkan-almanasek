import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import Pagination from "@/app/[locale]/components/sections/serviceDetails/Pagination";
import ServiceDetailsInfo from "@/app/[locale]/components/sections/serviceDetails/ServiceDetailsInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Details | Putech – Business & IT Solutions Next.js Template",
  description:
    "Get in-depth information about our services at Putech – Business & IT Solutions Next.js template. Learn how our tailored IT and business solutions can help you grow.",
};

const ServiceDetails = () => {
  return (
    <div>
      {/************* Breadcrumb section start here **************/}
      <Breadcrumb
        title="Service Details"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Service Details" }]}
      />

      {/************* Service details section start here **************/}
      <ServiceDetailsInfo />

      {/* pagination start */}
      <Pagination />
    </div>
  );
};

export default ServiceDetails;
