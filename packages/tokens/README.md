# @meridian/tokens

Design tokens for the Meridian design system. `src/tokens.json` is the single source of
truth; every published artifact is generated from it by
`scripts/build-tokens.mjs`.

## Artifacts

| Import | Contents |
| --- | --- |
| `@meridian/tokens` | typed `tokens`, `darkTokens`, `cssVariables`, `flatTokens`, plus `cssVar()` and `token()` |
| `@meridian/tokens/tokens.css` | `--mrd-*` custom properties for light and dark themes |
| `@meridian/tokens/tokens.json` | nested tokens with resolved values and variable names |
| `@meridian/tokens/tokens.flat.json` | `"color.action.primary": "#3860e8"` map, for design-tool sync |
| `@meridian/tokens/source` | the unresolved source JSON, aliases intact |

## Usage

```ts
import { cssVar, token, tokens } from '@meridian/tokens'

cssVar('color.action.primary') // "var(--mrd-color-action-primary)"
cssVar('space.4', '1rem')      // "var(--mrd-space-4, 1rem)"
token('font.size.md')          // "1rem" — literal, typed as the exact value
tokens.color.brand[500]        // "#3860e8"
```

Prefer `cssVar()` in component code: it keeps values themeable at runtime.
Reach for `token()` only where a literal is unavoidable (canvas rendering,
email HTML, native).

## Token structure

Two layers, matching the usual design-system split:

- **Primitives** — `color.brand.*`, `color.neutral.*`, `space.*`, `radius.*`,
  `font.*`, `shadow.*`, `duration.*`, `zIndex.*`. Raw values, theme-agnostic.
- **Semantic** — `color.background.*`, `color.foreground.*`, `color.border.*`,
  `color.action.*`. These alias primitives and are what components should use.

An entry looks like:

```json
{
  "color": {
    "background": {
      "canvas": { "value": "{color.neutral.0}", "dark": "{color.neutral.1000}" }
    }
  }
}
```

`value` is the light theme, optional `dark` is the dark-theme override, and
`{path.to.token}` aliases are resolved at build time (chains included; cycles
fail the build). Camel-cased keys become kebab-case CSS variables:
`color.foreground.onBrand` → `--mrd-color-foreground-on-brand`.

## Adding or changing a token

1. Edit `src/tokens.json`.
2. Run `pnpm --filter @meridian/tokens build`.
3. Consumers pick up the change through the regenerated CSS and typed API — the
   typed API narrows to literal values, so removing a token is a type error
   downstream rather than a silent runtime miss.

`src/generated/` is build output and is not committed.
