import { Sidebar } from "@/components/Sidebar";
import { SectionNav } from "@/components/SectionNav";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { getPortfolioContent } from "@/lib/db";

export default async function Home() {
  const content = await getPortfolioContent();
  return (
    <div className="min-h-screen transition-colors duration-500 dark:bg-[#0E0E10] bg-[#FAFAFA] dark:text-gray-100 text-gray-900">
      {/* Hidden SEO content (screen-reader landmark) */}
      <main className="sr-only">
        <nav aria-label="Primary">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#achievements">Achievements</a>
          <a href="#contact">Contact</a>
        </nav>
        <h2>
          Chinmaya Umesh — Financial Analyst specializing in M&amp;A Research and
          Valuation
        </h2>
        <h2>
          Specializing in M&amp;A Intelligence, Cross-Border Financial Reporting,
          and Equity Valuation
        </h2>
        <p>
          B.Com (Finance) graduate and CFA Level I candidate building toward a
          career in investment banking, with hands-on experience in financial
          reporting across Ind AS and US GAAP.
        </p>
        <h2>Work Experience</h2>
        <p>
          Finance Intern preparing MIS financial packs, year-end statements for
          statutory audit, and Python-automated GST reconciliation workflows.
        </p>
        <h2>Projects</h2>
        <p>
          India M&amp;A Deal Intelligence Tracker and an integrated equity
          valuation of Tata Motors using DCF and comparable company analysis.
        </p>
        <h2>Skills</h2>
        <p>
          Deal tracking and intelligence, DCF valuation, three-statement
          modelling, comparable company analysis, Advanced Excel, PowerPoint,
          Python, Tally ERP, Power BI, and SQL.
        </p>
        <a href="#projects">Explore research projects</a>
        <a href={content.profile.resume}>Open detailed resume</a>
      </main>

      <SectionNav />

      <div className="max-w-[2000px] mx-auto">
        <div className="flex flex-col lg:flex-row w-full">
          <Sidebar profile={content.profile} />

          <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 lg:h-screen lg:overflow-y-auto no-scrollbar">
            <div className="max-w-4xl mx-auto lg:mx-0 space-y-16 lg:space-y-20">
              <About profile={content.profile} aboutTags={content.aboutTags} />
              <TechStack techCards={content.techCards} />
              <Experience experience={content.experience} education={content.education} />
              <Projects projects={content.projects} />
              <Achievements achievements={content.achievements} />
              <Contact />

              <footer className="pt-8 border-t dark:border-white/10 border-black/10 text-center lg:text-left">
                <p className="text-sm dark:text-gray-400 text-gray-500">
                  © 2026 Chinmaya Umesh
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
