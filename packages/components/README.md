# @meridian/components

React components for the Meridian design system. Styling is a single plain stylesheet
built entirely on `@meridian/tokens` custom properties — no CSS-in-JS runtime, no
build-time style pipeline for consumers to configure.

## Usage

```tsx
import '@meridian/components/styles.css' // once, at your app entry
import { Badge, Button, Card, Stack, TextField } from '@meridian/components'
```

`styles.css` `@import`s `@meridian/tokens/tokens.css`, which bundlers that resolve
bare specifiers in CSS (Vite, Next.js, webpack 5) handle for you. If yours does
not, import `@meridian/tokens/tokens.css` yourself first.

## Components

| Component | Notes |
| --- | --- |
| `Button` | `variant` primary / secondary / ghost / danger, `size` sm / md / lg, `fullWidth`, `startIcon`, `endIcon` |
| `Badge` | `tone` neutral / brand / success / warning / danger |
| `Card` | `title`, `description`, `footer`, `appearance` outlined / raised |
| `Stack` | flex layout; `direction`, `gap` (token scale), `align`, `justify`, `wrap`, `as` |
| `TextField` | label + input + hint/error, wired with `aria-describedby` and `aria-invalid` |

```tsx
<Stack direction="row" gap="3" align="center">
  <TextField label="Email" hint="Work address" />
  <Button variant="primary">Invite</Button>
  <Badge tone="success">Active</Badge>
</Stack>
```

## Conventions

- Class names are `mrd-<block>__<element>--<modifier>`; every component accepts
  `className` and spreads the rest of its props onto the root element.
- `gap` and other spacing props take token scale keys (`"4"`), not lengths, so
  layouts cannot drift off the spacing grid.
- Focus styling uses `:focus-visible` with the `color.border.focus` token.
- React is a peer dependency; `@meridian/tokens` and `@meridian/icons` stay external
  in the bundle so consumers get one copy of each.
