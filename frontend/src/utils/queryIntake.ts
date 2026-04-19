import type { QueryIntake } from '../types/prototype'

type IntakeField = 'patientName' | 'diseaseOfInterest' | 'additionalQuery' | 'location'

const fieldLabels: Record<IntakeField, string> = {
  patientName: 'Patient',
  diseaseOfInterest: 'Disease',
  additionalQuery: 'Focus',
  location: 'Location',
}

const labelMap: Record<string, IntakeField> = {
  patient: 'patientName',
  patientname: 'patientName',
  name: 'patientName',
  disease: 'diseaseOfInterest',
  diseaseofinterest: 'diseaseOfInterest',
  condition: 'diseaseOfInterest',
  diagnosis: 'diseaseOfInterest',
  additionalquery: 'additionalQuery',
  query: 'additionalQuery',
  focus: 'additionalQuery',
  treatment: 'additionalQuery',
  intervention: 'additionalQuery',
  location: 'location',
  city: 'location',
  region: 'location',
}

const diseasePatterns = [
  /parkinson'?s disease/i,
  /alzheimer'?s disease/i,
  /type 2 diabetes/i,
  /multiple sclerosis/i,
  /breast cancer/i,
  /lung cancer/i,
  /chronic kidney disease/i,
]

const topicPatterns = [
  /deep brain stimulation/i,
  /dbs/i,
  /clinical trials?/i,
  /treatment options?/i,
  /guidelines?/i,
  /meta-analys(?:is|es)/i,
]

const compactLabel = (label: string) => label.toLowerCase().replace(/[^a-z]/g, '')

const stripLinePrefix = (line: string) => line.replace(/^[-*]\s*/, '').trim()

const toTitleCase = (value: string) =>
  value.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

const unique = (items: string[]) => [...new Set(items.filter(Boolean))]

const parseStructuredFields = (input: string) => {
  const fields: Partial<Record<IntakeField, string>> = {}
  const remainder: string[] = []

  input
    .split(/\r?\n/)
    .map(stripLinePrefix)
    .filter(Boolean)
    .forEach((line) => {
      const match = line.match(/^([^:]+):\s*(.+)$/)

      if (!match) {
        remainder.push(line)
        return
      }

      const field = labelMap[compactLabel(match[1])]

      if (field) {
        fields[field] = match[2].trim()
        return
      }

      remainder.push(line)
    })

  return { fields, remainder }
}

const parseNaturalFields = (input: string) => {
  const fields: Partial<Record<IntakeField, string>> = {}
  const text = input.replace(/\s+/g, ' ').trim()

  const nameMatch = text.match(/\b(?:patient|for|name(?:d)?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\b/)
  if (nameMatch) {
    fields.patientName = nameMatch[1]
  }

  const diseaseMatch = diseasePatterns.map((pattern) => text.match(pattern)?.[0]).find(Boolean)
  if (diseaseMatch) {
    fields.diseaseOfInterest = diseaseMatch
  }

  const topicMatch = topicPatterns.map((pattern) => text.match(pattern)?.[0]).find(Boolean)
  if (topicMatch) {
    fields.additionalQuery = topicMatch.toLowerCase() === 'dbs' ? 'Deep Brain Stimulation' : toTitleCase(topicMatch)
  }

  const locationMatch = text.match(
    /\b(?:in|near|around|from)\s+([A-Z][A-Za-z.'-]+(?:\s+[A-Z][A-Za-z.'-]+)*(?:,\s*[A-Z][A-Za-z.'-]+(?:\s+[A-Z][A-Za-z.'-]+)*)?)/,
  )
  if (locationMatch) {
    fields.location = locationMatch[1].replace(/[?.!,;:]$/, '')
  }

  return fields
}

export const parseQueryIntake = (input: string, fallbackContext: string[] = []): QueryIntake => {
  const naturalQuery = input.trim()
  const { fields: structuredFields, remainder } = parseStructuredFields(naturalQuery)
  const hasStructuredFields = Object.keys(structuredFields).length > 0
  const naturalFields = hasStructuredFields ? {} : parseNaturalFields(naturalQuery)
  const fields = { ...naturalFields, ...structuredFields }

  const contextSignals = unique([
    fields.patientName ? `${fieldLabels.patientName}: ${fields.patientName}` : '',
    fields.diseaseOfInterest ? `${fieldLabels.diseaseOfInterest}: ${fields.diseaseOfInterest}` : '',
    fields.additionalQuery ? `${fieldLabels.additionalQuery}: ${fields.additionalQuery}` : '',
    fields.location ? `${fieldLabels.location}: ${fields.location}` : '',
    ...fallbackContext,
  ])

  const structuredParts = [
    fields.patientName ? `patient ${fields.patientName}` : '',
    fields.diseaseOfInterest ? `disease of interest ${fields.diseaseOfInterest}` : '',
    fields.additionalQuery ? `research focus ${fields.additionalQuery}` : '',
    fields.location ? `location ${fields.location}` : '',
  ].filter(Boolean)

  const normalizedPrompt =
    structuredParts.length > 0
      ? `Research ${structuredParts.join(', ')}.`
      : naturalQuery || 'Research request is empty.'

  return {
    ...fields,
    naturalQuery: remainder.length > 0 ? remainder.join(' ') : naturalQuery,
    inputFormat: hasStructuredFields ? 'structured' : 'natural',
    normalizedPrompt,
    contextSignals,
  }
}
