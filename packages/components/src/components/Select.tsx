import { useId, type ReactNode, type SelectHTMLAttributes } from 'react'
import { WarningIcon } from '@meridian/icons'
import { clsx } from '../clsx.js'

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string
  /** Helper text shown under the control when there is no error. */
  hint?: ReactNode
  /** Presence of an error message switches the control into its invalid state. */
  error?: string
  /** Visually hides the label while keeping it available to screen readers. */
  hideLabel?: boolean
  /** `<option>` elements. Include a placeholder option yourself if you need one. */
  children?: ReactNode
}

/**
 * A native `<select>` wearing the same field chrome as `TextField`. Native is
 * deliberate: it inherits the platform's picker on touch devices, which no
 * custom listbox matches.
 */
export function Select({
  label,
  hint,
  error,
  hideLabel = false,
  className,
  id,
  children,
  ...props
}: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const messageId = `${selectId}-message`
  const message = error ?? hint

  return (
    <div className={clsx('mrd-field', error && 'mrd-field--invalid', className)}>
      <label
        className={clsx('mrd-field__label', hideLabel && 'mrd-visually-hidden')}
        htmlFor={selectId}
      >
        {label}
      </label>
      <select
        id={selectId}
        className="mrd-field__select"
        aria-invalid={error ? true : undefined}
        aria-describedby={message === undefined ? undefined : messageId}
        {...props}
      >
        {children}
      </select>
      {message === undefined ? null : (
        <p
          id={messageId}
          className={clsx('mrd-field__message', error && 'mrd-field__message--error')}
        >
          {error ? <WarningIcon size="1em" /> : null}
          {message}
        </p>
      )}
    </div>
  )
}
