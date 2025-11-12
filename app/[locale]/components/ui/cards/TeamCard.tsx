// components/TeamCard.tsx
import Image from "next/image";
import React from "react";
import { LuShare2 } from "react-icons/lu";

export interface Social {
  icon: React.ReactNode;
  link: string;
}

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  socials: Social[];
}

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="bg-white border border-secondaryColor rounded-[10px] p-[30px] hover:border-primaryBlue duration-300 ease-in-out group relative overflow-hidden">
      {/* Image */}
      <div className="relative">
        <Image
          className="w-full h-[340px] object-center rounded-[10px]"
          src={member.image}
          width={350}
          height={320}
          priority
          alt={member.name}
        />
        <div className="bg-[#E5E8F2] text-primaryBlue w-10 h-10 rounded-full flex justify-center items-center absolute left-1/2 -translate-x-1/2 -bottom-5 z-10 group-hover:text-secondaryColor duration-300 ease-in-out">
          <LuShare2 size={20} />
        </div>
      </div>

      {/* Description */}
      <div className="text-center mt-[30px]">
        <h4 className="text-lg font-semibold">{member.name}</h4>
        <p className="text-sm text-gray-500">{member.title}</p>
      </div>

      {/* Social Icons */}
      <div className="mt-5 absolute left-1/2 -translate-x-1/2 bottom-1/3 flex items-center justify-center gap-3 lg:opacity-0 opacity-100 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        {member.socials.map((social, idx) => (
          <a
            key={idx}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F2F4F8] w-10 h-10 rounded-full flex items-center justify-center text-primaryBlue hover:bg-primaryBlue hover:text-white duration-300"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
