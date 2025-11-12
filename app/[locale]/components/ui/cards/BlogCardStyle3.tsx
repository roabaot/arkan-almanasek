
import Image from "next/image";
import Link from "next/link";
import { FaComment, FaUser } from "react-icons/fa";

type BlogCardStyle3Props = {
  blog: {
    id: number;
    slug: string;
    date: string;
    author: string;
    comments: number;
    title: string;
    image: string;
  };
};

const BlogCardStyle3 = ({ blog }: BlogCardStyle3Props) => {
  return (
    <div className="w-full relative">
      <div className="group overflow-hidden rounded-md">
        <Image
          className="w-full h-auto group-hover:scale-105 duration-300 ease-in-out"
          src={blog.image}
          width={410}
          height={343}
          priority
          alt={blog.title}
        />
      </div>

      <div className="flex items-center gap-10 mt-5 mb-5">
        <span className="flex items-center gap-3">
          <FaUser className="text-[16px] text-primary" />
          <span className="text-[16px] font-medium text-textColor">
            By {blog.author}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <FaComment className="text-[16px] text-primary" />
          <span className="text-[16px] font-medium text-textColor">
            {blog.comments} Comment
          </span>
        </span>
      </div>

      <Link href={`/blog/${blog.slug}`}>
        <h4 className="max-w-[364px] hover:text-primaryBlue duration-300 ease-initial">
          {blog.title}
        </h4>
      </Link>

      <div className="flex items-center gap-5 mt-5">
        <hr className="md:w-[70%] w-full text-primaryBorder h-px" />
        <Link href={`/blog/${blog.slug}`}>
          <button className="w-full text-[18px] font-normal text-secondaryColor hover:text-primaryBlue duration-300 ease-in-out cursor-pointer">
            Read More
          </button>
        </Link>
      </div>

      <span className="bg-[#E5E8F2] p-2 rounded-md text-[20px] font-semibold text-primary absolute top-8 right-8">
        {blog.date}
      </span>
    </div>
  );
};

export default BlogCardStyle3;
