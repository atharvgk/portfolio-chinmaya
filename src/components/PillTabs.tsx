"use client";

import { motion } from "framer-motion";

export function PillTabs<T extends string>({
  tabs,
  active,
  onChange,
  layoutId,
}: {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  layoutId: string;
}) {
  return (
    <div className="flex flex-wrap gap-1 mb-6 p-1 rounded-full w-fit dark:bg-white bg-black">
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={`relative overflow-hidden inline-flex items-center justify-center h-[28px] sm:h-[42px] px-2 sm:px-6 rounded-full font-semibold text-[9px] sm:text-sm uppercase tracking-wide transition-colors duration-300 ${
              isActive
                ? "dark:text-white text-black"
                : "dark:text-black text-white"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full dark:bg-black bg-white"
              />
            )}
            <span className="relative z-10 whitespace-nowrap">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
