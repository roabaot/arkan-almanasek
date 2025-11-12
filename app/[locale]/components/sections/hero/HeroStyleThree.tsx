import Container from "../../common/Container";
import { HiOutlinePlus } from "react-icons/hi";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";

const HeroStyleThree = () => {
  return (
    <div
      className="bg-[#F2F4F8] bg-no-repeat bg-cover relative"
      style={{ backgroundImage: `url(${"/assets/hero/banner-3.jpg"})` }}
    >
      <Container className="lg:pt-[150px] md:pt-36 pt-28">
        <div className="xl:flex justify-between gap-10 items-end">
          <h1 className="2xl:text-[77px] xl:text-[75px] md:text-[60px] text-[40px] md:text-center xl:text-left font-medium text-primary 2xl:leading-[90px] xl:leading-[90px] md:leading-[85px] leading-12 md:tracking-[-3.2px] tracking-normal">
            Creating Smarter Business & IT Solutions
          </h1>
          <h5 className="xl:max-w-[420px] md:max-w-[500px] mx-auto xl:mx-0 md:text-center text-left xl:text-left text-[20px] font-normal font-secondary text-textColor mt-5 xl:mt-0">
            We design and deliver innovative IT solutions that help businesses
            streamline processes, enhance productivity, and achieve measurable
            growth.{" "}
          </h5>
        </div>

        <div className="md:mt-16 mt-10 flex flex-col md:flex-row justify-between">
          {/* Avatar Group */}
          <div className="flex flex-col justify-end md:py-20 lg:w-[20%] md:w-[25%]">
            <div className="flex -space-x-4">
              <div>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={"/assets/hero/author-4.jpg"}
                  alt="Avatar 1"
                  width={48}
                  height={48}
                  priority
                />
              </div>
              <div>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={"/assets/hero/author-5.jpg"}
                  alt="Avatar 2"
                  width={48}
                  height={48}
                  priority
                />
              </div>
              <div>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={"/assets/hero/author-6.jpg"}
                  alt="Avatar 3"
                  width={48}
                  height={48}
                  priority
                />
              </div>
              <div>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={"/assets/hero/author-7.jpg"}
                  alt="Avatar 4"
                  width={48}
                  height={48}
                  priority
                />
              </div>
              <div>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={"/assets/hero/author-8.jpg"}
                  alt="Avatar 5"
                  width={48}
                  height={48}
                  priority
                />
              </div>
              <span className="w-12 h-12 rounded-full flex justify-center items-center text-white bg-primaryBlue">
                <HiOutlinePlus size={20} />
              </span>
            </div>

            <p className="mt-4 text-lg text-primary font-semibold">
              100+ Popular Clients
            </p>
          </div>

          <div className="lg:w-[70%] md:w-[65%] relative mt-10 md:mt-0">
            <Image
              className="w-full h-auto"
              src={"/assets/hero/hero-4.jpg"}
              alt="hero"
              width={915}
              height={515}
              priority
            />
            <button className="md:w-28 md:h-28 w-24 h-24 rounded-full bg-primaryBlue text-white absolute top-4 md:right-20 right-4 flex items-center justify-center text-lg font-medium hover:bg-[#0d3b73] duration-300 ease-in-out">
              <span className="flex flex-col items-center gap-1">
                <GoArrowUpRight size={24} />
                Explore
              </span>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroStyleThree;
