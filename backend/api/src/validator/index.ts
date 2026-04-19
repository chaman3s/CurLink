import { z } from "zod";

export const chatSchema = z.object({
  disease: z.string().min(2, "Disease is required"),
  query: z.string().min(2, "Query is required"),
  location: z.string().optional()
});