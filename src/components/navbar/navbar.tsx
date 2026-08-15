"use client";

import { Mdiv, Mlink, Presence } from "@/utils/motion-exports";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  HiArrowUpRight,
  HiMiniBars3BottomRight,
  HiXMark,
} from "react-icons/hi2";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const mobileListVariants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.18, staggerChildren: 0.07 },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: { opacity: 0, x: 12 },
};

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMenu) return;

    const scrollPosition = window.scrollY;
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    const menuButton = menuButtonRef.current;
    const focusTimer = window.setTimeout(
      () => closeButtonRef.current?.focus(),
      0,
    );
    const desktopQuery = window.matchMedia("(min-width: 680px)");

    root.dataset.scrollLocked = "true";
    window.dispatchEvent(new Event("portfolio:scroll-lock"));
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    if (isTouchDevice) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";
    }

    const handleDesktopResize = () => {
      if (desktopQuery.matches) setShowMenu(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMenu(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements =
        menuPanelRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    desktopQuery.addEventListener("change", handleDesktopResize);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      root.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;

      if (isTouchDevice) window.scrollTo(0, scrollPosition);

      delete root.dataset.scrollLocked;
      window.dispatchEvent(
        new CustomEvent("portfolio:scroll-unlock", { detail: scrollPosition }),
      );
      desktopQuery.removeEventListener("change", handleDesktopResize);
      document.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <nav className="max-w-360 mx-auto sticky top-0 left-0 w-full bg-bgDark/10 backdrop-blur-sm flex items-center justify-between py-5 px-6 sm:px-7.5 md:px-12 gap-4 z-899">
        <Mlink
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          href="/#"
          className="h-13.75 w-13.75 bg-dark-100 flex justify-center items-center rounded-full"
          aria-label="Go to homepage"
        >
          <Image
            src="/logo3.png"
            width={50}
            height={50}
            alt="Okoro James"
            unoptimized
          />
        </Mlink>

        <button
          ref={menuButtonRef}
          type="button"
          className="680:hidden grid size-11 place-items-center rounded-md border border-primary-100 text-primary-100 transition-colors hover:bg-primary-100/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-100"
          onClick={() => setShowMenu(true)}
          aria-label="Open navigation menu"
          aria-expanded={showMenu}
          aria-controls="mobile-navigation"
        >
          <HiMiniBars3BottomRight className="text-2xl" aria-hidden="true" />
        </button>

        <Mdiv
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="hidden 680:flex items-center gap-8 font-SF_Mono"
          key="desktop-menus"
        >
          {navItems.map((item) => (
            <Mlink
              key={item.href}
              variants={itemVariants}
              whileHover={{
                scale: 0.95,
                color: "#74c0fc",
                transition: { type: "tween" },
              }}
              href={item.href}
            >
              {item.label}
            </Mlink>
          ))}
          <Mlink
            variants={itemVariants}
            whileHover={{
              scale: 0.95,
              color: "#ffffff",
              backgroundColor: "#4dabf7",
              transition: { type: "tween" },
            }}
            href="/my-cv/OkoroJames_FrontendEngineer.pdf"
            className="shadow-[0_0_0_1.3px] shadow-primary-200 px-4 py-2 rounded-md"
            target="_blank"
          >
            Resume
          </Mlink>
        </Mdiv>
      </nav>

      <Presence>
        {showMenu && (
          <Mdiv
            id="mobile-navigation"
            className="fixed inset-0 z-[999] flex items-start overscroll-none 680:hidden bg-[#020813]/80 p-3 backdrop-blur-md"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            onClick={closeMenu}
          >
            <Mdiv
              ref={menuPanelRef}
              className="no-scrollbar relative flex max-h-full w-full flex-col overflow-x-hidden overflow-y-auto overscroll-contain rounded-lg border border-light-200/10 bg-dark-400 shadow-2xl shadow-black/40"
              initial={{ y: -24, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -16, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-light-200/10 px-4 py-4">
                <Mlink
                  href="/#"
                  className="grid size-12 place-items-center rounded-full bg-dark-100"
                  onClick={closeMenu}
                  aria-label="Go to homepage"
                >
                  <Image
                    src="/logo3.png"
                    width={44}
                    height={44}
                    alt="Okoro James"
                    unoptimized
                  />
                </Mlink>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="grid size-11 place-items-center rounded-md border border-light-200/15 text-light-200 transition-colors hover:border-primary-100 hover:text-primary-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100"
                  onClick={closeMenu}
                  aria-label="Close navigation menu"
                >
                  <HiXMark className="text-2xl" aria-hidden="true" />
                </button>
              </div>

              <h2 id="mobile-navigation-title" className="sr-only">
                Main navigation
              </h2>

              <Mdiv
                className="flex shrink-0 flex-col px-5"
                variants={mobileListVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                {navItems.map((item, index) => (
                  <Mlink
                    key={item.href}
                    variants={mobileItemVariants}
                    href={item.href}
                    className="group flex min-h-18 items-center gap-4 border-b border-light-200/10 py-3 first:border-t"
                    onClick={closeMenu}
                    whileTap={{ x: 6 }}
                  >
                    <span className="w-6 font-SF_Mono text-xs text-primary-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-3xl font-medium text-light-200 transition-colors group-hover:text-primary-100 340:text-4xl">
                      {item.label}
                    </span>
                    <HiArrowUpRight
                      className="text-lg text-light-300 transition-colors group-hover:text-primary-100"
                      aria-hidden="true"
                    />
                  </Mlink>
                ))}
              </Mdiv>

              <div className="shrink-0 border-t border-light-200/10 p-5">
                <Mlink
                  href="/my-cv/OkoroJames_FrontendEngineer.pdf"
                  target="_blank"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-primary-100 px-4 py-3 font-SF_Mono text-sm text-primary-100 transition-colors hover:bg-primary-100 hover:text-dark-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100"
                  onClick={closeMenu}
                  whileTap={{ scale: 0.98 }}
                >
                  View resume
                  <HiArrowUpRight aria-hidden="true" />
                </Mlink>
              </div>
            </Mdiv>
          </Mdiv>
        )}
      </Presence>
    </>
  );
};
