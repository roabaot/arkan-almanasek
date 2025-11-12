"use client";
import { useParams, useRouter } from "next/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { blogData } from "../../data/blogData";

const Pagination = () => {
    const { slug } = useParams();
    const router = useRouter();

    const currentIndex = blogData.findIndex((item) => item.slug === slug);
  
    const prevBlog = blogData[currentIndex - 1];
    const nextBlog = blogData[currentIndex + 1];
  return (
    <div className="bg-sectionBg mt-[30px] rounded-[20px] md:px-10 px-5 h-[90px] flex justify-between items-center">
    {/* left */}
    <div className="flex items-center gap-3">
      <div>
        <button
          disabled={!prevBlog}
          onClick={() => router.push(`/blog/${prevBlog?.slug}`)}
          className={`w-12 h-12 rounded-full flex justify-center items-center duration-300 ease-in-out cursor-pointer ${
            prevBlog
              ? "bg-sectionBg text-secondaryColor hover:bg-primaryBlue hover:text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <GoArrowLeft size={24} />
        </button>
      </div>

      <div>
        <h4 className="md:text-[24px] text-[18px]">Previous</h4>
      </div>
    </div>

    {/* line */}
    <div className="w-px h-[50px] bg-primaryBlue md:block hidden"></div>

    {/* right */}
    <div className="flex items-center gap-3">
      <div>
        <h4 className="md:text-[24px] text-[18px]">Next</h4>
      </div>
      <div>
        <button
          disabled={!nextBlog}
          onClick={() => router.push(`/blog/${nextBlog?.slug}`)}
          className={`w-12 h-12 rounded-full flex justify-center items-center duration-300 ease-in-out cursor-pointer ${
            nextBlog
              ? "bg-sectionBg text-secondaryColor hover:bg-primaryBlue hover:text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <GoArrowRight size={24} />
        </button>
      </div>
    </div>
  </div>
  )
}

export default Pagination