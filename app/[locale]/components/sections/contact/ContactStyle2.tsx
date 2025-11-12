
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import ContactFormTwo from "../../ui/form/ContactFormTwo";



const ContactStyle2: React.FC = () => {

  return (
    <section className="section-gap">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-7 relative">
        {/* Left Content */}
        <div className="space-y-6 flex flex-col ">
        <SectionTitle
        label="Contact"
        title="Contact With Us form Today"
        description="Technology is constantly evolving, shaping the way we live and work encompasses innovation, automation Technology is constantly evolving"
        align="left"/>

          <div className="space-y-6">
            <div>
              <div className="flex items-start gap-4 mb-2">
              <FaLocationDot className="text-secondaryColor text-xl mt-1" />
              <p>Address</p>
              </div>
                <h5>
                  3517 W. Gray St. Utica, Pennsylvania 57867
                </h5>
            
            </div>

            <div>
             <div className="flex items-start gap-4 mb-2">
             <FaPhoneAlt className="text-secondaryColor text-xl mt-1" />
             <p>Phone Number</p>
             </div>
                <h5>(480) 555-0103</h5>
            </div>

            <div>
              <div className="flex items-start gap-4 mb-2">
              <IoMail className="text-secondaryColor text-xl mt-1" />
              <p>Email</p>
              </div>
              <h5>
                  georgia.young@example.com
                </h5>
             
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-sectionBg md:px-10 px-6 md:py-14 py-8 rounded-[20px] flex flex-col justify-center relative">
          {/* Vertical text in center */}
          <p className="hidden lg:block absolute -left-1/3 top-1/2 -translate-y-1/2 rotate-[-90deg] text-primaryBlue/[0.05] text-[74px] font-primary font-bold select-none">
            Contact
          </p>

          <h3>
            Get In Touch
          </h3>
           
            {/*Contact Form */}
          <ContactFormTwo/>

        </div>
      </Container>
    </section>
  );
};

export default ContactStyle2;
