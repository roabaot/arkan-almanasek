import { CiCalendarDate } from "react-icons/ci";
import Link from "next/link";
import { BlogT } from "@/app/[locale]/actions/blogs";

const PopularPost = ({
  title,
  blogs,
  currentBlogId,
}: {
  title: string;
  blogs: BlogT[];
  currentBlogId?: number;
}) => {
  return (
    <div>
      <div className="bg-white shadow-navbar-shadow rounded-[10px] border-t border-primaryBorder md:p-10 p-7">
        <h4>{title}</h4>
        <div className="flex flex-col gap-5 mt-6">
          {blogs?.slice(0, 5).map((blog) => {
            if (currentBlogId === blog.id) {
              return null;
            }
            return (
              <Link key={blog.id} href={`/blog/${blog.id}`}>
                <div className="bg-[#F2F4F8] px-[30px] py-5 rounded-[10px] hover:shadow-lg active:shadow-xl transition-shadow duration-300 ease-in-out">
                  <span className="flex items-center gap-3 text-textColor text-[12px] font-secondary font-normal">
                    <span>
                      <CiCalendarDate className="text-[20px] text-primaryBlue" />
                    </span>
                    {new Date(blog.published_at).toUTCString().slice(0, 16)}
                  </span>

                  <h5 className="mt-3 line-clamp-2">{blog.title}</h5>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularPost;
