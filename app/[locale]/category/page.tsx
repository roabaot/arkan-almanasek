import { Metadata } from "next";
import Service from "../components/sections/service/Service";
import Breadcrumb from "../components/common/Breadcrumb";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Services | MACS – Business & IT Solutions Next.js Template",
  description:
    "Discover the wide range of services offered by MACS – Business & IT Solutions Next.js template, including IT consulting, digital solutions, and business innovations.",
};

const CategoryPage = () => {
  const t = useTranslations();
  return (
    <div>
      <Breadcrumb
        title={t("services.title")}
        breadcrumb={[
          { name: t("common.home"), href: "/" },
          { name: t("services.title") },
        ]}
      />
      <section className="relative">
        <Suspense fallback={<Loading className="absolute inset-0" />}>
          <Service />
        </Suspense>
      </section>
    </div>
  );
};

export default CategoryPage;
