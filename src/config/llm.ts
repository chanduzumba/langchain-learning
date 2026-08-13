import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatOllama } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";

// Used starting Module 8 (chat model integration) - defined now so the
// provider-selection pattern matches config/embeddings.ts from day one.
export function getChatModel(): BaseChatModel {
  const provider = process.env.LLM_PROVIDER ?? "ollama";

  switch (provider) {
    case "ollama":
      return new ChatOllama({
        model: process.env.OLLAMA_CHAT_MODEL ?? "llama3.1",
        baseUrl: process.env.OLLAMA_BASE_URL ?? "http://localhost:11434",
        temperature: 0,
      });
    case "openai":
      return new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini",
        temperature: 0,
      });
    default:
      throw new Error(`Unknown LLM_PROVIDER: ${provider}`);
  }
}
