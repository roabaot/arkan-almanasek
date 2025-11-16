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
import MotionContainer from "@/app/[locale]/components/common/MotionContainer";

export const metadata: Metadata = {
  title: "Blog | Putech – Business & IT Solutions Next.js Template",
  description:
    "Read the latest articles, insights, and updates on IT solutions and business strategies from Putech – Business & IT Solutions Next.js template.",
};

const BlogPage = async () => {
  const { items: blogs } = await getBlogs({ debug: true });
  const t = await getTranslations();

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
        <Container className="flex flex-col lg:flex-row gap-[30px]">
          {/* part 1 */}
          <div className="lg:w-[65%] w-full">
            {/* blog cart start here */}
            {blogs && blogs.length > 0 ? (
              <MotionContainer className="flex flex-col gap-20">
                {blogs.map((blog) => (
                  <BlogCard key={blog?.id} blog={blog} />
                ))}
              </MotionContainer>
            ) : (
              <MotionContainer className="flex flex-col gap-6 items-center justify-center py-20">
                <p className="text-center text-muted">{t("blogs.empty")}</p>
              </MotionContainer>
            )}
            {/* pagination part start here */}
            {blogs.length > 0 && (
              <MotionContainer>
                <BlogPagination />
              </MotionContainer>
            )}
          </div>

          {/* part 2 */}
          <div className="lg:w-[35%] w-full flex flex-col gap-10 mt-10 lg:mt-0">
            {/* blog search part start here */}
            <MotionContainer>
              <BlogSearch />
            </MotionContainer>

            {/* Popular Post part start here */}
            <MotionContainer>
              <PopularPost />
            </MotionContainer>

            {/* Category part start here */}
            <MotionContainer>
              <BlogCatagory />
            </MotionContainer>

            {/* Popular Tag part start here */}
            <MotionContainer>
              <PopularTag />
            </MotionContainer>

            {/* Follow Us */}
            <MotionContainer>
              <FollowUs />
            </MotionContainer>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default BlogPage;
