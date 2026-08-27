import type { HTMLAttributes, ReactNode } from 'react'
import { clsx } from '../clsx.js'

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional heading rendered above the content. */
  title?: ReactNode
  /** Secondary line under the title. */
  description?: ReactNode
  /** Actions pinned to the bottom of the card. */
  footer?: ReactNode
  /** `raised` adds a shadow; `outlined` relies on the border alone. */
  appearance?: 'outlined' | 'raised'
}

export function Card({
  title,
  description,
  footer,
  appearance = 'outlined',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div className={clsx('mrd-card', `mrd-card--${appearance}`, className)} {...props}>
      {title === undefined && description === undefined ? null : (
        <div className="mrd-card__header">
          {title === undefined ? null : <h3 className="mrd-card__title">{title}</h3>}
          {description === undefined ? null : (
            <p className="mrd-card__description">{description}</p>
          )}
        </div>
      )}
      {children === undefined ? null : <div className="mrd-card__body">{children}</div>}
      {footer === undefined ? null : <div className="mrd-card__footer">{footer}</div>}
    </div>
  )
}
