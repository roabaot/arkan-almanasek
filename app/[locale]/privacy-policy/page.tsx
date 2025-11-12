import { Metadata } from "next";
import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import PrivacyPolicyInfo from "@/app/[locale]/components/sections/privacyPolicyInfo/PrivacyPolicyInfo";

export const metadata: Metadata = {
  title: "Privacy Policy | Putech – Business & IT Solutions Next.js Template",
  description:
    "Putech Privacy Policy – Learn how we collect, use, and safeguard your information in our Next.js business & IT solutions template.",
};

const PrivacyPolicyPage = () => {
  return (
    <section>
      {/************* Breadcrumb section start here **************/}
      <Breadcrumb
        title="Privacy Policy"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]}
      />

      {/* ************* Privacy Policy Info section start here ************* */}
      <PrivacyPolicyInfo />
    </section>
  );
};

export default PrivacyPolicyPage;
