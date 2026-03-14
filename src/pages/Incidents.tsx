import { useState, useMemo } from "react";
import { incidents, Severity, IncidentStatus } from "@/data/mock-data";
import { SeverityBadge } from "@/components/SeverityBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { IncidentDrawer } from "@/components/IncidentDrawer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Incidents() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIncident, setSelectedIncident] = useState<typeof incidents[0] | null>(null);

  const filtered = useMemo(() => {
    return incidents.filter((inc) => {
      const matchSearch =
        !search ||
        inc.title.toLowerCase().includes(search.toLowerCase()) ||
        inc.sourceSystem.toLowerCase().includes(search.toLowerCase()) ||
        inc.processName.toLowerCase().includes(search.toLowerCase());
      const matchSeverity = severityFilter === "all" || inc.severity === severityFilter;
      const matchStatus = statusFilter === "all" || inc.status === statusFilter;
      return matchSearch && matchSeverity && matchStatus;
    });
  }, [search, severityFilter, statusFilter]);

  return (
    <div className="space-y-5 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Incidentes</h1>
        <p className="text-sm text-muted-foreground mt-1">Fila operacional de incidentes</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, sistema ou processo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Severidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="critical">Crítico</SelectItem>
            <SelectItem value="high">Alto</SelectItem>
            <SelectItem value="medium">Médio</SelectItem>
            <SelectItem value="low">Baixo</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="open">Aberto</SelectItem>
            <SelectItem value="investigating">Investigando</SelectItem>
            <SelectItem value="resolved">Resolvido</SelectItem>
            <SelectItem value="ignored">Ignorado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Severidade</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Título</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Sistema</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Processo</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Ocorrências</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Última</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className="border-b border-border/30 hover:bg-muted/40 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <SeverityBadge severity={inc.severity} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{inc.title}</div>
                    <div className="text-xs text-muted-foreground md:hidden">{inc.sourceSystem}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{inc.sourceSystem}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{inc.processName}</td>
                  <td className="px-4 py-3 text-right font-semibold hidden sm:table-cell">{inc.occurrences}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">
                    {new Date(inc.lastSeen).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={inc.status} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground">
                    Nenhum incidente encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <IncidentDrawer
        incident={selectedIncident}
        open={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
}
