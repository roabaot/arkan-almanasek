"use client";
import BlogCard from "@/app/[locale]/components/ui/cards/BlogCard";
import BlogPagination from "@/app/[locale]/components/ui/blog/BlogPagination";
import BlogSearch from "@/app/[locale]/components/ui/blog/BlogSearch";
import PopularPost from "@/app/[locale]/components/ui/blog/PopularPost";
import BlogCatagory from "@/app/[locale]/components/ui/blog/BlogCatagory";
import PopularTag from "@/app/[locale]/components/ui/blog/PopularTag";
import FollowUs from "@/app/[locale]/components/ui/blog/FollowUs";
import MotionContainer from "@/app/[locale]/components/common/MotionContainer";
import { useState, useEffect } from "react";
import type { BlogT } from "@/app/[locale]/actions/blogs";

interface BlogPageClientProps {
  blogs: BlogT[]; // initial SSR blogs
  emptyLabel: string;
}

const BlogPageClient = ({
  blogs: initialBlogs,
  emptyLabel,
}: BlogPageClientProps) => {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState<BlogT[]>(initialBlogs);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    if (!search.trim()) {
      setBlogs(initialBlogs);
      setLoading(false);
      setError(null);
      return () => {
        active = false;
        controller.abort();
      };
    }

    const fetchBlogs = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BASE_URL;
        setLoading(true);
        setError(null);
        // Build query inline using nested key filter_by[search]; value is URL-encoded, key left readable.
        const url = `${base}/blogs?filter_by[search]=${encodeURIComponent(
          search.trim()
        )}`;
        // const url = `${base}/blogs?filter_by[search]=%D9%85%D8%AB%D8%A7%D9%84%D9%8A%D8%A9`;

        const res = await fetch(url, {
          cache: "no-store",
          signal: controller.signal,
        });
        console.log("res: ", res);

        if (!res.ok) throw new Error(`Failed ${res.status}`);
        const json = await res.json();
        console.log("json:", json);

        const items: BlogT[] = Array.isArray(json?.body) ? json.body : [];
        console.log(
          "[BlogPageClient] fetched",
          items.length,
          "items for search=",
          search
        );
        if (active) setBlogs(items);
      } catch (err) {
        const errorObj = err as Error;
        if (errorObj.name === "AbortError") return;
        console.error("[BlogPageClient] fetch error", errorObj);
        if (active) setError("Failed to load blogs");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchBlogs();
    return () => {
      active = false;
      controller.abort();
    };
  }, [search, initialBlogs]);

  // Mark that initial animation has played after first render displaying blogs
  useEffect(() => {
    if (!hasAnimated && blogs.length > 0 && search !== "") {
      setTimeout(() => {
        setHasAnimated(true);
      }, 500);
    }
  }, [blogs, hasAnimated, search]);

  console.log("blogs", blogs);

  return (
    <div className="flex flex-col lg:flex-row gap-[30px]">
      <div className="lg:w-[65%] w-full">
        <div className="space-y-6">
          {loading && (
            <MotionContainer className="flex flex-col gap-6 items-center justify-center py-10">
              <p className="text-center text-muted">Loading...</p>
            </MotionContainer>
          )}
          {!loading && error && (
            <MotionContainer className="flex flex-col gap-6 items-center justify-center py-10">
              <p className="text-center text-error">{error}</p>
            </MotionContainer>
          )}
          {!loading &&
            !error &&
            blogs &&
            blogs.length > 0 &&
            blogs.map((blog) => (
              <MotionContainer
                inView={!hasAnimated}
                key={blog.id}
                animateInitial={!hasAnimated}
              >
                <BlogCard blog={blog} />
              </MotionContainer>
            ))}
          {!loading && !error && blogs.length === 0 && (
            <MotionContainer className="flex flex-col gap-6 items-center justify-center py-20">
              <p className="text-center text-muted">{emptyLabel}</p>
            </MotionContainer>
          )}
        </div>
        {/* {blogs.length > 0 && !loading && !error && (
          <MotionContainer>
            <BlogPagination />
          </MotionContainer>
        )} */}
      </div>
      <div className="lg:w-[35%] w-full flex flex-col gap-10 mt-10 lg:mt-0">
        <MotionContainer>
          <BlogSearch onSearch={setSearch} />
        </MotionContainer>
        <MotionContainer>
          <PopularPost />
        </MotionContainer>
        <MotionContainer>
          <BlogCatagory />
        </MotionContainer>
        <MotionContainer>
          <PopularTag />
        </MotionContainer>
        <MotionContainer>
          <FollowUs />
        </MotionContainer>
      </div>
    </div>
  );
};

export default BlogPageClient;
