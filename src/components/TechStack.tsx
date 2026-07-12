"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { TechCardItem } from "@/lib/types";
import { SectionHeader } from "./SectionHeader";

export function TechStack({ techCards }: { techCards: TechCardItem[] }) {
  return (
    <section id="skills" className="transition-all duration-300">
      <SectionHeader
        icon={<BarChart3 className="w-5 h-5" />}
        title="Skills"
        subtitle="Tools and competencies across research, valuation, and reporting"
      />

      <div className="space-y-8">
        {techCards.map((card, ci) => (
          <div key={card.title} className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] dark:text-white/50 text-black/50">
              {card.title}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {card.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: ci * 0.05 + si * 0.03 }}
                  className="rounded-xl border border-dashed px-4 py-2 text-sm font-medium transition-colors cursor-default dark:border-white/25 dark:text-white/80 dark:hover:border-white/50 dark:hover:text-white border-black/25 text-black/70 hover:border-black/50 hover:text-black"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
