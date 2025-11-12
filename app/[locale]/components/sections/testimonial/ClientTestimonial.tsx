/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import { useState } from "react";
import SectionTitle from '../../common/SectionTitle';
import Container from '../../common/Container';
import TestimonialCard from '../../ui/cards/TestimonialCard';
import { cn } from '@/app/lib/utils';
import { usePathname } from 'next/navigation';


const testimonials = [
    {
      id: 1,
      name: "Floyd Miles",
      role: "Marketing Coordinator",
      image: '/assets/testimonial/author-1.png',
      message:
        "Technology is constantly evolving, shaping the way we live and work. It encompasses innovation, automation, and connectivity, driving progress forward",
    },
    {
      id: 2,
      name: "Esther Howard",
      role: "Manager",
      image: '/assets/testimonial/author-2.png',
      message:
        "Technology is constantly evolving, shaping the way we live and work. It encompasses innovation, automation, and connectivity, driving progress forward",
    },
    {
      id: 3,
      name: "Cody Fisher",
      role: "Medical Assistant",
      image: '/assets/testimonial/author-3.png',
      message:
        "Technology is constantly evolving, shaping the way we live and work. It encompasses innovation, automation, and connectivity, driving progress forward",
    },
    {
      id: 4,
      name: "Leslie Murphy",
      role: "Project Lead",
      image: '/assets/testimonial/author-1.png',
      message:
        "Technology is constantly evolving, shaping the way we live and work. It encompasses innovation, automation, and connectivity, driving progress forward",
    },
  ];


const ClientTestimonial = () => {
  const pathname = usePathname();
  const isContactPage = pathname === "/home-two";

  
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        centerMode: true,
        centerPadding: "60px",
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        arrows: false,
        dots: true,
        afterChange: (index: number) => setCurrentSlide(index),
        appendDots: (dots: any) => (
          <div>
            <ul className="flex justify-center items-center gap-5">
              {dots}
            </ul>
          </div>
        ),
       
        customPaging: (i: number) => (
          <div className="w-10 h-1 bg-gray-300 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-blue-600 w-full" : "bg-gray-300 w-0"
              }`}
            ></div>
          </div>
        ),
       
        
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 2,
              centerMode: true,
              centerPadding: "60px",
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              centerMode: true,
              centerPadding: "50px",
            },
          },

          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: "60px",
            },
          },


          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              centerMode: true,
              centerPadding: "0px",
            },
          },
        ],
      };
      
  
    return (
    <div className={cn("bg-sectionBg lg:py-[120px] md:py-20 py-15", { "section-gap": !isContactPage })}>
        <Container>
        <SectionTitle
        label="Clients Testimonial"
        title="Whats Clients Say"
        align="center"
      />
        </Container>

        <div className="md:mt-15 mt-12">

        <Slider {...settings}>
        {testimonials.map((item) => (
    <TestimonialCard
      key={item.id}
      name={item.name}
      role={item.role}
      image={item.image}
      message={item.message}
    />
  ))}
      </Slider>

        </div>
    </div>
  )
}

export default ClientTestimonial