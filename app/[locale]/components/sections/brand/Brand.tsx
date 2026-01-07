import Container from "../../common/Container";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { getBrandLogos } from "@/app/[locale]/actions/brand";

const Brand = async () => {
  const logos = await getBrandLogos();

  const repeatedCompanyLogos = [
    ...(logos ?? []),
    ...(logos ?? []),
    ...(logos ?? []),
    ...(logos ?? []),
  ];

  return (
    <Container className="section-gap">
      <section
        className="rounded-[20px] md:py-[50px] py-[30px] bg-sectionBg px-4"
        dir="ltr"
      >
        <Marquee gradient={false} speed={50} pauseOnHover={true} autoFill>
          {repeatedCompanyLogos.map((company, index) => (
            <div
              key={`${company.id}-${index}`}
              className="mx-[55px] min-w-[120px]"
            >
              <Image
                src={company.icon_url}
                alt={`Company ${company.id}`}
                width={150}
                height={50}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          ))}
        </Marquee>
      </section>
    </Container>
  );
};

export default Brand;
