import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { Eye, Home, ChevronRight, Download, Copy, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";

// ---------- Constants ----------
const MODEL = "gpt-4"; // Use GPT-4 via OpenAI API

const AVD_META_FIELDS = [
  { id: "projectName", label: "Project Name", placeholder: "e.g., SnapTag – Photo Unification" },
  { id: "projectId", label: "Project ID (UMT360/Other)", placeholder: "e.g., UMT360‑12345" },
  { id: "status", label: "Status", placeholder: "Draft / Final / Revision" },
  { id: "version", label: "Version", placeholder: "e.g., 0.1" },
  { id: "docDate", label: "Document Date", placeholder: "MM/DD/YYYY" },
  { id: "preparedBy", label: "Prepared by", placeholder: "Your Name, Team" },
  { id: "authoredBy", label: "Authored By", placeholder: "Names" },
  { id: "peerReviewedBy", label: "Peer Reviewed By", placeholder: "Names" },
  { id: "sdcApprovalDate", label: "SDC Approval Date", placeholder: "MM/DD/YYYY (if known)" },
];

const SECTIONS = [
  { id: "problemDescription", title: "1) Problem Description" },
  { id: "stakeholders", title: "1.1 Stakeholders & Their Concerns" },
  { id: "issuesScenarios", title: "1.2 Issues / Scenarios to Be Addressed" },
  { id: "changeDrivers", title: "1.3 Change Drivers & Opportunities" },
  { id: "solutionCategorization", title: "1.4 Solution Categorization (RUN / GROW / INNOVATE)" },
  { id: "actors", title: "2.1 Actors with Applicable Roles & Responsibilities" },
  { id: "processDescription", title: "2.2 Process Description" },
  { id: "bizTechEnv", title: "2.3 Business & Technical Environments" },
  { id: "crossDependencies", title: "2.4 Cross‑Project Dependencies" },
  { id: "conceptualArch", title: "3.1 Conceptual Solution Architecture" },
  { id: "constraintsAssumptions", title: "3.2 Constraints & Assumptions" },
  { id: "principles", title: "3.3 Architectural Principles" },
  { id: "standardsPatterns", title: "3.4 Architectural Standards, Patterns & Building Blocks" },
  { id: "componentType", title: "3.5 Architectural Component Type (Record / Engagement / Interaction / Differentiation)" },
  { id: "areasImpacted", title: "3.6 Areas Impacted (Domains & Impact Level)" },
  { id: "avdRisk", title: "3.7 Architecture Vision Risk Assessment (summary)" },
  { id: "sdlcSelection", title: "3.8 Software Development Lifecycle Selection" },
];

const SECTION_DIRECTIONS: Record<string, string> = {
  problemDescription:
    "Write a crisp problem statement (3–6 bullets + 1 paragraph) for a React web application. Anchor to business drivers, scope boundaries, and success criteria. Avoid duplicating BRD; assume BRD §1 exists.",
  stakeholders:
    "List stakeholders (human/system) and their concerns. Include org units where relevant. Format as table‑like bullets: Stakeholder → Concerns → Why it matters for the React app.",
  issuesScenarios:
    "Describe key business scenarios the React app must handle, each with trigger → primary actor(s) → high‑level steps → expected outcome. End with a one‑sentence business vision.",
  changeDrivers:
    "Identify change drivers (regulatory, safety, cost, UX, time‑to‑market) and opportunities (reuse, standards, platform leverage). Map driver → architectural implication for React app.",
  solutionCategorization:
    "Pick RUN/GROW/INNOVATE. Justify in 3–5 bullets including sourcing strategy (MSP, vendor, RFP) and rationale.",
  actors:
    "Enumerate actors and roles that will interact with the React app (humans + systems). Include at least: end users, support, security, integration services. Provide role → responsibilities → touchpoints.",
  processDescription:
    "Outline in‑scope business processes the React app supports. Provide a numbered list of processes and a brief information‑flow narrative for each. Note any SOX / NERC / CEII control implications if applicable.",
  bizTechEnv:
    "Describe the business environment (departments, customers) and technical environment (browsers, devices, SSO, APIs, hosting, data sources). Keep to what affects conceptual design of a React app.",
  crossDependencies:
    "List known or likely cross‑project dependencies (by project name/ID if known): dependency → impact → mitigation/owner.",
  conceptualArch:
    "Describe the conceptual architecture for a React app in prose. Include: client (React), API layer, auth, data layer, integration, observability, CI/CD. Then provide an ASCII context diagram and an application lifecycle table (Deploy/Enhance/Sustain/Re‑Platform/Replace/Decommission).",
  constraintsAssumptions:
    "List hard constraints (security, identity, data residency, browser policy, performance SLOs) and assumptions (availability of APIs, vendor agreements, budget).",
  principles:
    "State 6–10 architecture principles relevant to a React app (e.g., least privilege, 12‑factor, API‑first, progressive enhancement, observability‑by‑default), each with a one‑line rationale.",
  standardsPatterns:
    "Name standards (enterprise + industry) and patterns/building blocks to leverage (e.g., React + TypeScript, design system, BFF pattern, REST/GraphQL, Zero‑Trust, OWASP ASVS).",
  componentType:
    "For each subsystem/component, map to System of Record / Engagement / Interaction / Differentiation. Include a 4‑column mini‑table: Component → Record → Engagement → Interaction → Differentiation.",
  areasImpacted:
    "List impacted domains (End User, Product, Cloud SaaS, Data, Platform, Cyber, etc.) with an impact level (VL/L/M/H/VH) and 1‑line description.",
  avdRisk:
    "Summarize the Architecture Vision Risk Assessment in 5–8 bullets: delivery, security, integration, data quality, vendor, change management. Include a qualitative overall risk.",
  sdlcSelection:
    "Recommend an SDLC for the overall solution (e.g., Agile‑Scrum/Kanban/DevOps, Iterative, Platform Specific) with justification. Provide a small table: Subsystem/Component → Methodology.",
};

// ---------- OpenAI API Helper ----------
async function generateWithOpenAI({ apiKey, model, system, user }: { apiKey: string; model: string; system: string; user: string }) {
  const body = {
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${text}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || "(No content)";
}

// ---------- .docx export ----------
async function exportToDocx(meta: Record<string, string>, sections: Record<string, string>) {
  const { Document, Packer, Paragraph, HeadingLevel, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType } = await import("docx");

  const para = (text: string) => new Paragraph({ children: [new TextRun(text)] });
  const h = (text: string, level: keyof typeof HeadingLevel = "HEADING_2") => new Paragraph({ text, heading: HeadingLevel[level] });

  const metaPairs = [
    ["Project Name", meta.projectName],
    ["Project ID", meta.projectId],
    ["Status", meta.status],
    ["Version", meta.version],
    ["Date of Document", meta.docDate],
    ["Prepared by", meta.preparedBy],
    ["Authored By", meta.authoredBy],
    ["Peer Reviewed By", meta.peerReviewedBy],
    ["SDC Approval Date", meta.sdcApprovalDate],
  ];

  const metaTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: metaPairs.map(([k, v]) => new TableRow({
      children: [
        new TableCell({ children: [para(k)] }),
        new TableCell({ children: [para(v || "")] }),
      ],
    })),
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({ text: `${meta.projectName || "<Project Name>"} – Architecture Vision Definition`, heading: HeadingLevel.TITLE }),
          para("(Conceptual Architecture)"),
          new Paragraph({}),
          h("Document Information", "HEADING_1"),
          metaTable,
          new Paragraph({}),
          ...SECTIONS.flatMap(({ id, title }) => [h(title, "HEADING_1"), para(sections[id] || "")]),
          new Paragraph({}),
          new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "SCE Confidential and Proprietary", italics: true })] }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const safeName = (meta.projectName || "AVD").replace(/[^a-z0-9\-_. ]/gi, "_");
  a.download = `${safeName} – AVD.docx`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export default function AVDGenerator() {
  const [apiKey, setApiKey] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(() => {
    return !!localStorage.getItem("avd_openai_key");
  });
  const [meta, setMeta] = useState<Record<string, string>>(() =>
    Object.fromEntries(AVD_META_FIELDS.map(f => [f.id, localStorage.getItem(`avd_meta_${f.id}`) || ""]))
  );
  const [appSummary, setAppSummary] = useState<string>("");
  const [extras, setExtras] = useState<string>("Constraints (security/identity/data), target users, non‑functional SLOs, known systems to integrate, browsers/devices, hosting preference, compliance flags (SOX/NERC/CEII). Add anything specific to your org.");
  const [sectionText, setSectionText] = useState<Record<string, string>>(() => Object.fromEntries(SECTIONS.map(s => [s.id, ""])));
  const [busy, setBusy] = useState<string | null>(null);
  const { toast } = useToast();

  // Load API key from localStorage if present
  useEffect(() => {
    const k = localStorage.getItem("avd_openai_key");
    if (k) setApiKey(k);
  }, []);

  const baseSystemPrompt = useMemo(() => {
    return [
      "You are an enterprise solution architect. Produce precise, non‑redundant AVD content.",
      "Audience: Solution Design Council, domain architects, product leadership.",
      "Style: executive crispness, numbered bullets where useful, 1–2 short paragraphs max per sub‑section, tables as plain text when helpful.",
    ].join("\n");
  }, []);

  function updateMeta(id: string, value: string) {
    setMeta(m => ({ ...m, [id]: value }));
    localStorage.setItem(`avd_meta_${id}`, value);
  }

  function buildUserPrompt(sectionId: string) {
    const project = meta.projectName || "<Unnamed React App>";
    const why = appSummary?.trim() || "";
    const dir = SECTION_DIRECTIONS[sectionId] || "Write the section succinctly.";
    return [
      `Write the AVD section: ${SECTIONS.find(s => s.id === sectionId)?.title}`,
      `Project: ${project}`,
      why ? `Context / app summary: ${why}` : "",
      extras ? `Additional constraints/notes: ${extras}` : "",
      "Expectations:",
      "- Do NOT repeat information across sections.",
      "- Assume React + TypeScript front end; APIs exist or will be built; enterprise SSO; CI/CD; monitoring.",
      `- Keep output ready to paste into the AVD as plain text.`,
      "",
      dir,
    ].filter(Boolean).join("\n");
  }

  async function handleGenerate(sectionId: string) {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key first.",
        variant: "destructive"
      });
      return;
    }

    try {
      setBusy(sectionId);
      const text = await generateWithOpenAI({
        apiKey,
        model: MODEL,
        system: baseSystemPrompt,
        user: buildUserPrompt(sectionId),
      });
      setSectionText(s => ({ ...s, [sectionId]: text }));
      toast({
        title: "Section Generated",
        description: `Successfully generated content for ${SECTIONS.find(s => s.id === sectionId)?.title}`,
      });
    } catch (err: any) {
      toast({
        title: "Generation Failed",
        description: err?.message || String(err),
        variant: "destructive"
      });
    } finally {
      setBusy(null);
    }
  }

  async function handleGenerateAll() {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key first.",
        variant: "destructive"
      });
      return;
    }

    setBusy("all");
    try {
      for (const s of SECTIONS) {
        await handleGenerate(s.id);
      }
      toast({
        title: "All Sections Generated",
        description: "Successfully generated content for all AVD sections.",
      });
    } finally {
      setBusy(null);
    }
  }

  function handleRememberToggle(checked: boolean) {
    setRemember(checked);
    if (checked && apiKey) localStorage.setItem("avd_openai_key", apiKey);
    if (!checked) localStorage.removeItem("avd_openai_key");
  }

  async function handleDownloadDocx() {
    try {
      await exportToDocx(meta, sectionText);
      toast({
        title: "Document Downloaded",
        description: "Your AVD has been exported as a Word document.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your document. Please try again.",
        variant: "destructive"
      });
    }
  }

  async function copyPromptToClipboard(sectionId: string) {
    try {
      await navigator.clipboard.writeText(SECTION_DIRECTIONS[sectionId] || "");
      toast({
        title: "Copied to Clipboard",
        description: "Section prompt copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy prompt to clipboard.",
        variant: "destructive"
      });
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-enterprise-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" data-testid="link-breadcrumb-home">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 text-enterprise-400" />
                      <span className="ml-2 text-sm font-medium text-enterprise-600">Dashboard</span>
                    </div>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-enterprise-400" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium text-indigo-600">
                  AVD Generator
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg mr-4">
              <Eye className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-enterprise-800 dark:text-white" data-testid="text-page-title">
                AVD React Generator
              </h1>
              <p className="text-enterprise-600 dark:text-gray-300" data-testid="text-page-description">
                Comprehensive Architecture Vision Document generator with AI assistance
              </p>
            </div>
          </div>
          <div className="text-sm text-enterprise-500 dark:text-gray-400">Model: {MODEL}</div>
        </div>

        {/* API Key Section */}
        <Card className="border border-enterprise-200 dark:border-gray-700">
          <CardContent className="p-6">
            <h3 className="font-medium text-enterprise-800 dark:text-white mb-4">OpenAI API</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-sm font-medium text-enterprise-700 dark:text-gray-300">
                  API Key
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Paste your OpenAI API key"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    if (remember) localStorage.setItem("avd_openai_key", e.target.value);
                  }}
                  className="border-enterprise-300 focus:ring-indigo-500 focus:border-indigo-500"
                  data-testid="input-api-key"
                />
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={handleRememberToggle}
                    data-testid="checkbox-remember-key"
                  />
                  <Label htmlFor="remember" className="text-sm text-enterprise-600 dark:text-gray-300">
                    Remember key in this browser (insecure on shared machines)
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Metadata */}
        <Card className="border border-enterprise-200 dark:border-gray-700">
          <CardContent className="p-6">
            <h3 className="font-medium text-enterprise-800 dark:text-white mb-4">Document Metadata</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {AVD_META_FIELDS.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id} className="text-sm text-enterprise-600 dark:text-gray-300">
                    {field.label}
                  </Label>
                  <Input
                    id={field.id}
                    placeholder={field.placeholder}
                    value={meta[field.id] || ""}
                    onChange={(e) => updateMeta(field.id, e.target.value)}
                    className="border-enterprise-300 focus:ring-indigo-500 focus:border-indigo-500"
                    data-testid={`input-meta-${field.id}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* App Summary */}
        <Card className="border border-enterprise-200 dark:border-gray-700">
          <CardContent className="p-6">
            <h3 className="font-medium text-enterprise-800 dark:text-white mb-4">App Summary (High-impact guidance for the generator)</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appSummary" className="text-sm text-enterprise-600 dark:text-gray-300">
                  What problem the React app solves, target users, core flows, integrations, guardrails…
                </Label>
                <Textarea
                  id="appSummary"
                  className="min-h-[120px] font-mono border-enterprise-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe the purpose and context of your React application..."
                  value={appSummary}
                  onChange={(e) => setAppSummary(e.target.value)}
                  data-testid="textarea-app-summary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="extras" className="text-sm text-enterprise-600 dark:text-gray-300">
                  Additional Constraints & Notes
                </Label>
                <Textarea
                  id="extras"
                  className="min-h-[80px] text-sm border-enterprise-300 focus:ring-indigo-500 focus:border-indigo-500"
                  value={extras}
                  onChange={(e) => setExtras(e.target.value)}
                  data-testid="textarea-extras"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={handleGenerateAll} 
            disabled={!!busy || !apiKey} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            data-testid="button-generate-all"
          >
            {busy === "all" ? "Generating…" : "Generate All Sections"}
          </Button>
          <Button 
            onClick={handleDownloadDocx} 
            variant="outline"
            className="border-enterprise-300"
            data-testid="button-download-docx"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Word (.docx)
          </Button>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {SECTIONS.map(({ id, title }) => (
            <Card key={id} className="border border-enterprise-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-enterprise-800 dark:text-white">{title}</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => copyPromptToClipboard(id)}
                      variant="outline"
                      size="sm"
                      className="text-xs border-enterprise-300"
                      data-testid={`button-copy-prompt-${id}`}
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Prompt
                    </Button>
                    <Button
                      onClick={() => handleGenerate(id)}
                      disabled={!!busy || !apiKey}
                      variant="outline"
                      size="sm"
                      className="border-enterprise-300"
                      data-testid={`button-generate-${id}`}
                    >
                      {busy === id ? "Generating…" : "Generate"}
                    </Button>
                  </div>
                </div>
                <Textarea
                  className="w-full min-h-[160px] font-mono border-enterprise-300 focus:ring-indigo-500 focus:border-indigo-500"
                  value={sectionText[id] || ""}
                  placeholder={SECTION_DIRECTIONS[id]}
                  onChange={(e) => setSectionText(s => ({ ...s, [id]: e.target.value }))}
                  data-testid={`textarea-section-${id}`}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="py-8 text-xs text-enterprise-500 dark:text-gray-400 text-center">
          Built for fast AVD drafting. Paste outputs into your official template or use the Word export above.
        </div>
      </div>
    </div>
  );
}
