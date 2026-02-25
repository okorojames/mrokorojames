"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom magnetic cursor:
 * - Small dot follows the mouse precisely
 * - Larger ring follows with a smooth delay
 * - Interactive elements (links, buttons) pull the cursor magnetically
 * - Ring scales up when hovering interactive elements
 * - Hidden on touch devices
 */
const MagneticCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === "undefined" || "ontouchstart" in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Track mouse position
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    // Smooth ring follow via GSAP ticker
    const followRing = () => {
      const dx = mouse.current.x - ringPos.current.x;
      const dy = mouse.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.15;
      ringPos.current.y += dy * 0.15;
      gsap.set(ring, { x: ringPos.current.x, y: ringPos.current.y });
    };

    // Magnetic pull + scale on interactive elements
    const magneticEls: {
      el: Element;
      onEnter: () => void;
      onLeave: () => void;
      onMove: (e: MouseEvent) => void;
    }[] = [];

    const initMagnetics = () => {
      // Clean up previous listeners
      magneticEls.forEach(({ el, onEnter, onLeave, onMove }) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("mousemove", onMove as EventListener);
      });
      magneticEls.length = 0;

      const interactiveEls = document.querySelectorAll(
        "a, button, [data-magnetic], input, label, [role='button']",
      );

      interactiveEls.forEach((el) => {
        const strength = parseFloat(
          (el as HTMLElement).dataset.magneticStrength || "0.3",
        );

        const onEnter = () => {
          gsap.to(ring, {
            scale: 1.8,
            borderColor: "rgba(116, 192, 252, 0.6)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(dot, { scale: 0.5, duration: 0.3 });
        };

        const onLeave = () => {
          gsap.to(ring, {
            scale: 1,
            borderColor: "rgba(116, 192, 252, 0.4)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(dot, { scale: 1, duration: 0.3 });

          // Reset magnetic pull
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        };

        const onMove = (e: MouseEvent) => {
          const rect = (el as HTMLElement).getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * strength;
          const deltaY = (e.clientY - centerY) * strength;

          gsap.to(el, {
            x: deltaX,
            y: deltaY,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("mousemove", onMove as EventListener);

        magneticEls.push({ el, onEnter, onLeave, onMove });
      });
    };

    // Cursor visibility
    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };
    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    // Click animation
    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.1 });
      gsap.to(dot, { scale: 1.5, duration: 0.1 });
    };
    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.4)" });
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.4)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    gsap.ticker.add(followRing);

    // Init magnetics and re-init on DOM changes (for dynamically loaded content)
    initMagnetics();
    const observer = new MutationObserver(() => {
      initMagnetics();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Hide default cursor globally
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      gsap.ticker.remove(followRing);
      observer.disconnect();
      document.documentElement.style.cursor = "";
      magneticEls.forEach(({ el, onEnter, onLeave, onMove }) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("mousemove", onMove as EventListener);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      {/* Ring */}
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
};

export default MagneticCursor;
