# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project purpose

This is a learning project for building a Retrieval-Augmented Generation (RAG) pipeline in TypeScript with LangChain, working toward an "AI Loan Underwriter" application (upload mortgage guidelines, retrieve relevant lending rules, underwrite applications with cited sources and confidence scores). See `README.md` for the full learning roadmap and per-module notes — it tracks what's been implemented so far (document loading, text splitting, embeddings) and what's upcoming (vector store, retriever, prompt templates, chat model, full RAG chain).

The project is being built incrementally, module by module, following the README roadmap — don't jump ahead and implement later modules' logic early; stub files exist for that purpose (see Architecture).

## Commands

- `npm run dev` — run `src/index.ts` with `tsx watch` (auto-reload on change)
- `npm start` — run `src/index.ts` once with `tsx`
- No test suite exists (`npm test` is a placeholder that exits non-zero)
- No lint/build script is configured; `tsc` is a devDependency but there is no `build` script — use `tsx` for execution rather than compiling
- Copy `.env.example` to `.env` and adjust provider vars before running

## Architecture

Code is organized by pipeline stage, one directory per concern, so each provider can be swapped via config without touching call sites:

- `src/config/` — provider factories, selected via env var, each defaulting to a local/free option:
  - `embeddings.ts` — `getEmbeddings()`, `EMBEDDINGS_PROVIDER` = `ollama` (default, `mxbai-embed-large`) or `openai`
  - `llm.ts` — `getChatModel()`, `LLM_PROVIDER` = `ollama` (default, `llama3.1`) or `openai`; not yet wired into a chain (Module 8)
  - `vectorstore.ts` — `getVectorStore()`, stub only, throws until Module 5 (Chroma locally, hosted store later via the same pattern)
- `src/loaders/pdfLoader.ts` — wraps `PDFLoader` from `@langchain/community`
- `src/splitter/textSplitter.ts` — wraps `RecursiveCharacterTextSplitter` (default chunkSize 1000 / overlap 200)
- `src/retriever/retriever.ts` — `getRetriever()` wraps `VectorStore.asRetriever()`; options beyond the default `k` are Module 6
- `src/prompts/ragPrompt.ts`, `src/chains/ragChain.ts` — stubs, filled in during Modules 7 and 9
- `src/index.ts` — composes whatever's been built so far into a runnable script; currently: load PDF → split → embed (Modules 1-3 pipeline only)
- All provider selection reads `process.env` directly (no config-loading abstraction beyond `dotenv`) — see `.env.example` for every var and its default
- `docs/` holds sample source material for the pipeline (a PDF and a plain-text example) — treat these as sample/fixture data for local experimentation, not application code
- Module system: ESM (`"type": "module"` in `package.json`), `module: "nodenext"` in `tsconfig.json` — relative imports must include the `.js` extension (e.g. `./loaders/pdfLoader.js`) even though the source is `.ts`
