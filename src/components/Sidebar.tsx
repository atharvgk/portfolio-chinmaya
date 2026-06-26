 "use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText, Mail, MapPin } from "lucide-react";
import { FiLinkedin } from "react-icons/fi";
import { profile } from "@/lib/data";
import { StarBorder } from "./StarBorder";
import { ThemeToggle } from "./ThemeToggle";
import { SocialLink } from "./SocialLink";
import { TiltedCard } from "./TiltedCard";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Sidebar() {
  return (
    <div className="w-full lg:w-2/5 xl:w-[38%] 2xl:w-[35%] lg:sticky lg:top-0 lg:h-screen transition-colors duration-500 dark:bg-[#0E0E10] bg-[#FAFAFA] border-b lg:border-b-0 lg:border-r dark:border-white/10 border-black/10 relative z-20">
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 dark:opacity-20 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          color: "rgb(209, 213, 219)",
        }}
      />

      <div className="h-full overflow-hidden p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="flex flex-col space-y-7 lg:space-y-8 max-w-md mx-auto lg:max-w-none relative z-10">
          {/* Top row: badge + theme toggle */}
          <div className="flex justify-between items-center gap-4">
            <StarBorder>{profile.available}</StarBorder>
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile fixed toggle */}
          <div className="fixed top-4 right-4 z-50 lg:hidden rounded-full backdrop-blur-md bg-white/20 dark:bg-black/20 p-1 shadow-lg">
            <ThemeToggle />
          </div>

          {/* Profile photo */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="flex justify-center lg:justify-start"
          >
            <TiltedCard src="/profile.webp" alt={profile.name} caption={profile.name} />
          </motion.div>

          {/* Name + title */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2 text-center lg:text-left"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold dark:text-white text-gray-900 transition-colors duration-300 leading-tight tracking-wide">
              {profile.name}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl dark:text-gray-300 text-gray-600 transition-colors duration-300">
              {profile.title}
            </p>
          </motion.div>

          {/* Location */}
          <div className="flex items-center justify-center lg:justify-start space-x-2 dark:text-white/80 text-gray-600 transition-colors duration-300 text-xs sm:text-sm lg:text-base">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>{profile.location}</span>
            <span>{profile.flag}</span>
          </div>

          {/* Tagline */}
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="dark:text-gray-300 text-gray-700 leading-relaxed transition-colors duration-300 text-center lg:text-left text-sm lg:text-base"
          >
            {profile.tagline}
          </motion.p>

          {/* Socials */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            <SocialLink
              href={profile.resume}
              ariaLabel="Resume"
              preview="/socials/resume.webp"
              previewAlt="Resume preview"
              variant="outline"
            >
              <FileText className="w-4 h-4 mr-2" />
              Resume
              <ExternalLink className="w-3 h-3 ml-2" />
            </SocialLink>

            <SocialLink
              href={`mailto:${profile.email}`}
              ariaLabel="Email"
              previewText={profile.email}
            >
              <Mail className="w-4 h-4" />
            </SocialLink>

            <SocialLink
              href={profile.socials.linkedin}
              ariaLabel="LinkedIn"
              preview="/socials/linkedin.webp"
              previewAlt="LinkedIn preview"
            >
              <FiLinkedin className="w-4 h-4" />
            </SocialLink>
          </div>

          {/* CTA */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-900 text-center lg:text-left tracking-wide">
              Let&apos;s Connect
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`mailto:${profile.email}`} className="w-full sm:w-auto">
                <button className="group flex flex-col items-center justify-center gap-1 px-6 py-3 rounded-full dark:bg-white dark:text-black bg-black text-white hover:bg-black/90 dark:hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 min-h-[68px] w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span className="font-semibold text-sm sm:text-base">
                      Get in Touch
                    </span>
                  </div>
                  <span className="text-xs opacity-80">Send me a message</span>
                </button>
              </a>

              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button className="group flex flex-col items-center justify-center gap-1 px-6 py-3 rounded-full border-2 dark:border-white/20 border-black/20 dark:text-white text-black dark:hover:bg-white/10 hover:bg-black/5 transition-all duration-200 hover:scale-105 min-h-[68px] w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <FiLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-sm sm:text-base">
                      Connect on LinkedIn
                    </span>
                  </div>
                  <span className="text-xs dark:text-white/60 text-black/60">
                    Open to analyst opportunities
                  </span>
                </button>
              </a>
            </div>
            <p className="text-xs sm:text-sm dark:text-white/60 text-black/60">
              Usually responds within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
