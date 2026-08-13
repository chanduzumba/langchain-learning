import dotenv from "dotenv";
import type { Embeddings } from "@langchain/core/embeddings";
import type { VectorStore } from "@langchain/core/vectorstores";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { getEmbeddings } from "./embeddings.js";

export async function getVectorStore(
  embeddings: Embeddings
): Promise<VectorStore> {
  const provider = process.env.VECTORSTORE_PROVIDER ?? "chroma";

  switch (provider) {
    case "chroma":
      return new Chroma(embeddings, {
        collectionName: process.env.CHROMA_COLLECTION ?? "loan-underwriter",
        url: process.env.CHROMA_URL ?? "http://localhost:8000",
      });
    default:
      throw new Error(`Unknown VECTORSTORE_PROVIDER: ${provider}`);
  }
}

// Small standalone demo: adds a few documents to the collection and runs a
// similarity search against them. Run with `npx tsx src/config/vectorstore.ts`
// (requires a local Chroma server - see README for `chroma run`). Data is
// left in the collection afterward; re-running just adds more documents.
async function demo(): Promise<void> {
  const embeddings = getEmbeddings();
  const store = (await getVectorStore(embeddings)) as Chroma;

  const docs = [
    {
      pageContent: "The minimum credit score for a conventional mortgage is typically 620.",
      metadata: { id: "doc-credit-score" },
    },
    {
      pageContent: "A debt-to-income ratio above 43% may disqualify a borrower from a qualified mortgage.",
      metadata: { id: "doc-dti" },
    },
    {
      pageContent: "Homebuyers usually need a down payment between 3% and 20% of the purchase price.",
      metadata: { id: "doc-down-payment" },
    },
  ];

  console.log("Ingesting documents:");
  docs.forEach((doc) => console.log(`- [${doc.metadata.id}] ${doc.pageContent}`));

  const ids = await store.addDocuments(docs);
  console.log("\nAdded with ids:", ids);

  const query = "What credit score do I need to qualify for a home loan?";
  console.log("\nQuery:", query);

  const results = await store.similaritySearchWithScore(query, 3);
  console.log("\nResults:");
  results.forEach(([doc, score]) => {
    console.log(`- [score=${score.toFixed(4)}] [${doc.metadata.id}] ${doc.pageContent}`);
  });
}

const isMainModule = process.argv[1]?.endsWith("vectorstore.ts");
if (isMainModule) {
  dotenv.config();
  await demo();
}
