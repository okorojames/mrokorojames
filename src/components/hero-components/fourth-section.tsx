import { ProjectCard, ProjectCardSkeleton } from "@/components/project-card";
import { IProject } from "@/types/project";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useMemo } from "react";

export const FourthSection = () => {
  const {
    data: projects,
    isLoading: loading,
    refetch: getProjects,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get("/api/get-projects");
      return res.data?.data;
    },
  });
  //
  const topRatedProjects = useMemo(() => {
    if (projects) {
      return projects?.filter((project: IProject) => project?.topRated);
    }
  }, [projects]);

  //
  return (
    <div id="projects" className="mt-16 section-container">
      <div className="flex gap-2 items-center select-none">
        <p className="text-xl md:text-2xl text-primary-100 font-SF_Mono">03.</p>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-light-200 font-semibold">
            Projects
          </h3>
          <p className="text-sm text-light-200">projects i&apos;ve worked on</p>
        </div>
        <div className="hidden 340:block w-22.5 380:w-[150px] h-0.5 bg-primary-100/30" />
      </div>
      {/* top rated projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-stretch gap-6 mt-6 mb-4">
        {loading &&
          Array.from({ length: 4 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        {projects &&
          topRatedProjects
            ?.slice(0, 4)
            ?.map((project: IProject) => (
              <ProjectCard key={project._id} project={project} />
            ))}
      </div>
      <Link
        href={"/my-projects"}
        className="w-37.5 mx-auto flex justify-center items-center text-center text-primary-100 bg-bgDark shadow-[0_0_0_1.5px] shadow-primary-100 px-4 py-3 rounded-md"
      >
        More Projects
      </Link>
    </div>
  );
};
