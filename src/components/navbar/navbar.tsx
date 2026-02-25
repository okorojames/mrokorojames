"use client";
import { Mdiv, Mlink, Presence } from "@/utils/motion-exports";
import Image from "next/image";
import { useState } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";

export const Navbar = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        // staggerDirection: 3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };
  //
  const [showMenu, setShowMenu] = useState<boolean>(false);
  //
  return (
    <nav className="max-w-360 mx-auto sticky top-0 left-0 w-full bg-bgDark/10 backdrop-blur-sm flex items-center justify-between py-5 px-6 sm:px-7.5 md:px-12 gap-4 z-899">
      <Mlink
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        href="/#"
        className="h-13.75 w-13.75 bg-dark-100 flex justify-center items-center rounded-full"
      >
        <Image
          src="/logo3.png"
          width={50}
          height={50}
          alt="logo3"
          unoptimized
        />
      </Mlink>
      <div
        className="block 680:hidden shadow-[0_0_0_1.5px] shadow-primary-100 rounded-md p-1.5 cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        <HiMiniBars3BottomRight className="text-2xl" />
      </div>
      <Mdiv
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="hidden 680:flex items-center gap-8 font-SF_Mono"
        key={"desktop-menus"}
      >
        <Mlink
          variants={itemVariants}
          whileHover={{
            scale: 0.95,
            color: "#74c0fc",
            transition: { type: "tween" },
          }}
          href="/#about"
        >
          About
        </Mlink>
        <Mlink
          variants={itemVariants}
          whileHover={{
            scale: 0.95,
            color: "#74c0fc",
            transition: { type: "tween" },
          }}
          href="/#experience"
        >
          Experience
        </Mlink>
        <Mlink
          variants={itemVariants}
          whileHover={{
            scale: 0.95,
            color: "#74c0fc",
            transition: { type: "tween" },
          }}
          href="/#projects"
        >
          Projects
        </Mlink>
        <Mlink
          variants={itemVariants}
          whileHover={{
            scale: 0.95,
            color: "#74c0fc",
            transition: { type: "tween" },
          }}
          href="/#contact"
        >
          Contact
        </Mlink>
        <Mlink
          variants={itemVariants}
          whileHover={{
            scale: 0.95,
            color: "#ffffff",
            backgroundColor: "#4dabf7",
            // shadow: "none",
            // transition: { type: "just" },
            transition: { type: "tween" },
          }}
          href="/my-cv/OkoroJames_FrontendDeveloperCV.pdf"
          className="shadow-[0_0_0_1.3px] shadow-primary-200 px-4 py-2 rounded-md"
          target="_blank"
        >
          Resume
        </Mlink>
      </Mdiv>
      {/* Mobile menu */}
      <Presence>
        {showMenu && (
          <Mdiv
            initial={{ height: 0 }}
            animate={{
              height: "200px",
            }}
            exit={{ height: 0 }}
            key={"mobile-menus"}
            className="fixed flex 680:hidden flex-col bg-bgDark gap-3 text-primary-200 w-full left-0 top-20 overflow-y-hidden z-889"
          >
            <Mlink
              className="py-2 pl-5 border-b border-b-primary-100 last:border-b-0"
              href="/#about"
              onClick={() => setShowMenu(false)}
            >
              About
            </Mlink>
            <Mlink
              className="py-2 pl-5 border-b border-b-primary-100 last:border-b-0"
              href="/#experience"
              onClick={() => setShowMenu(false)}
            >
              Experience
            </Mlink>
            <Mlink
              className="py-2 pl-5 border-b border-b-primary-100 last:border-b-0"
              href="/#projects"
              onClick={() => setShowMenu(false)}
            >
              Projects
            </Mlink>
            <Mlink
              className="py-2 pl-5 border-b border-b-primary-100 last:border-b-0"
              href="/#contact"
              onClick={() => setShowMenu(false)}
            >
              Contact
            </Mlink>
          </Mdiv>
        )}
      </Presence>
    </nav>
  );
};
