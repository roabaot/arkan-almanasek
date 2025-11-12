
import { FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import TeamCard from "../../ui/cards/TeamCard";

const teamMembers = [
  {
    id: 1,
    name: "Kathryn Murphy",
    title: "Web Designer",
    image: '/assets/team/team-1.png',
    socials: [
      { icon: <FaYoutube size={18} />, link: "#" },
      { icon: <FaLinkedinIn size={18} />, link: "#" },
      { icon: <FaXTwitter size={18} />, link: "#" },
    ],
  },
  {
    id: 2,
    name: "Darrell Steward",
    title: "Medical Assistant",
    image: '/assets/team/team-2.png',
    socials: [
      { icon: <FaYoutube size={18} />, link: "#" },
      { icon: <FaLinkedinIn size={18} />, link: "#" },
      { icon: <FaXTwitter size={18} />, link: "#" },
    ],
  },
  {
    id: 3,
    name: "Courtney Henry",
    title: "Dog Trainer",
    image: '/assets/team/team-3.png',
    socials: [
      { icon: <FaYoutube size={18} />, link: "#" },
      { icon: <FaLinkedinIn size={18} />, link: "#" },
      { icon: <FaXTwitter size={18} />, link: "#" },
    ],
  },
];

const TeamStyle2 = () => {
  return (
    <div className="section-gap">
      <Container>
        {/* section title */}
        <SectionTitle
          label="Our team"
          title="Our Best Team Member"
          align="center"
        />

        {/* team part start here */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}


        </div>
      </Container>
    </div>
  );
};

export default TeamStyle2;
