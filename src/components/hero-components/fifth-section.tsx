import { Ma, Mlink } from "@/utils/motion-exports";
import { useEffect, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiFacebookCircleFill } from "react-icons/ri";

export const FifthSection = () => {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <div id="contact" className="mt-16 section-container">
      <div className="flex gap-2 items-center select-none">
        <p className="text-xl md:text-2xl text-primary-100 font-SF_Mono">04.</p>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-light-200 font-semibold">
            Get in Touch
          </h3>
        </div>
        <div className="hidden 340:block w-22.5 380:w-[150px] h-0.5 bg-primary-100/30" />
      </div>
      <p className="text-xl md:text-2xl text-light-200 mt-4 mb-4">
        Got a project you&apos;d like me to work on?
      </p>
      <p className="text-base md:text-lg text-light-200 mt-4 mb-4">
        Reach out me to via these handles
      </p>
      <div className="flex items-center gap-3 justify-center flex-wrap my-4">
        <Mlink
          href="https://www.github.com/okorojames"
          target="_blank"
          className="flex justify-center items-center w-10"
        >
          <FaGithub className="text-2xl" />
        </Mlink>
        <Mlink
          href="https://www.x.com/okorojames_"
          target="_blank"
          className="flex justify-center items-center w-10"
        >
          <BsTwitterX className="text-2xl" />
        </Mlink>
        <Mlink
          href="https://www.linkedin.com/in/okorojames"
          target="_blank"
          className="flex justify-center items-center w-10"
        >
          <CiLinkedin className="text-3xl" />
        </Mlink>
        <Mlink
          href="https://www.facebook.com/mrokorojames"
          target="_blank"
          className="flex justify-center items-center w-10"
        >
          <RiFacebookCircleFill className="text-3xl" />
        </Mlink>
        <Ma
          href="mailto:okorojameschizaram@gmail.com?subject=Hello, James"
          target="_blank"
          className="flex justify-center items-center w-10"
        >
          <HiOutlineMail className="text-3xl" />
        </Ma>
        <Ma
          href="https://wa.me/2349077046324"
          target="_blank"
          className="flex justify-center items-center w-10"
        >
          <FaWhatsapp className="text-3xl" />
        </Ma>
      </div>
      <p className="flex gap-1 items-center text-light-200 justify-center tracking-wide my-12 font-light">
        <span>Copyright &copy; Okoro James</span>
        {year && <span>{year}</span>}
      </p>
    </div>
  );
};
