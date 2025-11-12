import { Project } from "../../data/projectsData";

interface ProjectInfoProps {
    currentProjecct: Project;
  }

const ProjectInfo = ({currentProjecct}:ProjectInfoProps) => {
  return (

         <div className="md:space-y-5 space-y-3">
                <p>
                  <span className="text-[18px] font-primary text-secondaryColor font-bold mr-2">
                    Catagory:
                  </span>{" "}
                  {currentProjecct?.category}
                </p>
                <p>
                  <span className="text-[18px] font-primary text-secondaryColor font-bold mr-2">
                    Start Date:
                  </span>{" "}
                  {currentProjecct?.startDate}
                </p>

                <p>
                  <span className="text-[18px] font-primary text-secondaryColor font-bold mr-2">
                    Location:
                  </span>{" "}
                  {currentProjecct?.location}
                </p>
              </div>
  )
}

export default ProjectInfo