import Container from "../../common/Container";
import { HiStar } from "react-icons/hi";
import Image from "next/image";

const WorkWithUs = () => {
  return (
     <Container>
         <div className="rounded-[45px] lg:py-16 py-10 xl:px-24 lg:px-16 px-8 bg-[#F9FBFC] section-gap flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-8">
            <div className="lg:w-[45%] w-full">
          <h2 className="md:text-[80px] text-[45px] font-bold text-secondaryColor mb-6 md:leading-20 leading-12">
            Let&#39;s work together
          </h2>
          <p>Beautiful design has the power to captivate.</p>
        </div>

        <div className="lg:w-[45%] w-full">
          <h3>Happy clients have been boost their Business</h3>
          <div className="flex flex-col gap-6 items-center md:items-start md:flex-row justify-between mt-6">

            <div>
               <span className="flex items-center gap-4">
                <strong className="text-[18px] text-primary">4.8</strong>
                 <span className="flex items-center gap-2 text-[#FAC051] text-[20px]">
                  <HiStar/>
                  <HiStar/>
                  <HiStar/>
                  <HiStar/>
                  </span>
               </span>
              <h5 className="text-secondaryColor">(1.5k Positive review)</h5>
            </div>
            {/* Avatar Group */}
            <div className="flex -space-x-4">
              <div>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={'/assets/hero/author-4.jpg'}
                  alt="Avatar 1"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={'/assets/hero/author-5.jpg'}
                  alt="Avatar 2"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={'/assets/hero/author-6.jpg'}
                  alt="Avatar 3"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={'/assets/hero/author-7.jpg'}
                  alt="Avatar 4"
                  width={48}
                  height={48}
                />
              </div>
            </div>
          </div>
        </div>
         </div>
      </Container>
  );
};

export default WorkWithUs;
