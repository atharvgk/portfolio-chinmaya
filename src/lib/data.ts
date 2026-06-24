export const profile = {
  name: "Deepanshu Mani",
  title: "Full Stack Developer",
  location: "Uttar Pradesh, India",
  flag: "🇮🇳",
  available: "Available for hire",
  tagline:
    "I build AI-powered web and mobile products that improve user experience, automate workflows, and ship fast with production-grade backend systems.",
  email: "xtmani2004@gmail.com",
  resume: "/Resume.pdf",
  calLink: "xtmani/30min",
  socials: {
    github: "https://github.com/Deepanshu-mani",
    linkedin: "https://www.linkedin.com/in/deepanshu-mani",
    twitter: "https://x.com/manixcodes",
  },
};

export const aboutTags = [
  "Full Stack Development",
  "Real-time Applications",
  "AI Integration",
  "Cloud Architecture",
];

export const techCards = [
  {
    title: "Frontend Development",
    items:
      "React.js, Next.js, TypeScript, React Native, JavaScript, HTML5, CSS3, Tailwind CSS, Material UI, Redux, Responsive Design",
  },
  {
    title: "Backend & APIs",
    items:
      "Node.js, Express.js, Python, Flask, FastAPI, REST APIs, GraphQL, MongoDB, PostgreSQL, MySQL, Redis, Firebase",
  },
  {
    title: "AI & Machine Learning",
    items:
      "Azure OpenAI, LangChain, Hugging Face, Ollama, CrewAI, LLMs, NLP, Computer Vision, Vector Databases (ChromaDB)",
  },
  {
    title: "DevOps & Cloud",
    items:
      "AWS (EBS, S3, RDS), Docker, GitHub Actions, CI/CD, Git, Vercel, Netlify, Selenium, Testing (Jest, PyTest)",
  },
];

export type IconKey =
  | "mysql"
  | "postgresql"
  | "openai"
  | "gemini"
  | "git"
  | "github"
  | "javascript"
  | "react"
  | "nextjs"
  | "nodejs"
  | "typescript"
  | "tailwind"
  | "express"
  | "mongodb"
  | "prisma"
  | "vercel"
  | "docker"
  | "redux"
  | "claude";

