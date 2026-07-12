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

export interface Profile {
  name: string;
  title: string;
  location: string;
  flag: string;
  available: string;
  tagline: string;
  aboutParagraphs?: string[];
  email: string;
  resume: string;
  socials: {
    linkedin: string;
  };
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  mode: string;
  icon: "code" | "briefcase" | "monitor" | "pen";
  points: string[];
}

export interface EducationItem {
  degree: string;
  org: string;
  period: string;
  mode: string;
  icon: "grad" | "book";
  points: string[];
}

export interface Project {
  title: string;
  description: string;
  impact: string;
  image?: string;
  categories: string[];
  github?: string;
  external?: string;
  techIcons: IconKey[];
  badges?: string[];
  extraBadge?: number;
}

export interface AchievementItem {
  label: string;
  detail: string;
}

export interface TechCardItem {
  title: string;
  skills: string[];
}

export interface PortfolioContent {
  profile: Profile;
  aboutTags: string[];
  techCards: TechCardItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
  achievements: AchievementItem[];
}
