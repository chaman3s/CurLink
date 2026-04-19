export const searchOpenAlex = async (query: string) => {
  const url = `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per_page=5`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("OpenAlex error");

  const data: any = await res.json();

  return data.results.map((item: any) => ({
    id: item.id,
    title: item.title,
    abstract: item.abstract || "",
    year: item.publication_year,
    authors: item.authorships?.map((a: any) => a.author.display_name) || [],
    url: item.primary_location?.landing_page_url || "",
    source: "openalex"
  }));
};
export const searchPubMed = async (query: string) => {
  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=5&term=${encodeURIComponent(query)}`;

  const searchRes = await fetch(searchUrl);
  const searchData: any = await searchRes.json();

  const ids = searchData.esearchresult.idlist.join(",");

  if (!ids) return [];

  const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${ids}`;

  const summaryRes = await fetch(summaryUrl);
  const summaryData: any = await summaryRes.json();

  return Object.values(summaryData.result)
    .filter((item: any) => item.uid)
    .map((item: any) => ({
      id: item.uid,
      title: item.title,
      abstract: "",
      year: parseInt(item.pubdate) || 0,
      authors: item.authors?.map((a: any) => a.name) || [],
      url: `https://pubmed.ncbi.nlm.nih.gov/${item.uid}`,
      source: "pubmed"
    }));
};
export const searchTrials = async (query: string) => {
  const url = `https://clinicaltrials.gov/api/v2/studies?query.term=${encodeURIComponent(query)}&pageSize=5`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Trials error");

  const data: any = await res.json();

  return data.studies.map((study: any) => ({
    id: study.protocolSection.identificationModule.nctId,
    title: study.protocolSection.identificationModule.briefTitle,
    abstract: study.protocolSection.descriptionModule?.briefSummary || "",
    year: 0,
    authors: [],
    url: `https://clinicaltrials.gov/study/${study.protocolSection.identificationModule.nctId}`,
    source: "clinicaltrials"
  }));
};
export const searchAllSources = async (queries: string[]) => {
  const results = await Promise.all(
    queries.map(async (q) => {
      const [openalex, pubmed, trials] = await Promise.all([
        searchOpenAlex(q),
        searchPubMed(q),
        searchTrials(q)
      ]);

      return [...openalex, ...pubmed, ...trials];
    })
  );

  return results.flat();
};