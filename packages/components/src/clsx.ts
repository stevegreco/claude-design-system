/**
 * Minimal class-name joiner. Kept in-tree so the published package has no
 * runtime dependencies beyond React and the design system itself.
 */
export function clsx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
