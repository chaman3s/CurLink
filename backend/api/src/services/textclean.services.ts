import nspell, { SpellChecker } from "nspell";
import dictionary from "dictionary-en";

let spell: SpellChecker | null = null;

dictionary((err: Error | null, dict: any) => {
  if (err) {
    console.error("Dictionary load error:", err);
    return;
  }
  spell = nspell(dict);
});

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
// Spell Fix
// --------------------
const protectedWords = new Set([
  "dbs",
  "glioblastoma",
  "covid",
  "hiv",
  "ms"
]);

export const spellFix = (text: string): string => {
  if (!spell) return text;

  return text
    .split(" ")
    .map((word) => {
      if (protectedWords.has(word)) return word;

      if (!spell!.correct(word)) {
        const suggestions = spell!.suggest(word);
        if (suggestions.length === 1) {
          return suggestions[0];
        }
      }

      return word;
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