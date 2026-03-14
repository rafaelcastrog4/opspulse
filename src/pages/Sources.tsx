import { sources } from "@/data/mock-data";
import { Radio, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Sources() {
  return (
    <div className="space-y-5 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Fontes</h1>
        <p className="text-sm text-muted-foreground mt-1">Sistemas que enviam eventos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((src, i) => (
          <motion.div
            key={src.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{src.name}</div>
                  <div className="flex items-center gap-1 text-xs">
                    {src.status === "active" ? (
                      <><CheckCircle2 className="w-3 h-3 text-green-500" /><span className="text-green-600">Ativo</span></>
                    ) : (
                      <><XCircle className="w-3 h-3 text-muted-foreground" /><span className="text-muted-foreground">Inativo</span></>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-muted/50">
                <div className="text-lg font-bold font-serif">{src.eventsReceived}</div>
                <div className="text-[10px] text-muted-foreground uppercase">Eventos</div>
              </div>
              <div className="p-2 rounded-lg bg-muted/50">
                <div className="text-lg font-bold font-serif">{src.parsingErrors}</div>
                <div className="text-[10px] text-muted-foreground uppercase">Erros</div>
              </div>
              <div className="p-2 rounded-lg bg-muted/50">
                <div className="text-[11px] font-medium">
                  {new Date(src.lastActivity).toLocaleString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase">Último</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
