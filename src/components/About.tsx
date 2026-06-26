"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { aboutTags } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="transition-all duration-300">
      <SectionHeader icon={<User className="w-5 h-5" />} title="About Me" />

      <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
        {aboutTags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="px-3 py-1.5 rounded-full text-xs font-medium dark:bg-white/10 dark:text-white/90 bg-black/5 text-black/80 border dark:border-white/10 border-black/10 hover:dark:bg-white/15 hover:bg-black/10 transition-colors cursor-default"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <div className="space-y-5 lg:space-y-6 dark:text-gray-300 text-gray-700 leading-relaxed transition-colors duration-300 text-sm sm:text-base lg:text-base xl:text-lg">
        <p>
          I&apos;m a B.Com (Finance) graduate and{" "}
          <span className="font-semibold dark:text-white text-black">
            CFA Level I candidate
          </span>{" "}
          based in Bengaluru, building toward a career in investment banking —
          specifically M&amp;A advisory.
        </p>
        <p>
          I currently work at{" "}
          <span className="font-semibold dark:text-white text-black">
            SPAN.IO Technology India Pvt. Ltd.
          </span>
          , a US-based R&amp;D firm, where I prepare financial statements across
          Ind AS and US GAAP, manage cross-currency reporting from INR to USD,
          and built a Python-automated GST reconciliation workflow from scratch.
          It&apos;s hands-on, deadline-driven work that has sharpened both my
          technical accuracy and my ability to communicate financial data
          clearly to senior stakeholders.
        </p>
        <p>
          Outside the internship, I independently track India&apos;s{" "}
          <span className="font-semibold dark:text-white text-black">
            M&amp;A landscape
          </span>{" "}
          — maintaining a structured deal database, writing strategic deal
          rationale, and analysing transaction trends across sectors. It&apos;s
          my way of thinking like a banker before I become one.
        </p>
        <p>
          I&apos;m drawn to M&amp;A because the work sits at the intersection of
          strategy and valuation — understanding why a deal gets done, whether
          the price makes sense, and what it signals about a sector is the kind
          of problem I want to spend my career solving.
        </p>
      </div>
    </section>
  );
}
