import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { OpenAIEmbeddings } from "@langchain/openai";
import { OllamaEmbeddings } from "@langchain/ollama";
import dotenv from "dotenv"
import ollama from 'ollama'

dotenv.config()

async function loadTextFile(): Promise<void> {
  const loader = new PDFLoader("./docs/US_Mortgage_Lifecycle_Guide.pdf");
  
  // Array of Document objects
  const docs: Document[] = await loader.load(); 
  
  docs.forEach((doc) => {
    console.log("Content:", doc.pageContent.substring(0,100));
    console.log("Metadata:", doc.metadata.source);
  });
//   console.log(docs.length)
//   console.log(typeof docs[0].pageContent);
// console.log(docs[0].pageContent.length);
// console.log(Object.keys(docs[0].metadata));
// console.log(docs[1].metadata.pdf);
// console.log(docs[1].metadata.loc);

const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 })
const chunks = await splitter.splitDocuments(docs)

console.log(chunks[0].pageContent.length);

console.log(chunks[1].pageContent.length);

console.log(chunks[0].metadata);

console.log(chunks[1].metadata);

//quota exhausted in openAI
// const embeddings = new OpenAIEmbeddings({
//   apiKey: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
//   batchSize: 512, // Default value if omitted is 512. Max is 2048
//   model: "text-embedding-3-large",
// });

//use ollama for local embedding creation

const embeddings = new OllamaEmbeddings({
  model: "mxbai-embed-large", // Default value
  baseUrl: "http://localhost:11434", // Default value
});
const singleVector = await embeddings.embedQuery(chunks[0].pageContent);
console.log("Single vector", singleVector.slice(0, 10));

const vectors = await embeddings.embedDocuments([chunks[0].pageContent, chunks[1].pageContent]);

console.log("Vectors -------------------")
console.log(vectors[0].slice(0, 10));
console.log(vectors[1].slice(0, 10));
}
await loadTextFile()
