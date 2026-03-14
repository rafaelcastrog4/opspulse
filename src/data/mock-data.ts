export type Severity = "critical" | "high" | "medium" | "low";
export type IncidentStatus = "open" | "investigating" | "resolved" | "ignored";

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: IncidentStatus;
  sourceSystem: string;
  sourceModule: string;
  processName: string;
  errorType: string;
  entityType: string;
  entityId: string;
  occurrences: number;
  firstSeen: string;
  lastSeen: string;
  responsibleTeam: string;
  description: string;
  notes: string[];
}

export const incidents: Incident[] = [
  {
    id: "INC-001",
    title: "Deal sem owner atribuído",
    severity: "critical",
    status: "open",
    sourceSystem: "HubSpot",
    sourceModule: "Workflows",
    processName: "Deal Creation",
    errorType: "missing_field",
    entityType: "Deal",
    entityId: "deal-4521",
    occurrences: 47,
    firstSeen: "2026-03-08T14:30:00Z",
    lastSeen: "2026-03-10T09:15:00Z",
    responsibleTeam: "Sales Ops",
    description: "Deals estão sendo criados sem owner atribuído, causando falha no roteamento automático e na distribuição de leads.",
    notes: ["Verificar workflow de atribuição automática", "Possível causa: campo company_size vazio"],
  },
  {
    id: "INC-002",
    title: "Falha na sincronização Notion → HubSpot",
    severity: "critical",
    status: "investigating",
    sourceSystem: "Notion",
    sourceModule: "API Integration",
    processName: "Pipeline Sync",
    errorType: "integration_error",
    entityType: "Pipeline",
    entityId: "pipe-12",
    occurrences: 23,
    firstSeen: "2026-03-09T08:00:00Z",
    lastSeen: "2026-03-10T10:30:00Z",
    responsibleTeam: "Engineering",
    description: "A sincronização bidirecional entre Notion e HubSpot está falhando intermitentemente com erro de timeout.",
    notes: ["Rate limit do Notion pode ser a causa"],
  },
  {
    id: "INC-003",
    title: "Erro de validação em formulário de contato",
    severity: "high",
    status: "open",
    sourceSystem: "Webapp",
    sourceModule: "Form Validation",
    processName: "Lead Capture",
    errorType: "validation_error",
    entityType: "Contact",
    entityId: "contact-891",
    occurrences: 15,
    firstSeen: "2026-03-09T16:00:00Z",
    lastSeen: "2026-03-10T08:45:00Z",
    responsibleTeam: "Sales Ops",
    description: "Formulários de contato estão rejeitando emails corporativos válidos por regex incorreto.",
    notes: [],
  },
  {
    id: "INC-004",
    title: "Duplicação de registros no Google Sheets",
    severity: "high",
    status: "open",
    sourceSystem: "Google Sheets",
    sourceModule: "Apps Script",
    processName: "Report Generation",
    errorType: "duplicate_entry",
    entityType: "Report",
    entityId: "report-45",
    occurrences: 8,
    firstSeen: "2026-03-10T06:00:00Z",
    lastSeen: "2026-03-10T09:00:00Z",
    responsibleTeam: "Sales Ops",
    description: "Script de consolidação de relatórios está duplicando linhas quando executado em paralelo.",
    notes: ["Adicionar lock no script"],
  },
  {
    id: "INC-005",
    title: "Webhook HubSpot retornando 429",
    severity: "medium",
    status: "investigating",
    sourceSystem: "HubSpot",
    sourceModule: "Webhooks",
    processName: "Event Tracking",
    errorType: "rate_limit",
    entityType: "Webhook",
    entityId: "wh-78",
    occurrences: 120,
    firstSeen: "2026-03-07T10:00:00Z",
    lastSeen: "2026-03-10T10:00:00Z",
    responsibleTeam: "Engineering",
    description: "Webhook de tracking de eventos está sendo throttled pelo HubSpot.",
    notes: ["Implementar exponential backoff"],
  },
  {
    id: "INC-006",
    title: "Campo telefone com formato inválido",
    severity: "medium",
    status: "open",
    sourceSystem: "HubSpot",
    sourceModule: "Properties",
    processName: "Data Enrichment",
    errorType: "data_quality",
    entityType: "Contact",
    entityId: "multiple",
    occurrences: 234,
    firstSeen: "2026-03-01T00:00:00Z",
    lastSeen: "2026-03-10T10:00:00Z",
    responsibleTeam: "Sales Ops",
    description: "34% dos contatos têm telefone em formato não padronizado, impedindo integração com discador.",
    notes: [],
  },
  {
    id: "INC-007",
    title: "Automação de follow-up não disparando",
    severity: "low",
    status: "resolved",
    sourceSystem: "HubSpot",
    sourceModule: "Sequences",
    processName: "Follow-up Automation",
    errorType: "automation_failure",
    entityType: "Sequence",
    entityId: "seq-15",
    occurrences: 3,
    firstSeen: "2026-03-08T14:00:00Z",
    lastSeen: "2026-03-09T10:00:00Z",
    responsibleTeam: "Sales Ops",
    description: "Sequência de follow-up estava com condição de enrollment incorreta.",
    notes: ["Corrigido: filtro de enrollment atualizado"],
  },
  {
    id: "INC-008",
    title: "Erro de permissão no Notion API",
    severity: "low",
    status: "open",
    sourceSystem: "Notion",
    sourceModule: "API",
    processName: "Knowledge Base Sync",
    errorType: "permission_error",
    entityType: "Page",
    entityId: "page-abc",
    occurrences: 5,
    firstSeen: "2026-03-09T20:00:00Z",
    lastSeen: "2026-03-10T07:00:00Z",
    responsibleTeam: "Engineering",
    description: "Token de integração do Notion perdeu acesso a algumas páginas após reestruturação do workspace.",
    notes: [],
  },
];

