import { FaFacebookF, FaLinkedin, FaPinterestP } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

const FollowUs = () => {
  return (
    <div>
          <div className="bg-white shadow-navbar-shadow rounded-[10px] border-t border-primaryBorder md:p-10 p-7">
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
      </div>
    </div>
  )
}

export default FollowUs