import { queryExpansionValidator } from "../validator/outputLLm.validator";

// --------------------
// TYPES
// --------------------
type QueryExpansion = {
  queries: {
    text: string;
    type: "base" | "treatment" | "clinical" | "research";
  }[];
};

type SearchResult = {
  id: string;
  title?: string;
  source?: string;
};

// --------------------
// PARSE + VALIDATE
// --------------------
export const parseAndValidate = (text: string): QueryExpansion => {
  try {
    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const json = JSON.parse(clean);

    const validated = queryExpansionValidator.parse(json);

    return validated;
  } catch (err) {
    console.error("Validation failed:", err);

    return { queries: [] };
  }
};

// --------------------
// DEDUPE RESULTS
// --------------------
export const dedupeResults = (
  results: SearchResult[]
): SearchResult[] => {
  const map = new Map<string, SearchResult>();

  for (const item of results) {
    if (!item.id) continue; // safety
    map.set(item.id, item);
  }

  return Array.from(map.values());
};