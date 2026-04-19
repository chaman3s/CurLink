export const localLLM = async (prompt: string): Promise<string> => {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3",
      prompt,
      stream: false
    })
  });

  if (!res.ok) throw new Error("Local LLM error");

  const data: any = await res.json();

  return data.response || "";
};