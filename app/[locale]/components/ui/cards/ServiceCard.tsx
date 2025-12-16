import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "../../common/Button";
import { ServiceT } from "@/app/[locale]/actions/services";

interface ServiceCardProps {
  service: ServiceT;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const t = useTranslations("buttons");
  return (
    <Link href={`/service/${service.id}`}>
      <div className="group flex flex-col h-full min-h-[340px] bg-white border border-primaryBorder rounded-[20px] 2xl:p-7 md:p-6 p-5 hover:border-primaryBlue hover:shadow-lg hover:scale-105 active:scale-110 transition duration-300 ease-in-out">
        {/* Content wrapper grows to take available space */}
        <div className="flex-1">
          <div className="flex items-center 2xl:gap-7 gap-5">
            <div>
              <div className="bg-primaryBlue w-20 h-20 rounded-full flex justify-center items-center">
                <Image
                  src={
                    service.icon_url ||
                    "https://staging.macs.com.sa/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MjAsInB1ciI6ImJsb2JfaWQifX0=--8373dc8af15b90d5b431b00fb3ffd01f293fdcf2/%D8%B4%D9%87%D8%A7%D8%AF%D8%A9%20%D8%A7%D9%84%D8%A7%D9%85%D8%AA%D8%AB%D8%A7%D9%84%20%D9%84%D9%86%D8%B8%D8%A7%D9%85%20%D8%A7%D9%84%D8%B9%D9%85%D9%84.png"
                  }
                  alt={service.name_i18n}
                  unoptimized
                  width={45}
                  height={45}
                  priority
                />
              </div>
            </div>
            <h4>{service.name_i18n}</h4>
          </div>
          <hr className="text-primaryBorder group-hover:text-primaryBlue my-5" />
          <p className="line-clamp-[10]">{service.description_i18n}</p>
        </div>

        {/* Button anchored at bottom; padding ensures minimum 30px spacing above */}
        <div className="pt-[30px]">
          <Button
            hoverBgColorClass="bg-primaryBlue"
            className="bg-sectionBg text-secondaryColor"
          >
            {t("read_more")}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
