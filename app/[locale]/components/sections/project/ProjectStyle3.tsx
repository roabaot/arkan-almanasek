
import Image from "next/image"
import Container from "../../common/Container"
import { projects } from "../../data/projectsData"
import Link from "next/link"

const ProjectStyle3 = () => {
  return (
    <section className="section-gap">
        <Container>
          <div className="flex flex-col md:flex-row gap-[30px]">
            {/* Left Column (projects 1-3) */}
            <div className="flex flex-col gap-[30px] w-full">
              {projects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  className="relative group overflow-hidden"
                >
                  <Image
                    className="w-full h-auto rounded-[10px]"
                    src={project.image}
                     width={630}
                     height={450}
                      priority
                    alt={project.title}
                  />

                  <div
                    className="absolute inset-0 bg-black/30 rounded-[10px] 
                 translate-x-[-100%] group-hover:translate-x-0 
                 transition-all duration-500 ease-in-out"
                  ></div>

                  <Link
                   href={`/project/${project.slug}`}
                    className="absolute top-1/2 left-1/2 
                 -translate-x-1/2 -translate-y-1/2 
                 lg:opacity-0 opacity-100 scale-75 
                 group-hover:opacity-100 group-hover:scale-100
                 w-[100px] h-[100px] bg-[#E5E8F2] 
                 text-secondaryColor font-semibold 
                 rounded-full flex items-center justify-center text-sm 
                 transition-all duration-500 ease-in-out z-10"
                  >
                    More
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Column (projects 4-6) */}
            <div className="flex flex-col gap-[30px] w-full">
              {projects.slice(3, 6).map((project) => (
                <div
                  key={project.id}
                  className="relative group overflow-hidden"
                >
                  <Image
                    className="w-full h-auto rounded-[10px]"
                    src={project.image}
                    alt={project.title}
                     width={630}
                    height={360}
                     priority
                  />

                  <div
                    className="absolute inset-0 bg-black/30 rounded-[10px] 
                 translate-x-[-100%] group-hover:translate-x-0 
                 transition-all duration-500 ease-in-out"
                  ></div>

                  <Link
                    href={`/project/${project.slug}`}
                    className="absolute top-1/2 left-1/2 
                 -translate-x-1/2 -translate-y-1/2 
                 lg:opacity-0 opacity-100 scale-75 
                 group-hover:opacity-100 group-hover:scale-100
                 w-[100px] h-[100px] bg-[#E5E8F2] 
                 text-secondaryColor font-semibold 
                 rounded-full flex items-center justify-center text-sm 
                 transition-all duration-500 ease-in-out z-10"
                  >
                    More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
  )
}

export default ProjectStyle3