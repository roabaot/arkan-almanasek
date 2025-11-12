import Image from "next/image";
import Container from "../../common/Container";
import { useTranslations } from "next-intl";
const ServiceStyle4 = () => {
  // Updated namespace to about.service as per request
  const t = useTranslations("about.service");
  return (
    <div className="section-gap">
      <Container>
        <div className="flex flex-col lg:flex-row md:gap-[70px] gap-12 items-center">
          <div className="lg:w-[45%] w-full">
            <Image
              className="w-full md:max-h-[700px] lg:max-h-[625px] rounded-[16px]"
              src={"/assets/about/corporate-woman-reading-medium-shot.webp"}
              alt="women reading"
              width={580}
              height={700}
            />
          </div>

          <div className="lg:w-[40%] w-full">
            <p className="text-primaryBlue uppercase font-bold text-sm">
              {t("subtitle")}
            </p>
            <h3 className="md:text-[48px] text-[32px] text-secondaryColor font-medium mt-3">
              {t("heading")}
            </h3>
            <div className="flex flex-col xl:gap-10 gap-6 xl:mt-20 mt-12">
              {/* part 1 */}
              <div>
                <h4>1. {t("parts.1.title")}</h4>
                <p>{t("parts.1.description")}</p>
              </div>
              {/* part 2 */}
              <div>
                <h4>2. {t("parts.2.title")}</h4>
                <p>{t("parts.2.description")}</p>
              </div>
              {/* part 3 */}
              <div>
                <h4>3. {t("parts.3.title")}</h4>
                <p>{t("parts.3.description")}</p>
              </div>
              {/* part 4 */}
              <div>
                <h4>4. {t("parts.4.title")}</h4>
                <p>{t("parts.4.description")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* counter part */}
        <div className="section-gap ">
          <div className="flex flex-col gap-10 lg:flex-row justify-between">
            <div className="xl:w-[42%] lg:w-[45%] md:w-[70%] w-full">
              <h3 className="text-[28px] md:text-[36px] font-medium text-secondaryColor mb-4">
                {t("impact.heading")}
              </h3>
              <p className="">{t("impact.description")}</p>
            </div>

            <div className="xl:w-[42%] lg:w-[45%] w-full">
              <div className="flex flex-col md:flex-row justify-center items-center gap-10 xl:gap-20">
                <div className="flex flex-col">
                  <span className="text-[48px] md:text-[64px] font-medium font-primary text-secondaryColor">
                    290+
                  </span>
                  <span className="text-[16px] font-secondary text-textColor mt-2">
                    {t("impact.clients_label")}
                  </span>
                </div>
                <hr className="hidden xl:block h-32 border-[.5px] border-[#4B4757]"></hr>
                <div className="flex flex-col">
                  <span className="text-[48px] md:text-[64px] font-primary font-medium text-secondaryColor">
                    1,200+
                  </span>
                  <span className="text-[16px] font-secondary text-textColor mt-2">
                    {t("impact.strategies_label")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ServiceStyle4;
