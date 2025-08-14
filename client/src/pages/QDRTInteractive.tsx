import React, { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Home, ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// --------------------------
// Embedded schema (extracted from the uploaded Excel)
// --------------------------
const SCHEMA = {
  "title": "SAD QDRT (Interactive)",
  "columns": {
    "A": "#",
    "B": "Question (\"Yes\" = good)",
    "C": "Original Finding",
    "D": "Final Finding",
    "E": "Itemized Concerns",
    "F": "Original Risk",
    "G": "Final\nRisk",
    "H": "Comments/Notes"
  },
  "dropdowns": {
    "original_finding": ["TBD", "Yes", "Mostly Yes", "Mostly No", "No"],
    "final_finding": ["TBD", "Yes", "Mostly Yes", "Mostly No", "No"],
    "original_risk": ["Make Selection", "LOW", "MEDIUM", "HIGH", "EXTREME", "n/a"],
    "final_risk": ["Make Selection", "LOW", "MEDIUM", "HIGH", "EXTREME", "n/a"]
  },
  "questions": [
    {"id":3,"row":4,"prompt":"Was the correct template selected (Enterprise Architecture template or Standard template)?\n(Links to both SAD templates available above.)","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":4,"row":5,"prompt":"Are all sections of the original template present and completed?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":5,"row":6,"prompt":"Was the SAD written with the expectation that a project 3-5 years from now will be able to understand the solution intent and constraints without the original context?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":6,"row":7,"prompt":"Is the business problem clearly stated and measurable?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":7,"row":8,"prompt":"Is the proposed solution aligned with business capabilities and outcomes?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":8,"row":9,"prompt":"Does the solution identify all major components and their interactions (context, containers, components)?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":9,"row":10,"prompt":"Are security requirements addressed (identity, access, encryption, secrets, logging, monitoring)?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":10,"row":11,"prompt":"Are privacy & data classification handled appropriately (PII/PCI/PHI, retention, residency)?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":11,"row":12,"prompt":"Does the design consider reliability, availability, and disaster recovery?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":12,"row":13,"prompt":"Are scalability and performance requirements identified and feasible?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":13,"row":14,"prompt":"Are integration points well defined (APIs, events, data movement) and versioned?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":14,"row":15,"prompt":"Are non-functional requirements (NFRs) explicit and testable?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":15,"row":16,"prompt":"Does the solution follow cloud/provider best practices and well-architected guidance?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":16,"row":17,"prompt":"Has cost estimation and cost controls (FinOps) been considered?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":17,"row":18,"prompt":"Are operations, observability and support models clearly defined (runbooks, SLAs, alerts, dashboards)?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":18,"row":19,"prompt":"Are data governance and lifecycle considerations addressed (quality, lineage, retention)?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":19,"row":20,"prompt":"Is the approach to testing and validation comprehensive (unit, integration, performance, security)?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":20,"row":21,"prompt":"Are risks, assumptions, issues, and dependencies (RAID) captured with mitigation strategies?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":21,"row":22,"prompt":"Does the solution adhere to enterprise patterns, standards, and policies (including ITIL services)?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":22,"row":23,"prompt":"Is the deployment strategy clear (environments, pipelines, approvals, rollbacks)?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":23,"row":24,"prompt":"Are access and connectivity patterns explicit (VNet, peering, firewall, private endpoints)?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":24,"row":25,"prompt":"Has the solution been reviewed for compliance (regulatory, legal, records management)?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":25,"row":26,"prompt":"Is there a clear cutover/transition plan including data migration and rollback?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}},
    {"id":26,"row":27,"prompt":"Section 8: Is this architecture consistent with SCE patterns, standards and pre-defined building blocks?","defaults":{"original_finding":"TBD","final_finding":"TBD","itemized_concerns":"INITIALS: Concern #1\nINITIALS: Concern #2\n - Etc.","original_risk":"Make Selection","final_risk":"Make Selection","comments":null}}
  ]
};

// --------------------------
// Utilities
// --------------------------
const ORDERED_FIELDS = [
  { key: "original_finding", label: SCHEMA.columns.C },
  { key: "final_finding", label: SCHEMA.columns.D },
  { key: "itemized_concerns", label: SCHEMA.columns.E },
  { key: "original_risk", label: SCHEMA.columns.F },
  { key: "final_risk", label: SCHEMA.columns.G },
  { key: "comments", label: SCHEMA.columns.H }
];

function useLocalStorage(key: string, initial: any) {
  const [val, setVal] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }, [key, val]);
  return [val, setVal];
}

