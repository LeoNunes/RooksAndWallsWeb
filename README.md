# Rooks and Walls - Web

Frontend application for the Rooks and Walls project. Built with React 19 and Vite.

## Available Scripts

- `npm run dev` — Start the development server at [http://localhost:5173](http://localhost:5173)
- `npm run build` — Type-check and build for production (output in `dist/`)
- `npm run preview` — Preview the production build locally
- `npm run test` — Run tests in watch mode
- `npm run test:run` — Run tests once
- `npm run typecheck` — Type-check without emitting files
- `npm run lint` — Lint the codebase with Biome
- `npm run lint:fix` — Lint and auto-fix

## Environment Configuration

The app loads its runtime configuration from `/envConfig.json` before rendering. This file is fetched at startup via `src/EnvConfig.ts` and must be present before the app initialises.

### Local Development

A placeholder `public/envConfig.json` is included in the repo and is served automatically by Vite during `npm run dev`:

```json
{ "apiBaseUrl": "http://127.0.0.1:5000", "wsBaseUrl": "ws://127.0.0.1:5000" }
```

Edit this file to point at a different local or remote backend if needed. It is not used in deployed environments.

### Deployed Environments

In AWS, `envConfig.json` is written to the S3 bucket by the `WebPipeline` at deploy time (see [RooksAndWallsCDK](https://github.com/LeoNunes/RooksAndWallsCDK/blob/main/README.md)). The values are derived from the CDK config and are never stored in this repository.

## Deployment

Deployments are managed by the `WebPipeline` in [RooksAndWallsCDK](https://github.com/LeoNunes/RooksAndWallsCDK). Pushing to `main` triggers the pipeline, which:

1. Builds the app with `npm ci && npm run build`
2. For each environment wave, writes a environment-specific `envConfig.json` and syncs the `dist/` output to the environment's S3 bucket
3. Invalidates the CloudFront distribution so the new version is served immediately

The app is served globally via CloudFront. The Beta environment is available at `https://beta.games.leonunes.me`.
