import type { HTMLAttributes, ReactNode } from 'react'
import { CheckIcon, CloseIcon, InfoIcon, WarningIcon } from '@meridian/icons'
import { clsx } from '../clsx.js'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone
  /** Optional heading above the message. */
  title?: ReactNode
  /** Renders a dismiss button. Omit for an alert the user cannot close. */
  onDismiss?: () => void
  /** Accessible name for the dismiss button. */
  dismissLabel?: string
}

const ICONS = {
  info: InfoIcon,
  success: CheckIcon,
  warning: WarningIcon,
  danger: WarningIcon,
} as const

/**
 * An inline status message. `danger` announces assertively via `role="alert"`;
 * the quieter tones use `role="status"` so they do not interrupt a screen
 * reader mid-sentence. Pass `role` yourself to override.
 */
export function Alert({
  tone = 'info',
  title,
  onDismiss,
  dismissLabel = 'Dismiss',
  className,
  children,
  ...props
}: AlertProps) {
  const ToneIcon = ICONS[tone]

  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={clsx('mrd-alert', `mrd-alert--${tone}`, className)}
      {...props}
    >
      <ToneIcon className="mrd-alert__icon" size="1.25em" />
      <div className="mrd-alert__content">
        {title === undefined ? null : <p className="mrd-alert__title">{title}</p>}
        {children === undefined ? null : <div className="mrd-alert__body">{children}</div>}
      </div>
      {onDismiss === undefined ? null : (
        <button
          type="button"
          className="mrd-alert__dismiss"
          onClick={onDismiss}
          aria-label={dismissLabel}
        >
          <CloseIcon size="1em" />
        </button>
      )}
    </div>
  )
}
