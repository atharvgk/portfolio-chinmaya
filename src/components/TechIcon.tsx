import { SiPython } from "react-icons/si";
import {
  BarChart3,
  Calculator,
  Database,
  FileSpreadsheet,
  FileText,
  IndianRupee,
  Landmark,
  LineChart,
  PieChart,
  Presentation,
  TrendingUp,
} from "lucide-react";
import type { IconKey } from "@/lib/data";

type IconComponent = React.ComponentType<{
  className?: string;
  "aria-label"?: string;
}>;

const map: Record<IconKey, { Icon: IconComponent; label: string }> = {
  python: { Icon: SiPython, label: "Python" },
  sql: { Icon: Database, label: "SQL" },
  excel: { Icon: FileSpreadsheet, label: "Advanced Excel" },
  powerpoint: { Icon: Presentation, label: "PowerPoint" },
  powerbi: { Icon: BarChart3, label: "Power BI" },
  tally: { Icon: Calculator, label: "Tally ERP" },
  valuation: { Icon: TrendingUp, label: "Valuation" },
  modeling: { Icon: LineChart, label: "Financial Modelling" },
  banking: { Icon: Landmark, label: "Investment Banking" },
  reports: { Icon: FileText, label: "Financial Reporting" },
  analytics: { Icon: PieChart, label: "Analytics" },
  rupee: { Icon: IndianRupee, label: "Finance" },
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
  return <Icon className={className} aria-label={label} />;
}

export default TechIcon;
