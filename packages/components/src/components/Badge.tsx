import type { HTMLAttributes } from 'react'
import { clsx } from '../clsx.js'

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

export function Badge({ tone = 'neutral', className, children, ...props }: BadgeProps) {
  return (
    <span className={clsx('mrd-badge', `mrd-badge--${tone}`, className)} {...props}>
      {children}
    </span>
  )
}
