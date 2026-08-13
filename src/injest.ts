import { loadPdf } from "./loaders/pdfLoader.js";
import { splitDocuments } from "./splitter/textSplitter.js";
import { getEmbeddings } from "./config/embeddings.js";
import { getVectorStore } from "./config/vectorstore.js";

export async function ingest() {
  const docs = await loadPdf("docs/US_Mortgage_Lifecycle_Guide.pdf");

  const chunks = await splitDocuments(docs);

  const embeddings = getEmbeddings();

  const vectorStore = await getVectorStore(embeddings);

  await vectorStore.addDocuments(chunks);

  console.log(`Stored ${chunks.length} chunks.`);
}
