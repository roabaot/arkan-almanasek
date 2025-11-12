import Container from "../../common/Container"
import { FiArrowRight } from "react-icons/fi"
import Image from "next/image"
const DigitalJourney = () => {
  return (
    <div className="bg-[#F9FBFC] section-gap section-padding">
        <Container className="flex justify-between items-center lg:flex-row flex-col gap-8">
           {/* image part */}
           <div className="lg:w-[40%] md:w-[80%] w-full">
            <Image src={'/assets/digital-service/clare-reception.jpg'} alt="digital journey" className="w-full h-auto" width={600} height={700} priority/>
           </div>


             {/* content part */}
             <div className="lg:w-[55%] md:w-[80%] w-full">
                <h2 className="max-w-[640px] mb-6">Your Digital Transformation Journey</h2>
                  <p className="text-secondaryColor">From process automation to cutting-edge IT infrastructure, we support your business at every step of its digital transformation journey. Our mission is to simplify complexity, ensuring that you receive tangible value that propels your growth. </p>
                  <p className="text-secondaryColor mt-6">We offer tailored solutions that adapt to your unique needs, fostering innovation and efficiency. With our expertise, you can navigate the digital landscape confidently and stay ahead of the competition.</p>
                   <hr className="border-[.5px] border-primaryBorder w-[60%]"/>
                 <div className="mt-[30px]">
                    <button
                      className="bg-transparent border border-secondaryColor text-secondaryColor py-3 px-8 text-lg font-medium rounded-[30px] flex items-center gap-3 transition-colors duration-200 hover:bg-primaryBlue hover:border-primaryBlue hover:text-white cursor-pointer"
                    >
                      Get in touch
                      <FiArrowRight className="text-inherit transition-colors duration-200" size={20} />
                    </button>
                 </div>
             </div>
        </Container>
    </div>
  )
}

export default DigitalJourney