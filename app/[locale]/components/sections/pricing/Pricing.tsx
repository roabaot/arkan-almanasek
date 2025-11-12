"use client"
import { useState } from "react";
import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import PricingCard from "../../ui/cards/PricingCard";
import { pricingPlans } from "../../data/pricingData";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");

  const getPrice = (monthlyPrice: number) => {
    if (activeTab === "monthly") return `$${monthlyPrice}`;
    const yearly = monthlyPrice * 12 * 0.8;
    return `$${yearly.toFixed(0)}`;
  };

  return (
    <section className="section-gap">
    <Container>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
  <SectionTitle
    label="Pricing Plan"
    title="Our Pricing Plan"
    align="left"
  />

  {/* Toggle Tabs */}
  <div className="w-full md:w-auto flex justify-end">
    <div className="inline-flex bg-sectionBg rounded-full">
      {["monthly", "yearly"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab as "monthly" | "yearly")}
          className={`px-6 py-2.5 font-medium rounded-full text-[18px] transition ${
            activeTab === tab
              ? "bg-primaryBlue text-white"
              : "text-secondaryColor"
          }`}
        >
          {tab === "monthly" ? "Month" : "Yearly"}
        </button>
      ))}
    </div>
  </div>
</div>


       {/* Pricing Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] md:mt-[60px] mt-12">
       {pricingPlans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} activeTab={activeTab} getPrice={getPrice} />
      ))}
      </div>
    </Container>

      

     
    </section>
  );
};

export default Pricing;
