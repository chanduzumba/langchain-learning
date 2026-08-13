import type { VectorStore } from "@langchain/core/vectorstores";
import type { BaseRetriever } from "@langchain/core/retrievers";

// TODO (Module 6): explore retriever options (k, search type, metadata filters)
// beyond this default before wiring it into the chain in Module 9.
export function getRetriever(vectorStore: VectorStore, k = 4): BaseRetriever {
  return vectorStore.asRetriever(k);
}
