export const querExpension= {
  "type": "object",
  "required": ["queries"],
  "properties": {
    "queries": {
      "type": "array",
      "minItems": 4,
      "maxItems": 10,
      "items": {
        "type": "object",
        "required": ["text", "type"],
        "properties": {
          "text": {
            "type": "string",
            "description": "Expanded query"
          },
          "type": {
            "type": "string",
            "enum": ["base", "treatment", "clinical", "research"],
            "description": "Intent category"
          }
        }
      }
    }
  }
}