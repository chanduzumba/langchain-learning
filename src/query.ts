import "dotenv/config";

import { getEmbeddings } from "./config/embeddings.js";
import { getVectorStore } from "./config/vectorstore.js";

export async function query(question: string): Promise<void> {
  // Initialize embeddings
  const embeddings = getEmbeddings();

  // Connect to the existing Chroma collection
  const vectorStore = await getVectorStore(embeddings);

  // Retrieve the 3 most relevant chunks
  const results = await vectorStore.similaritySearchWithScore(question, 3);

  console.log("\n==============================");
  console.log("Question:");
  console.log(question);

  console.log("\nTop Matches:");
  console.log("==============================");

  results.forEach(([doc, score], index) => {
    console.log(`\nResult ${index + 1}`);
    console.log(`Score: ${score.toFixed(4)}`);
    console.log("Metadata:", doc.metadata);
    console.log("Content:");
    console.log(doc.pageContent);
  });
}
