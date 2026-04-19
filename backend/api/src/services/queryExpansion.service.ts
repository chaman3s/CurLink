type HQEInput = {
  disease: string;
  query: string;
};

// --------------------
// Domain keywords
// --------------------
const intentModifiers = [
  "treatment",
  "therapy",
  "management",
  "clinical trial",
  "guidelines",
  "diagnosis",
  "outcomes",
  "risk factors",
  "prevention"
];

// --------------------
// Optional synonyms (light ontology extension)
// --------------------
const synonymMap: Record<string, string[]> = {
  "myocardial infarction": ["heart attack"],
  "parkinson disease": ["parkinson's disease"],
  "hypertension": ["high blood pressure"],
  "diabetes mellitus": ["diabetes"]
};

// --------------------
// Helper: get synonyms
// --------------------
const getSynonyms = (term: string): string[] => {
  return synonymMap[term] || [];
};

// --------------------
// HQE MAIN
// --------------------
export const expandQuery = (input: HQEInput): string[] => {
  const { disease, query } = input;
  const queries = new Set<string>();
  queries.add(`${query} ${disease}`);
  for (const mod of intentModifiers) {
    queries.add(`${query} ${disease} ${mod}`);
  }
  for (const mod of intentModifiers) {
    queries.add(`${disease} ${mod}`);
  }
  for (const mod of intentModifiers) {
    queries.add(`${query} ${mod}`);
  }
  const diseaseSynonyms = getSynonyms(disease);

  for (const syn of diseaseSynonyms) {
    queries.add(`${query} ${syn}`);

    for (const mod of intentModifiers) {
      queries.add(`${query} ${syn} ${mod}`);
    }
  }

  return Array.from(queries).slice(0, 15); // limit size
};