"use client";
import { useState } from "react";
import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import Video from "../video/Video";
import Image from "next/image";
import FunFactsStyle2 from "../funfacts/FunFactsStyle2";


const ExperiencedBusiness = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="section-gap">
      <Container>
        {/* section title */}
        <div className="lg:flex justify-between items-end">
          <div className="max-w-[628px]">
            <SectionTitle
              title="Experienced Business and IT Consulting Partner"
              align="left"
            />
          </div>

          <div className="xl:max-w-[590px] lg:max-w-[450px] mt-7 lg:mt-0">
            <p className="text-[18px]">
              Technology is constantly evolving, shaping the way we live and work. It encompasses innovation, automation, and connectivity, driving progress forward in every sector
            </p>
          </div>
        </div>

        {/* video section */}
        <div className="mt-20 relative">
          <Image src={'/assets/about/about-5.jpg'} alt="hero" className="w-full max-h-[680px]" width={1320} height={680} priority/>
          <button
            className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-28 md:h-28 w-20 h-20 bg-[#FF760A] rounded-full flex justify-center items-center text-white text-[30px]"
            onClick={() => setIsOpen(true)}
          >
            <SiGoogledisplayandvideo360 size={30} />
          </button>
        </div>
        {isOpen && <Video isOpen={isOpen} setIsOpen={setIsOpen} />}
         {/* fun facts */}
         <FunFactsStyle2/>
      </Container>
    </div>
  );
};

export default ExperiencedBusiness;