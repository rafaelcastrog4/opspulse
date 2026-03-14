import { Incident } from "@/data/mock-data";
import { SeverityBadge } from "@/components/SeverityBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Clock, Server, Layers, Hash, Users, FileText } from "lucide-react";

interface IncidentDrawerProps {
  incident: Incident | null;
  open: boolean;
  onClose: () => void;
}

function DetailRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

export function IncidentDrawer({ incident, open, onClose }: IncidentDrawerProps) {
  if (!incident) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <SeverityBadge severity={incident.severity} />
            <StatusBadge status={incident.status} />
          </div>
          <SheetTitle className="font-serif text-lg leading-snug">{incident.title}</SheetTitle>
          <p className="text-sm text-muted-foreground mt-1">{incident.id}</p>
        </SheetHeader>

        <Separator />

        <div className="py-4">
          <p className="text-sm text-foreground leading-relaxed">{incident.description}</p>
        </div>

        <Separator />

        <div className="py-4 space-y-1">
          <DetailRow icon={Server} label="Sistema / Módulo" value={`${incident.sourceSystem} → ${incident.sourceModule}`} />
          <DetailRow icon={Layers} label="Processo" value={incident.processName} />
          <DetailRow icon={Hash} label="Entidade" value={`${incident.entityType} (${incident.entityId})`} />
          <DetailRow icon={Users} label="Equipe Responsável" value={incident.responsibleTeam} />
          <DetailRow icon={Clock} label="Primeira Ocorrência" value={new Date(incident.firstSeen).toLocaleString("pt-BR")} />
          <DetailRow icon={Clock} label="Última Ocorrência" value={new Date(incident.lastSeen).toLocaleString("pt-BR")} />
          <DetailRow icon={FileText} label="Total de Ocorrências" value={String(incident.occurrences)} />
        </div>

        {incident.notes.length > 0 && (
          <>
            <Separator />
            <div className="py-4">
              <h4 className="text-sm font-semibold mb-3">Notas</h4>
              <div className="space-y-2">
                {incident.notes.map((note, i) => (
                  <div key={i} className="text-sm p-3 rounded-lg bg-muted/50 text-foreground">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
