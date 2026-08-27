import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { WarningIcon } from '@meridian/icons'
import { clsx } from '../clsx.js'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  /** Helper text shown under the input when there is no error. */
  hint?: ReactNode
  /** Presence of an error message switches the field into its invalid state. */
  error?: string
  /** Visually hides the label while keeping it available to screen readers. */
  hideLabel?: boolean
}

export function TextField({
  label,
  hint,
  error,
  hideLabel = false,
  className,
  id,
  ...props
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const message = error ?? hint

  return (
    <div className={clsx('mrd-field', error && 'mrd-field--invalid', className)}>
      <label
        className={clsx('mrd-field__label', hideLabel && 'mrd-visually-hidden')}
        htmlFor={inputId}
      >
        {label}
      </label>
      <input
        id={inputId}
        className="mrd-field__input"
        aria-invalid={error ? true : undefined}
        aria-describedby={message === undefined ? undefined : messageId}
        {...props}
      />
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
