import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Button from "../../common/Button";

interface PricingPlan {
  id: number;
  title: string;
  price: number;
  features: string[];
}

interface PricingCardProps {
  plan: PricingPlan;
  activeTab: "monthly" | "yearly";
  getPrice: (price: number) => string;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, activeTab, getPrice }) => {
  return (
    <div className="border border-primaryBorder rounded-[10px] md:p-10 p-8 group hover:border-secondaryColor duration-300 ease-in-out">
      <div className="flex items-end gap-2">
        <h2>{getPrice(plan.price)}</h2>
        <p>/{activeTab === "monthly" ? "Month" : "Year"}</p>
      </div>
      <h3 className="mt-5">{plan.title}</h3>
      <hr className="my-[30px] border-primaryBorder group-hover:border-secondaryColor duration-300 ease-in-out" />
      <ul className="space-y-4">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-[16px] font-normal text-textColor leading-7 font-secondary">
            <BsFillCheckCircleFill className="w-5 h-5 text-secondaryColor" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Button className="bg-[#F2F4F8] w-full text-black px-7 py-2.5 rounded-full hover:bg-secondaryColor hover:text-white duration-300 ease-in-out cursor-pointer">
          Get Started Now
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
