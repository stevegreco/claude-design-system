# Meridian Design System

pnpm workspace holding the three artifacts our consumers install: design tokens,
icons, and React UI components. Everything is published to the internal registry
under the `@meridian` scope.

## Packages

| Package | What it ships | Consumers use it for |
| --- | --- | --- |
| [`@meridian/tokens`](packages/tokens) | TS/JSON/CSS token artifacts generated from one JSON source | colors, spacing, typography, elevation |
| [`@meridian/icons`](packages/icons) | React icon components + raw SVG sources | iconography |
| [`@meridian/components`](packages/components) | React components + `styles.css` | Buttons, fields, cards, layout |

Dependency direction is one-way: `components` → `icons` → `tokens`. Nothing
depends back up the chain.

## Getting started

```bash
pnpm install
pnpm build        # tokens, then icons, then components
pnpm typecheck
pnpm dev          # watch every package in parallel
```

`pnpm build` runs sequentially so `@meridian/tokens` regenerates its artifacts
before the packages that consume them build.

## Consuming the design system

```bash
pnpm add @meridian/components @meridian/icons @meridian/tokens
```

```tsx
import '@meridian/components/styles.css' // pulls in tokens.css
import { Button, Card, Stack } from '@meridian/components'
import { CheckIcon } from '@meridian/icons'

export function Example() {
  return (
    <Card title="Release" appearance="raised">
      <Stack direction="row" gap="2">
        <Button startIcon={<CheckIcon />}>Approve</Button>
        <Button variant="secondary">Cancel</Button>
      </Stack>
    </Card>
  )
}
```

Dark mode follows `prefers-color-scheme` and can be forced per subtree with
`data-theme="dark"` or `data-theme="light"`.

## Conventions

- **Versions live in the catalog.** Shared dependency ranges are declared once in
  `pnpm-workspace.yaml` under `catalog:`; packages reference them as `catalog:`.
- **Tokens are the only place literal values live.** Component CSS references
  `--mrd-*` custom properties, never raw hex or px values.
- **Every package builds with tsdown** to ESM + CJS with type declarations.
- **React is a peer dependency** so consumers control the React version.

## Repo layout

```
packages/
  tokens/       src/tokens.json -> dist/{tokens.css,tokens.json,tokens.flat.json} + typed API
  icons/        src/svg/*.svg + React components over a shared <Icon> primitive
  components/   React components + hand-authored styles.css
```

## Not wired up yet

Deliberate gaps to fill when the design system moves past scaffolding:

- release tooling (Changesets or similar) and a publish pipeline
- tests (Vitest + Testing Library) and visual review (Storybook)
- linting/formatting (ESLint, Prettier or Biome)
- CI running `build`, `typecheck`, and `publint`/`attw` package validation
