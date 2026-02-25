import Image from "next/image";
import { BiLogoTypescript } from "react-icons/bi";
import { GrReactjs } from "react-icons/gr";
import {
  RiJavascriptFill,
  RiNextjsFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import { SiReactquery, SiRedux } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

export const SecondSection = () => {
  return (
    <div id="about" className="mt-16 section-container">
      <div className="flex gap-2 items-center select-none">
        <p className="text-xl md:text-2xl text-primary-100 font-SF_Mono">01.</p>
        <h3 className="text-xl sm:text-2xl md:text-3xl text-light-200 font-semibold">
          About Me
        </h3>
        <div className="hidden 340:block w-25 min-[380]:w-37.5 h-0.5 bg-primary-100/30" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] items-center gap-y-12 md:gap-8 justify-items-center">
        <div>
          <p className="leading-6.5 tracking-wide text-light-200">
            Hello!, My name is Okoro James, I&apos;ve always been passionate
            about building problem solving web applications, my interest in Web
            developement started in 2019, when I learned that I can actually
            learn and build Amazing web applications, so, I started with the
            basics, watching youtube Videos and reading articles, while
            practicing what i learnt, fast forward to today, I have started
            building a fulltime scalable, Web applications and have acquired so
            much new skills and knowledge, with my 3+ years of experience in my
            Web development career, working with Clients and Companies.
          </p>
          {/*  */}
          <div className="flex flex-col gap-2 mt-2">
            <p className="text-light-200">
              Here are few technologies I&apos;ve been working with recently:
            </p>
            <div className="grid grid-cols-[auto_auto] gap-y-4">
              <div className="flex items-center gap-1 text-light-200 cursor-pointer">
                <RiJavascriptFill className="-rotate-2 text-primary-100 text-xl" />
                <p>JavaScript</p>
              </div>
              {/*  */}
              <div className="flex items-center gap-1 text-light-200 cursor-pointer">
                <BiLogoTypescript className="-rotate-2 text-primary-100 text-xl" />
                <p>TypeScript</p>
              </div>
              {/*  */}
              <div className="flex items-center gap-1 text-light-200 cursor-pointer">
                <GrReactjs className="-rotate-2 text-primary-100 text-xl" />
                <p>ReactJs</p>
              </div>
              {/*  */}
              <div className="flex items-center gap-1 text-light-200 cursor-pointer">
                <RiNextjsFill className="-rotate-2 text-primary-100 text-xl" />
                <p>NextJs</p>
              </div>
              {/*  */}
              <div className="flex items-center gap-1 text-light-200 cursor-pointer">
                <TbBrandFramerMotion className="-rotate-2 text-primary-100 text-xl" />
                <p>Framer Motion</p>
              </div>
              {/*  */}
              <div className="flex items-center gap-1 text-light-200 cursor-pointer">
                <RiTailwindCssFill className="-rotate-2 text-primary-100 text-xl" />
                <p>TailwindCss</p>
              </div>
              {/*  */}
              <div className="flex items-center gap-1 text-light-200 cursor-pointer">
                <SiRedux className="-rotate-2 text-primary-100 text-xl" />
                <p>Redux Toolkit</p>
              </div>
              {/*  */}
              <div className="flex items-center gap-1 text-light-200 cursor-pointer">
                <SiReactquery className="-rotate-2 text-primary-100 text-xl" />
                <p>React Query</p>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
        <Image
          src="/james.jpg"
          width={300}
          height={300}
          className="rounded-lg object-cover  hover:rotate-0 transition-all duration-500 cursor-pointer"
          alt="Okoro James"
          unoptimized
        />
      </div>
    </div>
  );
};

//contrast-[1] filter hue-rotate-[200deg] hover:hue-rotate-0 rotate-[1.5deg]
