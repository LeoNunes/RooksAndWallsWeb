# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

```bash
npm run dev          # Dev server at http://localhost:5173
npm run build        # Type-check + production build → dist/
npm run test         # Vitest in watch mode
npm run test:run     # Vitest once
npm run typecheck    # Type-check without emitting
npm run lint         # Biome check
npm run lint:fix     # Biome check + auto-fix
```

Linter: **Biome**, runs automatically on staged files via husky + lint-staged.

## Architecture

**Layered structure:** `Domain/` (pure state + logic) → `Services/` (WebSocket communication) → `Controllers/` (hooks bridging domain to component props) → `Components/` (UI).

**Board rendering** uses a Higher-Order Component pattern. `Components/Board/BoardBase.tsx` renders the grid; `with*.tsx` HOCs wrap it to layer on piece display, drag-and-drop, click movement, wall placement, and highlights. The final board used in-game is composed by stacking these HOCs.

**Environment config:** The app fetches `/envConfig.json` at startup (`src/EnvConfig.ts`) to get `apiBaseUrl` and `wsBaseUrl`. In local dev, `public/envConfig.json` points to `http://127.0.0.1:5000`. In deployed environments this file is injected by the CDK pipeline at deploy time and is never committed to the repo.
