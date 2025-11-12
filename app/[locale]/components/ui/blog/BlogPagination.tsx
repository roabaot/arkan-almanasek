import { MdKeyboardDoubleArrowRight } from "react-icons/md"

const BlogPagination = () => {
  return (
    <div>
         <div className="flex items-center justify-center gap-3 mt-15">
              <button className=" w-10 h-10 rounded-full text-[16px] font-medium flex justify-center items-center bg-primaryBlue text-white duration-300 ease-in-out cursor-pointer">
                01
              </button>
              <button className="bg-[#F2F4F8] w-10 h-10 rounded-full text-[16px] font-medium text-primary flex justify-center items-center hover:bg-primaryBlue hover:text-white duration-300 ease-in-out cursor-pointer">
                02
              </button>
              <button className="bg-[#F2F4F8] w-10 h-10 rounded-full text-[16px] font-medium text-primary flex justify-center items-center hover:bg-primaryBlue hover:text-white duration-300 ease-in-out cursor-pointer">
                03
              </button>
              <button className="bg-[#F2F4F8] w-10 h-10 rounded-full text-[16px] font-medium text-primary flex justify-center items-center hover:bg-primaryBlue hover:text-white duration-300 ease-in-out cursor-pointer">
                <MdKeyboardDoubleArrowRight />
              </button>
            </div>
    </div>
  )
}

export default BlogPagination