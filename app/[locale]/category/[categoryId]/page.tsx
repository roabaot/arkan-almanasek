import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import Container from "@/app/[locale]/components/common/Container";
import ServiceCard from "@/app/[locale]/components/ui/cards/ServiceCard";
import { getServiceCategoryById, getServices } from "../../actions/services";
import { handleServiceBreadcrumbs } from "@/app/lib/utils";

export const metadata: Metadata = {
  title: "Services | MACS – Business & IT Solutions Next.js Template",
  description:
    "Discover the wide range of services offered by MACS – Business & IT Solutions Next.js template, including IT consulting, digital solutions, and business innovations.",
};

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string | number }>;
}) => {
  const { categoryId } = await params;

  const [category, servicesData] = await Promise.all([
    getServiceCategoryById(categoryId),
    getServices({ service_category_ids: [categoryId] }),
  ]);
  const t = await getTranslations();

  const breadcrumbs = handleServiceBreadcrumbs(category?.breadcrumbs ?? []);

  return (
    <div>
      {/************* Breadcrumb section start here **************/}
      <Breadcrumb
        title={category?.name_i18n || "Category"}
        breadcrumb={[
          { name: t("common.home"), href: "/" },
          { name: t("services.title"), href: "/category" },
          ...(breadcrumbs ?? []),
        ]}
      />

      {/************* service section start here **************/}
      <section className="section-gap">
        <Container className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:gap-7 gap-6">
          {/* service card */}
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </Container>
      </section>
    </div>
  );
};

export default CategoryPage;
