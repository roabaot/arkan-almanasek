"use client";

import { CiCalendarDate, CiShoppingTag, CiUser } from "react-icons/ci";
import Tag from "./Tag";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BlogT } from "@/app/[locale]/actions/blogs";
import { useTranslations } from "next-intl";

const BlogDetailsInfo = ({ blog }: { blog: BlogT | null }) => {
  const t = useTranslations();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [blog]);

  // sanitized HTML stored in state after dynamic import (client-only)
  const [sanitizedContent, setSanitizedContent] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    const sanitize = async () => {
      if (typeof window === "undefined") return;
      try {
        const DOMPurifyModule = await import("dompurify");
        // DOMPurify default export is a factory that needs window
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const DOMPurify = (DOMPurifyModule.default || DOMPurifyModule) as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const purify = DOMPurify(window as any);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const safe = (purify as any).sanitize(String(blog?.content || ""));
        if (mounted) setSanitizedContent(String(safe));
      } catch {
        // keep sanitizedContent empty on error
        if (mounted) setSanitizedContent("");
      }
    };
    sanitize();
    return () => {
      mounted = false;
    };
  }, [blog?.content]);

  if (!blog) return <div>Blog not found!</div>;

  return (
    <div className="lg:w-[65%] w-full">
      <div>
        <Image
          className="w-full h-auto group-hover:scale-105 duration-300 ease-in-out rounded-[10px] aspect-[16/9]"
          src={blog.image_url}
          width={850}
          height={500}
          unoptimized
          priority
          alt={blog.title}
        />
        <div className="flex flex-wrap items-center gap-5 my-5">
          <span className="flex items-center gap-3">
            <CiCalendarDate className="text-[20px] text-primaryBlue" />
            <span className="text-[16px] font-normal text-textColor font-secondary">
              {new Date(blog.published_at).toUTCString().slice(0, 16)}
            </span>
          </span>
          <span className="flex items-center gap-3">
            <CiUser className="text-[20px] text-primaryBlue" />
            <span className="text-[16px] font-normal text-textColor font-secondary">
              {t("blogs.author_by", { author: blog.author })}
            </span>
          </span>
          <span className="flex items-center gap-3">
            <CiShoppingTag className="text-[20px] text-secondaryColor" />
            <span className="text-[16px] font-normal text-textColor font-secondary">
              {blog.category}
            </span>
          </span>
        </div>

        <h3 className="my-5">{blog.title}</h3>
        {/* blog.content may contain HTML; render sanitized HTML */}
        <div
          className="rich-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        {/* tag */}
        <Tag tags={Array.isArray(blog?.tags) ? blog.tags : []} />
      </div>
    </div>
  );
};

export default BlogDetailsInfo;
