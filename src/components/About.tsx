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
          Hi, I&apos;m a 22-year-old{" "}
          <span className="font-semibold dark:text-white text-black">
            Full Stack Developer
          </span>{" "}
          who builds complete products from the ground up. I work across the
          stack — from building responsive UIs with React, Next.js, Tailwind
          CSS, and React Native, to writing backend APIs with Node.js and
          Express, to managing databases like MongoDB, PostgreSQL, and MySQL.
        </p>
        <p>
          I enjoy creating{" "}
          <span className="font-semibold dark:text-white text-black">
            end-to-end solutions
          </span>{" "}
          that feel smooth and practical. Whether it&apos;s adding real-time
          features with WebSocket and Socket.io, integrating AI with OpenAI and
          Gemini, or scaling apps with Prisma and cloud tools, I like working
          across both frontend and backend to make things work well.
        </p>
        <p>
          When I&apos;m not coding, I&apos;m usually watching movies — I just
          enjoy a good story and the little details that make it fun to watch.
        </p>
      </div>
    </section>
  );
}
