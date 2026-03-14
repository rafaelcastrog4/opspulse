import { IncidentStatus } from "@/data/mock-data";

const styles: Record<IncidentStatus, string> = {
  open: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  investigating: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  resolved: "bg-green-500/10 text-green-600 border-green-500/20",
  ignored: "bg-muted text-muted-foreground border-border",
};

const labels: Record<IncidentStatus, string> = {
  open: "Aberto",
  investigating: "Investigando",
  resolved: "Resolvido",
  ignored: "Ignorado",
};

export function StatusBadge({ status }: { status: IncidentStatus }) {
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
