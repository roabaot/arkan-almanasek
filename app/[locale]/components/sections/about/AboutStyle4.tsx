import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Container from "../../common/Container";
import Link from "next/link";
import Image from "next/image";
const AboutStyle4 = () => {
  return (
    <div className="overflow-hidden">
      <Container>
        <div
          className="bg-no-repeat bg-left"
          style={{ backgroundImage: `url(${"/assets/about/pattern.png"})` }}
        >
          <div className="flex flex-col gap-10 lg:flex-row justify-between items-center section-padding">
            <div className="lg:w-[50%] w-full relative">
              <Image
                className="object-contain"
                src={"/assets/about/about-6.jpg"}
                alt="about image"
                width={500}
                height={550}
                priority
              />
              <div className="md:block hidden">
                <div className="absolute top-0 left-28 flex items-center justify-center w-full h-full">
                  <div className="relative">
                    <Image
                      className="xl:w-[430px] xl:h-[330px] w-[300px] h-[250px]"
                      src={"/assets/about/shape.png"}
                      alt="shape image"
                      width={430}
                      height={330}
                      priority
                    />
                    <div className="flex items-center gap-3 absolute top-0 left-0">
                      <div>
                        <div className="bg-[#36180A] rounded-[42px] xl:w-[226px] xl:h-[161px] w-[150px] h-[120px] flex flex-col items-center">
                          <span className="xl:text-[72px] text-[50px] text-[#FFFEFD] font-primary font-medium capitalize">
                            14+
                          </span>
                          <span className="text-[#FFFEFD] xl:text-[30px] text-[20px] font-primary font-medium xl:mt-[-25px] mt-[-10px]">
                            Years
                          </span>
                        </div>
                      </div>
                      <Image
                        className="rounded-[42px] xl:w-[226px] xl:h-[161px] w-[150px] h-[120px]"
                        src={"/assets/about/about-7.jpg"}
                        alt="shape image"
                        width={226}
                        height={161}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-[45%] w-full">
              <h2 className="mb-7">Powerful agency for corporate business.</h2>
              <p className="mb-10">
                We strive to develop real-world web solutions that are ideal for
                small to large projects with bespoke project requirements.
              </p>
              <Link href={"/about"}>
                <button className="flex items-center bg-primaryBlue text-white px-8 py-5 text-sm rounded-full font-medium hover:bg-secondaryColor hover:text-white duration-300 ease-in-out z-30">
                  Read about us{" "}
                  <IoArrowForwardCircleOutline size={20} className="ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutStyle4;
