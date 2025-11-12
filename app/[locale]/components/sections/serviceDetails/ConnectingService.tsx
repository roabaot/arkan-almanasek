import Image from "next/image";
import { servicesData } from "../../data/servicesData";
const ConnectingService = () => {
  return (
    <div>
      <div>
        <h3>Connecting You to Tomorrow</h3>
        <p className="mt-5">
          Technology has revolutionized the way we live, work, and communicate.
          From smartphones to artificial intelligence, our world is becoming
          more connected every day Technology has revolutionized the way we live
          work communicate. From smartphones to artificial intelligence, our
          world is becoming more connected every day
        </p>
        {/* service here */}

        {/* all services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] my-[30px]">
          {servicesData?.slice(0, 4).map((service, index) => (
            <div
              key={index}
              className="bg-white border border-primaryBorder rounded-[10px] p-6 flex justify-between items-center hover:border-primaryBlue duration-300 ease-in-out"
            >
              <div className="flex items-center gap-5">
                <Image src={service?.icon} width={40} height={40} priority alt="services" />
                <h4 className="text-[18px] md:text-[20px] xl:text-[24px]">
                  {service?.title}
                </h4>
              </div>
              <div>
                <h3 className="text-[#666A73] font-medium capitalize tracking-[-0.64px]">
                  {service?.number}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <p>
          Technology has revolutionized the way we live, work, and communicate.
          From smartphones to artificial intelligence, our world is becoming
          more connected every day Technology has revolutionized the way{" "}
        </p>
      </div>

      <div className="mt-[30px]">
        <h3>Transforming Tech Dreams</h3>
        <div className="mt-[30px] flex flex-col md:flex-row gap-[30px] w-full">
          <div className="w-full">
            <Image
              className="w-full h-auto object-contain rounded-[20px]"
              src={'/assets/service/service-2.png'}
               width={410}
              height={340}
              priority
              alt="service"
            />
          </div>
          <div className="w-full">
            <Image
              className="w-full h-auto object-contain rounded-[20px]"
              src={'/assets/service/service-3.png'}
              width={410}
              height={340}
              priority
              alt="service"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectingService;
