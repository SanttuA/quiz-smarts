# Quiz Smarts

A frontend-only technical quiz platform built with React, TypeScript, TanStack Router, and Vite. The first topic teaches Robot Framework through a concise cheatsheet and four interactive question styles.

## Local development

Use Node 24 and the package-manager version declared in `package.json`:

```sh
corepack enable
corepack prepare pnpm@11.12.0 --activate
corepack pnpm install
corepack pnpm dev
```

The pnpm workspace configuration rejects direct and transitive releases published less than 24 hours ago. Dependencies are exact-versioned and the lockfile is committed for reproducible installs.

## Quality checks

```sh
corepack pnpm format:check
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test:coverage
corepack pnpm e2e
corepack pnpm build
```

## Architecture

- `src/content` contains the generic topic/question contracts and topic registry.
- `src/content/topics/robot-framework` owns its metadata, cheatsheet, and small question modules.
- `src/features/quiz` contains the topic-independent state machine, evaluators, shuffling, and interaction components.
- `src/routes` contains small file-based TanStack Router entrypoints.

Each topic configures its full question count and one shorter subset size. Short attempts sample
as evenly as possible across the question styles available in that topic.

To add a topic, create a self-contained topic module, give every question a globally unique ID, add a lightweight metadata entry and lazy loader to the registry, and extend the content-integrity tests. The quiz engine does not contain Robot Framework-specific behavior.

## GitHub Pages

The production base path is `/quiz-smarts/`, while hash history keeps every client route refresh-safe on static hosting. In the repository’s **Settings → Pages** screen, select **GitHub Actions** as the source. The workflow checks formatting, lint, types, unit/component tests, browser tests, and the production build before deploying pushes to `main`.

## License

Licensed under the [MIT License](LICENSE).
