import { Metadata } from "next";
import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import Container from "@/app/[locale]/components/common/Container";
import BlogCard from "@/app/[locale]/components/ui/cards/BlogCard";
import BlogPagination from "@/app/[locale]/components/ui/blog/BlogPagination";
import BlogSearch from "@/app/[locale]/components/ui/blog/BlogSearch";
import PopularPost from "@/app/[locale]/components/ui/blog/PopularPost";
import BlogCatagory from "@/app/[locale]/components/ui/blog/BlogCatagory";
import PopularTag from "@/app/[locale]/components/ui/blog/PopularTag";
import FollowUs from "@/app/[locale]/components/ui/blog/FollowUs";
import { getBlogs } from "../actions/blogs";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Blog | Putech – Business & IT Solutions Next.js Template",
  description:
    "Read the latest articles, insights, and updates on IT solutions and business strategies from Putech – Business & IT Solutions Next.js template.",
};

const BlogPage = async () => {
  const { items: blogs } = await getBlogs();
  const t = await getTranslations();
  console.log("blogs: ", blogs);

  return (
    <div>
      {/************* Breadcrumb section start here **************/}
      <Breadcrumb
        title={t("blogs.title")}
        breadcrumb={[
          { name: t("common.home"), href: "/" },
          { name: t("blogs.title") },
        ]}
      />

      {/************* blog section start here **************/}
      <section className="section-gap">
        <Container className="flex flex-col lg:flex-row gap-[30px]">
          {/* part 1 */}
          <div className="lg:w-[65%] w-full">
            {/* blog cart start here */}
            <div className="flex flex-col gap-20">
              {blogs?.map((blog) => (
                <BlogCard key={blog?.id} blog={blog} />
              ))}
            </div>
            {/* pagination part start here */}
            <BlogPagination />
          </div>

          {/* part 2 */}
          <div className="lg:w-[35%] w-full flex flex-col gap-10 mt-10 lg:mt-0">
            {/* blog search part start here */}
            <div>
              <BlogSearch />
            </div>

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

            {/* Follow Us */}
            <div>
              <FollowUs />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default BlogPage;
