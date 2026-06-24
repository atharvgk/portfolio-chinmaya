import { Sidebar } from "@/components/Sidebar";
import { SectionNav } from "@/components/SectionNav";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { ChatWidget } from "@/components/ChatWidget";

export default function Home() {
  return (
    <div className="min-h-screen transition-colors duration-500 dark:bg-[#0E0E10] bg-[#FAFAFA] dark:text-gray-100 text-gray-900">
      {/* Hidden SEO content (mirrors the live site's screen-reader landmark) */}
      <main className="sr-only">
        <nav aria-label="Primary">
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <a href="/blog">Blog</a>
          <a href="/about">About</a>
          <a href="/work">Work</a>
          <a href="/resume">Resume</a>
          <a href="/contact">Contact</a>
        </nav>
        <h2>
          Deepanshu Mani — Full Stack Developer Building AI-Powered Web
          Applications
        </h2>
        <h2>
          Specializing in Next.js, Node.js, TypeScript, PostgreSQL, and AI
          Automation
        </h2>
        <p>
          I design and ship production-ready applications focused on
          performance, reliability, and measurable business outcomes.
        </p>
        <h2>Featured Projects</h2>
        <p>
          End-to-end full stack builds with architecture decisions, performance
          improvements, and implementation lessons from real client and product
          work.
        </p>
        <a href="/projects">Explore featured projects and case studies</a>
        <h2>Technical Blog</h2>
        <p>
          Deep dives on Next.js SEO, backend scalability, API optimization, AI
          integration, and production engineering tradeoffs.
        </p>
        <a href="/blog">Read technical blog articles</a>
        <h2>Work Experience</h2>
        <p>
          Full Stack Developer delivering web and mobile products with Node.js
          services, PostgreSQL data modeling, and cloud deployment workflows.
        </p>
        <a href="/work">View full work experience timeline</a>
        <h2>Tech Stack</h2>
        <p>
          Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, WebSockets,
          and AI tooling for modern product development.
        </p>
        <a href="/about">Learn more about my engineering background</a>
        <a href="/resume">Open detailed resume</a>
        <a href="/contact">Get in touch for projects</a>
      </main>

      <SectionNav />

      <div className="max-w-[2000px] mx-auto">
        <div className="flex flex-col lg:flex-row w-full">
          <Sidebar />

          <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 lg:h-screen lg:overflow-y-auto no-scrollbar">
            <div className="max-w-4xl mx-auto lg:mx-0 space-y-16 lg:space-y-20">
              <About />
              <TechStack />
              <Experience />
              <Projects />
              <Achievements />

              <footer className="pt-8 border-t dark:border-white/10 border-black/10 text-center lg:text-left">
                <p className="text-sm dark:text-gray-400 text-gray-500">
                  © 2026 Deepanshu Mani
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
}
