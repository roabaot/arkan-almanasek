import { IoLocationSharp } from "react-icons/io5";
import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import { MdEmail } from "react-icons/md";
import ContactForm from "../../ui/form/ContactForm";

const Contact = () => {
  return (
    <div className="section-gap">
      <Container className="flex flex-col md:flex-row gap-[30px]">
        <div className="w-full">
          {/* section title start */}
          <SectionTitle
            label="Contact us"
            title="Get In Touch"
            description="Technology is constantly evolving, shaping the way we live and work. It encompasses innovation, automation, and connectivity driving progress"
            align="left"
          />

          <div className="flex flex-col xl:flex-row gap-[30px] mt-[30px]">
            {/* Address Box */}
            <div className="bg-[#F2F4F8] p-7 rounded-[10px]">
              <div className="flex items-center gap-2 mb-3">
                <IoLocationSharp size={20} className="text-primaryBlue" />
                <span className="text-[16px] text-textColor font-normal font-secondary leading-7">
                  Address
                </span>
              </div>
              <h5>2715 Ash San Jose, South Dakota 83475</h5>
            </div>

            {/* Email Box */}
            <div className="bg-[#F2F4F8] p-7 rounded-[10px]">
              <div className="flex items-center gap-2 mb-3">
                <MdEmail size={20} className="text-primaryBlue" />
                <span className="text-[16px] text-textColor font-normal font-secondary leading-7">
                  E-mail
                </span>
              </div>
              <h5>lawson.sanders@gmail.com</h5>
            </div>
          </div>
        </div>

        {/* contact form */}
        <div className="w-full bg-white shadow-contact rounded-[20px] md:px-10 px-6 md:py-15 py-10">
          <h3 className="text-[30px]">Send A Message</h3>
            {/* form */}
           <ContactForm/>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