function classNames(...xs: (string | undefined | false | null)[]): string { 
  return xs.filter(Boolean).join(" "); 
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

async function exportToXLSX(answers: any) {
  try {
    const XLSX = await import("xlsx");
    const headers = [SCHEMA.columns.A, SCHEMA.columns.B, SCHEMA.columns.C, SCHEMA.columns.D, SCHEMA.columns.E, SCHEMA.columns.F, SCHEMA.columns.G, SCHEMA.columns.H];
    const rows = [headers];
    const sorted = [...SCHEMA.questions].sort((a,b) => a.id - b.id);
    sorted.forEach(q => {
      const a = answers[q.id] || {};
      rows.push([
        q.id,
        q.prompt,
        a.original_finding ?? q.defaults.original_finding ?? "",
        a.final_finding ?? q.defaults.final_finding ?? "",
        a.itemized_concerns ?? q.defaults.itemized_concerns ?? "",
        a.original_risk ?? q.defaults.original_risk ?? "",
        a.final_risk ?? q.defaults.final_risk ?? "",
        a.comments ?? q.defaults.comments ?? ""
      ]);
    });
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "SAD_QDRT_Completed.xlsx");
  } catch (error) {
    console.error('Export to XLSX failed:', error);
    alert('Failed to export XLSX. This feature requires the xlsx library.');
  }
}

function normalizeToOption(txt: string, options: string[]) {
  if (!txt) return options?.[0] ?? "";
  const t = String(txt).trim().toLowerCase();
  let best = options[0];
  let bestScore = -Infinity;
  for (const opt of options) {
    const o = opt.toLowerCase();
    let score = 0;
    if (o === t) score += 100;
    if (t.includes(o) || o.includes(t)) score += 10;
    // small heuristic boosts
    if (o.startsWith(t) || t.startsWith(o)) score += 5;
    if (o.replace(/[^a-z]/g,"") === t.replace(/[^a-z]/g,"")) score += 5;
    if (score > bestScore) { bestScore = score; best = opt; }
  }
  return best;
}

async function extractTextFromFiles(fileList: FileList | null) {
  const files = Array.from(fileList || []);
  let all = [];
  for (const f of files) {
    const ext = f.name.split('.').pop()?.toLowerCase() || '';
    if (ext === 'txt' || ext === 'md' ) {
      all.push(await f.text());
    } else if (ext === 'pdf') {
      try {
        // Note: This would need pdfjs-dist to be installed
        console.warn('PDF parsing not implemented - please convert to text manually');
        all.push(`[PDF file: ${f.name} - please convert to text manually]`);
      } catch (e) {
        console.error('PDF parse failed', e);
      }
    } else if (ext === 'docx') {
      try {
        // Note: This would need mammoth library to be installed
        console.warn('DOCX parsing not implemented - please convert to text manually');
        all.push(`[DOCX file: ${f.name} - please convert to text manually]`);
      } catch (e) {
        console.error('DOCX parse failed', e);
      }
    } else {
      // fallback: try text
      try { all.push(await f.text()); } catch {}
    }
  }
  return all.join('\n\n');
}

