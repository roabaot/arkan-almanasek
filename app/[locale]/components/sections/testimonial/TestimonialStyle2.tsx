"use client";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "../../common/Container";
import { IoIosArrowBack, IoIosArrowForward, IoIosStar } from "react-icons/io";
import Image from "next/image";

// ✅ JSON Testimonial Data
const testimonials = [
  {
    id: 1,
    name: "Vicky Parrish",
    position: "Project Coordinator",
    review:
      "The product offers exceptional flexibility and customization features, perfectly aligning with our specific requirements.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Smith",
    position: "Product Manager",
    review:
      "An amazing tool that helped streamline our workflow. The support team is also fantastic.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Lee",
    position: "UI/UX Designer",
    review:
      "Super intuitive and user-friendly. It has made our design collaboration much smoother.",
    rating: 4,
  },
];

const TestimonialStyle2 = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="section-gap xl:pb-20 pb-2">
      <Container className="flex flex-col gap-y-12 md:flex-row justify-between">
        {/* image part */}
        <div className="md:w-[30%] w-full">
          <div className="relative">
            <Image
              className="z-20 relative rounded-[24px]"
              src={'/assets/testimonial/women.jpg'}
              alt="testimonial"
                width={300}
                height={300}
              priority
            />
            <Image
              className="w-[180px] h-[180px] absolute right-0 -bottom-20 z-0"
              src={'/assets/testimonial/star.jpg'}
              alt="star-shape"
              width={180}
              height={180}
              priority
            />
          </div>
        </div>

        {/* slider part */}
        <div className="md:w-[60%] w-full">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((item) => (
              <div key={item.id}>
                {/* rating stars */}
                <span className="flex items-center gap-1 text-[#FBBF24]">
                  {[...Array(item.rating)].map((_, i) => (
                    <IoIosStar key={i} size={24} />
                  ))}
                </span>

                {/* review text */}
                <h3 className="mt-8 max-w-[650px]">{item.review}</h3>

                {/* user info */}
                <div className="flex gap-3 items-center mt-6">
                  <p className="font-medium text-secondaryColor">{item.name}</p>
                  <p>{item.position}</p>
                </div>
              </div>
            ))}
          </Slider>

          {/* slider control buttons (same place) */}
          <div className="flex gap-3 items-center mt-8">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-10 h-10 rounded-full bg-white border border-primaryBorder flex justify-center items-center text-primary hover:bg-primaryBlue hover:text-white hover:border-primaryBlue duration-300 ease-in-out"
            >
              <IoIosArrowBack size={24} />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="w-10 h-10 rounded-full bg-white border border-primaryBorder flex justify-center items-center text-primary hover:bg-primaryBlue hover:text-white hover:border-primaryBlue duration-300 ease-in-out"
            >
              <IoIosArrowForward size={24} />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TestimonialStyle2;
