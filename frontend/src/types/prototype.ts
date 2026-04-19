export type ResearchMode =
  | 'Evidence synthesis'
  | 'Clinical trial scan'
  | 'Patient-friendly brief'

export type NavLink = {
  href: string
  label: string
}

export type Metric = {
  title: string
  description: string
}

export type PipelineStep = {
  title: string
  detail: string
}

export type EvidenceCard = {
  tag: string
  journal: string
  year: string
  title: string
  takeaway: string
}

export type AnswerView = {
  heading: string
  summary: string
  bullets: string[]
}

export type QueryIntake = {
  patientName?: string
  diseaseOfInterest?: string
  additionalQuery?: string
  location?: string
  naturalQuery: string
  inputFormat: 'structured' | 'natural'
  normalizedPrompt: string
  contextSignals: string[]
}

export type SidePanel = {
  eyebrow: string
  items: string[]
  highlighted?: boolean
}

export type ArchitectureItem = {
  label: string
  title: string
  description: string
}
