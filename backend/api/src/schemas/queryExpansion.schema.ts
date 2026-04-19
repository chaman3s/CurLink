export const queryExpansionSchema = {
  type: "object",
  required: ["queries"],
  additionalProperties: false,
  properties: {
    queries: {
      type: "array",
      minItems: 4,
      maxItems: 10,
      items: {
        type: "object",
        required: ["text", "type"],
        additionalProperties: false,
        properties: {
          text: {
            type: "string"
          },
          type: {
            type: "string",
            enum: ["base", "treatment", "clinical", "research"]
          }
        }
      }
    }
  }
} as const;