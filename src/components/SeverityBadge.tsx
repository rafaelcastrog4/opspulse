import { Severity } from "@/data/mock-data";

const styles: Record<Severity, string> = {
  critical: "severity-badge-critical",
  high: "severity-badge-high",
  medium: "severity-badge-medium",
  low: "severity-badge-low",
};

const labels: Record<Severity, string> = {
  critical: "Crítico",
  high: "Alto",
  medium: "Médio",
  low: "Baixo",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[severity]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${severity === "critical" ? "bg-red-500 animate-pulse-glow" : severity === "high" ? "bg-orange-500" : severity === "medium" ? "bg-yellow-500" : "bg-green-500"}`} />
      {labels[severity]}
    </span>
  );
}
