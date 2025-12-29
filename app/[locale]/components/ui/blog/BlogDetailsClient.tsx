"use client";
import PopularPost from "./PopularPost";
import BlogCatagory from "./BlogCatagory";
import PopularTag from "./PopularTag";
import type { BlogsResponseT, BlogT } from "@/app/[locale]/actions/blogs";
import MotionContainer from "../../common/MotionContainer";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { blogClassT } from "./BlogPageClient";
import { Suspense, use } from "react";
const BlogDetailsInfo = dynamic(
  () => import("@/app/[locale]/components/sections/blogDetails/BlogDetailsInfo")
);

const BlogDetailsClient = ({
  blog,
  resPromise,
}: {
  blog: BlogT | null;
  resPromise: Promise<
    [BlogsResponseT, blogClassT[] | null, blogClassT[] | null]
  >;
}) => {
  const t = useTranslations();
  return (
    <>
      {/* part 1 */}
      <BlogDetailsInfo blog={blog} />

      {/* part 2 */}
      <div className="lg:w-[35%] w-full flex flex-col gap-10 mt-10 lg:mt-0">
        <Suspense fallback={null}>
          <BlogDetailsSidebarClient blog={blog} resPromise={resPromise} />
        </Suspense>
      </div>
    </>
  );
};

const BlogDetailsSidebarClient = ({
  blog,
  resPromise,
}: {
  blog: BlogT | null;
  resPromise: Promise<
    [BlogsResponseT, blogClassT[] | null, blogClassT[] | null]
  >;
}) => {
  const t = useTranslations();
  const [resBlogs, resCategories, resTags] = use(resPromise);
  const blogs = resBlogs.items;
  const categories = resCategories || [];
  const tags = resTags || [];

  return (
    <>
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
      {categories.length > 0 && (
        <MotionContainer>
          <BlogCatagory isSingleBlog categories={categories} />
        </MotionContainer>
      )}

      {/* Popular Tag part start here */}
      {tags.length > 0 && (
        <MotionContainer>
          <PopularTag isSingleBlog tags={tags} />
        </MotionContainer>
      )}
    </>
  );
};

export default BlogDetailsClient;
