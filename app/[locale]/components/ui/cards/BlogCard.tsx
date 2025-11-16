import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { CiCalendarDate, CiUser, CiShoppingTag } from "react-icons/ci";
import { FaComment } from "react-icons/fa";

interface BlogProps {
  blog: {
    id: number;
    published_at: string;
    author: string;
    category: string;
    comments: number;
    title: string;
    image_url: string;
  };
}

const BlogCard = ({ blog }: BlogProps) => {
  const t = useTranslations("blogs");
  return (
    <div className="group w-full relative bg-white shadow-md hover:shadow-xl rounded-[10px] transition-shadow duration-300 ease-in-out overflow-hidden">
      <div className="overflow-hidden">
        <Image
          className="w-full h-auto group-hover:scale-105 duration-300 ease-in-out aspect-[6/4]"
          src={blog.image_url}
          unoptimized
          width={850}
          height={438}
          priority
          alt={blog.title}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-10 mt-5 mb-5">
          <span className="flex items-center gap-3">
            <CiUser className="text-[20px] text-secondaryColor" />
            <span className="text-[16px] font-normal text-textColor font-secondary">
              {t("author_by", { author: blog.author })}
            </span>
          </span>
          {blog.comments && (
            <span className="flex items-center gap-3">
              <FaComment className="text-[16px] text-primary" />
              <span className="text-[16px] font-normal text-textColor font-secondary">
                {blog.comments} Comment
              </span>
            </span>
          )}
          <span className="flex items-center gap-3">
            <CiShoppingTag className="text-[20px] text-secondaryColor" />
            <span className="text-[16px] font-normal text-textColor font-secondary">
              {blog.category}
            </span>
          </span>
          <span className="flex items-center gap-3">
            <CiCalendarDate className="text-[20px] text-secondaryColor" />
            <span className="text-[16px] font-normal text-textColor font-secondary">
              {new Date(blog.published_at).toUTCString().slice(0, 16)}
            </span>
          </span>
        </div>

        <Link href={`/blog/${blog.id}`}>
          <h3 className="group-hover:text-primaryBlue duration-300 ease-initial">
            {blog.title}
          </h3>
        </Link>

        <div className="flex items-center gap-[30px] mt-[30px] w-full">
          <div className="flex-1">
            <div className="w-full h-px bg-primaryBorder"></div>
          </div>
          <div>
            <Link href={`/blog/${blog.id}`}>
              {" "}
              <button className="text-[18px] font-medium capitalize text-secondaryColor font-primary">
                {t("read_more")}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* <span className="bg-[#E5E8F2] px-4 py-3 rounded-md text-[20px] font-semibold text-primary absolute top-10 left-10">
        {blog.published_at}
      </span> */}
    </div>
  );
};

export default BlogCard;
