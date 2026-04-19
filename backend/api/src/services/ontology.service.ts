export const ontologyMap: Record<string, string> = {
  // Cardiovascular
  "heart attack": "myocardial infarction",
  "cardiac arrest": "myocardial infarction",
  "high blood pressure": "hypertension",
  "bp high": "hypertension",
  "hypertension": "hypertension",
  "heart failure": "congestive heart failure",
  "arrhythmia": "cardiac arrhythmia",
  "coronary artery disease": "coronary artery disease",
  // Metabolic / Endocrine
  "diabetes": "diabetes mellitus",
  "type 2 diabetes": "type 2 diabetes mellitus",
  "type 1 diabetes": "type 1 diabetes mellitus",
  "thyroid": "thyroid disease",
  "hyperthyroidism": "hyperthyroidism",
  "hypothyroidism": "hypothyroidism",
  "obesity": "obesity",
  "metabolic syndrome": "metabolic syndrome",
  // Neurological
  "parkinson's": "parkinson disease",
  "parkinsons": "parkinson disease",
  "alzheimer's": "alzheimer disease",
  "alzheimer": "alzheimer disease",
  "stroke": "cerebrovascular accident",
  "epilepsy": "epilepsy",
  "migraine": "migraine disorder",
  "multiple sclerosis": "multiple sclerosis",
  "ms": "multiple sclerosis",
  // Respiratory
  "lung cancer": "lung neoplasms",
  "asthma": "asthma",
  "copd": "chronic obstructive pulmonary disease",
  "bronchitis": "bronchitis",
  "pneumonia": "pneumonia",
  "tb": "tuberculosis",
  "sleep apnea": "sleep apnea syndrome",
  // Infectious Diseases
  "covid": "covid-19",
  "coronavirus": "covid-19",
  "flu": "influenza",
  "influenza": "influenza",
  "dengue": "dengue fever",
  "malaria": "malaria",
  "hiv": "human immunodeficiency virus",
  "aids": "acquired immunodeficiency syndrome",
  "hepatitis": "hepatitis",
  "hepatitis b": "hepatitis b",
  "hepatitis c": "hepatitis c",
  // Oncology (Cancers)
  "breast cancer": "breast neoplasms",
  "prostate cancer": "prostate neoplasms",
  "colon cancer": "colorectal cancer",
  "rectal cancer": "colorectal cancer",
  "skin cancer": "skin neoplasms",
  "melanoma": "melanoma",
  "brain tumor": "brain neoplasms",
  "leukemia": "leukemia",
  "lymphoma": "lymphoma",
  // Gastrointestinal
  "acid reflux": "gastroesophageal reflux disease",
  "gerd": "gastroesophageal reflux disease",
  "ulcer": "peptic ulcer disease",
  "ibs": "irritable bowel syndrome",
  "crohn's": "crohn disease",
  "ulcerative colitis": "ulcerative colitis",
  "fatty liver": "nonalcoholic fatty liver disease",
  "cirrhosis": "liver cirrhosis",
  // Kidney / Urinary
  "kidney disease": "chronic kidney disease",
  "ckd": "chronic kidney disease",
  "kidney failure": "renal failure",
  "kidney stone": "nephrolithiasis",
  "uti": "urinary tract infection",
  // Musculoskeletal
  "arthritis": "arthritis",
  "osteoarthritis": "osteoarthritis",
  "rheumatoid arthritis": "rheumatoid arthritis",
  "back pain": "low back pain",
  "osteoporosis": "osteoporosis",
  // Mental Health
  "depression": "major depressive disorder",
  "anxiety": "anxiety disorder",
  "bipolar": "bipolar disorder",
  "schizophrenia": "schizophrenia",
  "ptsd": "post-traumatic stress disorder",
  // Dermatology
  "eczema": "atopic dermatitis",
  "psoriasis": "psoriasis",
  "acne": "acne vulgaris",
  // Eye / ENT
  "glaucoma": "glaucoma",
  "cataract": "cataract",
  "hearing loss": "hearing loss",
  "sinusitis": "sinusitis",
  // Blood / Immune
  "anemia": "anemia",
  "iron deficiency": "iron deficiency anemia",
  "autoimmune disease": "autoimmune disorder",
  "lupus": "systemic lupus erythematosus",
  // Others common
  "fever": "fever",
  "pain": "pain",
  "infection": "infection"
};
export const mapOntology = (text: string): string => {
  if (!text) return "";
  let result = text;
  for (const key in ontologyMap) {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    result = result.replace(regex, ontologyMap[key]);
  }
  return result;
};