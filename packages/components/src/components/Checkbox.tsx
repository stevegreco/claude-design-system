import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { WarningIcon } from '@meridian/icons'
import { clsx } from '../clsx.js'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
  /** Helper text shown under the label when there is no error. */
  hint?: ReactNode
  /** Presence of an error message switches the checkbox into its invalid state. */
  error?: string
}

/**
 * A native checkbox with the label, hint, and error wiring `TextField` does.
 * The box itself is the browser's, tinted with `accent-color`, so it keeps
 * native keyboard behaviour and the platform's indeterminate rendering.
 */
export function Checkbox({ label, hint, error, className, id, ...props }: CheckboxProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const message = error ?? hint

  return (
    <div className={clsx('mrd-checkbox', error && 'mrd-checkbox--invalid', className)}>
      <div className="mrd-checkbox__control">
        <input
          id={inputId}
          type="checkbox"
          className="mrd-checkbox__input"
          aria-invalid={error ? true : undefined}
          aria-describedby={message === undefined ? undefined : messageId}
          {...props}
        />
        <label className="mrd-checkbox__label" htmlFor={inputId}>
          {label}
        </label>
      </div>
      {message === undefined ? null : (
        <p
          id={messageId}
          className={clsx('mrd-checkbox__message', error && 'mrd-checkbox__message--error')}
        >
          {error ? <WarningIcon size="1em" /> : null}
          {message}
        </p>
      )}
    </div>
  )
}
