import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";

export interface SplitOptions {
  chunkSize?: number;
  chunkOverlap?: number;
}

export async function splitDocuments(
  docs: Document[],
  options: SplitOptions = {}
): Promise<Document[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: options.chunkSize ?? 1000,
    chunkOverlap: options.chunkOverlap ?? 200,
  });
  const chunks = await splitter.splitDocuments(docs);
  console.log(`Created ${chunks.length} chunks.`)
  return chunks;
}
