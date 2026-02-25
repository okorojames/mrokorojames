import { WorkExperience, workExperience } from "@/mock-data/work-experience";
import { Mdiv, Presence } from "@/utils/motion-exports";
import { useState } from "react";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import { IoMdArrowDropright } from "react-icons/io";

export const ThirdSection = () => {
  const [currExp, setCurrExp] = useState<WorkExperience>(workExperience[0]);
  //
  return (
    <div id="experience" className="mt-16 section-container">
      <div className="flex gap-2 items-center select-none">
        <p className="text-xl md:text-2xl text-primary-100 font-SF_Mono">02.</p>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-light-200 font-semibold">
          Where I&apos;ve Worked
        </h3>
        <div className="hidden 340:block w-22.5 min-[380]:w-37.5 h-0.5 bg-primary-100/30" />
      </div>
      {/*  */}
      <div className="flex flex-wrap 576:hidden items-center gap-2 mb-4 mt-8">
        {workExperience?.map((item: WorkExperience) => {
          const active = currExp?.id === item.id;
          return (
            <div
              key={item?.id}
              className={`pb-2 text-sm md:text-base whitespace-nowrap cursor-pointer ${
                active
                  ? "border-b-primary-200 text-primary-100"
                  : "border-b-light-100 text-light-200"
              } border-b-[1.5px] cursor-pointer text-light-200`}
              onClick={() => setCurrExp(item)}
            >
              {item?.company}
            </div>
          );
        })}
      </div>
      {/*  */}
      <div className="relative grid grid-cols-1 576:grid-cols-[1fr_2.4fr] items-start gap-5 justify-items-center mt-8">
        {currExp && (
          <Mdiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden 576:flex flex-col w-full"
          >
            {workExperience?.map((item: WorkExperience) => {
              const active = currExp?.id === item.id;
              return (
                <div key={item?.id}>
                  <div
                    className={`py-4 pl-2 text-sm md:text-base whitespace-nowrap cursor-pointer ${
                      active
                        ? "border-l-primary-200 text-primary-100"
                        : "border-l-light-100 text-light-200"
                    } border-l-[1.5px] cursor-pointer text-light-200`}
                    onClick={() => setCurrExp(item)}
                  >
                    {item?.company}
                  </div>
                </div>
              );
            })}
          </Mdiv>
        )}
        {/*  */}
        <Presence>
          {currExp && (
            <Mdiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 font-semibold text-base sm:text-lg md:text-xl text-light-200 flex-wrap">
                <h3>{currExp?.position}</h3>
                <p className="text-primary-100">{`(${currExp?.product})`}</p>
              </div>
              <p className="font-SF_Mono flex items-center gap-2 text-light-200">
                <span>{currExp?.from} -</span>
                <span>{currExp?.to}</span>
              </p>
              {currExp?.description?.map((item: string, index: number) => (
                <p
                  key={index}
                  className="grid grid-cols-[auto_1fr] items-start gap-1"
                >
                  <IoMdArrowDropright className="text-primary-100 -rotate-2" />
                  <span className="tracking-wide text-light-200">{item}</span>
                </p>
              ))}
            </Mdiv>
          )}
        </Presence>
        {/*  */}
      </div>
    </div>
  );
};
