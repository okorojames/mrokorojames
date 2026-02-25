"use client";
import { ProjectCard, ProjectCardSkeleton } from "@/components/project-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const MyProjectsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 6;
  const currPage = parseInt(searchParams.get("page") || "1", 10);
  const { data: projects, isLoading: loading } = useQuery({
    queryKey: ["projects", page, limit],
    queryFn: async () => {
      const res = await axios.get("/api/get-projects");
      return res.data?.data;
    },
  });
  // paginate data
  // the start index endIndex and currentData settings
  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = Number(page) * Number(limit);
  const currentData = projects?.slice(startIndex, endIndex);
  // where we create the list of all the pagination numbers
  const paginationNumbers = [];
  for (let i = 1; i <= Math.ceil(projects?.length / Number(limit)); i++) {
    paginationNumbers.push(i);
  }
  //
  const handlePageClick = ({ selected }: { selected: number }) => {
    const params = new URLSearchParams();
    const page = selected + 1;
    params.append("page", page.toString());
    router.push(`/my-projects?${params.toString()}`);
  };
  //
  return (
    <div className="max-w-360 mx-auto mb-20">
      <div className="flex justify-center items-center">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-light-200 font-semibold">
          All My Projects
        </h3>
      </div>
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-stretch gap-6 mt-10 mb-10 px-4">
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        {projects &&
          currentData?.map((project: any) => (
            <ProjectCard key={project._id} project={project} />
          ))}
      </div>
      {projects && (
        // <ReactPaginate
        //   breakLabel="..."
        //   // nextLabel={<FaChevronCircleRight className="text-3xl" />}
        //   nextLabel={">"}
        //   onPageChange={handlePageClick}
        //   pageRangeDisplayed={5}
        //   pageCount={Math.ceil(projects?.length / Number(limit))}
        //   // previousLabel={<FaChevronCircleLeft className="text-3xl" />}
        //   previousLabel={"<"}
        //   renderOnZeroPageCount={null}
        //   className="project-paginate flex items-center justify-center flex-wrap gap-2 mt-7"
        // />
        <div className="flex items-center justify-center flex-wrap gap-2">
          {paginationNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageClick({ selected: number - 1 })}
              className={`${
                currPage === number
                  ? "bg-primary-200 text-light-200"
                  : "bg-light-100 text-light-300"
              } px-3 py-1 rounded-md`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProjectsPage;
