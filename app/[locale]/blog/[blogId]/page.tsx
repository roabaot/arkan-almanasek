import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import Container from "@/app/[locale]/components/common/Container";

import { Metadata } from "next";
import {
  getBlogById,
  getBlogCategories,
  getBlogs,
  getBlogTags,
} from "../../actions/blogs";
import { getTranslations } from "next-intl/server";
import BlogDetailsClient from "../../components/ui/blog/BlogDetailsClient";

export const metadata: Metadata = {
  title: "Blog Details | MACS – Business & IT Solutions Next.js Template",
  description:
    "Dive into detailed articles and insights on business and IT solutions with our Blog Details page at MACS – Business Solutions Next.js template.",
};

const BlogDetails = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;

  const blog = await getBlogById(blogId);

  // Fetch related blogs, categories, and tags
  const reqBlogs = getBlogs({ category: blog?.category || "" });
  const reqCategories = getBlogCategories();
  const reqTags = getBlogTags();

  const [resBlogs, categories, tags] = await Promise.all([
    reqBlogs,
    reqCategories,
    reqTags,
  ]);
  const { items: blogs } = resBlogs;
  const t = await getTranslations();

  return (
    <div>
      {/************* Breadcrumb section start here **************/}
      <Breadcrumb
        title={blog?.title || ""}
        breadcrumb={[
          { name: t("common.home"), href: "/" },
          { name: t("blogs.title"), href: "/blog" },
          { name: blog?.title || "" },
        ]}
      />

      {/************* blog details section start here **************/}
      <section className="section-gap">
        <Container className="flex flex-col lg:flex-row gap-[30px]">
          <BlogDetailsClient
            blog={blog}
            blogs={blogs}
            categories={categories}
            tags={tags}
          />
        </Container>
      </section>
    </div>
  );
};

export default BlogDetails;
