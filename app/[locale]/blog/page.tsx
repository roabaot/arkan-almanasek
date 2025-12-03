import { Metadata } from "next";
import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import Container from "@/app/[locale]/components/common/Container";
import BlogPageClient from "@/app/[locale]/components/ui/blog/BlogPageClient";
import { getBlogCategories, getBlogs, getBlogTags } from "../actions/blogs";
import { getTranslations } from "next-intl/server";
import MotionContainer from "@/app/[locale]/components/common/MotionContainer";

export const metadata: Metadata = {
  title: "Blog | Putech – Business & IT Solutions Next.js Template",
  description:
    "Read the latest articles, insights, and updates on IT solutions and business strategies from Putech – Business & IT Solutions Next.js template.",
};

const BlogPage = async ({
  searchParams,
}: {
  // Align with Next's generated PageProps: searchParams is a Promise
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) => {
  // accept query like `?category=Advancing%20with%20innovation`
  const query = await searchParams;
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v ?? undefined;

  const category = first(query?.category);
  const tag = first(query?.tag);

  const reqBlogs = getBlogs({ debug: true, category, tag });
  const reqCategories = getBlogCategories();
  const reqTags = getBlogTags();

  const [resBlogs, resCategories, resTags] = await Promise.all([
    reqBlogs,
    reqCategories,
    reqTags,
  ]);

  const t = await getTranslations();

  const { items: blogs } = resBlogs;

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
      <section className="section-gap">
        <Container>
          <BlogPageClient
            blogs={blogs}
            categories={resCategories || []}
            tags={resTags || []}
            emptyLabel={t("blogs.empty")}
            category={category}
            tag={tag}
          />
        </Container>
      </section>
    </div>
  );
};

export default BlogPage;
