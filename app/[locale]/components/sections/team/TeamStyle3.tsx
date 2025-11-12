"use client";
import { useState } from "react";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Container from "../../common/Container";
import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "Devon Lane",
    title: "Co-Founder",
    image: '/assets/team/team-4.jpg',
    socials: [
      { icon: <FaYoutube size={18} />, link: "#" },
      { icon: <FaLinkedinIn size={18} />, link: "#" },
      { icon: <FaXTwitter size={18} />, link: "#" },
    ],
  },
  {
    id: 2,
    name: "Brooklyn Simmons",
    title: "Co-Founder",
    image: '/assets/team/team-5.jpg',
    socials: [
      { icon: <FaYoutube size={18} />, link: "#" },
      { icon: <FaLinkedinIn size={18} />, link: "#" },
      { icon: <FaXTwitter size={18} />, link: "#" },
    ],
  },
  {
    id: 3,
    name: "Annette Black",
    title: "Chief Executive Officer",
    image: '/assets/team/team-6.jpg',
    socials: [
      { icon: <FaYoutube size={18} />, link: "#" },
      { icon: <FaLinkedinIn size={18} />, link: "#" },
      { icon: <FaXTwitter size={18} />, link: "#" },
    ],
  },
  {
    id: 4,
    name: "Darrell Steward",
    title: "Chief Financial Officer",
    image: '/assets/team/team-7.jpg',
    socials: [
      { icon: <FaYoutube size={18} />, link: "#" },
      { icon: <FaLinkedinIn size={18} />, link: "#" },
      { icon: <FaXTwitter size={18} />, link: "#" },
    ],
  },
];

const TeamStyle3 = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setActiveCard((prev) => (prev === id ? null : id));
  };

  return (
    <div className="section-gap">
      <Container>
        <p className="text-primaryBlue uppercase text-[14px] font-bold text-center">
          TEAM
        </p>
        <h2 className="font-medium text-center">Meet the team</h2>
        <p className="text-center max-w-[490px] mx-auto">
          Our team is made up of passionate designers, strategists, and
          creatives from around the globe.
        </p>

        <div className="md:mt-15 mt-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {teamMembers.map((member) => {
            const isActive = activeCard === member.id;
            return (
              <div
                key={member.id}
                className="w-full relative cursor-pointer group"
                onClick={() => toggleCard(member.id)} // 👈 works on mobile tap
              >
                {/* Image wrapper */}
                <div className="relative overflow-hidden rounded-[24px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="rounded-[24px] w-full transition-transform duration-500 group-hover:scale-105"
                    width={280}
                    height={380}
                    priority
                  />

                  {/* Socials */}
                  <div
                    className={`absolute left-1/2 bottom-4 -translate-x-1/2 
                      transition-all duration-500 ease-in-out flex space-x-2 
                      bg-primaryBlue px-4 py-2 rounded-md
                      ${
                        isActive
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-5 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                      }`}
                  >
                    {member.socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        className="text-white hover:text-gray-200"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Name + title */}
                <div className="mt-4">
                  <h5 className="text-[18px] font-semibold font-secondary text-primary">
                    {member.name}
                  </h5>
                  <p>{member.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default TeamStyle3;
