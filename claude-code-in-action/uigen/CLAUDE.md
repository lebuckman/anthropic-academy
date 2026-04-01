# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator with live preview. Users describe components in natural language; Claude generates working React code with real-time preview via a virtual file system.

## Commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Vitest
npm run setup        # Install deps + Prisma generate + migrate (first-time setup)
npm run db:reset     # Reset SQLite database
```

To run a single test file: `npx vitest run src/path/to/file.test.tsx`

## Environment

- `ANTHROPIC_ACADEMY_API_KEY` — optional; if unset, the app runs in mock mode using `MockLanguageModel` (`src/lib/provider.ts`)
- Database: SQLite via Prisma at `prisma/dev.db` (gitignored)

## Architecture

### Virtual File System
All generated component code lives in an **in-memory virtual file system** (`src/lib/file-system.ts`) — nothing is written to disk. The VFS is serialized to JSON and persisted in the `Project.data` column in SQLite.

### AI Integration
- **Provider** (`src/lib/provider.ts`): Returns a real Claude Haiku 4.5 model when the API key is set, otherwise a mock model.
- **Tools** (`src/lib/tools/`): The AI uses two tools to generate code:
  - `str_replace_editor` — modifies file content via string replacement
  - `file_manager` — creates/deletes files and directories
- **Prompts** (`src/lib/prompts/`): System prompts for the generation agent.
- **Chat API route** (`src/app/api/chat/route.ts`): Streams AI responses using Vercel AI SDK.

### State Management
Two React contexts wrap the app:
- **ChatContext** (`src/lib/contexts/chat-context.tsx`): chat messages, streaming state
- **FileSystemContext** (`src/lib/contexts/file-system-context.tsx`): virtual file system state

### Auth
JWT sessions via `jose`, password hashing via `bcrypt`. Anonymous usage is supported (no account required). Middleware at `src/middleware.ts` validates sessions.

### Database
Prisma schema (`prisma/schema.prisma`) has two models: `User` and `Project`. Messages and file system data are stored as stringified JSON columns.

### Path Aliases
`@/*` maps to `./src/*` (configured in `tsconfig.json`).

## Code Style

- Use comments sparingly. Only comment complex code.

## Key Libraries

| Purpose | Package |
|---|---|
| AI streaming | `ai` (Vercel AI SDK) + `@ai-sdk/anthropic` |
| Code editor | `@monaco-editor/react` |
| JS transpilation (preview) | `@babel/standalone` |
| UI primitives | `@radix-ui/*` + Shadcn (New York style) |
| Styling | Tailwind CSS v4 |
| ORM | Prisma 6 + SQLite |
| Auth | `jose` + `bcrypt` |
