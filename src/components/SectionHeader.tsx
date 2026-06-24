import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-8 lg:mb-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg dark:bg-white/10 bg-black/5 dark:text-white text-black">
          {icon}
        </div>
        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold dark:text-white text-gray-900 tracking-wide">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-sm lg:text-base dark:text-gray-400 text-gray-600 ml-14">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
