# @meridian/icons

Icon set for the Meridian design system: React components plus the raw SVG sources they
were drawn from.

## Usage

```tsx
import { CheckIcon, SearchIcon } from '@meridian/icons'

<CheckIcon />                        // decorative: aria-hidden
<SearchIcon title="Search" />        // labeled: role="img" with a <title>
<CheckIcon size={20} />              // pixels
<CheckIcon size="1.5em" />           // scales with font size (default 1.25em)
```

Icons stroke with `currentColor`, so they inherit text color and need no
per-icon theming.

Raw SVGs ship too, for non-React consumers and for design-tool round trips:

```ts
import checkUrl from '@meridian/icons/svg/check.svg'
```

## Current set

`CheckIcon`, `ChevronRightIcon`, `CloseIcon`, `SearchIcon`, `WarningIcon` —
placeholders on a 24×24 grid with a 2px stroke, pending the real icon library.

## Adding an icon

1. Drop the optimized SVG in `src/svg/` (24×24 viewBox, `stroke="currentColor"`,
   no hardcoded fills or sizes).
2. Add a component in `src/icons/` that renders the paths inside `<Icon>`.
3. Export it from `src/index.ts`.

`Icon` owns the viewBox, sizing, stroke defaults, and the decorative-vs-labeled
accessibility split, so icon components stay one JSX element each. When the real
set arrives, this step becomes an SVG-to-component codegen script.
