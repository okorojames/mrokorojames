"use client";
import { IExperience } from "@/types/experience";
import { ErrorToast, SuccessToast } from "@/utils/toast-modals";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2, RxDragHandleDots2 } from "react-icons/rx";
import { Presence } from "@/utils/motion-exports";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const ExperiencesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<IExperience | null>(null);
  const [items, setItems] = useState<IExperience[] | null>(null);

  const { data, refetch: getExperiences } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await axios.get("/api/get-experiences");
      return res.data.data as IExperience[];
    },
  });

  const displayItems = items ?? data ?? [];

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/delete-experience?id=${id}`);
      SuccessToast("Experience deleted");
      await getExperiences();
    } catch {
      ErrorToast("Failed to delete");
    }
  };

  const handleSaveReorder = async () => {
    if (!items) return;
    try {
      await axios.patch("/api/reorder-experiences", {
        items: items.map((exp, i) => ({ _id: exp._id, order: i })),
      });
      SuccessToast("Order saved");
      await getExperiences();
      setItems(null);
    } catch {
      ErrorToast("Failed to save order");
    }
  };

  return (
    <div className="max-w-360 mx-auto w-[95%] relative mt-16 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-light-200">
          Manage Experiences
        </h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setShowForm(true);
          }}
          className="text-sm font-medium text-light-100 bg-primary-200/80 hover:bg-primary-200 rounded-lg px-4 py-2 transition-colors cursor-pointer"
        >
          Add Experience
        </button>
      </div>

      <Reorder.Group
        axis="y"
        values={displayItems}
        onReorder={setItems}
        className="flex flex-col gap-2"
      >
        {displayItems.map((exp, i) => (
          <Reorder.Item
            key={exp._id}
            value={exp}
            className="flex items-center gap-3 bg-dark-100/60 border border-primary-100/10 rounded-xl px-4 py-3 cursor-grab active:cursor-grabbing select-none"
          >
            <RxDragHandleDots2 className="text-light-300 shrink-0 text-lg" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-light-200 truncate">
                {exp.company}
              </p>
              <p className="text-xs text-light-300 truncate">
                {exp.position} &middot; {exp.from} – {exp.to}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => {
                  setEditingItem(exp);
                  setShowForm(true);
                }}
                className="text-primary-100 hover:text-primary-200 transition-colors p-1.5 cursor-pointer"
                title="Edit"
              >
                <FiEdit className="text-base" />
              </button>
              <button
                onClick={() => handleDelete(exp._id)}
                className="text-red-400 hover:text-red-500 transition-colors p-1.5 cursor-pointer"
                title="Delete"
              >
                <MdDelete className="text-base" />
              </button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {items && items.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSaveReorder}
            className="text-sm font-medium text-light-100 bg-primary-200/80 hover:bg-primary-200 rounded-lg px-6 py-2 transition-colors cursor-pointer"
          >
            Save Order
          </button>
        </div>
      )}

      <Presence>
        {showForm && (
          <ExperienceForm
            item={editingItem}
            onClose={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            onSaved={() => {
              setShowForm(false);
              setEditingItem(null);
              getExperiences();
            }}
          />
        )}
      </Presence>
    </div>
  );
};

export default ExperiencesPage;

//
const ExperienceForm = ({
  item,
  onClose,
  onSaved,
}: {
  item: IExperience | null;
  onClose: () => void;
  onSaved: () => void;
}) => {
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: item?.company ?? "",
      position: item?.position ?? "",
      product: item?.product ?? "",
      from: item?.from ?? "",
      to: item?.to ?? "",
      technologies: item?.technologies?.join(", ") ?? "",
      companyUrl: item?.companyUrl ?? "",
      description: item?.description?.join("\n") ?? "",
    },
  });

  const save = async (data: Record<string, unknown>) => {
    setSaving(true);
    try {
      const body = {
        ...data,
        technologies: (data.technologies as string)
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean),
        description: (data.description as string)
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean),
        companyUrl: data.companyUrl || "",
      };

      if (item) {
        await axios.patch(`/api/update-experience?id=${item._id}`, body);
        SuccessToast("Experience updated");
      } else {
        await axios.post("/api/create-experience", body);
        SuccessToast("Experience created");
      }

      reset();
      onSaved();
    } catch {
      ErrorToast("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const inputClasses =
    "w-full bg-dark-200 border border-primary-100/30 focus:border-primary-100 outline-none rounded-lg py-2.5 px-3 text-light-200 placeholder:text-light-300/40 transition-colors";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bgDark/60 backdrop-blur-md z-999">
      <div
        className="relative w-[92%] sm:w-180 max-h-[calc(100dvh-60px)] overflow-y-auto bg-dark-100 border border-primary-100/20 rounded-2xl shadow-[0_0_60px_-10px_rgba(116,192,252,0.15)] p-6 scrollbar-2"
        data-lenis-prevent
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-light-200">
            {item ? "Edit Experience" : "New Experience"}
          </h2>
          <button
            onClick={onClose}
            className="text-light-300 hover:text-red-400 transition-colors p-1 cursor-pointer"
          >
            <RxCross2 className="text-xl" />
          </button>
        </div>

        <form
          className="text-light-200 flex flex-col gap-5"
          onSubmit={handleSubmit(save)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <p className="text-sm font-medium text-light-300">Company</p>
              <input
                type="text"
                className={inputClasses}
                {...register("company", { required: "Required" })}
              />
              {errors.company && (
                <small className="text-xs text-red-400">
                  {String(errors.company.message)}
                </small>
              )}
            </label>
            <label className="flex flex-col gap-1.5">
              <p className="text-sm font-medium text-light-300">Position</p>
              <input
                type="text"
                className={inputClasses}
                {...register("position", { required: "Required" })}
              />
              {errors.position && (
                <small className="text-xs text-red-400">
                  {String(errors.position.message)}
                </small>
              )}
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-light-300">
              Product{" "}
              <span className="text-light-300/40 text-xs">(e.g. Connershop, Arc Pay)</span>
            </p>
            <input
              type="text"
              className={inputClasses}
              {...register("product", { required: "Required" })}
            />
            {errors.product && (
              <small className="text-xs text-red-400">
                {String(errors.product.message)}
              </small>
            )}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <p className="text-sm font-medium text-light-300">From</p>
              <input
                type="text"
                placeholder="e.g. Nov 2023"
                className={inputClasses}
                {...register("from", { required: "Required" })}
              />
              {errors.from && (
                <small className="text-xs text-red-400">
                  {String(errors.from.message)}
                </small>
              )}
            </label>
            <label className="flex flex-col gap-1.5">
              <p className="text-sm font-medium text-light-300">To</p>
              <input
                type="text"
                placeholder="e.g. Present"
                className={inputClasses}
                {...register("to", { required: "Required" })}
              />
              {errors.to && (
                <small className="text-xs text-red-400">
                  {String(errors.to.message)}
                </small>
              )}
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-light-300">
              Technologies{" "}
              <span className="text-light-300/40 text-xs">(comma-separated)</span>
            </p>
            <input
              type="text"
              placeholder="React, Next.js, TypeScript..."
              className={inputClasses}
              {...register("technologies")}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-light-300">
              Company URL{" "}
              <span className="text-light-300/40 text-xs">(optional)</span>
            </p>
            <input
              type="text"
              placeholder="https://..."
              className={inputClasses}
              {...register("companyUrl")}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-light-300">
              Description{" "}
              <span className="text-light-300/40 text-xs">
                (one point per line)
              </span>
            </p>
            <textarea
              rows={6}
              className={`${inputClasses} resize-none`}
              {...register("description", { required: "Required" })}
            />
            {errors.description && (
              <small className="text-xs text-red-400">
                {String(errors.description.message)}
              </small>
            )}
          </label>

          <button className="mt-2 w-full bg-primary-200/90 hover:bg-primary-200 text-light-100 font-medium rounded-lg py-2.5 transition-colors cursor-pointer">
            {saving ? "Saving..." : item ? "Save Changes" : "Add Experience"}
          </button>
        </form>
      </div>
    </div>
  );
};
