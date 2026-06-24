"use client";

import { useEffect, useState } from "react";
import { sectionNav } from "@/lib/data";

export function SectionNav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sectionNav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed right-2 top-1/2 -translate-y-1/2 z-30 hidden xl:block transition-opacity duration-500 ease-in-out">
      <ul className="space-y-2 p-3 rounded-lg backdrop-blur-[2px] bg-white/10 dark:bg-black/10">
        {sectionNav.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id} tabIndex={0}>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={`group flex items-center gap-3 transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
                aria-label={`Navigate to ${label}`}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className={`h-0.5 transition-all duration-300 ${
                      isActive
                        ? "w-5 dark:bg-white bg-black"
                        : "w-3 dark:bg-white/40 bg-black/40"
                    }`}
                  />
                </span>
                <span
                  className={`text-xs font-medium whitespace-nowrap transition-opacity duration-300 dark:text-white text-black ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
