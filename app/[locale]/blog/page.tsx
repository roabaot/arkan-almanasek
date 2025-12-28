import dynamic from "next/dynamic";
import { Metadata } from "next";
import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import Container from "@/app/[locale]/components/common/Container";
import { getBlogCategories, getBlogs, getBlogTags } from "../actions/blogs";
import { getTranslations } from "next-intl/server";
import MotionContainer from "@/app/[locale]/components/common/MotionContainer";
import { Suspense } from "react";
import Loading from "../loading";
const BlogPageClient = dynamic(
  () => import("@/app/[locale]/components/ui/blog/BlogPageClient"),
  {
    loading: () => <Loading className="absolute inset-0 h-[50vh]" />, // your inner fallback
  }
);
export const metadata: Metadata = {
  title: "Blog | Macs – Business & IT Solutions Next.js Template",
  description:
    "Read the latest articles, insights, and updates on IT solutions and business strategies from Macs – Business & IT Solutions Next.js template.",
};

type BlogPageProps = {
  // In this project, Next generates PageProps with Promise-based searchParams
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  // accept query like `?category=Advancing%20with%20innovation`
  const query = (await searchParams) ?? {};
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v ?? undefined;

  const category = first(query?.category);
  const tag = first(query?.tag);

  const reqBlogs = getBlogs({ debug: true, category, tag });
  const reqCategories = getBlogCategories();
  const reqTags = getBlogTags();

  const resPromise = Promise.all([reqBlogs, reqCategories, reqTags]);

  const t = await getTranslations();

  // const { items: blogs } = resBlogs;

  return (
    <div>
      {/************* Breadcrumb section start here **************/}
      <MotionContainer>
        <Breadcrumb
          title={t("blogs.title")}
          breadcrumb={[
            { name: t("common.home"), href: "/" },
            { name: t("blogs.title") },
          ]}
        />
      </MotionContainer>

      {/************* blog section start here **************/}
      <div className="relative">
        {/* <Suspense fallback="loading..."> */}
        <section className="section-gap relative">
          <Container>
            <Suspense fallback={<Loading className="absolute inset-0" />}>
              <BlogPageClient
                // blogs={blogs}
                // categories={resCategories || []}
                // tags={resTags || []}
                resPromise={resPromise}
                emptyLabel={t("blogs.empty")}
                category={category}
                tag={tag}
              />
            </Suspense>
          </Container>
        </section>
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default BlogPage;
