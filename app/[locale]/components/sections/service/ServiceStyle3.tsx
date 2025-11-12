
import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

type ServiceGridItem = {
  title: string;
  highlight?: boolean;
  multiline?: boolean;
};

const serviceGrid: ServiceGridItem[][] = [
  [
    { title: "IT Strategy & Consulting" },
    { title: "Cybersecurity & Compliance" },
  ],
  [
    { title: "Custom Software Development", highlight: true },
    { title: "Enterprise Resource Planning (ERP)" },
  ],
  [
    { title: "Cloud Solutions & Migration" },
    { title: "Team Augmentation", multiline: true },
  ],
];

const ServiceStyle3 = () => {
  return (
    <div className="bg-[#131212] lg:py-[120px] md:py-[80px] py-[60px]">
      <Container>
        {/* section title start here */}
        <SectionTitle
          title="We Provide Innovative Business & IT Solutions"
          align="left"
          color="text-white"
        />

        {/* Service grid (mapped from JSON data) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 md:mt-20 mt-14">
          {serviceGrid.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-8">
              {col.map((item) => (
                <div
                  key={item.title}
                  className={`flex items-center justify-between border-b border-[#B2AEAF] pb-6 group hover:border-primaryBlue duration-300 ease-in-out${item.highlight ? ' ' : ''}`}
                >
                  <h3 className="md:max-w-[316px] max-w-[230px] text-white xl:text-[32px] lg:text-[24px] md:text-[20px] text-[20px] leading-normal">
                    {item.multiline ? (
                      <>
                        Team <br /> Augmentation
                      </>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <div>
                    <Link
                      href="/service/tech-pro-services"
                      className={`lg:w-15 lg:h-15 w-12 h-12 rounded-full flex items-center justify-center border border-white bg-transparent text-white transition-colors duration-300 group-hover:bg-primaryBlue group-hover:border-primaryBlue ease-in-out${item.highlight ? ' bg-primaryBlue border-primaryBlue' : ''}`}
                    >
                      <FiArrowUpRight size={22} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Images row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:mt-20 mt-14">
          <div className="w-full">
            <Image src={'/assets/service/service-4.jpg'} alt="Service" className="w-full h-auto object-cover" width={430} height={414} />
          </div>
          <div className="w-full">
            <Image src={'/assets/service/service-5.jpg'} alt="Service" className="w-full h-auto object-cover" width={430} height={414} />
          </div>
          <div className="w-full">
            <Image src={'/assets/service/service-6.jpg'} alt="Service" className="w-full h-auto object-cover" width={430} height={414} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ServiceStyle3;
