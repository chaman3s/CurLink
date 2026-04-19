def extract_context(input: dict):
    return {
        "disease": input.get("disease", "").lower(),
        "intent": input.get("query", "").lower(),
        "location": input.get("location")

def quearyExplantion({ disease, intent }):
    const queries = new Set();