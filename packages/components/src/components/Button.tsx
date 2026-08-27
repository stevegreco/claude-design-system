import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from '../clsx.js'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Stretches the button to the width of its container. */
  fullWidth?: boolean
  /** Rendered before the label; pass an icon from `@meridian/icons`. */
  startIcon?: ReactNode
  /** Rendered after the label. */
  endIcon?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  startIcon,
  endIcon,
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'mrd-button',
        `mrd-button--${variant}`,
        `mrd-button--${size}`,
        fullWidth && 'mrd-button--full',
        className,
      )}
      {...props}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  )
}
