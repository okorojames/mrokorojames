import { cloudinaryLoader } from "@/utils/cloudinary-loader";
import { Truncate } from "@/utils/truncate";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiEdit } from "react-icons/fi";
import { IoLogoGithub } from "react-icons/io";
import { MdDelete } from "react-icons/md";

interface ProjectCardProps {
  project: {
    _id: string;
    name: string;
    desc: string;
    stacks: string;
    link: string;
    github: string;
    image: string;
    topRated?: boolean;
  };
  /** Show edit / delete controls (admin page) */
  admin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProjectCard = ({
  project,
  admin,
  onEdit,
  onDelete,
}: ProjectCardProps) => {
  const stacks = project.stacks?.split(",").map((s) => s.trim());

  return (
    <div className="project-card group relative flex flex-col rounded-xl overflow-hidden bg-dark-100/60 border border-primary-100/20 transition-all duration-300 hover:border-primary-100/50 hover:shadow-[0_0_30px_-5px_rgba(116,192,252,0.15)]">
      {/* ── Image area ── */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          loader={cloudinaryLoader}
          src={project.image}
          alt={project.name}
          width={600}
          height={340}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay with quick links */}
        <div className="absolute inset-0 bg-linear-to-t from-dark-200/90 via-dark-200/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4 gap-3">
          <Link
            href={project.link}
            target="_blank"
            className="flex items-center gap-1.5 text-sm font-medium text-light-100 bg-primary-200/80 backdrop-blur-sm rounded-full px-3 py-1.5 hover:bg-primary-200 transition-colors"
          >
            <span>Visit</span>
            <FiExternalLink className="text-xs" />
          </Link>
          <Link
            href={project.github}
            target="_blank"
            className="flex items-center gap-1.5 text-sm font-medium text-light-100 bg-light-200/15 backdrop-blur-sm rounded-full px-3 py-1.5 hover:bg-light-200/25 transition-colors"
          >
            <span>GitHub</span>
            <IoLogoGithub className="text-sm" />
          </Link>
        </div>

        {/* Top-rated badge */}
        {project.topRated && (
          <span className="absolute top-3 right-3 text-[11px] font-SF_Mono font-bold uppercase tracking-wider text-primary-100 bg-dark-200/70 backdrop-blur-sm rounded-full px-2.5 py-1 border border-primary-100/30">
            Top Rated
          </span>
        )}
      </div>

      {/* ── Content area ── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-light-200 leading-tight">
          {Truncate(project.name, 40)}
        </h3>

        {/* Description – clamped to 2 lines */}
        <p
          className="text-sm text-light-300 leading-relaxed line-clamp-2"
          title={project.desc}
        >
          {project.desc}
        </p>

        {/* Stacks */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {stacks?.map((stack, i) => (
            <span
              key={i}
              className="text-xs font-SF_Mono text-primary-100 bg-primary-100/10 rounded-full px-2.5 py-0.5"
            >
              {stack}
            </span>
          ))}
        </div>

        {/* Bottom row – links always visible + admin actions */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-light-200/10">
          <div className="flex items-center gap-3">
            <Link
              href={project.link}
              target="_blank"
              className="flex items-center gap-1 text-sm text-light-300 hover:text-primary-100 transition-colors"
            >
              <FiExternalLink className="text-sm" />
              <span>Live</span>
            </Link>
            <Link
              href={project.github}
              target="_blank"
              className="flex items-center gap-1 text-sm text-light-300 hover:text-primary-100 transition-colors"
            >
              <IoLogoGithub className="text-sm" />
              <span>Code</span>
            </Link>
          </div>

          {admin && (
            <div className="flex items-center gap-2">
              <button
                onClick={onEdit}
                className="text-primary-100 hover:text-primary-200 transition-colors p-1"
                title="Edit project"
              >
                <FiEdit className="text-lg" />
              </button>
              <button
                onClick={onDelete}
                className="text-red-400 hover:text-red-500 transition-colors p-1"
                title="Delete project"
              >
                <MdDelete className="text-lg" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/** Skeleton loader matching the card layout */
export const ProjectCardSkeleton = () => (
  <div className="w-full flex flex-col rounded-xl overflow-hidden bg-dark-100/60 border border-primary-100/10 animate-pulse">
    <div className="aspect-video bg-primary-100/10" />
    <div className="flex flex-col gap-3 p-4">
      <div className="h-5 w-3/4 bg-primary-100/10 rounded" />
      <div className="h-3 w-full bg-primary-100/10 rounded" />
      <div className="h-3 w-5/6 bg-primary-100/10 rounded" />
      <div className="flex gap-2 mt-1">
        <div className="h-5 w-14 bg-primary-100/10 rounded-full" />
        <div className="h-5 w-12 bg-primary-100/10 rounded-full" />
        <div className="h-5 w-16 bg-primary-100/10 rounded-full" />
      </div>
      <div className="h-px bg-light-200/10 mt-2" />
      <div className="flex gap-3 mt-1">
        <div className="h-4 w-12 bg-primary-100/10 rounded" />
        <div className="h-4 w-12 bg-primary-100/10 rounded" />
      </div>
    </div>
  </div>
);
