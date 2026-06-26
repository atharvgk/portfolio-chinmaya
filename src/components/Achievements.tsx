"use client";

import { useRef, type MouseEvent } from "react";
import { Award } from "lucide-react";
import { achievements } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

function AchievementRow({ label, detail }: { label: string; detail: string }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const edge = (ev: MouseEvent<HTMLDivElement>): "top" | "bottom" => {
    const rect = itemRef.current?.getBoundingClientRect();
    if (!rect) return "bottom";
    return ev.clientY - rect.top < rect.height / 2 ? "top" : "bottom";
  };

  const handleEnter = (ev: MouseEvent<HTMLDivElement>) => {
    const m = marqueeRef.current;
    if (!m) return;
    const from = edge(ev) === "top" ? "-101%" : "101%";
    m.style.transition = "none";
    m.style.transform = `translateY(${from})`;
    // force reflow so the next transition animates
    void m.offsetWidth;
    m.style.transition = "transform 0.6s cubic-bezier(0.19,1,0.22,1)";
    m.style.transform = "translateY(0%)";
  };

  const handleLeave = (ev: MouseEvent<HTMLDivElement>) => {
    const m = marqueeRef.current;
    if (!m) return;
    const to = edge(ev) === "top" ? "-101%" : "101%";
    m.style.transition = "transform 0.6s cubic-bezier(0.19,1,0.22,1)";
    m.style.transform = `translateY(${to})`;
  };

  return (
    <div
      ref={itemRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group flex-1 relative overflow-hidden text-center border-t dark:border-white/10 border-gray-200"
    >
      <a
        href="#achievements"
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-medium dark:text-white text-gray-900 text-sm sm:text-base lg:text-lg dark:group-hover:text-gray-900 group-hover:text-white transition-colors duration-300 px-3 py-1"
      >
        <span className="line-clamp-2">{label}</span>
      </a>
      <div
        ref={marqueeRef}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none dark:bg-white bg-gray-900"
        style={{ transform: "translateY(101%)" }}
      >
        <div className="flex items-center h-full w-max animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="dark:text-gray-900 text-white uppercase font-medium text-xs sm:text-sm lg:text-base leading-[1.2] px-[3vw] whitespace-nowrap"
            >
              {detail}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="transition-all duration-300">
      <SectionHeader
        icon={<Award className="w-5 h-5" />}
        title="Certifications & Achievements"
        subtitle="Credentials and programs across finance and analysis"
      />

      <Reveal className="h-[260px] rounded-xl overflow-hidden dark:bg-[#0E0E10] bg-[#FAFAFA] border dark:border-white/10 border-black/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <nav className="flex flex-col h-full m-0 p-0">
          {achievements.map((a) => (
            <AchievementRow key={a.label} label={a.label} detail={a.detail} />
          ))}
        </nav>
      </Reveal>
    </section>
  );
}
