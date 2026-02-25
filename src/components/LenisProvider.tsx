"use client";

import { useLayoutEffect, useRef, useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * LenisProvider — smooth scroll for desktop only.
 * On mobile/touch devices it renders children directly (zero JS overhead).
 * GSAP + Lenis are dynamically imported so they don't block initial load.
 */
const LenisProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<any>(null);
  const rafRef = useRef<((time: number) => void) | null>(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Detect touch/mobile once on mount
  useEffect(() => {
    const touch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setIsMobile(touch);
  }, []);

  // Initialize Lenis only on desktop, via dynamic import
  useLayoutEffect(() => {
    if (isMobile) return;

    let destroyed = false;

    const init = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("@studio-freight/lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (destroyed) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1 - Math.pow(1 - t, 4)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis.raf(time * 1000);
      };
      rafRef.current = raf;

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      destroyed = true;
      if (rafRef.current) {
        import("gsap").then(({ gsap }) => {
          gsap.ticker.remove(rafRef.current!);
        });
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [isMobile]);

  // Reset scroll position on page change
  useLayoutEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
};

export default LenisProvider;
