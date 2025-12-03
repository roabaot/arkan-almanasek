"use client";
import BlogCard from "@/app/[locale]/components/ui/cards/BlogCard";
// import BlogPagination from "@/app/[locale]/components/ui/blog/BlogPagination";
import BlogSearch from "@/app/[locale]/components/ui/blog/BlogSearch";
// import PopularPost from "@/app/[locale]/components/ui/blog/PopularPost";
import BlogCatagory from "@/app/[locale]/components/ui/blog/BlogCatagory";
import PopularTag from "@/app/[locale]/components/ui/blog/PopularTag";
import MotionContainer from "@/app/[locale]/components/common/MotionContainer";
import { useState, useEffect, useRef, useCallback } from "react";
import type { BlogT } from "@/app/[locale]/actions/blogs";

export type blogClassT = {
  id: number;
  name: string;
  name_en: string;
  name_i18n: string;
};

interface BlogPageClientProps {
  blogs: BlogT[]; // initial SSR blogs
  categories: blogClassT[];
  tags: blogClassT[];
  emptyLabel: string;
  category?: string;
  tag?: string;
}

const BlogPageClient = ({
  blogs: initialBlogs,
  categories,
  tags,
  emptyLabel,
  category,
  tag,
}: BlogPageClientProps) => {
  const [filter, setFilter] = useState({
    search: "",
    category: category || "",
    tag: tag || "",
  });
  const [blogs, setBlogs] = useState<BlogT[]>(initialBlogs);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Unified guarded effect using a stable serialized key to prevent redundant runs.
  const lastFilterKeyRef = useRef<string>("__init__");
  const filterKey = `${filter.search.trim()}|${filter.category.trim()}|${filter.tag.trim()}`;

  useEffect(() => {
    // If key unchanged, do nothing.
    if (lastFilterKeyRef.current === filterKey) return;
    lastFilterKeyRef.current = filterKey;

    const [searchVal, categoryVal, tagVal] = filterKey.split("|");
    const allEmpty = !searchVal && !categoryVal && !tagVal;
    if (allEmpty) {
      setBlogs((prev) => (prev === initialBlogs ? prev : initialBlogs));
      setLoading(false);
      setError(null);
      return; // No fetch needed.
    }

    let active = true;
    const controller = new AbortController();
    const run = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BASE_URL;
        setLoading(true);
        setError(null);
        const params: string[] = [];
        if (searchVal)
          params.push(`filter_by[search]=${encodeURIComponent(searchVal)}`);
        if (categoryVal)
          params.push(`filter_by[category]=${encodeURIComponent(categoryVal)}`);
        if (tagVal) params.push(`filter_by[tag]=${encodeURIComponent(tagVal)}`);
        const finalFilter = params.join("&");
        if (!base) {
          console.warn(
            "[BlogPageClient] Missing NEXT_PUBLIC_BASE_URL env variable"
          );
          if (active) {
            setBlogs([]);
            setLoading(false);
          }
          return;
        }
        const url = `${base}/blogs?${finalFilter}`;
        const res = await fetch(url, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed ${res.status}`);
        const json = await res.json();
        const items: BlogT[] = Array.isArray(json?.body) ? json.body : [];
        if (active) setBlogs(items);
      } catch (err) {
        const errorObj = err as Error;
        if (errorObj.name === "AbortError") return;
        if (active) setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    run();
    return () => {
      active = false;
      controller.abort();
    };
  }, [filterKey, initialBlogs]);

  // Mark that initial animation has played after first render displaying blogs
  useEffect(() => {
    if (
      !hasAnimated &&
      blogs.length > 0 &&
      (filter.search.trim() !== "" ||
        filter.category.trim() !== "" ||
        filter.tag.trim() !== "")
    ) {
      setTimeout(() => {
        setHasAnimated(true);
      }, 500);
    }
  }, [blogs, hasAnimated, filter.search, filter.category, filter.tag]);

  // Memoized guarded search setter prevents state updates when value unchanged
  const handleSearch = useCallback((val: string) => {
    setFilter((prev) =>
      prev.search === val ? prev : { ...prev, search: val }
    );
  }, []);

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
          <BlogSearch onSearch={handleSearch} />
        </MotionContainer>
        {/* <MotionContainer>
          <PopularPost />
        </MotionContainer> */}
        {categories.length > 0 && (
          <MotionContainer>
            <BlogCatagory
              categories={categories}
              activeCategory={filter.category}
              setActiveCategory={(val) =>
                setFilter((params) => ({ ...params, category: val }))
              }
            />
          </MotionContainer>
        )}
        {tags.length > 0 && (
          <MotionContainer>
            <PopularTag
              tags={tags}
              activeTag={filter.tag}
              setActiveTag={(val: string) =>
                setFilter((params) => ({ ...params, tag: val }))
              }
            />
          </MotionContainer>
        )}
        {/* <MotionContainer>
          <FollowUs />
        </MotionContainer> */}
      </div>
    </div>
  );
};

export default BlogPageClient;
