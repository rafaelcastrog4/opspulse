import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trendData, incidents, systemRanking, processRanking } from "@/data/mock-data";
import { SeverityBadge } from "@/components/SeverityBadge";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { motion } from "framer-motion";

const recurrenceData = [...incidents]
  .sort((a, b) => b.occurrences - a.occurrences)
  .slice(0, 6);

const dataQuality = [
  { field: "phone", issues: 234, percentage: 34 },
  { field: "email", issues: 89, percentage: 13 },
  { field: "company_size", issues: 67, percentage: 10 },
  { field: "owner", issues: 47, percentage: 7 },
  { field: "industry", issues: 23, percentage: 3 },
];

const barColors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"];

export default function Analytics() {
  return (
    <div className="space-y-5 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Análises</h1>
        <p className="text-sm text-muted-foreground mt-1">Insights operacionais detalhados</p>
      </div>

      <Tabs defaultValue="trend" className="w-full">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="trend">Tendência</TabsTrigger>
          <TabsTrigger value="recurrence">Recorrência</TabsTrigger>
          <TabsTrigger value="quality">Qualidade de Dados</TabsTrigger>
          <TabsTrigger value="processes">Processos</TabsTrigger>
        </TabsList>

        <TabsContent value="trend">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6 mt-4">
            <h3 className="text-sm font-semibold mb-4">Evolução de Incidentes por Severidade</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gH" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gM" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 15% 88%)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="critical" stroke="#ef4444" fill="url(#gC)" strokeWidth={2} />
                <Area type="monotone" dataKey="high" stroke="#f97316" fill="url(#gH)" strokeWidth={2} />
                <Area type="monotone" dataKey="medium" stroke="#eab308" fill="url(#gM)" strokeWidth={1.5} />
                <Area type="monotone" dataKey="low" stroke="#22c55e" fill="url(#gL)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </TabsContent>

        <TabsContent value="recurrence">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6 mt-4">
            <h3 className="text-sm font-semibold mb-4">Erros Mais Recorrentes</h3>
            <div className="space-y-4">
              {recurrenceData.map((inc) => (
                <div key={inc.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                  <SeverityBadge severity={inc.severity} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{inc.title}</div>
                    <div className="text-xs text-muted-foreground">{inc.sourceSystem} → {inc.processName}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold font-serif">{inc.occurrences}</div>
                    <div className="text-xs text-muted-foreground">ocorrências</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="quality">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6 mt-4">
            <h3 className="text-sm font-semibold mb-4">Campos Mais Problemáticos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataQuality} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 15% 88%)" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="field" type="category" tick={{ fontSize: 12 }} width={100} />
                <Tooltip />
                <Bar dataKey="issues" radius={[0, 6, 6, 0]} barSize={24}>
                  {dataQuality.map((_, i) => (
                    <Cell key={i} fill={barColors[i % barColors.length]} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </TabsContent>

        <TabsContent value="processes">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-6 mt-4">
            <h3 className="text-sm font-semibold mb-4">Processos com Mais Falhas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {processRanking.map((proc, i) => (
                <div key={proc.name} className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{proc.name}</div>
                    <div className="text-xs text-muted-foreground">{proc.errors} erros registrados</div>
                  </div>
                  <SeverityBadge severity={proc.severity} />
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
