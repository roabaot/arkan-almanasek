import Image from "next/image";
import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";

const AboutStyle2 = () => {
  return (
    <div className="section-gap">
      {/************* about us section start here **************/}

      <Container>
        {/* section title */}
        <SectionTitle
          label="About Us"
          title="Innovate Integrate Elevate Tech-savvy Lives"
          align="center"
        />

        {/* main about section */}
        <div className="flex flex-col lg:flex-row lg:gap-[30px] gap-12 md:mt-15 mt-12">
          {/* left part text */}
          <div className="lg:w-[60%] w-full relative">
            <Image
              className="w-full md:h-[400px] h-[300px] rounded-[10px]"
              src={"/assets/about/about.png"}
              width={850}
              height={400}
              priority
              alt="about image"
            />

            <div className="bg-white rounded-[10px] border border-primaryBorder p-6 flex items-center gap-5 absolute xl:-bottom-14 bottom-8 right-5">
              <div>
                <Image
                  src="/icons/about/happy-client.svg"
                  alt="serach icon"
                  width={65}
                  height={65}
                  priority
                />
              </div>

              <div>
                <h3>6k+</h3>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>

          {/* right part image */}
          <div className="lg:w-[40%] w-full flex flex-col gap-5">
            {/* item 1 */}
            <div className="flex gap-5 border-b border-dashed border-primaryBorder pb-3">
              <div>
                <div className="w-20 h-20 rounded-full bg-sectionBg flex justify-center items-center">
                  <Image
                    src="/icons/about/game-white.svg"
                    alt="games"
                    width={45}
                    height={45}
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h4>Tech Fuse Solutions</h4>
                <p>
                  Technology is constantly evolving shaping the way we It
                  encompasses Technology is constantly{" "}
                </p>
              </div>
            </div>
            {/* item 2 */}
            <div className="flex gap-5 border-b border-dashed border-primaryBorder pb-3">
              <div>
                <div className="w-20 h-20 rounded-full bg-sectionBg flex justify-center items-center">
                  <Image
                    src="/icons/about/wireless-charger-white.svg"
                    alt="wireless"
                    width={45}
                    height={45}
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h4>Virtual Vista Innovations</h4>
                <p>
                  Technology is constantly evolving shaping the way we It
                  encompasses Technology is constantly{" "}
                </p>
              </div>
            </div>
            {/* item 3 */}
            <div className="flex gap-5 border-b border-dashed border-primaryBorder pb-3">
              <div>
                <div className="w-20 h-20 rounded-full bg-sectionBg flex justify-center items-center">
                  <Image
                    src="/icons/about/smart-lock-white.svg"
                    alt="smart-lock"
                    width={45}
                    height={45}
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h4>Code Craft Creations</h4>
                <p>
                  Technology is constantly evolving shaping the way we It
                  encompasses Technology is constantly{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutStyle2;
