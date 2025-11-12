import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import FaqStyle2 from "@/app/[locale]/components/sections/faq/FaqStyle2";
import ProjectStyle3 from "@/app/[locale]/components/sections/project/ProjectStyle3";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project | Putech – Business & IT Solutions Next.js Template",
  description:
    "Explore our projects at Putech – Business & IT Solutions Next.js template. See how we deliver innovative IT solutions and business services.",
};

const ProjectPage = () => {
  return (
    <div>
      {/************* Breadcrumb section start here **************/}
      <Breadcrumb
        title="Project"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Project" }]}
      />

      {/************* project section start here **************/}
      <ProjectStyle3 />

      {/************* faq section start here **************/}

      <FaqStyle2 />
    </div>
  );
};

export default ProjectPage;
