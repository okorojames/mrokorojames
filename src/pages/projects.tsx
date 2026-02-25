import { ProjectCard, ProjectCardSkeleton } from "@/components/project-card";
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
  const [selectedItem, setSelectedItem] = useState<any>(null);
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
  const deleteProject = async (id: any) => {
    try {
      const res = await axios.delete(`/api/delete-prosject-oi?id=${id}`);
      if (res.status === 200 || res.status === 201) {
        SuccessToast("Project deleted successfully");
        await getProjects();
      }
    } catch (error: any) {
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
          currentData?.map((project: any) => (
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
  item: any;
  setShowUpdate: any;
  getProjects: () => Promise<QueryObserverResult<Error, unknown>>;
}) => {
  //
  const toBase64 = async (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  //
  const [saving, setSaving] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [img_prev, setImgPrev] = useState<string>(item?.image);
  //
  const {
    register,
    setValue,
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
  const createProject = async (data: any) => {
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
    } catch (error: any) {
      ErrorToast("Something went wrong");
    } finally {
      setSaving(false);
    }
  };
  //
  //
  return (
    <div className="fixed w-full top-0 left-0 bottom-0 flex flex-col justify-center items-center bg-bgDark/45 backdrop-blur-sm z-999">
      <div className="relative h-87.5 overflow-y-auto my-auto bg-light-100 rounded-md p-4">
        <RxCross2
          className="text-red-500 absolute right-2 top-2 text-3xl"
          onClick={() => setShowUpdate(false)}
        />
        <form
          className="text-dark-100 w-[90%] sm:w-112.5 mx-auto flex flex-col gap-5 mt-8 mb-12.5"
          onSubmit={handleSubmit(createProject)}
        >
          <label htmlFor="name" className="flex flex-col gap-1">
            <p>Project Name</p>
            <input
              type="text"
              id="name"
              className="border-[1.5px] border-primary-100 outline-none rounded-md py-2 pl-2"
              {...register("name", { required: "name is required" })}
            />
            <small className="text-xs text-red-500">
              {typeof errors?.name?.message === "string" &&
                errors?.name?.message}
            </small>
          </label>
          {/*  */}
          <label htmlFor="image" className="flex flex-col gap-1">
            <p>Image</p>
            <div className="flex items-center gap-2 rounded-md bg-light-100 border-primary-100 border-[1.5px] overflow-hidden">
              <p className="w-full pl-2 overflow-x-hidden whitespace-nowrap">
                {image
                  ? image?.name
                  : item?.image
                    ? item?.image
                    : "Upload Image"}
              </p>
              <div className="bg-primary-200 text-light-100 py-2 px-2">
                Browse
              </div>
            </div>
            <input
              type="file"
              id="image"
              className="border-[1.5px] border-primary-100 outline-none rounded-md py-2 pl-2"
              hidden
              onChange={(e: any) => {
                const file = e.target.files[0];
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
          <label htmlFor="link" className="flex flex-col gap-1">
            <p>Project Link</p>
            <input
              type="text"
              id="link"
              className="border-[1.5px] border-primary-100 outline-none rounded-md py-2 pl-2"
              {...register("link", { required: "link is required" })}
            />
            <small className="text-xs text-red-500">
              {typeof errors?.link?.message === "string" &&
                errors?.link?.message}
            </small>
          </label>
          {/*  */}
          <label htmlFor="github" className="flex flex-col gap-1">
            <p>Project Github Link</p>
            <input
              type="text"
              id="github"
              className="border-[1.5px] border-primary-100 outline-none rounded-md py-2 pl-2"
              {...register("github", { required: "github is required" })}
            />
            <small className="text-xs text-red-500">
              {typeof errors?.github?.message === "string" &&
                errors?.github?.message}
            </small>
          </label>
          {/*  */}
          <label htmlFor="stacks" className="flex flex-col gap-1">
            <p>Stacks</p>
            <input
              type="text"
              id="stacks"
              className="border-[1.5px] border-primary-100 outline-none rounded-md py-2 pl-2"
              {...register("stacks", { required: "stacks is required" })}
            />
            <small className="text-xs text-red-500">
              {typeof errors?.stacks?.message === "string" &&
                errors?.stacks?.message}
            </small>
          </label>
          {/*  */}
          <label htmlFor="desc" className="flex flex-col gap-1">
            <p>Project Description</p>
            <textarea
              id="desc"
              rows={6}
              className="border-[1.5px] border-primary-100 outline-none rounded-md py-2 pl-2"
              {...register("desc", { required: "description is required" })}
            />
            <small className="text-xs text-red-500">
              {typeof errors?.desc?.message === "string" &&
                errors?.desc?.message}
            </small>
          </label>
          {/*  */}
          <label
            htmlFor="topRated"
            className="flex flex-row-reverse self-start items-center gap-1"
          >
            <p>Top Rated</p>
            <input
              id="topRated"
              type="checkbox"
              className="w-4.5 h-4.5 border-[1.5px] border-primary-100 outline-none rounded-md py-2 pl-2"
              {...register("topRated")}
            />
            <small className="text-xs text-red-500">
              {typeof errors?.topRated?.message === "string" &&
                errors?.topRated?.message}
            </small>
          </label>
          {/*  */}
          <button className="border-[1.5px] border-primary-100 rounded-md py-2 pl-2 text-primary-100">
            {saving ? "Saving" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};
