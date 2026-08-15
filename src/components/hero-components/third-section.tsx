"use client";
import { IExperience } from "@/types/experience";
import { workExperience } from "@/mock-data/work-experience";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IoMdArrowDropright } from "react-icons/io";

const mockToExperience = (
  exp: (typeof workExperience)[number],
  i: number,
): IExperience => ({
  _id: `mock-${exp.id}`,
  company: exp.company,
  position: exp.position,
  product: exp.product,
  from: exp.from,
  to: exp.to,
  description: exp.description,
  technologies: [],
  order: i,
});

export const ThirdSection = () => {
  const { data: apiExperiences } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await axios.get("/api/get-experiences");
      return res.data.data as IExperience[];
    },
  });

  const items: IExperience[] =
    apiExperiences && apiExperiences.length > 0
      ? apiExperiences
      : workExperience.map(mockToExperience);

  const [currExp, setCurrExp] = useState<IExperience>(items[0]);
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(0);

  const activeIdx = Math.max(
    items.findIndex((e) => e._id === currExp._id),
    0,
  );
  const selected = items[activeIdx];

  return (
    <div id="experience" className="mt-16 section-container">
      <div className="flex gap-2 items-center select-none mb-10">
        <p className="text-xl md:text-2xl text-primary-100 font-SF_Mono">02.</p>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-light-200 font-semibold">
          Where I&apos;ve Worked
        </h3>
        <div className="hidden 340:block w-22.5 min-[380]:w-37.5 h-0.5 bg-primary-100/30" />
      </div>

      {/* Mobile: details open directly below the selected workplace. */}
      <div className="min-[864px]:hidden mb-7" aria-label="Work experiences">
        <div className="relative flex flex-col">
          <div className="absolute bottom-5 left-3.75 top-5 w-px bg-primary-100/20" />
          {items.map((exp, i) => {
            const isActive = i === openMobileIndex;
            const detailsId = `mobile-experience-${exp._id}`;

            return (
              <div key={exp._id} className="relative">
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={detailsId}
                  onClick={() => setOpenMobileIndex(isActive ? null : i)}
                  className={`grid min-h-19 w-full grid-cols-[30px_1fr_auto] items-center gap-2 rounded-lg py-3 pr-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100 ${
                    isActive
                      ? "bg-primary-100/[0.035]"
                      : "hover:bg-light-200/[0.025] active:bg-light-200/[0.04]"
                  }`}
                >
                  <span
                    className={`relative z-10 mx-auto block rounded-full border-2 transition-colors ${
                      isActive
                        ? "h-3.5 w-3.5 border-primary-100 bg-primary-100"
                        : "h-3 w-3 border-light-300 bg-dark-200"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span
                      className={`block text-sm font-semibold ${
                        isActive ? "text-primary-100" : "text-light-200"
                      }`}
                    >
                      {exp.company}
                    </span>
                    <span className="mt-1 block text-xs leading-tight text-light-300">
                      {exp.position} · {exp.from} – {exp.to}
                    </span>
                    <span className="mt-1.5 block text-xs font-medium text-primary-100/80">
                      {isActive ? "Hide details" : "View details"}
                    </span>
                  </span>
                  <FiChevronDown
                    className={`h-5 w-5 shrink-0 text-light-300 transition-transform duration-200 ${
                      isActive ? "rotate-180 text-primary-100" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={detailsId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="mb-3 ml-7.5 border-l border-primary-100/30 pb-5 pl-4">
                        {exp.product && (
                          <p className="mb-4 text-xs font-SF_Mono text-light-300">
                            {exp.product}
                          </p>
                        )}
                        <ul className="flex flex-col gap-3">
                          {exp.description.map((item, index) => (
                            <li
                              key={index}
                              className="grid grid-cols-[auto_1fr] items-start gap-2 text-sm leading-relaxed text-light-200/90"
                            >
                              <IoMdArrowDropright className="mt-0.5 shrink-0 -rotate-2 text-primary-100" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full bg-primary-100/10 px-3 py-1 text-xs font-SF_Mono text-primary-100"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: timeline + content */}
      <div className="relative grid grid-cols-1 min-[864px]:grid-cols-[260px_1fr] gap-6 min-[864px]:gap-10">
        {/* Timeline sidebar */}
        <div className="hidden min-[864px]:block relative">
          <div className="absolute left-2.75 top-2 bottom-2 w-px bg-primary-100/20" />

          <div className="flex flex-col gap-0">
            {items.map((exp, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={exp._id}
                  onClick={() => setCurrExp(exp)}
                  className={`relative flex items-start gap-4 w-full text-left px-0 py-3.5 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary-100/5 rounded-r-lg"
                      : "hover:bg-light-200/5 rounded-r-lg"
                  }`}
                >
                  <div
                    className={`relative z-10 mt-1 shrink-0 rounded-full border-2 transition-all duration-200 ${
                      isActive
                        ? "w-3 h-3 bg-primary-100 border-primary-100"
                        : "w-2.5 h-2.5 bg-dark-100 border-light-300"
                    }`}
                  />

                  <div className="min-w-0">
                    <p
                      className={`text-sm font-medium leading-tight transition-colors duration-200 ${
                        isActive ? "text-primary-100" : "text-light-200"
                      }`}
                    >
                      {exp.company}
                    </p>
                    <p className="text-xs text-light-300 mt-0.5 leading-tight">
                      {exp.position}
                    </p>
                    <p className="text-[11px] text-light-300/60 mt-0.5 font-SF_Mono">
                      {exp.from} — {exp.to}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content panel */}
        <div
          id="experience-details"
          className="hidden min-h-50 min-[864px]:block"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selected._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col gap-4"
            >
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-light-200">
                  {selected.position}{" "}
                  <span className="text-primary-100">@ {selected.company}</span>
                </h3>
                {selected.product && (
                  <p className="text-sm text-light-300 mt-0.5 font-SF_Mono">
                    {selected.product}
                  </p>
                )}
              </div>

              <p className="font-SF_Mono text-xs text-light-300/70 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-100/50" />
                {selected.from} — {selected.to}
              </p>

              <ul className="flex flex-col gap-3">
                {selected.description.map((item, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-[auto_1fr] items-start gap-2 text-sm leading-relaxed text-light-200/90"
                  >
                    <IoMdArrowDropright className="text-primary-100 mt-0.5 shrink-0 -rotate-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {selected.technologies && selected.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selected.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-SF_Mono text-primary-100 bg-primary-100/10 rounded-full px-3 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
