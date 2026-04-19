import { z } from "zod";

export const queryExpansionValidator = z.object({
  queries: z
    .array(
      z.object({
        text: z.string().min(3),
        type: z.enum(["base", "treatment", "clinical", "research"])
      }).strict()
    )
    .min(4)
    .max(10)
}).strict();