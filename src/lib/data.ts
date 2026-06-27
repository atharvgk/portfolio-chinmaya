export const profile = {
  name: "Chinmaya Umesh",
  title: "Financial Analyst | M&A Research & Valuation",
  location: "Bengaluru, India",
  flag: "🇮🇳",
  available: "Available for work",
  tagline:
    "B.Com (Finance) graduate and CFA Level I candidate building toward a career in investment banking — specializing in M&A intelligence, cross-border financial reporting, and equity valuation.",
  email: "chinmayaumeshblr@gmail.com",
  resume: "/Resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/chinmaya-umesh",
  },
};

export const aboutTags = [
  "M&A Research",
  "Equity Valuation",
  "Financial Modelling",
  "Ind AS & US GAAP",
];

export const techCards = [
  {
    title: "M&A & Research",
    skills: [
      "Deal Tracking & Intelligence",
      "M&A Database Maintenance",
      "Deal Alert Preparation",
      "Industry Overviews",
      "Benchmarking & Screening",
      "Pitchbook Components",
    ],
  },
  {
    title: "Financial Analysis",
    skills: [
      "DCF Valuation",
      "Three-Statement Modelling",
      "Comparable Company Analysis",
      "Variance Analysis",
      "Financial Statement Analysis (Ind AS & US GAAP)",
    ],
  },
  {
    title: "Tools",
    skills: [
      "Advanced Excel",
      "PowerPoint",
      "Python",
      "Tally ERP",
      "Power BI (Basic)",
      "SQL (Basic)",
    ],
  },
  {
    title: "Data & Platforms",
    skills: [
      "FactSet / Dealogic Methodology",
      "BSE/NSE Disclosures",
      "Reuters",
      "Grant Thornton Dealtracker",
      "Public Filings",
    ],
  },
];

export type IconKey =
  | "python"
  | "sql"
  | "excel"
  | "powerpoint"
  | "powerbi"
  | "tally"
  | "valuation"
  | "modeling"
  | "banking"
  | "reports"
  | "analytics"
  | "rupee";

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  mode: string;
  icon: "code" | "briefcase" | "monitor" | "pen";
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Finance Intern",
    org: "SPAN.IO Technology India Pvt. Ltd.",
    period: "Mar 2026 - Present",
    mode: "Bengaluru (Onsite)",
    icon: "briefcase",
    points: [
      "Prepared monthly MIS financial packs — P&L, balance sheet, cash flows, and Budget vs. Actuals variance analysis — supporting senior management financial review.",
      "Drove year-end financial statement preparation for statutory audit in both Ind AS and US GAAP formats, including INR-to-USD currency translation adjustments.",
      "Built a Python-automated GST ITC reconciliation workflow from scratch, eliminating manual processing errors and significantly reducing month-end turnaround time.",
      "Coordinated with external auditors on documentation, financial data validation, and schedule preparation across multiple workstreams under strict deadlines.",
      "Prepared financial schedules and cross-functional reporting packs, communicating complex financial data clearly to senior finance stakeholders.",
    ],
  },
  {
    role: "Summer Intern",
    org: "A P Kunjithaya & Co., Chartered Accountants",
    period: "May 2025 - Jul 2025",
    mode: "Bengaluru",
    icon: "monitor",
    points: [
      "Reconciled client financial accounts and verified supporting documentation for statutory audit compliance.",
      "Conducted GST filing verification and financial statement checks, ensuring regulatory and reporting accuracy.",
      "Streamlined Excel-based documentation templates, reducing manual reconciliation effort for recurring audit procedures.",
      "Supported audit testing procedures including control checks and financial data validation across client accounts.",
    ],
  },
  {
    role: "Accounts Intern",
    org: "Coastal Sales & Service",
    period: "May 2024",
    mode: "Bengaluru",
    icon: "pen",
    points: [
      "Managed AR/AP cycles, processing 100+ financial transactions weekly in Tally ERP.",
      "Performed monthly ledger reconciliations between balances and source documents, identifying and resolving discrepancies.",
      "Prepared monthly financial performance reports with variance commentary to support management decisions on cash flow and operations.",
    ],
  },
];

export type EducationItem = {
  degree: string;
  org: string;
  period: string;
  mode: string;
  icon: "grad" | "book";
  points: string[];
};

export const education: EducationItem[] = [
  {
    degree: "B.Com (Finance)",
    org: "St. Joseph's College of Commerce (Autonomous), Bengaluru",
    period: "Graduated Jun 2025",
    mode: "CGPA: 7.09",
    icon: "grad",
    points: [
      "Specialized in finance with coursework spanning financial accounting, corporate finance, and taxation.",
    ],
  },
  {
    degree: "CFA Level I",
    org: "CFA Institute",
    period: "Appearing November 2026",
    mode: "Registered Candidate",
    icon: "book",
    points: [
      "Curriculum: Financial Reporting & Analysis, Equity Investments, Fixed Income, Corporate Finance, and Portfolio Management.",
    ],
  },
];

export const projectFilters = [
  "Featured",
  "M&A Research",
  "Valuation",
  "All",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export type Project = {
  title: string;
  description: string;
  impact: string;
  image?: string;
  categories: ProjectFilter[];
  github?: string;
  external?: string;
  techIcons: IconKey[];
  badges?: string[];
  extraBadge?: number;
};

export const projects: Project[] = [
  {
    title: "India M&A Deal Intelligence Tracker",
    description:
      "A structured M&A deal database tracking 10+ major Indian transactions from 2025 — covering acquirer, target, sector, deal value, deal type, stake percentage, cross-border classification, and strategic rationale.",
    impact:
      "Surfaced key trends — Japan Inc.'s dual banking bets, PSU-led renewable consolidation, and PLI-driven manufacturing inflows — in a sell-side deal-alert format.",
    categories: ["Featured", "M&A Research"],
    techIcons: ["banking", "excel", "reports"],
    badges: ["Independent Research", "Ongoing"],
  },
  {
    title: "Equity Valuation — Tata Motors Ltd.",
    description:
      "An integrated three-statement model projecting revenue, margins, and free cash flows, paired with a DCF valuation (WACC estimation + sensitivity analysis) and comparable company analysis.",
    impact:
      "Benchmarked Tata Motors against peers using P/E and EV/EBITDA multiples, structured to sell-side equity research standards.",
    categories: ["Featured", "Valuation"],
    techIcons: ["valuation", "modeling", "excel"],
    badges: ["Independent Research", "Ongoing"],
  },
];

export const achievements = [
  {
    label: "📈 CFA Level I Candidate",
    detail: "Appearing November 2026 — CFA Institute, Registered Candidate",
  },
  {
    label: "🏦 Investment Banking Experience Program",
    detail: "Completed virtual experience program covering M&A advisory workflows",
  },
  {
    label: "💼 Wealth Management Experience Program",
    detail: "Completed virtual experience program covering wealth advisory fundamentals",
  },
  {
    label: "📊 Microsoft Office Specialist (Excel)",
    detail: "Certified in advanced Excel for financial modelling and analysis",
  },
];

export const sectionNav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
];
