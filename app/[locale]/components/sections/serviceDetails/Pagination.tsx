"use client"
import { GoArrowLeft, GoArrowRight } from "react-icons/go"
import Container from "../../common/Container"
import { useParams, useRouter } from "next/navigation";
import { services } from "../../data/servicesData";


const Pagination = () => {
    const { slug } = useParams();
    const router = useRouter();

    const currentIndex = services.findIndex(item => item.slug === slug);
    const prevService = services[currentIndex - 1];
    const nextService = services[currentIndex + 1];
  return (
    <section>
    <Container>
      <div className="bg-white md:mt-[60px] mt-10 rounded-[20px] shadow-navbar-shadow md:px-10 px-5 h-[90px] flex justify-between items-center">
         {/* left */}
        <div className="flex items-center gap-3">
            <div>
          
             <button
          disabled={!prevService}
          onClick={() => router.push(`/service/${prevService?.slug}`)}
          className={`w-12 h-12 rounded-full flex justify-center items-center duration-300 ease-in-out cursor-pointer ${
            prevService
              ? 'bg-sectionBg text-secondaryColor hover:bg-primaryBlue hover:text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
          disabled={!nextService}
          onClick={() => router.push(`/service/${nextService?.slug}`)}
          className={`w-12 h-12 rounded-full flex justify-center items-center duration-300 ease-in-out cursor-pointer ${
            nextService
              ? 'bg-sectionBg text-secondaryColor hover:bg-primaryBlue hover:text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <GoArrowRight size={24} />
        </button>
            </div>

             
        </div>

      </div>
    </Container>
   </section>
  )
}

export default Pagination