export const marqueeIcons: IconKey[] = [
  "mysql",
  "postgresql",
  "openai",
  "gemini",
  "git",
  "github",
  "javascript",
  "react",
  "nextjs",
  "nodejs",
  "typescript",
  "tailwind",
  "express",
  "mongodb",
  "prisma",
  "claude",
  "vercel",
  "docker",
  "redux",
];

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
    role: "Full Stack Engineer",
    org: "Alerix",
    period: "Dec 2025 - Present",
    mode: "Remote",
    icon: "code",
    points: [
      "Building AI-powered applications using LLM APIs, automation workflows, and real-time systems.",
      "Designed backend services for AI agents, prompt pipelines, and structured data processing.",
      "Optimized API orchestration to improve latency and system responsiveness.",
    ],
  },
  {
    role: "Freelance Full Stack Developer",
    org: "Independent / Client Work",
    period: "2025 - Present",
    mode: "Remote",
    icon: "briefcase",
    points: [
      "Delivered end-to-end production applications across iOS, Android, and Web.",
      "Built and deployed full-stack apps using React, Next.js, Expo, Node.js, and PostgreSQL.",
      "Managed full lifecycle: development, CI/CD, cloud deployment, and app store releases.",
      "Improved performance by 40% via optimization like lazy loading and code splitting.",
    ],
  },
  {
    role: "Full Stack Developer",
    org: "Sai Computer Limited",
    period: "Sep 2025 - Nov 2025",
    mode: "Onsite",
    icon: "monitor",
    points: [
      "Built backend APIs and real-time data pipelines using Node.js, Kafka, and WebSockets.",
      "Developed React dashboards for monitoring system metrics and data flows.",
      "Contributed across frontend and backend to improve system performance and usability.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    org: "QVIQ.io",
    period: "Dec 2024 - Feb 2025",
    mode: "Remote",
    icon: "pen",
    points: [
      "Built reusable React components with Tailwind CSS to accelerate development cycles.",
      "Reduced JS bundle size by 35% via code refactoring and dynamic imports.",
      "Integrated REST APIs and collaborated closely with backend for smooth data flows.",
      "Enhanced UI performance and fixed bugs, improving user retention by 15%.",
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
    degree: "Bachelor of Technology (B.Tech)",
    org: "Meerut Institute of Engineering and Technology (MIET)",
    period: "2021 - 2025",
    mode: "Meerut, India",
    icon: "grad",
    points: [
      "Focused on software engineering, data structures, algorithms, and web technologies.",
      "Active member and mentor at the college coding club.",
    ],
  },
];

export const projectFilters = [
  "Featured",
  "AI & Automation",
  "Full-Stack",
  "Frontend",
  "All",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export type Project = {
  title: string;
  description: string;
  impact: string;
  image: string;
  categories: ProjectFilter[];
  github?: string;
  external?: string;
  techIcons: IconKey[];
  badges?: string[];
  extraBadge?: number;
};

export const projects: Project[] = [
  {
    title: "ZedTrack -- CRM & Task Automation Platform",
    description:
      "Full-stack CRM for operations with automation workflows, WhatsApp/SMS notifications, and real-time updates.",
    impact:
      "Improved operations workflow speed with real-time task and notification automation.",
    image: "/zedtrack.png",
    categories: ["Featured", "AI & Automation", "Full-Stack"],
    techIcons: ["react", "nextjs", "nodejs", "postgresql", "prisma", "git"],
  },
  {
    title: "Ask Rezzy -- AI Assistant",
    description:
      "RAG-based AI assistant with semantic retrieval, prompt pipelines, and streaming responses.",
    impact:
      "Delivered contextual responses via RAG pipelines and real-time streaming UX.",
    image: "/ask-rezzy.webp",
    categories: ["Featured", "AI & Automation"],
    github: "https://github.com/Deepanshu-mani/ask-rezzy",
    external: "https://bit.ly/3KBFINh",
    techIcons: ["nextjs", "nodejs", "typescript"],
    badges: ["LLM", "RAG"],
  },
  {
    title: "Real-Time Collaborative Drawing App",
    description:
      "Multi-user drawing platform using WebSockets and event-driven architecture.",
    impact:
      "Enabled low-latency multi-user drawing with room-based WebSocket synchronization.",
    image: "/excalidraw.webp",
    categories: ["Featured", "Full-Stack"],
    github: "https://github.com/Deepanshu-mani/excalidraw",
    external: "https://bit.ly/46MhIi3",
    techIcons: ["nextjs", "nodejs", "typescript", "postgresql", "prisma", "git"],
  },
  {
    title: "Brainly",
    description:
      "Smart bookmark dashboard to categorize YouTube and Twitter content with secure auth and AI summaries.",
    impact:
      "Improved content discoverability using AI summaries and structured bookmark categorization.",
    image: "/brainly.webp",
    categories: ["Featured", "Full-Stack", "Frontend"],
    github: "https://github.com/Deepanshu-mani/Brainly",
    external: "https://brainly-9lwi.vercel.app/",
    techIcons: ["react", "typescript", "tailwind", "nodejs", "express", "mongodb"],
    badges: ["Jina AI"],
    extraBadge: 1,
  },
];

export const achievements = [
  {
    label: "🏆 Winner: Trikon 1.0 Hackathon (MIET, 2024)",
    detail:
      "Led a team to victory in the college hackathon, demonstrating technical excellence and innovation",
  },
  {
    label: "🥈 Runner-Up: AWS Generative AI Ideathon (MIET, 2024)",
    detail:
      "Secured second place in AWS-sponsored AI competition, showcasing expertise in generative AI technologies",
  },
  {
    label: "📜 MERN Stack Development Certificate (Pregrad, 2024)",
    detail:
      "Completed comprehensive certification demonstrating proficiency in MongoDB, Express.js, React, and Node.js",
  },
  {
    label: "👥 Coding Club Mentor",
    detail:
      "Actively contributed to the college's coding club, mentoring juniors in web development and project-based learning",
  },
];

export const sectionNav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
];
