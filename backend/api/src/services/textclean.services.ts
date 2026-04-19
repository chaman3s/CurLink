const typoMap: Record<string, string> = {
  diabtes: "diabetes",
  parkinsons: "parkinson disease",
  canser: "cancer",
  alzhimers: "alzheimers",
  hipertension: "hypertension"
};

const protectedWords = new Set([
  "dbs",
  "glioblastoma",
  "covid",
  "hiv",
  "ms"
]);

// --------------------
// Light Clean
// --------------------
export const lightClean = (text: string): string => {
  if (!text) return "";

  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s+/.-]/g, "")
    .replace(/\s+/g, " ");
};

// --------------------
// Lightweight Spell Fix
// --------------------
export const spellFix = (text: string): string => {
  return text
    .split(" ")
    .map((word) => {
      if (protectedWords.has(word)) return word;
      return typoMap[word] || word;
    })
    .join(" ");
};

// --------------------
// Combined Clean
// --------------------
export const cleanText = (input: string) => {
  const clean = lightClean(input);
  const fixed = spellFix(clean);

  return {
    clean,
    fixed
  };
};