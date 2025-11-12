import Image from "next/image"
import CommentForm from "../form/CommentForm"

const BlogComment = () => {
  return (
    <div>
          <div className="md:mt-15 mt-12">
                {/* Comment Section */}
                <h3 className="mb-[30px]">1 Comment</h3>
                <div className="ml-12 relative flex flex-col md:flex-row items-start gap-4 border border-primaryBlue rounded-[20px] p-5 md:p-7 mb-15">
                  {/* Comment Content */}
                  <div className="flex-1 ml-10">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4>Chis Hawel</h4>
                        <p>Designer</p>
                      </div>
                      <button className="bg-[#E5E8F2] text-secondaryColor font-bold text-[18px] font-primary px-4 py-1.5 rounded-full">
                        Reply
                      </button>
                    </div>
                    <p className="mt-5">
                      Technology is a vast field that encompasses the design,
                      creation, use, and maintenance of various systems, tools,
                      and machines. It drives innovation, efficiency
                    </p>
                  </div>

                  {/* Avatar */}
                  <Image
                    src={'/assets/blog/avatar.png'}
                    alt="avatar"
                    className="w-24 h-24 rounded-full object-cover absolute -left-12 md:top-1/4 top-1/3"
                    width={96}
                    height={96}
                    priority
                  />
                </div>

                <h3 className="mb-7">Leave A Comment</h3>
                   {/* Comment Form here */}
                <CommentForm/>

              </div>
    </div>
  )
}

export default BlogComment