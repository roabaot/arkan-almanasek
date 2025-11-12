import Image from "next/image";
import Container from "./Container";

type PageHeaderProps = {
  title: string;
  para: string;
};

const BreadcrumbStyle2 = ({ title, para }: PageHeaderProps) => {
  return (
    <div
      className="h-[300px] md:h-[400px] 2xl:h-[450px] relative bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${"/assets/breadcrumb/BG.png"})` }}
    >
      <Container className="h-[300px] md:h-[400px] 2xl:h-[450px] flex flex-col justify-center items-center">
        <h2 className="mt-[50px] text-center z-10">{title}</h2>
        <div className="mt-3 max-w-[500px] z-10">
          {para && <p className="text-center">{para}</p>}
        </div>

        <div className="absolute left-[13%] md:block hidden">
          <Image
            className="object-contain w-full h-auto"
            src={"/assets/breadcrumb/shape02.png"}
            alt="shape"
            width={600}
            height={600}
          />
        </div>

        <div className="absolute right-[18%] bottom-20 w-[180px] h-[180px] md:block hidden">
          <Image
            className="object-contain w-full h-auto"
            src={"/assets/breadcrumb/star.png"}
            alt="star"
            width={120}
            height={120}
          />
        </div>
      </Container>
    </div>
  );
};

export default BreadcrumbStyle2;
