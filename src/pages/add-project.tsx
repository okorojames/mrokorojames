import { ErrorToast, SuccessToast } from "@/utils/toast-modals";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddProject = () => {
  const [saving, setSaving] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const toBase64 = async (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      desc: "",
      topRated: false,
      link: "",
      github: "",
      stacks: "",
    },
  });

  const createProject = async (data: Record<string, unknown>) => {
    setSaving(true);
    if (!image) return ErrorToast("Please select an image");
    try {
      const img = await toBase64(image);
      const formData = {
        ...data,
        image: img,
      };
      const res = await axios.post(`/api/new-project-s`, formData);
      if (res.status === 200 || res.status === 201) {
        SuccessToast("Project created successfully");
        reset();
        setImage(null);
      }
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const inputClasses =
    "w-full bg-dark-100/50 border border-light-300/20 text-light-100 placeholder:text-light-300/50 rounded-lg px-4 py-3 outline-none transition-all duration-200 focus:border-primary-100 focus:ring-1 focus:ring-primary-100/30";

  return (
    <div className="min-h-screen flex items-start justify-center pt-12 pb-20 px-4">
      <div className="w-full max-w-130">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-light-100 tracking-tight">
            New Project
          </h1>
          <p className="text-light-300 mt-2 text-sm font-SF_Mono">
            Add a new project to your portfolio
          </p>
        </div>

        {/* Form Card */}
        <form
          className="bg-dark-100/30 backdrop-blur-sm border border-light-300/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-6"
          onSubmit={handleSubmit(createProject)}
        >
          {/* Project Name */}
          <label htmlFor="name" className="flex flex-col gap-2">
            <span className="text-sm font-medium text-light-200 font-SF_Mono">
              Project Name
            </span>
            <input
              type="text"
              id="name"
              placeholder="My Awesome Project"
              className={inputClasses}
              {...register("name", { required: "Project name is required" })}
            />
            {errors?.name && (
              <span className="text-xs text-red-400 font-SF_Mono">
                {errors.name.message}
              </span>
            )}
          </label>

          {/* Image Upload */}
          <label htmlFor="image" className="flex flex-col gap-2">
            <span className="text-sm font-medium text-light-200 font-SF_Mono">
              Cover Image
            </span>
            <div
              className={`relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 cursor-pointer transition-all duration-200 ${
                dragActive
                  ? "border-primary-100 bg-primary-100/10"
                  : image
                    ? "border-primary-100/40 bg-dark-100/50"
                    : "border-light-300/20 bg-dark-100/30 hover:border-light-300/40"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {image ? (
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-primary-100 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-light-200 text-sm truncate max-w-62.5">
                    {image.name}
                  </span>
                  <button
                    type="button"
                    className="text-light-300 hover:text-red-400 transition-colors ml-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setImage(null);
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <svg
                    className="w-8 h-8 text-light-300/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-light-300/60 text-sm">
                    Drag & drop or{" "}
                    <span className="text-primary-100 underline underline-offset-2">
                      browse
                    </span>
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) setImage(file);
              }}
            />
          </label>

          {/* Links Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label htmlFor="link" className="flex flex-col gap-2">
              <span className="text-sm font-medium text-light-200 font-SF_Mono">
                Live URL
              </span>
              <input
                type="text"
                id="link"
                placeholder="https://example.com"
                className={inputClasses}
                {...register("link", { required: "Link is required" })}
              />
              {errors?.link && (
                <span className="text-xs text-red-400 font-SF_Mono">
                  {errors.link.message}
                </span>
              )}
            </label>

            <label htmlFor="github" className="flex flex-col gap-2">
              <span className="text-sm font-medium text-light-200 font-SF_Mono">
                GitHub URL{" "}
                <span className="text-light-300/40 text-xs">(optional)</span>
              </span>
              <input
                type="text"
                id="github"
                placeholder="https://github.com/..."
                className={inputClasses}
                {...register("github")}
              />
            </label>
          </div>

          {/* Stacks */}
          <label htmlFor="stacks" className="flex flex-col gap-2">
            <span className="text-sm font-medium text-light-200 font-SF_Mono">
              Tech Stack
            </span>
            <input
              type="text"
              id="stacks"
              placeholder="React, Next.js, TypeScript..."
              className={inputClasses}
              {...register("stacks", {
                required: "Tech stack is required",
              })}
            />
            {errors?.stacks && (
              <span className="text-xs text-red-400 font-SF_Mono">
                {errors.stacks.message}
              </span>
            )}
          </label>

          {/* Description */}
          <label htmlFor="desc" className="flex flex-col gap-2">
            <span className="text-sm font-medium text-light-200 font-SF_Mono">
              Description
            </span>
            <textarea
              id="desc"
              rows={5}
              placeholder="Describe what this project does..."
              className={`${inputClasses} resize-none`}
              {...register("desc", {
                required: "Description is required",
              })}
            />
            {errors?.desc && (
              <span className="text-xs text-red-400 font-SF_Mono">
                {errors.desc.message}
              </span>
            )}
          </label>

          {/* Top Rated Toggle */}
          <label
            htmlFor="topRated"
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <input
                id="topRated"
                type="checkbox"
                className="sr-only peer"
                {...register("topRated")}
              />
              <div className="w-10 h-6 bg-dark-100/80 border border-light-300/20 rounded-full peer-checked:bg-primary-100/30 peer-checked:border-primary-100 transition-all duration-200" />
              <div className="absolute left-0.75 top-0.75 w-4.5 h-4.5 bg-light-300/60 rounded-full peer-checked:translate-x-4 peer-checked:bg-primary-100 transition-all duration-200" />
            </div>
            <span className="text-sm text-light-200 group-hover:text-light-100 transition-colors">
              Mark as Top Rated
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            className="mt-2 w-full py-3 rounded-lg bg-primary-100 text-dark-200 font-semibold text-sm tracking-wide hover:bg-primary-200 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Saving...
              </span>
            ) : (
              "Add Project"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
