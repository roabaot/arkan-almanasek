"use client"
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import { EffectCoverflow } from "swiper/modules";
import SectionTitle from "../../common/SectionTitle";
import ProjectCard from "../../ui/cards/ProjectCard";



const images = ['/assets/projects/slider-1.png', '/assets/projects/slider-2.png', '/assets/projects/slider-3.png', '/assets/projects/slider-4.png', '/assets/projects/slider-5.jpg'];

const Project = () => {
  const [activeSlide, setActiveSlide] = useState(2);

  return (
    <div className="bg-sectionBg section-gap lg:py-[120px] md:py-[80px] py-[60px] overflow-hidden">
      <SectionTitle
        label="Latest Project"
        title="Your Tomorrow Enhanced Today Tech Forward"
        align="center"
      />

      <div className="md:pt-15 pt-12">
        <Swiper
          modules={[EffectCoverflow]}
          effect="coverflow"
          centeredSlides
          slidesPerView={3}
          spaceBetween={10}
          loop
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >
          {images.map((src, index) => {
            return (
              <SwiperSlide key={index}>
                <ProjectCard src={src} isActive={index === activeSlide} index={index} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Project;

