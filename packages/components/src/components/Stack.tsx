import type { CSSProperties, ElementType, HTMLAttributes } from 'react'
import { cssVar, type TokenName } from '@meridian/tokens'
import { clsx } from '../clsx.js'

/** Keys of the `space.*` scale, e.g. `"4"`. */
export type SpaceScale = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column'
  gap?: SpaceScale
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  wrap?: boolean
  /** Render as a different element, e.g. `"section"` or `"ul"`. */
  as?: ElementType
}

/**
 * Layout primitive. Spacing comes from the token scale rather than raw
 * lengths, so consumers cannot drift off the grid.
 */
export function Stack({
  direction = 'column',
  gap = '4',
  align,
  justify,
  wrap = false,
  as: Component = 'div',
  className,
  style,
  ...props
}: StackProps) {
  return (
    <Component
      className={clsx('mrd-stack', className)}
      style={{
        flexDirection: direction,
        gap: cssVar(`space.${gap}` as TokenName),
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? 'wrap' : undefined,
        ...style,
      }}
      {...props}
    />
  )
}
