# Agent Instructions — Link Shortener Project

This file is the entry point for LLM coding agents working in this repository. All detailed instructions are split into topic-specific documents located in the `/docs` directory. Read ALWAYS the relevant document(s) before making any changes.

## Document Index

| Document                                       | Purpose                                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| [docs/auth.md](docs/auth.md)                   | Authentication rules — Clerk only, route protection, modal sign-in/sign-up, redirects |
| [docs/ui-components.md](docs/ui-components.md) | UI rules — shadcn/ui only, component usage, styling, icons, forms, dialogs, toasts    |

For detailed guidelines on specific topics, refer to the modular documentation in the '/docs' directory. ALWAYS refer to the relevant .md file BEFORE generating any code:

## Quick Rules

- **Always** read the relevant docs section before modifying an area of the codebase.
- **Never** install a new dependency without checking [docs/tech-stack.md](docs/tech-stack.md) first.
- **Never** create files outside the established directory structure described in [docs/file-structure.md](docs/file-structure.md).
- **Always** keep TypeScript strict mode satisfied — no `any` types, no `ts-ignore` without a comment explaining why.
- **Always** use shadcn/ui components for every UI element — no custom primitives or third-party component libraries.
- **Always** use the `cn()` helper from `@/lib/utils` for conditional class names.
- **Never** use or create `middleware.ts` — it is deprecated in the version of Next.js used in this project. Use `proxy.ts` instead for any request interception or routing logic.
- Run `npm run lint` after every change and fix all reported issues before finishing.