async function callOpenAI({ apiKey, model, system, user }: { apiKey: string, model: string, system: string, user: string }) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ]
    })
  });
  if (!res.ok) throw new Error(`OpenAI error ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

function BuildSystemPrompt() {
  return `You are assisting with a Quality Document Review Template (QDRT) for a Solution Architecture Definition (SAD).\n\nReturn STRICT JSON ONLY. No prose.\nFields:\n- original_finding: one of ${JSON.stringify(SCHEMA.dropdowns.original_finding)}\n- final_finding: one of ${JSON.stringify(SCHEMA.dropdowns.final_finding)}\n- itemized_concerns: up to 5 bullet lines starting with "INITIALS:" or "-"\n- original_risk: one of ${JSON.stringify(SCHEMA.dropdowns.original_risk)}\n- final_risk: one of ${JSON.stringify(SCHEMA.dropdowns.final_risk)}\n- comments: short sentence(s).`;
}

function buildUserPrompt(qPrompt: string, docText: string) {
  return `Given the following SAD content, answer the specific QDRT check.\n\nQDRT Check:\n${qPrompt}\n\nSAD Content:\n${docText?.slice(0, 120000) || ''}\n\nReturn JSON with keys: original_finding, final_finding, itemized_concerns, original_risk, final_risk, comments.`;
}

// --------------------------
// UI Primitives
// --------------------------
function Labeled({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-enterprise-700 mb-1">{label}{children}</label>
  );
}

function Select({ value, onChange, options }: { value: string, onChange: (value: string) => void, options: string[] }) {
  return (
    <select 
      className="w-full border border-enterprise-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
      value={value || ''} 
      onChange={e => onChange(e.target.value)}
    >
      {(options || []).map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

function TextArea({ value, onChange, rows = 3, placeholder }: { value: string, onChange: (value: string) => void, rows?: number, placeholder?: string }) {
  return (
    <textarea 
      className="w-full border border-enterprise-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
      rows={rows} 
      value={value || ''} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder}
    />
  );
}

function Input({ value, onChange, placeholder, type = "text" }: { value: string, onChange: (value: string) => void, placeholder?: string, type?: string }) {
  return (
    <input 
      className="w-full border border-enterprise-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" 
      value={value || ''} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder} 
      type={type}
    />
  );
}

function Button({ children, onClick, variant = "primary", disabled }: { children: React.ReactNode, onClick: () => void, variant?: string, disabled?: boolean }) {
  const styles = variant === 'outline'
    ? 'border border-enterprise-300 text-enterprise-800 hover:bg-enterprise-50'
    : variant === 'danger'
    ? 'bg-red-600 text-white hover:bg-red-700'
    : 'bg-amber-600 text-white hover:bg-amber-700';
  return (
    <button 
      disabled={disabled} 
      onClick={onClick} 
      className={classNames(
        'px-3 py-2 rounded-lg text-sm font-medium shadow-sm disabled:opacity-50 transition-colors',
        styles
      )}
      data-testid={`button-${variant}`}
    >
      {children}
    </button>
  );
}

// --------------------------
// Main Component
// --------------------------
export default function QDRTInteractive() {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
  const model = 'gpt-5';
  const [docText, setDocText] = useLocalStorage('qdrt:docText', '');
  const [filter, setFilter] = useState('');
  const [answers, setAnswers] = useLocalStorage('qdrt:answers', {});
  const [busy, setBusy] = useState(false);

  const filteredQuestions = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return SCHEMA.questions;
    return SCHEMA.questions.filter(q => String(q.id).includes(f) || q.prompt.toLowerCase().includes(f));
  }, [filter]);

  function setAnswer(qid: number, patch: any) {
    setAnswers((prev: any) => ({ ...prev, [qid]: { ...(prev[qid]||{}), ...patch }}));
  }

  async function onUploadFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const text = await extractTextFromFiles(e.target.files);
    setDocText((prev: string) => (prev ? prev + '\n\n' : '') + text);
  }

  async function generateOne(q: any) {
    if (!apiKey) {
      alert('OpenAI API key not configured. Please contact the administrator.');
      return;
    }
    
    setBusy(true);
    try {
      const sys = BuildSystemPrompt();
      const usr = buildUserPrompt(q.prompt, docText);
      const out = await callOpenAI({ apiKey, model, system: sys, user: usr });
      let json;
      try { 
        json = JSON.parse(out); 
      } catch {
        // try to extract JSON via a quick regex
        const m = out.match(/\{[\s\S]*\}/);
        if (m) json = JSON.parse(m[0]);
      }
      if (!json) throw new Error('No JSON returned');
      const nf = normalizeToOption(json.original_finding, SCHEMA.dropdowns.original_finding);
      const ff = normalizeToOption(json.final_finding, SCHEMA.dropdowns.final_finding);
      const orisk = normalizeToOption(json.original_risk, SCHEMA.dropdowns.original_risk);
      const frisk = normalizeToOption(json.final_risk, SCHEMA.dropdowns.final_risk);
      setAnswer(q.id, {
        original_finding: nf,
        final_finding: ff,
        original_risk: orisk,
        final_risk: frisk,
        itemized_concerns: (json.itemized_concerns || q.defaults.itemized_concerns || '').toString(),
        comments: (json.comments || q.defaults.comments || '')?.toString() || ''
      });
    } catch (e: any) {
      alert(`Generation failed: ${e.message}`);
      console.error(e);
    } finally { 
      setBusy(false); 
    }
  }

  async function generateAll() {
    if (!apiKey) {
      alert('OpenAI API key not configured. Please contact the administrator.');
      return;
    }
    
    setBusy(true);
    try {
      for (const q of SCHEMA.questions) {
        await generateOne(q);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-enterprise-200">
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
                <BreadcrumbPage className="text-sm font-medium text-amber-600">
                  QDRT Interactive
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="min-h-screen bg-enterprise-50 text-enterprise-900">
        <header className="sticky top-0 z-10 bg-white border-b border-enterprise-200">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="text-xl font-semibold text-enterprise-800">QDRT – Interactive Reviewer</div>
            <div className="ml-auto flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => downloadBlob('qdrt_answers.json', new Blob([JSON.stringify(answers, null, 2)], {type:'application/json'}))}
                data-testid="button-export-json"
              >
                Export JSON
              </Button>
              <Button 
                variant="outline" 
                onClick={() => exportToXLSX(answers)}
                data-testid="button-export-xlsx"
              >
                Export XLSX
              </Button>
              <Button 
                onClick={generateAll} 
                disabled={!apiKey || busy}
                data-testid="button-generate-all"
              >
                {busy ? 'Generating...' : 'Generate All (AI)'}
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left rail: inputs & AI */}
          <section className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl shadow p-4 border border-enterprise-200">
              <h2 className="text-lg font-semibold mb-3 text-enterprise-800">Inputs</h2>
              <div className="space-y-3">
                <Labeled label="Upload SAD documents (.pdf / .docx / .txt)"> </Labeled>
                <input 
                  type="file" 
                  multiple 
                  accept=".pdf,.docx,.txt,.md" 
                  onChange={onUploadFiles}
                  className="w-full text-sm text-enterprise-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                  data-testid="input-file-upload"
                />
                <Labeled label="Extracted Text">
                  <TextArea 
                    rows={10} 
                    value={docText} 
                    onChange={setDocText} 
                    placeholder="Paste or extract your SAD content here" 
                  />
                </Labeled>
              </div>
            </div>


          </section>

          {/* Right rail: form */}
          <section className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl shadow p-4 border border-enterprise-200">
              <div className="flex items-center gap-3 mb-3">
                <Input 
                  value={filter} 
                  onChange={setFilter} 
                  placeholder="Search by # or text..." 
                />
                <div className="ml-auto text-sm text-enterprise-500">
                  {filteredQuestions.length} of {SCHEMA.questions.length} items
                </div>
              </div>
              <div className="space-y-4">
                {filteredQuestions.map(q => {
                  const a = answers[q.id] || {};
                  return (
                    <div key={q.id} className="border border-enterprise-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-sm font-semibold bg-amber-100 text-amber-800 rounded-lg px-2 py-1">
                          #{q.id}
                        </div>
                        <div className="font-medium flex-1 whitespace-pre-line text-enterprise-800">
                          {q.prompt}
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setAnswers((prev: any) => ({...prev, [q.id]: {}}))}
                            data-testid={`button-clear-${q.id}`}
                          >
                            Clear
                          </Button>
                          <Button 
                            onClick={() => generateOne(q)} 
                            disabled={!apiKey || busy}
                            data-testid={`button-generate-${q.id}`}
                          >
                            Generate
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <Labeled label={SCHEMA.columns.C}>
                            <Select 
                              value={a.original_finding ?? q.defaults.original_finding} 
                              onChange={v => setAnswer(q.id, { original_finding: v })} 
                              options={SCHEMA.dropdowns.original_finding} 
                            />
                          </Labeled>
                        </div>
                        <div>
                          <Labeled label={SCHEMA.columns.D}>
                            <Select 
                              value={a.final_finding ?? q.defaults.final_finding} 
                              onChange={v => setAnswer(q.id, { final_finding: v })} 
                              options={SCHEMA.dropdowns.final_finding} 
                            />
                          </Labeled>
                        </div>
                        <div>
                          <Labeled label={SCHEMA.columns.F}>
                            <Select 
                              value={a.original_risk ?? q.defaults.original_risk} 
                              onChange={v => setAnswer(q.id, { original_risk: v })} 
                              options={SCHEMA.dropdowns.original_risk} 
                            />
                          </Labeled>
                        </div>
                        <div>
                          <Labeled label={SCHEMA.columns.G}>
                            <Select 
                              value={a.final_risk ?? q.defaults.final_risk} 
                              onChange={v => setAnswer(q.id, { final_risk: v })} 
                              options={SCHEMA.dropdowns.final_risk} 
                            />
                          </Labeled>
                        </div>
                        <div className="md:col-span-2">
                          <Labeled label={SCHEMA.columns.E}>
                            <TextArea 
                              rows={4} 
                              value={a.itemized_concerns ?? q.defaults.itemized_concerns} 
                              onChange={v => setAnswer(q.id, { itemized_concerns: v })} 
                            />
                          </Labeled>
                        </div>
                        <div className="md:col-span-2">
                          <Labeled label={SCHEMA.columns.H}>
                            <TextArea 
                              rows={3} 
                              value={a.comments ?? q.defaults.comments} 
                              onChange={v => setAnswer(q.id, { comments: v })} 
                            />
                          </Labeled>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <footer className="max-w-7xl mx-auto px-4 py-6 text-xs text-enterprise-500">
          <div>Dropdowns captured from the original Excel validation lists. Export to Excel recreates the QDRT columns.</div>
        </footer>
      </div>
    </div>
  );
}