import { queryExpansionSchema } from "../schemas/queryExpansion.schema";
export const buildQueryExpansionPrompt = (
  disease: string,
  query: string[]
) => `
ROLE:
You are an expert medical search query optimizer.

TASK:
Generate high-quality search queries for academic databases.

RULES:
- Combine disease + intent
- Use medical terminology
- Include treatment, clinical trials, research
- No duplicates
- 4–8 queries only

OUTPUT:
Return ONLY JSON:
Schema:
${JSON.stringify(queryExpansionSchema)}


FAIL:
If invalid → return {"queries":[]}

INPUT:
Disease: ${disease}
Intent: ${query}
`;