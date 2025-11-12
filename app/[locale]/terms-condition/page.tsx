import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import TermsAndConditionsInfo from "@/app/[locale]/components/sections/termsAndConditionsInfo/TermsAndConditionsInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Terms & Conditions | Putech – Business & IT Solutions Next.js Template",
  description:
    "Putech Terms & Conditions – Understand the rules and regulations governing the use of our Next.js business & IT solutions template.",
};

const TermsConditionsPage = () => {
  return (
    <section>
      {/************* Breadcrumb section start here **************/}
      <Breadcrumb
        title="Trems & Condition"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Trems & Condition" },
        ]}
      />

      {/************* Terms And Conditions Info section start here **************/}
      <TermsAndConditionsInfo />
    </section>
  );
};

export default TermsConditionsPage;
