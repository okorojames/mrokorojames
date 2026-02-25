"use client"; // This is a client component

import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";

// Register plugins globally if not already done
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LenisProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<((time: number) => void) | null>(null);
  const pathname = usePathname();

  // Initialize Lenis and sync with GSAP ScrollTrigger
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1 - Math.pow(1 - t, 4)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    rafRef.current = raf;

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // Ensure scroll position resets on page change
  useLayoutEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
};

export default LenisProvider;
