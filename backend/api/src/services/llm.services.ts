import { buildQueryExpansionPrompt } from "../prompt/queryExpansion.prompt";
import { parseAndValidate } from "../utils";
type LLMResponse = {
  data: string[];
  provider: string;
}


export const fallBackLLM = async (
  prompt: string
): Promise<LLMResponse> => {


  try {
    const res = await openRouterInf(prompt);
    return { data: res, provider: "openrouter" };
  } catch {
    console.warn("OpenRouter failed → Groq");
  }

  try {
    const res = await groqInf(prompt);
    return { data: res, provider: "groq" };
  } catch {
    console.warn("Groq failed → HuggingFace");
  }

  try {
    const res = await huggingFaceInf(prompt);
    return { data: res, provider: "huggingface" };
  } catch {
    console.warn("HuggingFace failed");
  }

  return { data: [], provider: "none" };
};


async function openRouterInf(prompt: string): Promise<string[]> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!res.ok) throw new Error("OpenRouter error");

  const data: any = await res.json();
  const text = data.choices?.[0]?.message?.content || "";

  const parsed = parseAndValidate(text);

  return parsed.queries.map((q: any) => q.text);
}

async function groqInf(prompt: string): Promise<string[]> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!res.ok) throw new Error("Groq error");

  const data: any = await res.json();
  const text = data.choices?.[0]?.message?.content || "";

  const parsed = parseAndValidate(text);

  return parsed.queries.map((q: any) => q.text);
}
async function huggingFaceInf(prompt: string): Promise<string[]> {
  const res = await fetch(
    "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt
      })
    }
  );

  if (!res.ok) throw new Error("HF error");

  const data: any = await res.json();
  const text = data?.[0]?.generated_text || "";

  const parsed = parseAndValidate(text);

  return parsed.queries.map((q: any) => q.text);
}