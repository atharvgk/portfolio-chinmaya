"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import {
  projectFilters,
  projects,
  type Project,
  type ProjectFilter,
} from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { PillTabs } from "./PillTabs";
import { TechIcon } from "./TechIcon";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl dark:bg-black dark:border-white/10 dark:hover:border-white/20 bg-white border-black/10 hover:border-black/20 cursor-pointer">
      <div className="relative w-full h-48 sm:h-54 lg:h-58 overflow-hidden bg-black/5 dark:bg-white/5">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex flex-row justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-bold dark:text-white text-black mb-3 line-clamp-2 min-h-[3.5rem]">
            {project.title}
          </h3>
          {(project.github || project.external) && (
            <div className="flex gap-3 items-center shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  className="p-2 rounded-lg dark:bg-white/10 dark:hover:bg-white/20 bg-black/5 hover:bg-black/10 transition-colors duration-200"
                >
                  <FiGithub className="h-5 w-5 dark:text-white text-black" />
                </a>
              )}
              {project.external && (
                <a
                  href={project.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo"
                  className="p-2 rounded-lg dark:bg-white/10 dark:hover:bg-white/20 bg-black/5 hover:bg-black/10 transition-colors duration-200"
                >
                  <ExternalLink className="h-5 w-5 dark:text-white text-black" />
                </a>
              )}
            </div>
          )}
        </div>

        <p className="dark:text-white/70 text-black/70 text-sm sm:text-base mb-4 line-clamp-3 min-h-[4.5rem]">
          {project.description}
        </p>
        <p className="text-xs sm:text-sm dark:text-white/70 text-black/70 mb-3 line-clamp-2">
          <span className="font-semibold">Impact:</span> {project.impact}
        </p>

        <div className="flex flex-wrap gap-3 items-center min-h-[2rem] mt-auto">
          {project.techIcons.map((icon) => (
            <div
              key={icon}
              className="transition-transform hover:scale-110 cursor-pointer dark:text-white text-black"
            >
              <TechIcon name={icon} className="w-6 h-6" />
            </div>
          ))}
          {project.badges?.map((badge) => (
            <div
              key={badge}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors dark:bg-white/10 dark:text-white dark:border-white/20 bg-black/5 text-black border-black/10 text-xs"
            >
              {badge}
            </div>
          ))}
          {project.extraBadge && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors dark:bg-white/10 dark:text-white dark:border-white/20 bg-black/5 text-black border-black/10 text-xs">
              +{project.extraBadge}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("Featured");

  const visible = projects.filter((p) =>
    filter === "All" ? true : p.categories.includes(filter),
  );

  return (
    <section id="projects" className="transition-all duration-300">
      <SectionHeader
        icon={<FolderGit2 className="w-5 h-5" />}
        title="Projects"
        subtitle="4 projects showcasing my skills"
      />

      <PillTabs
        tabs={projectFilters}
        active={filter}
        onChange={setFilter}
        layoutId="project-pill"
      />

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
