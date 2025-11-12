
import Image from "next/image";
import Marquee from "react-fast-marquee";
const items = [
  { label: "Net Works Plus", icon: '/icons/business/icon-1.svg' },
  { label: "Industrial", icon: '/icons/business/icon-2.svg' },
  { label: "Factory", icon: '/icons/business/icon-3.svg' },
  { label: "Concrete & Foundation Work", icon: '/icons/business/icon-1.svg'},
  { label: "Industrial", icon: '/icons/business/icon-2.svg' },
  { label: "Concrete & Foundation Work", icon: '/icons/business/icon-1.svg'},
  { label: "Factory", icon: '/icons/business/icon-3.svg' },


];

const Business = () => {
  return (
    <div className="bg-[#E5E8F2] section-gap overflow-hidden md:py-9 py-4">
      <Marquee speed={100} gradient={false}>
        <div className="flex gap-10 items-center mx-9">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-10">
              <div className="w-20 h-20 border border-primaryBorder rounded-full flex justify-center items-center">
                <Image className="object-contain" src={item.icon} width={40} height={40} property="" alt={item.label} />
              </div>
              <h2 className="whitespace-nowrap">
                {item.label}
              </h2>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Business;
