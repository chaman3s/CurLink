import { mapOntology } from "./ontology.service";
import { cleanText } from "./textclean.services";
import { expandQuery } from "./queryExpansion.service";
import { buildQueryExpansionPrompt } from "../prompt/queryExpansion.prompt";
import { fallBackLLM } from "./llm.services";
import { localLLM } from "./localLLM.service";
import { searchAllSources } from "./search.services";
import { dedupeResults } from "../utils";
type ChatInput = {
  disease: string;
  query: string;
  location?: string;
};
export async function  chatProccess(input:ChatInput){
    const { disease, query, location } = input;
    const { clean: cleanDisease, fixed: fixedDisease } = cleanText(disease);
    const { clean: cleanQuery, fixed: fixedQuery } = cleanText(query);
    const mappedDisease = mapOntology(fixedDisease);
    const mappedQuery = mapOntology(fixedQuery)
    let queries = expandQuery({disease: mappedDisease,query: mappedQuery});
    let prompt =buildQueryExpansionPrompt(fixedDisease,queries)
    let llmQueries: string[] = [];
    let res :any
    if (process.env.NODE_ENV=="production"){
     res= await fallBackLLM(prompt) 
      
    }
    else{
      res= await localLLM(prompt)
    }
    llmQueries = res.data;
     const finalQueries = Array.from(
    new Set([...queries, ...llmQueries])
    
  ).slice(0, 10);
    const searchResults = await searchAllSources(finalQueries);
    const uniqueResults = dedupeResults(searchResults);
    return {
    result:uniqueResults
  };

}