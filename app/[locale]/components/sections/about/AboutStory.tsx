import Container from "../../common/Container";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AboutStory = () => {
  const t = useTranslations("about.story");
  return (
    <div className="section-gap">
      <Container className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-[30%] w-full relative">
          <Image
            className="w-full rounded-[16px]"
            src={"/assets/about/about-8.webp"}
            alt="about putech"
            width={350}
            height={440}
            priority
          />
          <div className="bg-white rounded-full flex items-center justify-between p-2 absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%]">
            <span className="text-sm text-secondaryColor font-secondary font-normal max-w-[230px] ps-3">
              {t("tagline")}
            </span>
            <Image
              className="w-12 h-12 rounded-full md:hidden block lg:block"
              src={"/logo.svg"}
              alt="icon"
              width={48}
              height={48}
              priority
            />
          </div>
        </div>

        <div className="md:w-[40%] w-full flex flex-col gap-6">
          <Image
            className="w-full rounded-[16px]"
            src={"/assets/about/about-10.webp"}
            alt="about putech"
            width={400}
            height={272}
            priority
          />
          <Image
            className="w-full rounded-[16px]"
            src={"/assets/about/about-11.webp"}
            alt="about putech"
            width={400}
            height={272}
            priority
          />
        </div>

        <div className="md:w-[30%] w-full">
          <Image
            className="w-full rounded-[16px]"
            src={"/assets/about/about-9.webp"}
            alt="about putech"
            width={350}
            height={440}
            priority
          />
        </div>
      </Container>

      <Container>
        {/* story here */}
        <div className="mt-12 md:mt-20 max-w-4xl mx-auto">
          <h3 className="text-[36px]">{t("our_story_title")}</h3>
          <p className="mt-4 text-secondaryColor">{t("our_story_paragraph")}</p>
        </div>
        {/* Our Mission here */}
        <div className="mt-12 md:mt-20 max-w-4xl mx-auto">
          <h3 className="text-[36px]">{t("our_mission_title")}</h3>
          <p className="mt-4 text-secondaryColor">
            {t("our_mission_paragraph")}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default AboutStory;
