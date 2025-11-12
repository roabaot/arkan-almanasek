"use client";
import Container from "../../common/Container"
import { useEffect } from "react";
import ProjectInfo from "./ProjectInfo";
import ShareIcon from "./ShareIcon";
import { FiChevronsRight } from "react-icons/fi";
import Pagination from "./Pagination";
import { projects } from "../../data/projectsData";
import Image from "next/image";
import { useParams } from "next/navigation";

const ProjectDetailsInfo = () => {
    const { slug } = useParams();
    const currentIndex = projects.findIndex((item) => item.slug === slug);
    const currentProjecct = projects[currentIndex];
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [slug]);
  
    if (!currentProjecct) return <div>Service not found!</div>;
  return (
    <section className="section-gap">
        <Container className="flex flex-col gap-[30px]">
          <div className="relative">
            <Image
              className="w-full md:h-[450px] h-[380px] lg:h-[550px] 2xl:h-[580px] rounded-[10px] object-cover"
              src={currentProjecct?.image}
              width={850}
              height={580}
              priority
              alt="project"
            />

            <div className="bg-white w-max rounded-[20px] shadow md:p-[30px] p-5 2xl:p-10 md:space-y-5 space-y-3 absolute md:right-5 right-2 md:bottom-5 bottom-2">
              <h3>Project Information</h3>
              {/************* project info start here **************/}
              <ProjectInfo currentProjecct={currentProjecct} />

              <div className="pt-2 flex items-center gap-8">
                <h5>Share:</h5>
                <ShareIcon />
              </div>
            </div>
          </div>

          <div>
            <h2>{currentProjecct?.title}</h2>

            <div className="flex flex-col gap-5 mt-5">
              {currentProjecct.content?.paragraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {currentProjecct?.content?.subSections?.map((section, index) => (
            <div key={index}>
              <h3 className="mb-5">{section.title}</h3>

              {/* Paragraph rendering (if any) */}
              {Array.isArray(section.paragraphs) &&
                section.paragraphs.length > 0 &&
                section.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`${
                      Array.isArray(section.points) && section.points.length > 0
                        ? "mt-[30px]"
                        : "mt-5"
                    }`}
                  >
                    {p}
                  </p>
                ))}

              {/* Points rendering (if any) */}
              {Array.isArray(section.points) && section.points.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 mt-[30px] gap-5">
                  {section.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <FiChevronsRight className="text-[#E5E8F2] w-5 h-5 mt-1 flex-shrink-0" />
                      <span className="text-textColor text-[16px] font-normal leading-7 font-secondary tracking-[-0.36px]">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-[30px] flex flex-col md:flex-row gap-[30px]">
            {currentProjecct?.content?.gallery?.map((imageSrc, index) => (
              <div className="w-full" key={index}>
                <Image
                  className="w-full h-auto object-contain rounded-[20px]"
                  src={imageSrc}
                  alt={`gallery-image-${index + 1}`}
                  width={630}
                  height={340}
                  priority
                />
              </div>
            ))}
          </div>

          {/* pagination part */}
          <Pagination />
        </Container>
      </section>
  )
}

export default ProjectDetailsInfo