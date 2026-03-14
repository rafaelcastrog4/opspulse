import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  variant?: "default" | "critical" | "warning" | "success";
}

const variantStyles = {
  default: "border-border/50",
  critical: "border-severity-critical/30 bg-red-50/50",
  warning: "border-severity-high/30 bg-orange-50/50",
  success: "border-severity-low/30 bg-green-50/50",
};

const iconVariantStyles = {
  default: "bg-primary/10 text-primary",
  critical: "bg-red-500/15 text-red-600",
  warning: "bg-orange-500/15 text-orange-600",
  success: "bg-green-500/15 text-green-600",
};

export function KpiCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`kpi-card ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconVariantStyles[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend.value > 0 ? "bg-red-500/10 text-red-600" : "bg-green-500/10 text-green-600"}`}>
            {trend.value > 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
          </span>
        )}
      </div>
      <div className="font-serif text-3xl font-bold text-foreground tracking-tight">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{title}</div>
      {subtitle && <div className="text-xs text-muted-foreground/70 mt-0.5">{subtitle}</div>}
    </motion.div>
  );
}
