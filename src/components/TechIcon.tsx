import {
  SiMysql,
  SiPostgresql,
  SiOpenai,
  SiGooglegemini,
  SiGit,
  SiGithub,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPrisma,
  SiVercel,
  SiDocker,
  SiRedux,
  SiClaude,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { IconKey } from "@/lib/data";

const map: Record<IconKey, { Icon: IconType; label: string }> = {
  mysql: { Icon: SiMysql, label: "MySQL" },
  postgresql: { Icon: SiPostgresql, label: "PostgreSQL" },
  openai: { Icon: SiOpenai, label: "OpenAI" },
  gemini: { Icon: SiGooglegemini, label: "Gemini" },
  git: { Icon: SiGit, label: "Git" },
  github: { Icon: SiGithub, label: "GitHub" },
  javascript: { Icon: SiJavascript, label: "JavaScript" },
  react: { Icon: SiReact, label: "React" },
  nextjs: { Icon: SiNextdotjs, label: "Next.js" },
  nodejs: { Icon: SiNodedotjs, label: "Node.js" },
  typescript: { Icon: SiTypescript, label: "TypeScript" },
  tailwind: { Icon: SiTailwindcss, label: "Tailwind CSS" },
  express: { Icon: SiExpress, label: "Express.js" },
  mongodb: { Icon: SiMongodb, label: "MongoDB" },
  prisma: { Icon: SiPrisma, label: "Prisma" },
  vercel: { Icon: SiVercel, label: "Vercel" },
  docker: { Icon: SiDocker, label: "Docker" },
  redux: { Icon: SiRedux, label: "Redux" },
  claude: { Icon: SiClaude, label: "Claude" },
};

export function TechIcon({
  name,
  className,
}: {
  name: IconKey;
  className?: string;
}) {
  const entry = map[name];
  if (!entry) return null;
  const { Icon, label } = entry;
  return <Icon className={className} aria-label={label} title={label} />;
}

export default TechIcon;
