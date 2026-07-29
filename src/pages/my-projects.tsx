"use client";
import { Pagination } from "@/components/base-components/Pagination";
import { ProjectCard, ProjectCardSkeleton } from "@/components/project-card";
import { IProject } from "@/types/project";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import connectDB from "@/libs/mongodb";
import Project from "@/models/project";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ProjectsResponse {
  data: IProject[];
  pagination: PaginationInfo;
}

export const getServerSideProps: GetServerSideProps<{
  initialData: ProjectsResponse;
}> = async (ctx) => {
  ctx.res.setHeader(
    "Cache-Control",
    "private, no-cache, no-store, max-age=0, must-revalidate",
  );

  const page = Math.max(Number(ctx.query.page) || 1, 1);
  const limit = Math.max(Number(ctx.query.limit) || 6, 1);
  const skip = (page - 1) * limit;

  await connectDB();

  const [projects, total] = await Promise.all([
    Project.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Project.countDocuments(),
  ]);

  return {
    props: {
      initialData: {
        data: JSON.parse(JSON.stringify(projects)),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page < Math.ceil(total / limit),
          hasPreviousPage: page > 1,
        },
      },
    },
  };
};

const MyProjectsPage = ({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;

  const shouldUseInitialData =
    page === initialData.pagination.page &&
    limit === initialData.pagination.limit;

  const { data, isLoading: loading } = useQuery({
    queryKey: ["projects", page, limit],
    queryFn: async () => {
      const res = await axios.get(
        `/api/get-projects?page=${page}&limit=${limit}`,
      );
      return res.data;
    },
    ...(shouldUseInitialData ? { initialData } : {}),
  });

  const projects = data?.data;
  const pagination = data?.pagination ?? initialData.pagination;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects | Okoro James Chizaram",
    description:
      "Explore the portfolio of Okoro James Chizaram — a collection of responsive, scalable web applications built with React, Next.js, TypeScript, and more.",
    url: "https://www.okorojames.com/my-projects",
    isPartOf: {
      "@type": "WebSite",
      name: "Okoro James Chizaram",
      url: "https://www.okorojames.com",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: initialData.data.map((project, index) => ({
        "@type": "ListItem",
        position:
          index +
          1 +
          (initialData.pagination.page - 1) * initialData.pagination.limit,
        item: {
          "@type": "SoftwareApplication",
          name: project.name,
          description: project.desc,
          url: project.link,
          image: project.image,
          applicationCategory: "WebApplication",
          operatingSystem: "Web",
        },
      })),
    },
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="max-w-360 mx-auto mb-20">
        <div className="flex justify-center items-center">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-light-200 font-semibold">
            All My Projects
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-stretch gap-6 mt-10 mb-10 px-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))
            : projects?.map((project: IProject) => (
                <ProjectCard key={project._id} project={project} />
              ))}
        </div>
        <div className="mb-16 w-full flex flex-col items-end">
          {pagination && <Pagination totalPages={pagination.totalPages} />}
        </div>
      </div>
    </>
  );
};

export default MyProjectsPage;
