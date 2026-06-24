"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function SocialLink({
  href,
  ariaLabel,
  preview,
  previewAlt,
  previewText,
  children,
  variant = "icon",
}: {
  href: string;
  ariaLabel: string;
  preview?: string;
  previewAlt?: string;
  previewText?: string;
  children: ReactNode;
  variant?: "icon" | "outline";
}) {
  const [hovered, setHovered] = useState(false);

  const base =
    variant === "outline"
      ? "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium border h-9 px-3 rounded-full transition-all duration-200 dark:bg-transparent dark:border-white/20 dark:text-white dark:hover:bg-white/10 bg-white border-gray-300 text-gray-900 hover:bg-gray-100"
      : "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-9 px-3 rounded-full transition-all duration-200 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10 text-gray-700 hover:text-gray-900 hover:bg-gray-100";

  return (
    <div
      className="relative"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        href={href}
      >
        <button type="button" className={base}>
          {children}
        </button>
      </a>

      {(preview || previewText) && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute bottom-full left-1/2 -translate-x-1/2 pb-3 z-50 hidden sm:block ${
                previewText ? "w-max" : "w-56"
              }`}
            >
              <div className="relative rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#0E0E10] shadow-xl dark:shadow-none">
                {preview ? (
                  <Image
                    src={preview}
                    alt={previewAlt ?? ariaLabel}
                    width={224}
                    height={140}
                    className="w-full h-auto block transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <p className="px-4 py-2 text-sm dark:text-white text-black whitespace-nowrap">
                    {previewText}
                  </p>
                )}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[13px] overflow-hidden z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-[#0E0E10] border-b border-r border-black/10 dark:border-white/10 rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
