import Breadcrumb from "@/app/[locale]/components/common/Breadcrumb";
import ProjectDetailsInfo from "@/app/[locale]/components/sections/projectDetails/ProjectDetailsInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Details | Putech – Business & IT Solutions Next.js Template",
  description:
    "Explore detailed insights about our projects at Putech – Business & IT Solutions Next.js template. Learn about our innovative IT solutions, strategies, and achievements.",
};

const ProjectDetails = () => {
  return (
    <div>
      {/************* Breadcrumb section start here **************/}
      <Breadcrumb
        title="Project Details"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Project Details" }]}
      />

      {/************* project details section start here **************/}
      <ProjectDetailsInfo />
    </div>
  );
};

export default ProjectDetails;
