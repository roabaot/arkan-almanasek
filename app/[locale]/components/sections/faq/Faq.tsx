import Image from "next/image";
import { accordionData } from "../../data/accordionData";
import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import Accordion from "../../common/AccordionItem";
import { useTranslations } from "next-intl";

const Faq = () => {
  const t = useTranslations("faq");
  return (
    <div className="bg-sectionBg section-gap relative py-16 overflow-hidden">
      <Container>
        {/* section title start here */}
        <SectionTitle
          label={t("title")}
          title={t("description")}
          align="center"
        />

        {/* Accordion part start    */}
        <div className="lg:flex flex-row-reverse items-center justify-between md:mt-[60px] mt-10">
          {/* image part */}
          <div className="lg:w-[43%] w-full mb-10 lg:mb-0 relative">
            <div className="absolute lg:-bottom-[25%] lg:top-auto -top-[25%] ltr:-right-[25%] rtl:-left-[25%] z-0">
              <Image
                className="w-full h-[250px] object-contain rtl:scale-x-[-1]"
                src={"/assets/hero/effect-home-2.svg"}
                width={350}
                height={250}
                priority
                alt="dot"
              />
            </div>
            <Image
              className="w-full h-auto rounded-[10px] z-10 relative"
              src={"/assets/faq/thumb.jpeg"}
              width={600}
              height={346}
              priority
              alt="faq-thumb1"
            />
            <div className="bg-[#E1F0FD] rounded-[20px] shadow-faq p-5 flex items-center gap-5 absolute bottom-5 right-5 z-10">
              <div>
                <Image
                  src="/assets/about/icon.svg"
                  width={45}
                  height={45}
                  priority
                  alt="serach icon"
                />
              </div>

              <div>
                <h3>2k+</h3>
                <p>{t("project_completed")}</p>
              </div>
            </div>
          </div>

          <div className="lg:w-[50%] w-full">
            <Accordion items={accordionData} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Faq;
