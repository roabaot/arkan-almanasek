import PointsCard from "./PointsCard";

interface PointsT {
  title: string;
  points: string[];
}
interface ServiceSidebarProps {
  requiredDocuments: PointsT;
  benefits: PointsT;
  conditions: PointsT;
}

const ServiceSidebar = ({
  requiredDocuments,
  benefits,
  conditions,
}: ServiceSidebarProps) => {
  return (
    <div>
      <div className="md:space-y-10 space-y-7">
        {/* Service Details */}
        <PointsCard {...requiredDocuments} />
        <PointsCard {...benefits} />
        <PointsCard {...conditions} />

        {/* Contact Us Box */}
        {/* <div className="bg-primaryBlue rounded-[10px] md:p-10 p-5 text-center shadow">
          <h3 className="mb-5 text-white">Contact Us</h3>
          <h4 className="mb-5 text-white">(+888) 178 456 765</h4>
          <p className="mb-[30px] text-white">Need Help? Call Us</p>
          <Link href={"/contact"}>
            <Button className="bg-secondaryColor">Contact Us</Button>
          </Link>
        </div> */}

        {/* Follow Us */}
        {/* <div className="bg-white shadow-navbar-shadow border-t border-primaryBorder rounded-[20px] md:p-10 p-5">
          <h4 className="mb-5">Follow Us</h4>
          <div className="flex gap-3">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sectionBg w-10 h-10 rounded-full flex items-center justify-center text-primaryBlue hover:bg-primaryBlue hover:text-white duration-300 ease-in-out"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sectionBg w-10 h-10 rounded-full flex items-center justify-center text-primaryBlue hover:bg-primaryBlue hover:text-white duration-300 ease-in-out"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sectionBg w-10 h-10 rounded-full flex items-center justify-center text-primaryBlue hover:bg-primaryBlue hover:text-white duration-300 ease-in-out"
            >
              <FaLinkedin size={18} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sectionBg w-10 h-10 rounded-full flex items-center justify-center text-primaryBlue hover:bg-primaryBlue hover:text-white duration-300 ease-in-out"
            >
              <FaPinterestP size={18} />
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ServiceSidebar;
