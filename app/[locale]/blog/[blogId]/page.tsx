import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import Container from "@/app/[locale]/components/common/Container";
import dynamic from "next/dynamic";
const BlogDetailsInfo = dynamic(
  () =>
    import("@/app/[locale]/components/sections/blogDetails/BlogDetailsInfo"),
  { ssr: false }
);
import BlogCatagory from "@/app/[locale]/components/ui/blog/BlogCatagory";
import PopularPost from "@/app/[locale]/components/ui/blog/PopularPost";
import PopularTag from "@/app/[locale]/components/ui/blog/PopularTag";
import { Metadata } from "next";
import { getBlogById } from "../../actions/blogs";
import { getTranslations } from "next-intl/server";

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
          {/* part 1 */}
          <BlogDetailsInfo blog={blog} />

          {/* part 2 */}
          <div className="lg:w-[35%] w-full flex flex-col gap-10 mt-10 lg:mt-0">
            {/* Popular Post part start here */}
            <div>
              <PopularPost />
            </div>

            {/* Category part start here */}
            <div>
              <BlogCatagory />
            </div>

            {/* Popular Tag part start here */}
            <div>
              <PopularTag />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default BlogDetails;
