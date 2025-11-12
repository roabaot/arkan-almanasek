import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaComment, FaUser } from "react-icons/fa";

interface BlogCardProps {
  id: number;
  image: string;
  author: string;
  comments: number;
  title: string;
  date: string;
  link: string;
}

const BlogCardStyle2: React.FC<{ blog: BlogCardProps }> = ({ blog }) => {
  return (
    <div key={blog.id} className="relative rounded-[10px]">
      <Image
        className="w-full h-auto rounded-[10px]"
        src={blog.image}
        width={410}
        height={450}
        priority
        alt="blogs"
      />

      <div className="absolute bottom-7 z-10 px-[30px]">
        <div className="flex items-center gap-10 mt-5 mb-5">
          <span className="flex items-center gap-3">
            <FaUser className="text-[16px] text-white" />
            <span className="text-[16px] font-normal text-white">
              By {blog.author}
            </span>
          </span>
          <span className="flex items-center gap-3">
            <FaComment className="text-[16px] text-white" />
            <span className="text-[16px] font-normal text-white">
              {blog.comments} Comment
            </span>
          </span>
        </div>

        <Link href={blog.link}>
          <h4 className="text-white hover:text-primaryBlue duration-300 ease-in-out">
            {blog.title}
          </h4>
        </Link>
      </div>

      <div
        className="absolute inset-0 rounded-[10px] z-0"
        style={{ background: "var(--gradient-blog-overlay)" }}
      />

      <span className="bg-[#E5E8F2] px-4 py-2.5 rounded-md text-[20px] font-semibold text-primary absolute top-6 right-6 capitalize">
        {blog.date}
      </span>
    </div>
  );
};

export default BlogCardStyle2;
