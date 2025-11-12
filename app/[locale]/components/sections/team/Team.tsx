import { LuShare2 } from "react-icons/lu"
import SectionTitle from "../../common/SectionTitle"
import Image from "next/image"
import Container from "../../common/Container"
import Button from "../../common/Button"

const Team = () => {
  return (
    <div className="section-gap">
        <Container className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-[30px]">
         {/* part 1  */}
         <div className="w-full">
         <SectionTitle
        label="Our team"
        title="Best Team Member"
        description="Technology is constantly evolving, shaping the way we live and work. It encompasses innovation"
        align="left"
      />

         <h3 className="mt-5 mb-7">200+ Team Member</h3>
         <Button className="bg-[#E5E8F2] text-secondaryColor hover:text-white">
         View More
        </Button>

         </div>

          {/* part 2 */}
          <div className="w-full relative">
             <Image className="w-full h-auto rounded-[10px]" src={'/assets/team/team-1.png'} alt="team menber" width={410} height={496} priority/>
             <div className="relavite bg-white w-[80%] px-10 py-5 rounded-[10px] absolute bottom-7 left-1/2 -translate-x-1/2 transition-opacity duration-300 ease-in-out">
               <h4>Kathryn Murphy</h4>
               <p>Web Designer</p>
             </div>
             <div className="bg-[#E5E8F2] text-secondaryColor w-10 h-10 rounded-full flex justify-center items-center absolute left-6 bottom-14">
             <LuShare2 size={20}/>
             </div>
          </div>

          {/* part 3 */}
          <div className="w-full relative">
             <Image className="w-full h-auto rounded-[10px]" src={'/assets/team/team-2.png'} alt="team menber" width={410} height={496} priority/>
             <div className="relavite bg-white w-[80%] px-10 py-5 rounded-[10px] absolute bottom-7 left-1/2 -translate-x-1/2 transition-opacity duration-300 ease-in-out">
               <h4>Kathryn Murphy</h4>
               <p>Web Designer</p>
             </div>
             <div className="bg-[#E5E8F2] text-secondaryColor w-10 h-10 rounded-full flex justify-center items-center absolute left-6 bottom-14">
             <LuShare2 size={20}/>
             </div>
          </div>
          
        </Container>
    </div>
  )
}

export default Team