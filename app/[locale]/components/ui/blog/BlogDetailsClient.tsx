"use client";
import PopularPost from "./PopularPost";
import BlogCatagory from "./BlogCatagory";
import PopularTag from "./PopularTag";
import { BlogT } from "@/app/[locale]/actions/blogs";
import MotionContainer from "../../common/MotionContainer";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { blogClassT } from "./BlogPageClient";
const BlogDetailsInfo = dynamic(
  () => import("@/app/[locale]/components/sections/blogDetails/BlogDetailsInfo")
);

const BlogDetailsClient = ({
  blog,
  blogs,
  categories,
  tags,
}: {
  blog: BlogT | null;
  blogs: BlogT[];
  categories: blogClassT[] | null;
  tags: blogClassT[] | null;
}) => {
  const t = useTranslations();
  return (
    <>
      {/* part 1 */}
      <BlogDetailsInfo blog={blog} />

      {/* part 2 */}
      <div className="lg:w-[35%] w-full flex flex-col gap-10 mt-10 lg:mt-0">
        {/* Popular Post part start here */}
        {blogs.filter((b) => b.id !== blog?.id).length > 0 && (
          <div>
            <PopularPost
              title={t("blogs.same_category_blogs")}
              blogs={blogs}
              currentBlogId={blog?.id}
            />
          </div>
        )}

        {/* Category part start here */}
        {categories && categories.length > 0 && (
          <MotionContainer>
            <BlogCatagory isSingleBlog categories={categories} />
          </MotionContainer>
        )}

        {/* Popular Tag part start here */}
        {tags && tags.length > 0 && (
          <MotionContainer>
            <PopularTag isSingleBlog tags={tags} />
          </MotionContainer>
        )}
      </div>
    </>
  );
};

export default BlogDetailsClient;
