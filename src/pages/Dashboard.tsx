import { AlertTriangle, AlertOctagon, Clock, TrendingUp } from "lucide-react";
import { KpiCard } from "@/components/KpiCard";
import { SeverityBadge } from "@/components/SeverityBadge";
import { incidents, trendData, systemRanking, processRanking } from "@/data/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const openIncidents = incidents.filter((i) => i.status !== "resolved" && i.status !== "ignored");
const criticalCount = openIncidents.filter((i) => i.severity === "critical").length;
const last24h = incidents.filter((i) => {
  const d = new Date(i.lastSeen);
  return Date.now() - d.getTime() < 86400000;
}).length;
const totalOccurrences = openIncidents.reduce((sum, i) => sum + i.occurrences, 0);

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral da saúde operacional</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Incidentes Abertos"
          value={openIncidents.length}
          icon={AlertTriangle}
          trend={{ value: 12, label: "vs ontem" }}
        />
        <KpiCard
          title="Incidentes Críticos"
          value={criticalCount}
          icon={AlertOctagon}
          variant="critical"
          trend={{ value: 50, label: "vs ontem" }}
        />
        <KpiCard
          title="Erros nas últimas 24h"
          value={last24h}
          icon={Clock}
          variant="warning"
        />
        <KpiCard
          title="Total de Ocorrências"
          value={totalOccurrences}
          subtitle="em incidentes abertos"
          icon={TrendingUp}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-card rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Tendência de Incidentes (7 dias)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="gradCritical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradMedium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 15% 88%)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(210 10% 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(210 10% 45%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 100% / 0.95)",
                  border: "1px solid hsl(210 15% 88%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="critical" stroke="#ef4444" fill="url(#gradCritical)" strokeWidth={2} />
              <Area type="monotone" dataKey="high" stroke="#f97316" fill="url(#gradHigh)" strokeWidth={2} />
              <Area type="monotone" dataKey="medium" stroke="#eab308" fill="url(#gradMedium)" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* System Ranking */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Ranking de Sistemas</h3>
          <div className="space-y-3">
            {systemRanking.map((sys, i) => (
              <div key={sys.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{sys.name}</span>
                    <span className="text-xs text-muted-foreground">{sys.errors}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-gold rounded-full transition-all duration-700"
                      style={{ width: `${sys.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Process Ranking */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Processos com Mais Falhas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {processRanking.map((proc) => (
            <div key={proc.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="flex-1">
                <div className="text-sm font-medium">{proc.name}</div>
                <div className="text-xs text-muted-foreground">{proc.errors} erros</div>
              </div>
              <SeverityBadge severity={proc.severity} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
