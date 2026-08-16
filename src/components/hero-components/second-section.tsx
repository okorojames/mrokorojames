import { cloudinaryLoader } from "@/utils/cloudinary-loader";
import Image from "next/image";
import { BiLogoTypescript } from "react-icons/bi";
import { GrReactjs } from "react-icons/gr";
import {
  RiJavascriptFill,
  RiNextjsFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiAngular,
  SiDocker,
  SiExpress,
  SiHono,
  SiPostgresql,
  SiPrisma,
  SiReactquery,
  SiRedux,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import type { ReactNode } from "react";

const techItems: { icon: ReactNode; name: string }[] = [
  { icon: <BiLogoTypescript />, name: "TypeScript" },
  { icon: <RiJavascriptFill />, name: "JavaScript" },
  { icon: <RiNextjsFill />, name: "Next.js" },
  { icon: <GrReactjs />, name: "React" },
  { icon: <TbBrandFramerMotion />, name: "Framer Motion" },
  { icon: <RiTailwindCssFill />, name: "Tailwind CSS" },
  { icon: <SiRedux />, name: "Redux Toolkit" },
  { icon: <SiReactquery />, name: "React Query" },
  { icon: <SiPostgresql />, name: "PostgreSQL" },
  { icon: <SiPrisma />, name: "Prisma" },
  { icon: <SiHono />, name: "Hono" },
  { icon: <SiExpress />, name: "Express" },
  { icon: <SiDocker />, name: "Docker" },
  { icon: <SiAngular />, name: "Angular" },
];

const MarqueeRow = ({
  items,
  reverse,
}: {
  items: typeof techItems;
  reverse?: boolean;
}) => (
  <div className="relative w-full h-9 overflow-hidden select-none">
    <div
      className={`absolute inset-y-0 left-0 flex items-center gap-3 w-max ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      {[...items, ...items].map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-1.5 text-sm text-light-200 bg-dark-100/60 border border-primary-100/15 rounded-full px-3.5 py-1.5 whitespace-nowrap hover:border-primary-100/40 hover:bg-dark-100 transition-colors duration-300"
        >
          <span className="text-primary-100 text-base -rotate-2 shrink-0">
            {item.icon}
          </span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export const SecondSection = () => {
  const half = Math.ceil(techItems.length / 2);
  const row1 = techItems.slice(0, half);
  const row2 = techItems.slice(half);

  return (
    <div id="about" className="mt-16 section-container">
      <div className="flex gap-2 items-center select-none">
        <p className="text-xl md:text-2xl text-primary-100 font-SF_Mono">01.</p>
        <h3 className="text-xl sm:text-2xl md:text-3xl text-light-200 font-semibold">
          About Me
        </h3>
        <div className="hidden 340:block w-25 min-[380]:w-37.5 h-0.5 bg-primary-100/30" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] items-center gap-y-12 md:gap-8 justify-items-center mt-8">
        <div className="flex flex-col gap-4">
          <p className="flex flex-col gap-2 leading-6.5 tracking-wide text-light-200">
            <span>
              Hello! My name is Okoro James, and I&apos;m a Software Engineer
              passionate about building web and mobile applications that solve
              real-world problems.
            </span>
            <span>
              My journey into web development began in 2018 when I discovered
              that I could teach myself how to build amazing web applications. I
              started with the fundamentals—watching YouTube tutorials, reading
              articles, and consistently practicing what I learned.
            </span>
            <span>
              Since then, I&apos;ve grown into building scalable,
              production-ready web and mobile applications and have developed
              strong technical expertise through hands-on experience. With over
              5+ years of professional experience, I&apos;ve collaborated with
              clients and companies to deliver responsive, efficient, and
              user-focused digital solutions.
            </span>
          </p>

          <p className="text-light-200 mt-2">
            Here are few technologies I&apos;ve been working with recently:
          </p>

          <div className="flex flex-col gap-3 mt-1 w-full max-w-full overflow-hidden">
            <MarqueeRow items={row1} />
            <MarqueeRow items={row2} reverse />
          </div>
        </div>

        <Image
          src="https://res.cloudinary.com/dcwpjyezj/image/upload/v1786874151/uploads/okorojames_is3leo.jpg"
          loader={cloudinaryLoader}
          width={300}
          height={300}
          className="rounded-lg object-cover hover:rotate-0 transition-all duration-500 cursor-pointer"
          alt="Okoro James Chizaram - Software Engineer"
          title="Okoro James Chizaram"
          sizes="(max-width: 768px) 100vw, 300px"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg=="
        />
      </div>
    </div>
  );
};
