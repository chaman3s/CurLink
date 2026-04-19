import type {
  AnswerView,
  ArchitectureItem,
  EvidenceCard,
  Metric,
  NavLink,
  PipelineStep,
  ResearchMode,
  SidePanel,
} from '../types/prototype'

export const navLinks: NavLink[] = [
  { href: '#workspace', label: 'Workspace' },
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#evidence', label: 'Evidence' },
  { href: '#architecture', label: 'Architecture' },
]

export const researchModes: ResearchMode[] = [
  'Evidence synthesis',
  'Clinical trial scan',
  'Patient-friendly brief',
]

export const contextSignals = [
  'Type 2 diabetes',
  'Age 58',
  'eGFR 49 mL/min',
  'Wants non-insulin options',
  'Prefers concise summaries',
]

export const heroMetrics: Metric[] = [
  {
    title: '4-step flow',
    description: 'Context, sources, reasoning, answer',
  },
  {
    title: 'Source-first',
    description: 'Guidelines, trials, and safety notes',
  },
  {
    title: 'Model-ready',
    description: 'Prepared for an open-source LLM backend',
  },
]

export const researchPrompt =
  'For a 58-year-old adult with type 2 diabetes and moderate CKD, what therapies have the strongest evidence for renal protection and glycemic improvement if insulin is not yet preferred?'

export const orchestrationSteps: PipelineStep[] = [
  {
    title: 'Context Intake',
    detail: 'Normalizes patient context, current goals, risks, and excluded therapies.',
  },
  {
    title: 'Research Retrieval',
    detail: 'Ranks RCTs, meta-analyses, guidelines, and safety signals from trusted sources.',
  },
  {
    title: 'Reasoning Layer',
    detail: 'Compares evidence quality, checks contraindications, and resolves conflicts.',
  },
  {
    title: 'Structured Output',
    detail: 'Returns plain-language advice, clinician notes, citations, and follow-up questions.',
  },
]

export const evidenceCards: EvidenceCard[] = [
  {
    tag: 'High confidence',
    journal: 'The Lancet Diabetes & Endocrinology',
    year: '2025',
    title: 'SGLT2 inhibitors and cardiorenal outcomes in adults with T2D and CKD',
    takeaway:
      'Strong benefit for kidney protection and cardiovascular risk reduction in moderate CKD.',
  },
  {
    tag: 'Guideline',
    journal: 'ADA Standards of Care',
    year: '2026',
    title: 'Pharmacologic approaches for adults with diabetes and kidney disease',
    takeaway:
      'Recommends therapy selection around renal function, ASCVD risk, and patient preference.',
  },
  {
    tag: 'Safety watch',
    journal: 'JAMA Internal Medicine',
    year: '2024',
    title: 'Real-world tolerability signals among GLP-1 receptor agonist initiators',
    takeaway:
      'Most adverse effects were GI-related; adherence improved with slower titration plans.',
  },
]

export const answerViews: Record<ResearchMode, AnswerView> = {
  'Evidence synthesis': {
    heading: 'Evidence synthesis for non-insulin escalation',
    summary:
      'For this profile, the strongest evidence supports prioritizing therapies with renal and cardiovascular benefit before focusing on maximal A1c reduction alone.',
    bullets: [
      'SGLT2 inhibitors show the clearest kidney-protective signal at this renal function range.',
      'GLP-1 receptor agonists remain compelling if weight loss or ASCVD reduction is a major goal.',
      'Sulfonylureas appear less attractive because they add hypoglycemia risk without the same outcome data.',
    ],
  },
  'Clinical trial scan': {
    heading: 'Trial landscape relevant to this patient',
    summary:
      'Recent studies cluster around cardiorenal outcomes, long-term adherence, and sequencing of GLP-1 plus SGLT2 combinations.',
    bullets: [
      'Large pragmatic studies continue to favor outcome-driven treatment selection over glucose-first escalation.',
      'Combination sequencing studies suggest benefit, but cost and tolerability still shape the best real-world choice.',
      'Trials with CKD subgroups are especially relevant because they better reflect this patient context.',
    ],
  },
  'Patient-friendly brief': {
    heading: 'Plain-language explanation for the patient',
    summary:
      'The research suggests there are medication options that can help blood sugar while also protecting the kidneys and heart.',
    bullets: [
      'One option may help your kidneys and lower the chance of some heart problems.',
      'Another option may help more with weight and blood sugar, but stomach side effects are more common.',
      'The best next step depends on kidney function, cost, side effects, and what matters most to you.',
    ],
  },
}

export const sidePanels: SidePanel[] = [
  {
    eyebrow: 'Session Guardrails',
    items: [
      'Prioritize peer-reviewed studies and formal guidelines.',
      'Flag uncertainty when evidence quality is mixed.',
      'Separate patient-safe language from clinician notes.',
    ],
  },
  {
    eyebrow: 'Why This UI Works',
    highlighted: true,
    items: [
      'Shows reasoning as a workflow, not hidden magic.',
      'Keeps citations and safety caveats close to the answer.',
      'Feels credible for healthcare and research audiences.',
    ],
  },
]

export const architectureItems: ArchitectureItem[] = [
  {
    label: 'Frontend',
    title: 'React + Vite research cockpit',
    description:
      'A responsive dashboard for user intake, evidence browsing, structured outputs, and future streaming model responses.',
  },
  {
    label: 'Backend',
    title: 'Node/Express orchestration API',
    description:
      'Intended to manage prompt building, retrieval pipelines, citation formatting, and safety-layer business logic.',
  },
  {
    label: 'Data',
    title: 'MongoDB memory + session store',
    description:
      'Stores user profiles, prior research sessions, bookmarked studies, and personalization preferences.',
  },
  {
    label: 'Model',
    title: 'Custom open-source LLM integration',
    description:
      'Ready for a self-hosted model API that supports grounded reasoning, long-context retrieval, and structured JSON outputs.',
  },
]
