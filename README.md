# 🚀 LangChain + RAG Learning Journey (TypeScript)

> **Goal:** Learn LangChain by building a real-world AI application instead of memorizing APIs.
>
> **Project:** AI Loan Underwriter with RAG

---

# 📖 Philosophy

Instead of learning isolated concepts, every topic will be implemented as part of a complete Retrieval-Augmented Generation (RAG) pipeline.

By the end of this roadmap, I should be able to explain:

- Why each component exists
- When to use it
- How LangChain abstracts it
- How to build production-ready RAG applications

---

# 🗺️ Learning Roadmap

```text
                ┌────────────────────┐
                │   Documents (PDF)  │
                └──────────┬─────────┘
                           │
                           ▼
                 Document Loader
                           │
                           ▼
                  Document Objects
                           │
                           ▼
                    Text Splitter
                           │
                           ▼
                    Chunked Documents
                           │
                           ▼
                      Embeddings
                           │
                           ▼
                     Vector Database
                           │
                           ▼
                      Similarity Search
                           │
                           ▼
                        Retriever
                           │
                           ▼
                     Prompt Template
                           │
                           ▼
                          LLM
                           │
                           ▼
                     Final AI Answer
```

---

# ✅ Progress Tracker

## Module 1 — Document Loading

### Concepts

- [x] What is a Document?
- [x] Why LangChain converts everything into `Document[]`
- [x] `pageContent`
- [x] `metadata`
- [x] PDF Loader
- [x] Text Loader

### Learned

- Every loader returns a standard `Document[]`.
- `pageContent` stores extracted text.
- `metadata` stores information about the source.

Example:

```ts
Document {
    pageContent: "...",
    metadata: {
        source: "...",
        page: 1
    }
}
```

---

## Module 2 — Text Splitting

### Concepts

- [x] Why splitting is required
- [x] Context window limitations
- [x] Hallucination reduction
- [x] Chunk overlap
- [x] RecursiveCharacterTextSplitter

### Learned

Large documents cannot be directly sent to an LLM because:

- token limits
- retrieval inefficiency
- lower answer quality

Instead:

```text
Large PDF
      ↓
Chunk 1
Chunk 2
Chunk 3
...
```

---

### Chunk Overlap

Example:

```
Chunk Size = 1000

Overlap = 200
```

```
Chunk 1
1 --------------------1000

Chunk 2
801-------------------1800
```

Overlap preserves sentence meaning across chunks.

---

### Metadata

Metadata is copied to every chunk.

Example

```
Page 1
    ↓
2 chunks
```

Both chunks still contain

```ts
metadata.source

metadata.pageNumber
```

This helps later during retrieval.

---

## Module 3 — Embeddings

### Concepts

- [x] What embeddings are
- [x] Vector representation
- [x] Semantic similarity
- [x] Why embeddings instead of keywords

### Learned

Text

```
Applicant earns $8000/month
```

↓

Embedding

```
[
0.02,
-0.17,
0.55,
...
]
```

The numbers themselves have no meaning.

The **entire vector** represents semantic meaning.

---

### Similarity Search

Question

```
What is the customer's income?
```

↓

Embedding

↓

Compared against document embeddings

↓

Nearest vectors are returned

instead of keyword matching.

---

### Ollama Embeddings

Used local embeddings

Model:

```
nomic-embed-text
```

Benefits

- Free
- Offline
- Fast
- No OpenAI credits required

---

# 🚧 Upcoming Modules

## Module 4 — Cosine Similarity

### Learn

- Why vectors can be compared
- Distance vs Similarity
- Cosine Similarity
- Why semantic search works

Implementation

- Compare embeddings of
  - similar sentences
  - unrelated sentences

---

## Module 5 — Vector Store

Learn

- Why databases cannot search vectors
- MemoryVectorStore
- Chroma
- Pinecone
- Qdrant

Implement

```
Chunks
      ↓
Embeddings
      ↓
Vector Store
```

---

## Module 6 — Retriever

Learn

Difference between

- Vector Store
- Retriever

Implement

```ts
retriever.invoke(query)
```

---

## Module 7 — Prompt Templates

Learn

- Prompt engineering
- Context injection
- RAG prompts

---

## Module 8 — Chat Models

Learn

- ChatOpenAI
- Ollama
- OpenAI
- Temperature
- Tokens

---

## Module 9 — Complete RAG

Pipeline

```
User Question
       ↓
Embedding
       ↓
Retriever
       ↓
Relevant Chunks
       ↓
Prompt
       ↓
LLM
       ↓
Answer
```

---

## Module 10 — AI Loan Underwriter

Real Project

Features

- Upload mortgage guidelines
- Retrieve relevant lending rules
- Underwrite applications
- Explain decisions
- Cite source documents
- Confidence score
- Audit trail

---

# 🧠 Important Concepts Learned

## Document

Standard LangChain object.

Contains

- pageContent
- metadata

---

## Metadata

Information **about** the document.

Examples

- source
- page number
- PDF information

Not part of the actual text.

---

## Chunk

A smaller piece of a document.

Created because LLMs cannot process huge documents efficiently.

---

## Chunk Overlap

Repeats part of the previous chunk.

Purpose

Preserve sentence context.

---

## Embedding

A numerical representation of meaning.

Not keywords.

Not summaries.

Not compressed text.

---

## Vector

High-dimensional array representing semantic meaning.

Example

```
[0.23, -0.88, 0.15, ...]
```

---

## Similarity Search

Instead of

```
Find same words
```

we perform

```
Find nearest vectors
```

---

# 📚 Learning Strategy

For every concept:

1. Predict before coding.
2. Implement from scratch.
3. Explain the output.
4. Understand *why* it works.
5. Connect it to the AI Loan Underwriter project.

---

# 🎯 Final Goal

Build a production-ready AI Loan Underwriter using:

- TypeScript
- LangChain
- Ollama
- Chroma / Pinecone
- Retrieval-Augmented Generation (RAG)
- Local embeddings
- Source citation
- Streaming responses

---

# 📌 Current Status

| Module | Status |
|---------|--------|
| Document Loader | ✅ |
| Document Object | ✅ |
| Metadata | ✅ |
| Text Splitter | ✅ |
| Chunk Overlap | ✅ |
| Embeddings | ✅ |
| Cosine Similarity | ⏳ |
| Vector Store | ⏳ |
| Retriever | ⏳ |
| Prompt Templates | ⏳ |
| LLM | ⏳ |
| Complete RAG | ⏳ |
| AI Loan Underwriter | ⏳ |

---

> **Learning Principle:** Don't just know *how* to use LangChain. Understand *why* every component exists and how they fit together to build intelligent, production-ready AI systems.