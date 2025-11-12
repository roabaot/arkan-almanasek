
import Marquee from "react-fast-marquee"
import Image from "next/image";
const items = [
    { label: "Software development", icon: '/assets/hero/star.svg' },
    { label: "Content writing", icon: '/assets/hero/star.svg' },
    { label: "UI/UX Design", icon: '/assets/hero/star.svg' },
    { label: "Web design", icon: '/assets/hero/star.svg' },
    { label: "Software development", icon: '/assets/hero/star.svg' },
    { label: "Content writing", icon: '/assets/hero/star.svg' },
    { label: "UI/UX Design", icon: '/assets/hero/star.svg' },


  ];

const ServiceMarquee = () => {
  return (
    <div className="bg-primaryBlue overflow-hidden h-[80px]">
      <Marquee speed={100} gradient={false}>
        <div className="flex gap-10 items-center mx-9">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-10">
                <Image className="object-contain" src={item.icon} alt={item.label} width={40} height={40} priority />
              <h2 className="whitespace-nowrap text-white text-[40px] font-bold leading-20 tracking-[-1.08px] capitalize">
                {item.label}
              </h2>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  )
}

export default ServiceMarquee