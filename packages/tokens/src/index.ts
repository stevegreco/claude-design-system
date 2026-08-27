export { tokens, darkTokens, cssVariables, flatTokens } from './generated/tokens.js'
import { cssVariables, flatTokens, tokens } from './generated/tokens.js'

/** Every token path, e.g. `"color.action.primary"`. */
export type TokenName = keyof typeof flatTokens

export type Tokens = typeof tokens

/**
 * Returns a `var(--mrd-…)` reference for a token so components stay themeable
 * instead of baking in a literal value.
 *
 * @example
 * const style = { color: cssVar('color.action.primary') }
 */
export function cssVar(name: TokenName, fallback?: string): string {
  const variable = name
    .split('.')
    .reduce<unknown>(
      (node, key) => (node as Record<string, unknown> | undefined)?.[key],
      cssVariables,
    )
  if (typeof variable !== 'string') {
    throw new Error(`Unknown design token: ${name}`)
  }
  return fallback === undefined ? `var(${variable})` : `var(${variable}, ${fallback})`
}

/** Resolved light-theme value for a token. Prefer `cssVar` in component code. */
export function token<Name extends TokenName>(name: Name): (typeof flatTokens)[Name] {
  return flatTokens[name]
}
