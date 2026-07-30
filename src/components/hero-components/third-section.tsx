"use client";
import { IExperience } from "@/types/experience";
import { workExperience } from "@/mock-data/work-experience";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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

  const activeIdx = items.findIndex((e) => e._id === currExp._id);
  const selected = items[activeIdx] ?? items[0];

  return (
    <div id="experience" className="mt-16 section-container">
      <div className="flex gap-2 items-center select-none mb-10">
        <p className="text-xl md:text-2xl text-primary-100 font-SF_Mono">02.</p>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-light-200 font-semibold">
          Where I&apos;ve Worked
        </h3>
        <div className="hidden 340:block w-22.5 min-[380]:w-37.5 h-0.5 bg-primary-100/30" />
      </div>

      {/* Mobile dropdown */}
      <div className="576:hidden mb-6">
        <select
          value={activeIdx}
          onChange={(e) => setCurrExp(items[Number(e.target.value)])}
          className="w-full bg-dark-100 border border-primary-100/30 text-light-200 rounded-lg px-4 py-3 outline-none focus:border-primary-100 text-sm"
        >
          {items.map((exp, i) => (
            <option key={exp._id} value={i}>
              {exp.company} — {exp.position}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: timeline + content */}
      <div className="relative grid grid-cols-1 576:grid-cols-[260px_1fr] gap-6 680:gap-10">
        {/* Timeline sidebar */}
        <div className="hidden 576:block relative">
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
        <div className="min-h-50">
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
