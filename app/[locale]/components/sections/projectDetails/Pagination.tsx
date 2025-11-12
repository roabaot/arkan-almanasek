"use client";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { projects } from "../../data/projectsData";
import { useParams, useRouter } from "next/navigation";

const Pagination = () => {
    const { slug } = useParams();
      const router = useRouter();

  
    const currentIndex = projects.findIndex((item) => item.slug === slug);
    // const currentProjecct = projects[currentIndex];
    const prevProjecct = projects[currentIndex - 1];
    const nextProjecct = projects[currentIndex + 1];
  return (
    <div className="bg-white md:mt-[60px] mt-10 rounded-[20px] shadow-navbar-shadow md:px-10 px-5 h-[90px] flex justify-between items-center">
    {/* left */}
    <div className="flex items-center gap-3">
      <div>
        <button
          disabled={!prevProjecct}
          onClick={() => router.push(`/project/${prevProjecct?.slug}`)}
          className={`w-12 h-12 rounded-full flex justify-center items-center duration-300 ease-in-out cursor-pointer ${
            prevProjecct
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
          disabled={!nextProjecct}
          onClick={() => router.push(`/project/${nextProjecct?.slug}`)}
          className={`w-12 h-12 rounded-full flex justify-center items-center duration-300 ease-in-out cursor-pointer ${
            nextProjecct
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