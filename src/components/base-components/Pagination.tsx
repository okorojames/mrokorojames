"use client";
import { cn } from "@/utils/cn";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import { useRouter, useSearchParams } from "next/navigation";

export const Pagination = ({
  totalPages,
  className,
}: {
  totalPages: number;
  className?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const page = params.get("page") || "1";

  const handlePageChange = (page: string) => {
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (Number(page) <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (Number(page) >= totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        1,
        "...",
        Number(page) - 1,
        Number(page),
        Number(page) + 1,
        "...",
        totalPages,
      );
    }

    return pages;
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-start gap-2",
        className,
      )}
    >
      <button
        onClick={() => handlePageChange(String(Number(page) - 1))}
        disabled={Number(page) === 1}
        className="flex items-center gap-1 px-3 py-2 text-light-100 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors select-none cursor-pointer"
      >
        <LuMoveLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Previous</span>
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((pageItem, idx) => {
          if (pageItem === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="px-3 py-2 text-light-100 select-none"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={pageItem}
              onClick={() => handlePageChange(String(pageItem))}
              className={`min-w-10 h-10 rounded-lg font-medium text-sm transition-all cursor-pointer select-none ${
                Number(page) === Number(pageItem)
                  ? "bg-primary text-white shadow-sm"
                  : "text-light-100 hover:bg-gray-50 hover:text-primary"
              }`}
            >
              {pageItem}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => handlePageChange(String(Number(page) + 1))}
        disabled={Number(page) === totalPages}
        className="flex items-center gap-1 px-3 py-2 text-light-100 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors select-none cursor-pointer"
      >
        <span className="text-sm font-medium">Next</span>
        <LuMoveRight className="w-4 h-4" />
      </button>
    </div>
  );
};
