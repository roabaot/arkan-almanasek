import { CiCalendarDate } from "react-icons/ci"
import { blogData } from "../../data/blogData"
import Link from "next/link"

const PopularPost = () => {
  return (
    <div>
          <div className="bg-white shadow-navbar-shadow rounded-[10px] border-t border-primaryBorder md:p-10 p-7">
                   <h4>Popular Post</h4>
                    <div className="flex flex-col gap-5 mt-6">
                      {blogData?.map((blog,index)=>
                           <div key={index} className="bg-[#F2F4F8] px-[30px] py-5 rounded-[10px]">
                           <span className="flex items-center gap-3 text-textColor text-[12px] font-secondary font-normal"><span><CiCalendarDate className="text-[20px] text-primaryBlue" />
                           </span>{blog?.fullDate} </span>

                           <Link href={`/blog/${blog.slug}`}>
                           <h5 className="mt-3 line-clamp-2">{blog.title}</h5>
                           </Link>
                        </div>
                      )}

                    </div>
                   
                 </div>
    </div>
  )
}

export default PopularPost