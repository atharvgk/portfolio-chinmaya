"use client";

import { motion } from "framer-motion";
import { CodeXml } from "lucide-react";
import { marqueeIcons, techCards } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { TechIcon } from "./TechIcon";

function LogoLoop() {
  const items = [...marqueeIcons, ...marqueeIcons];
  return (
    <div
      className="logoloop-wrapper relative group overflow-x-hidden cursor-pointer dark:[--fade:#0E0E10] [--fade:#FAFAFA]"
      style={{ height: 80 }}
      role="region"
      aria-label="Technology skills"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,120px)]"
        style={{
          background:
            "linear-gradient(to right, var(--fade) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,120px)]"
        style={{
          background:
            "linear-gradient(to left, var(--fade) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="flex items-center h-full w-max animate-logoloop dark:text-white text-black">
        {items.map((icon, i) => (
          <span
            key={`${icon}-${i}`}
            className="flex-none mr-10 transition-transform duration-300 hover:scale-125"
          >
            <TechIcon name={icon} className="w-12 h-12" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="skills" className="transition-all duration-300">
      <SectionHeader icon={<CodeXml className="w-5 h-5" />} title="Tech Stack" />

      <div className="space-y-8">
        <LogoLoop />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {techCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-4 rounded-lg dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 hover:dark:bg-white/10 hover:bg-black/10 transition-colors cursor-default group"
            >
              <p className="text-xs font-semibold uppercase tracking-wide dark:text-white/60 text-black/60 mb-1 group-hover:dark:text-white/80 group-hover:text-black/80 transition-colors">
                {card.title}
              </p>
              <p className="text-sm leading-relaxed dark:text-white/90 text-black/90 group-hover:dark:text-white group-hover:text-black transition-colors">
                {card.items}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
