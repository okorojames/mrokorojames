"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered (safe to call multiple times)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook: hero text reveal — splits text by words and animates them in.
 * Attach the ref to a container; all words inside will stagger in.
 */
export function useTextReveal<T extends HTMLElement>(options?: {
  duration?: number;
  stagger?: number;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<T>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasRun.current) return;
    hasRun.current = true;

    // Wrap each word in a span for animation
    const elements = el.querySelectorAll("[data-gsap-text]");
    const allWords: HTMLSpanElement[] = [];

    elements.forEach((element) => {
      // Process child nodes to preserve <br> tags
      const fragment = document.createDocumentFragment();

      element.childNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          (node as Element).tagName === "BR"
        ) {
          // Preserve <br> elements
          fragment.appendChild(document.createElement("br"));
        } else {
          const text = node.textContent || "";
          const words = text.split(/\s+/).filter(Boolean);
          words.forEach((word, i) => {
            const outer = document.createElement("span");
            outer.className = "inline-block overflow-hidden";
            const inner = document.createElement("span");
            inner.className = "gsap-word inline-block";
            inner.style.transform = `translateY(${options?.y ?? 100}%)`;
            inner.style.opacity = "0";
            inner.textContent = word;
            outer.appendChild(inner);
            fragment.appendChild(outer);
            // Add space between words (but not after the last word before a <br>)
            if (i < words.length - 1) {
              fragment.appendChild(document.createTextNode(" "));
            }
          });
          // Add trailing space after this text node if it's not the last child
          if (words.length > 0) {
            fragment.appendChild(document.createTextNode(" "));
          }
        }
      });

      element.innerHTML = "";
      element.appendChild(fragment);
      element
        .querySelectorAll(".gsap-word")
        .forEach((w) => allWords.push(w as HTMLSpanElement));
    });

    const ctx = gsap.context(() => {
      gsap.to(allWords, {
        y: 0,
        opacity: 1,
        duration: options?.duration ?? 0.7,
        stagger: options?.stagger ?? 0.04,
        delay: options?.delay ?? 0.2,
        ease: "power3.out",
      });
    });

    return () => {
      ctx.revert();
    };
  }, [options?.duration, options?.stagger, options?.delay, options?.y]);

  return ref;
}
