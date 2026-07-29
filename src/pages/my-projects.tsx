"use client";
import { Pagination } from "@/components/base-components/Pagination";
import { ProjectCard, ProjectCardSkeleton } from "@/components/project-card";
import { IProject } from "@/types/project";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

const MyProjectsPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 6;
  const { data, isLoading: loading } = useQuery({
    queryKey: ["projects", page, limit],
    queryFn: async () => {
      const res = await axios.get(
        `/api/get-projects?page=${page}&limit=${limit}`,
      );
      return res.data;
    },
  });

  return (
    <>
      <Head>
        <title>
          Projects | Okoro James Chizaram — Frontend Software Engineer
        </title>
        <meta
          name="description"
          content="Explore the portfolio of Okoro James Chizaram — a collection of responsive, scalable web applications built with React, Next.js, TypeScript, and more."
        />
        <link rel="canonical" href="https://www.okorojames.com/my-projects" />
        <meta property="og:title" content="Projects | Okoro James Chizaram" />
        <meta
          property="og:description"
          content="Browse real-world projects built by Okoro James — from full-stack web apps to responsive frontends using React, Next.js, TypeScript, and Tailwind CSS."
        />
        <meta
          property="og:url"
          content="https://www.okorojames.com/my-projects"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.okorojames.com/site-preview.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | Okoro James Chizaram" />
        <meta
          name="twitter:description"
          content="Explore responsive, scalable web applications built by Okoro James Chizaram using React, Next.js, and TypeScript."
        />
      </Head>
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
          {data &&
            data?.data?.map((project: IProject) => (
              <ProjectCard key={project._id} project={project} />
            ))}
        </div>
        <div className="mb-16 w-full flex flex-col items-end">
          {data && <Pagination totalPages={data?.pagination?.totalPages} />}
        </div>
      </div>
    </>
  );
};

export default MyProjectsPage;
