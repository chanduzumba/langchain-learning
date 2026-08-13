import { Embeddings } from "@langchain/core/embeddings";
import { OllamaEmbeddings } from "@langchain/ollama";
import { OpenAIEmbeddings } from "@langchain/openai";

export function getEmbeddings(): Embeddings {
  const provider = process.env.EMBEDDINGS_PROVIDER ?? "ollama";

  switch (provider) {
    case "ollama":
      return new OllamaEmbeddings({
        model: process.env.OLLAMA_EMBEDDINGS_MODEL ?? "mxbai-embed-large",
        baseUrl: process.env.OLLAMA_BASE_URL ?? "http://localhost:11434",
      });
    case "openai":
      return new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_EMBEDDINGS_MODEL ?? "text-embedding-3-large",
        batchSize: 512,
      });
    default:
      throw new Error(`Unknown EMBEDDINGS_PROVIDER: ${provider}`);
  }
}
