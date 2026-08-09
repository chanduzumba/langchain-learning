import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";

async function loadTextFile(): Promise<void> {
  const loader = new PDFLoader("./docs/US_Mortgage_Lifecycle_Guide.pdf");
  
  // Array of Document objects
  const docs: Document[] = await loader.load(); 
  
  docs.forEach((doc) => {
    console.log("Content:", doc.pageContent.substring(0,100));
    console.log("Metadata:", doc.metadata.source);
  });
  console.log(docs.length)
  console.log(typeof docs[0].pageContent);
console.log(docs[0].pageContent.length);
console.log(Object.keys(docs[0].metadata));
console.log(docs[1].metadata.pdf);
console.log(docs[1].metadata.loc);
}
await loadTextFile()