export const trendData = [
  { date: "04 Mar", critical: 2, high: 5, medium: 8, low: 3 },
  { date: "05 Mar", critical: 3, high: 4, medium: 10, low: 4 },
  { date: "06 Mar", critical: 1, high: 6, medium: 7, low: 2 },
  { date: "07 Mar", critical: 4, high: 3, medium: 9, low: 5 },
  { date: "08 Mar", critical: 2, high: 7, medium: 6, low: 3 },
  { date: "09 Mar", critical: 5, high: 4, medium: 11, low: 4 },
  { date: "10 Mar", critical: 3, high: 5, medium: 8, low: 2 },
];

export const systemRanking = [
  { name: "HubSpot", errors: 412, percentage: 45 },
  { name: "Notion", errors: 198, percentage: 22 },
  { name: "Google Sheets", errors: 145, percentage: 16 },
  { name: "Webapp", errors: 98, percentage: 11 },
  { name: "Apps Script", errors: 55, percentage: 6 },
];

export const processRanking = [
  { name: "Deal Creation", errors: 189, severity: "critical" as Severity },
  { name: "Pipeline Sync", errors: 145, severity: "critical" as Severity },
  { name: "Data Enrichment", errors: 234, severity: "medium" as Severity },
  { name: "Lead Capture", errors: 98, severity: "high" as Severity },
  { name: "Report Generation", errors: 67, severity: "high" as Severity },
];

export const sources = [
  { name: "HubSpot", lastActivity: "2026-03-10T10:30:00Z", eventsReceived: 1245, parsingErrors: 12, status: "active" as const },
  { name: "Notion", lastActivity: "2026-03-10T10:15:00Z", eventsReceived: 567, parsingErrors: 3, status: "active" as const },
  { name: "Google Sheets", lastActivity: "2026-03-10T09:00:00Z", eventsReceived: 334, parsingErrors: 8, status: "active" as const },
  { name: "Webapp Interno", lastActivity: "2026-03-10T08:45:00Z", eventsReceived: 189, parsingErrors: 1, status: "active" as const },
  { name: "Apps Script", lastActivity: "2026-03-09T22:00:00Z", eventsReceived: 98, parsingErrors: 5, status: "inactive" as const },
];
