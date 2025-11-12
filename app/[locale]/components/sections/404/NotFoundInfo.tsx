import Container from "../../common/Container"
import Link from "next/link"
import Image from "next/image"

const NotFoundInfo = () => {
  return (
    <div>
        <Container>
      <div className='flex flex-col items-center justify-center'>
        <Image className='w-[400px] h-[320px] object-contain' src={'/assets/error/404.svg'} width={400} height={320} priority alt='error image'/>
         <h2 className='mt-10 mb-3'>Oops...That link is broken.
         </h2>
         <p>Sorry for the inconvenience. Go to our homepage to check out our latest collections.</p>
         <Link href={'/'} className="mt-10 bg-primary px-10 py-4 rounded-[30px] text-white text-[16px] font-semibold border-[1px] border-primary hover:bg-transparent hover:text-primary duration-300 ease-in-out cursor-pointer font-primary">Return Home </Link>
      </div>
    </Container>
    </div>
  )
}

export default NotFoundInfo