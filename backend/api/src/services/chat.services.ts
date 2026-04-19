import { mapOntology } from "./ontology.service";
import { cleanText } from "./textclean.services";
import { expandQuery } from "./queryExpansion.service";
type ChatInput = {
  disease: string;
  query: string;
  location?: string;
};
export function chatProccess(input:ChatInput){
    const { disease, query, location } = input;
    const { clean: cleanDisease, fixed: fixedDisease } = cleanText(disease);
    const { clean: cleanQuery, fixed: fixedQuery } = cleanText(query);
    const mappedDisease = mapOntology(fixedDisease);
    const mappedQuery = mapOntology(fixedQuery)
    const queries = expandQuery({disease: mappedDisease,query: mappedQuery});
    return queries;
}