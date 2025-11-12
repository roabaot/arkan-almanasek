import Container from "../../common/Container"
import Marquee from "react-fast-marquee"
import Image from "next/image"
import { companyLogos } from "../../data/companyData"

const Brand = () => {
  return (
   
        <Container className="section-gap">
         <section className="rounded-[20px] md:py-[50px] py-[30px] bg-sectionBg px-4">
         <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={true}
        >
          {companyLogos.map((company) => (
            <div key={company.id} className="mx-[55px] min-w-[120px]">
              <Image
                src={company.image}
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
   
  )
}

export default Brand