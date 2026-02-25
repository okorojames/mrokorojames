import { useTextReveal } from "@/utils/gsap-hooks";
import Link from "next/link";

export const FirstSection = () => {
  const heroRef = useTextReveal<HTMLDivElement>({
    stagger: 0.04,
    duration: 0.7,
    delay: 0.3,
  });

  return (
    <section className="mt-6 section-container">
      <div ref={heroRef} className="flex flex-col gap-4">
        <p className="font-SF_Mono text-lg text-primary-100" data-gsap-text>
          Hi, my name is
        </p>
        <h3
          className="font-black text-2xl sm:text-4xl lg:text-6xl text-light-200"
          data-gsap-text
        >
          Okoro James Chizaram
        </h3>
        <p
          className="font-semibold tracking-wider text-lg md:text-xl text-light-300"
          data-gsap-text
        >
          I&apos;m a Frontend Web Developer
        </p>
        <p className="text-base md:text-lg text-light-300" data-gsap-text>
          I specialize in building responsive and scalable web applications,
          <br /> I love to use my skill to build problem solving web apps, and
          <br />
          I&apos;m open to acquire new knowledge in the web development field.
        </p>
        <Link
          href="/my-cv/OkoroJames_FrontendDeveloperCV.pdf"
          className="self-start shadow-[0_0_0_1.3px] shadow-primary-200 px-4 py-2 rounded-md"
          target="_blank"
        >
          Download Resume
        </Link>
      </div>
    </section>
  );
};
