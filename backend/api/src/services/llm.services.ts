type LLMResponse = {
  data: string[];
  provider: string;
}
const buildPrompt = (query: string) => `
Generate 4-8 medical search queries.

Return ONLY JSON:
{
  "queries": ["query1", "query2"]
}

Input: ${query}
`;

export const fallBackLLM = async (query: string): Promise<LLMResponse> => {
  try {
    const res = await openRouterInf(query);
    return { data: res, provider: "openrouter" };
  } catch {
    console.warn("OpenRouter failed → Groq");
  }

  try {
    const res = await groqInf(query);
    return { data: res, provider: "groq" };
  } catch {
    console.warn("Groq failed → HuggingFace");
  }

  try {
    const res = await huggingFaceInf(query);
    return { data: res, provider: "huggingface" };
  } catch {
    console.warn("HuggingFace failed");
  }

  return { data: [], provider: "none" };
};

const parseJSON = (text: string): string[] => {
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return parsed.queries || [];
  } catch {
    return [];
  }
};

async function openRouterInf(query: string): Promise<string[]> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [{ role: "user", content: buildPrompt(query) }]
    })
  });

  if (!res.ok) throw new Error("OpenRouter error");

  const data: any = await res.json();
  const text = data.choices?.[0]?.message?.content || "";

  return parseJSON(text);
}

async function groqInf(query: string): Promise<string[]> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: buildPrompt(query) }]
    })
  });

  if (!res.ok) throw new Error("Groq error");

  const data: any = await res.json();
  const text = data.choices?.[0]?.message?.content || "";

  return parseJSON(text);
}
async function huggingFaceInf(query: string): Promise<string[]> {
  const res = await fetch(
    "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: buildPrompt(query)
      })
    }
  );

  if (!res.ok) throw new Error("HF error");

  const data: any = await res.json();
  const text = data?.[0]?.generated_text || "";

  return parseJSON(text);
}