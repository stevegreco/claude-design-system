import type { HTMLAttributes } from 'react'
import { clsx } from '../clsx.js'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
  /**
   * Announced while the spinner is visible. Pass `null` when a surrounding
   * region already announces the loading state, so it is not read twice.
   */
  label?: string | null
}

/**
 * An indeterminate loading indicator. It takes its colour from `currentColor`,
 * so it inherits whatever it sits inside — including a Button's label colour.
 */
export function Spinner({ size = 'md', label = 'Loading', className, ...props }: SpinnerProps) {
  return (
    <span
      role={label === null ? undefined : 'status'}
      aria-hidden={label === null ? true : undefined}
      className={clsx('mrd-spinner', `mrd-spinner--${size}`, className)}
      {...props}
    >
      <span className="mrd-spinner__track" />
      {label === null ? null : <span className="mrd-visually-hidden">{label}</span>}
    </span>
  )
}
