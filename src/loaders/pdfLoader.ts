import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";

export async function loadPdf(filePath: string): Promise<Document[]> {
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();
  
  // Clean metadata to only include Chroma-compatible types
  const cleanedDocs = docs.map(doc => {
    const cleanedMetadata: Record<string, string | number | boolean | null> = {};
    for (const [key, value] of Object.entries(doc.metadata || {})) {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null) {
        cleanedMetadata[key] = value;
      }
    }
    return new Document({
      pageContent: doc.pageContent,
      metadata: cleanedMetadata
    });
  });
  
  console.log(`Loaded ${cleanedDocs.length} document(s).`);
  return cleanedDocs;
}
