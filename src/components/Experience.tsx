"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  BookOpen,
  Code,
  GraduationCap,
  Monitor,
  PenTool,
} from "lucide-react";
import { EducationItem, ExperienceItem } from "@/lib/types";
import { SectionHeader } from "./SectionHeader";
import { PillTabs } from "./PillTabs";

const expIcon = {
  code: Code,
  briefcase: Briefcase,
  monitor: Monitor,
  pen: PenTool,
};

const eduIcon = {
  grad: GraduationCap,
  book: BookOpen,
};

function TimelineItem({
  Icon,
  title,
  org,
  period,
  mode,
  points,
  isLast,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  org: string;
  period: string;
  mode: string;
  points: string[];
  isLast: boolean;
}) {
  return (
    <div className={`relative ${isLast ? "" : "pb-8"} pl-12`}>
      {!isLast && (
        <span className="absolute left-5 top-10 bottom-0 w-px dark:bg-white/15 bg-black/10" />
      )}
      <div className="absolute left-0 top-0 w-10 h-10 bg-white/10 dark:bg-white/10 border-2 border-gray-300 dark:border-white/30 rounded-full flex items-center justify-center text-gray-700 dark:text-white/70">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {org} • {period}
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{mode}</p>
      <ul className="mt-2 space-y-1.5 text-gray-600 dark:text-gray-300">
        {points.map((point) => (
          <li key={point} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Experience({
  experience,
  education,
}: {
  experience: ExperienceItem[];
  education: EducationItem[];
}) {
  const [tab, setTab] = useState<"Work" | "Education">("Work");

  return (
    <section id="experience" className="transition-all duration-300">
      <SectionHeader
        icon={<Briefcase className="w-5 h-5" />}
        title="Experience & Education"
      />

      <PillTabs
        tabs={["Work", "Education"] as const}
        active={tab}
        onChange={setTab}
        layoutId="exp-pill"
      />

      <div className="space-y-12 lg:space-y-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-semibold dark:text-white text-gray-900 mb-6 flex items-center">
              {tab === "Work" ? (
                <Briefcase className="w-5 h-5 mr-2" />
              ) : (
                <GraduationCap className="w-5 h-5 mr-2" />
              )}
              {tab === "Work" ? "Experience" : "Education"}
            </h3>
            <div className="space-y-4">
              {tab === "Work"
                ? experience.map((item: ExperienceItem, i) => (
                    <TimelineItem
                      key={item.role}
                      Icon={expIcon[item.icon]}
                      title={item.role}
                      org={item.org}
                      period={item.period}
                      mode={item.mode}
                      points={item.points}
                      isLast={i === experience.length - 1}
                    />
                  ))
                : education.map((item: EducationItem, i) => (
                    <TimelineItem
                      key={item.degree}
                      Icon={eduIcon[item.icon]}
                      title={item.degree}
                      org={item.org}
                      period={item.period}
                      mode={item.mode}
                      points={item.points}
                      isLast={i === education.length - 1}
                    />
                  ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
