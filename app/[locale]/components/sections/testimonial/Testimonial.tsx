"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useRef, useState } from "react";
import Container from "../../common/Container";
import Video from "../video/Video";
import Image from "next/image";

const testimonials = [
    {
      id: 1,
      name: "Esther Howard",
      title: "Manager",
      image: '/assets/testimonial/author-1.png', 
      description:
        "Technology is constantly evolving shaping the way we live and work. It encompasses automation and connectivity driving innovation.",
      rating: 4,
    },
    {
      id: 2,
      name: "Esther Howard",
      title: "Manager",
      image: '/assets/testimonial/author-1.png',
      description:
        "Technology is constantly evolving shaping the way we live and work. It encompasses automation and connectivity driving innovation.",
      rating: 5,
    },
    {
      id: 3,
      name: "Esther Howard",
      title: "Manager",
      image: '/assets/testimonial/author-1.png',
      description:
        "Technology is constantly evolving shaping the way we live and work. It encompasses automation and connectivity driving innovation.",
      rating: 5,
    },
  ];
  


const Testimonial = () => {
  const [isOpen, setIsOpen] = useState(false);
    const sliderRef = useRef<Slider | null>(null);

    const settings = {
        dots: false,
        autoplay:true,
        arrows:false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

  return (
    <div className="section-gap relative  pb-[120px] overflow-hidden">
        <Image className="w-full 2xl:h-[650px] md:h-[550px] h-[400px]" src={'/assets/testimonial/bg.png'} width={1280} height={650} priority alt="" />

      <Container>
      
       {/* testimonial section start here */}
        <div className="max-w-[630px] absolute top-1/3 2xl:top-[40%]">
        <Slider {...settings} ref={sliderRef}>
        {testimonials.map((item) => (
          <div key={item.id}>
            <div className="bg-secondaryColor text-white md:p-15 p-7 rounded-[20px] z-10 mx-2">
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={20}
                  height={20}
                  priority
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white">{item.name}</h4>
                  <p className="text-white">{item.title}</p>
                </div>
              </div>
              <h3 className="text-white mt-5">{item.description}</h3>
              <div className="flex gap-1 mt-10">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < item.rating ? "text-[#FFB124]" : "text-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
        </div>

         {/* btn start here */}
        <div className="md:block hidden">
        <div className="flex items-center justify-center gap-3 absolute -bottom-0 md:right-[40%] right-[30%] -translate-y-1/2">
            <button onClick={() => sliderRef.current?.slickPrev()} className="w-12 h-12 bg-primaryBlue rounded-full text-white flex justify-center items-center hover:bg-secondaryColor duration-300 ease-in-out cursor-pointer">
            <GoArrowLeft size={24}/>
            </button>
            <button onClick={() => sliderRef.current?.slickNext()} className="w-12 h-12 bg-primaryBlue rounded-full text-white flex justify-center items-center hover:bg-secondaryColor duration-300 ease-in-out cursor-pointer">
            <GoArrowRight size={24}/>
            </button>
          </div>
        </div>

           {/* Play icon container */}
        <div onClick={() => setIsOpen(true)} className="absolute top-[45%] right-1/4 -translate-y-1/2 xl:block hidden cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" fill="none">
  <path opacity="0.5" d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128Z" fill="white"/>
  <path opacity="0.5" d="M64 7C95.4802 7 121 32.5198 121 64C121 95.4802 95.4802 121 64 121C32.5198 121 7 95.4802 7 64C7 32.5198 32.5198 7 64 7Z" fill="#E5E8F2" stroke="#100701" strokeWidth="4"/>
  <path d="M79.1616 60.7884L53.3164 45.5048C52.7824 45.1822 52.1721 45.0081 51.5483 45.0003C50.9245 44.9925 50.31 45.1513 49.7681 45.4604C49.2262 45.7695 48.7767 46.2176 48.4659 46.7585C48.1551 47.2994 47.9943 47.9135 48.0002 48.5373V79.0888C48.0003 79.7102 48.1649 80.3205 48.4773 80.8577C48.7896 81.3949 49.2385 81.8399 49.7785 82.1475C50.3184 82.455 50.9302 82.6142 51.5515 82.6089C52.1729 82.6036 52.7818 82.4339 53.3164 82.1171L79.1616 66.845C79.689 66.5338 80.1261 66.0903 80.4297 65.5585C80.7334 65.0267 80.8931 64.4249 80.8931 63.8125C80.8931 63.2001 80.7334 62.5983 80.4297 62.0665C80.1261 61.5347 79.689 61.0913 79.1616 60.78V60.7884Z" fill="#100701"/>
</svg>
        </div>



      </Container>

      {isOpen && <Video isOpen={isOpen} setIsOpen={setIsOpen}/>}
       
    </div>
  )
}

export default Testimonial