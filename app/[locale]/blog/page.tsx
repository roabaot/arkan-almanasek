import { Metadata } from "next";
import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import Container from "@/app/[locale]/components/common/Container";
import BlogPageClient from "@/app/[locale]/components/ui/blog/BlogPageClient";
import { getBlogs } from "../actions/blogs";
import { getTranslations } from "next-intl/server";
import MotionContainer from "@/app/[locale]/components/common/MotionContainer";

export const metadata: Metadata = {
  title: "Blog | Putech – Business & IT Solutions Next.js Template",
  description:
    "Read the latest articles, insights, and updates on IT solutions and business strategies from Putech – Business & IT Solutions Next.js template.",
};

const BlogPage = async () => {
  const { items: blogs } = await getBlogs({ debug: true });
  const t = await getTranslations();

  console.log("blogs: ", blogs);

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
          <BlogPageClient blogs={blogs} emptyLabel={t("blogs.empty")} />
        </Container>
      </section>
    </div>
  );
};

export default BlogPage;
