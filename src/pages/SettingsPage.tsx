import { motion } from "framer-motion";
import { Settings, Shield, Layers, Tag } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-1">Gerencie regras e categorizações</p>
      </div>

      <div className="space-y-4">
        {[
          { icon: Shield, title: "Níveis de Severidade", desc: "Defina e personalize os níveis de severidade dos incidentes" },
          { icon: Tag, title: "Categorização de Erros", desc: "Configure tipos de erro e suas classificações" },
          { icon: Layers, title: "Regras de Agrupamento", desc: "Defina critérios para agrupamento automático de eventos em incidentes" },
          { icon: Settings, title: "Webhooks", desc: "Gerencie endpoints e tokens de autenticação" },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-5 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">{item.title}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-5 border-brand-gold/20">
        <p className="text-sm text-muted-foreground">
          As configurações estarão disponíveis após a ativação do backend. Ative o Lovable Cloud para persistir dados e configurações.
        </p>
      </div>
    </div>
  );
}
