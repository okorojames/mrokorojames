import { ProjectCard, ProjectCardSkeleton } from "@/components/project-card";
import { IProject } from "@/types/project";
import { ErrorToast, SuccessToast } from "@/utils/toast-modals";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Presence } from "@/utils/motion-exports";
import { RxCross2 } from "react-icons/rx";
import { useRouter, useSearchParams } from "next/navigation";

const ProjectsPage = () => {
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IProject | null>(null);
  //
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 6;
  const currPage = parseInt(searchParams.get("page") || "1", 10);
  const {
    data: projects,
    isLoading: loading,
    refetch: getProjects,
  } = useQuery({
    queryKey: ["projects", page, limit],
    queryFn: async () => {
      const res = await axios.get("/api/get-projects");
      return res.data?.data;
    },
    select: (data) => data,
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
    router.push(`?${params.toString()}`);
  };
  //
  const deleteProject = async (id: string) => {
    try {
      const res = await axios.delete(`/api/delete-prosject-oi?id=${id}`);
      if (res.status === 200 || res.status === 201) {
        SuccessToast("Project deleted successfully");
        await getProjects();
      }
    } catch {
      ErrorToast("Something went wrong");
    }
  };
  //
  //

  return (
    <Fragment>
      <div className="max-w-360 mx-auto w-[95%] relative mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-stretch gap-6 mb-4 px-4">
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        {projects &&
          currentData?.map((project: IProject) => (
            <ProjectCard
              key={project._id}
              project={project}
              admin
              onEdit={() => {
                setSelectedItem(project);
                setShowUpdate(true);
              }}
              onDelete={() => deleteProject(project._id)}
            />
          ))}
        <Presence>
          {showUpdate && selectedItem && (
            <UpdateProject
              getProjects={getProjects}
              item={selectedItem}
              setShowUpdate={setShowUpdate}
            />
          )}
        </Presence>
      </div>
      <div className="mb-16 max-w-360 mx-auto">
        {projects && (
          // <ReactPaginate
          //   breakLabel="..."
          //   // nextLabel={<FaChevronCircleRight className="text-3xl" />}
          //   nextLabel={">"}
          //   onPageChange={handlePageClick}
          //   pageRangeDisplayed={5}
          //   pageCount={projects?.totalPages}
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
    </Fragment>
  );
};

export default ProjectsPage;

//
export const UpdateProject = ({
  item,
  setShowUpdate,
  getProjects,
}: {
  item: IProject;
  setShowUpdate: (show: boolean) => void;
  getProjects: () => Promise<QueryObserverResult<Error, unknown>>;
}) => {
  //
  const toBase64 = async (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  //
  const [saving, setSaving] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  //
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item?.name,
      desc: item?.desc,
      topRated: item?.topRated,
      link: item?.link,
      github: item?.github,
      stacks: item?.stacks,
    },
  });
  //
  const createProject = async (data: Record<string, unknown>) => {
    setSaving(true);
    try {
      // let formData = {};
      // if (image) {
      //   formData = {
      //     ...data,
      //     image: await toBase64(image),
      //   };
      // } else {
      //   formData = {
      //     ...data,
      //   };
      // }
      const formData = {
        ...data,
        image: image ? await toBase64(image) : item?.image,
      };
      const res = await axios.patch(
        `/api/up-edit-prosject?id=${item?._id}`,
        formData,
      );
      if (res.status === 200 || res.status === 201) {
        SuccessToast("Project created successfully");
        reset();
        setImage(null);
        setShowUpdate(false);
        await getProjects();
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setSaving(false);
    }
  };
  //
  //
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bgDark/60 backdrop-blur-md z-999">
      <div
        className="relative w-[92%] sm:w-130 max-h-[calc(100dvh-120px)] overflow-y-auto my-auto bg-dark-100 border border-primary-100/20 rounded-2xl shadow-[0_0_60px_-10px_rgba(116,192,252,0.15)] p-6 scrollbar-2"
        data-lenis-prevent
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-light-200">Edit Project</h2>
          <button
            type="button"
            onClick={() => setShowUpdate(false)}
            className="text-light-300 hover:text-red-400 transition-colors p-1"
          >
            <RxCross2 className="text-xl" />
          </button>
        </div>
        <form
          className="text-light-200 flex flex-col gap-5"
          onSubmit={handleSubmit(createProject)}
        >
          <label htmlFor="name" className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-light-300">Project Name</p>
            <input
              type="text"
              id="name"
              className="bg-dark-200 border border-primary-100/30 focus:border-primary-100 outline-none rounded-lg py-2.5 px-3 text-light-200 placeholder:text-light-300/40 transition-colors"
              {...register("name", { required: "name is required" })}
            />
            <small className="text-xs text-red-400">
              {typeof errors?.name?.message === "string" &&
                errors?.name?.message}
            </small>
          </label>
          {/*  */}
          <label htmlFor="image" className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-light-300">Image</p>
            <div className="flex items-center rounded-lg bg-dark-200 border border-primary-100/30 overflow-hidden cursor-pointer hover:border-primary-100/50 transition-colors">
              <p className="flex-1 px-3 py-2.5 text-sm text-light-300/60 overflow-x-hidden whitespace-nowrap">
                {image
                  ? image?.name
                  : item?.image
                    ? item?.image
                    : "Upload Image"}
              </p>
              <div className="bg-primary-200/80 text-light-100 text-sm font-medium py-2.5 px-4">
                Browse
              </div>
            </div>
            <input
              type="file"
              id="image"
              className="hidden"
              hidden
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImage(file);
                }
              }}
            />
            {/* <small className="text-xs text-red-500">
          {typeof errors?.name?.message === "string" && errors?.name?.message}
        </small> */}
          </label>
          {/*  */}
          <label htmlFor="link" className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-light-300">Project Link</p>
            <input
              type="text"
              id="link"
              className="bg-dark-200 border border-primary-100/30 focus:border-primary-100 outline-none rounded-lg py-2.5 px-3 text-light-200 placeholder:text-light-300/40 transition-colors"
              {...register("link", { required: "link is required" })}
            />
            <small className="text-xs text-red-400">
              {typeof errors?.link?.message === "string" &&
                errors?.link?.message}
            </small>
          </label>
          {/*  */}
          <label htmlFor="github" className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-light-300">
              GitHub Link{" "}
              <span className="text-light-300/40 text-xs">(optional)</span>
            </p>
            <input
              type="text"
              id="github"
              placeholder="https://github.com/..."
              className="bg-dark-200 border border-primary-100/30 focus:border-primary-100 outline-none rounded-lg py-2.5 px-3 text-light-200 placeholder:text-light-300/40 transition-colors"
              {...register("github")}
            />
          </label>
          {/*  */}
          <label htmlFor="stacks" className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-light-300">Stacks</p>
            <input
              type="text"
              id="stacks"
              className="bg-dark-200 border border-primary-100/30 focus:border-primary-100 outline-none rounded-lg py-2.5 px-3 text-light-200 placeholder:text-light-300/40 transition-colors"
              {...register("stacks", { required: "stacks is required" })}
            />
            <small className="text-xs text-red-400">
              {typeof errors?.stacks?.message === "string" &&
                errors?.stacks?.message}
            </small>
          </label>
          {/*  */}
          <label htmlFor="desc" className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-light-300">Description</p>
            <textarea
              id="desc"
              rows={4}
              className="bg-dark-200 border border-primary-100/30 focus:border-primary-100 outline-none rounded-lg py-2.5 px-3 text-light-200 placeholder:text-light-300/40 transition-colors resize-none"
              {...register("desc", { required: "description is required" })}
            />
            <small className="text-xs text-red-400">
              {typeof errors?.desc?.message === "string" &&
                errors?.desc?.message}
            </small>
          </label>
          {/*  */}
          <label
            htmlFor="topRated"
            className="flex items-center gap-2.5 self-start cursor-pointer"
          >
            <input
              id="topRated"
              type="checkbox"
              className="w-4.5 h-4.5 accent-primary-100 rounded"
              {...register("topRated")}
            />
            <p className="text-sm text-light-300">Top Rated</p>
          </label>
          {/*  */}
          <button className="mt-2 w-full bg-primary-200/90 hover:bg-primary-200 text-light-100 font-medium rounded-lg py-2.5 transition-colors">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};
