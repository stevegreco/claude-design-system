import type { ReactNode, SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Edge length in CSS units. Numbers are treated as pixels. */
  size?: number | string
  /**
   * Accessible name. Omit for decorative icons — they are hidden from
   * assistive technology instead of being announced as unlabeled graphics.
   */
  title?: string
}

/**
 * Shared chrome for every icon: 24x24 viewBox, `currentColor` strokes, and the
 * decorative-vs-labeled accessibility split. Generated icon components pass
 * their paths as children.
 */
export function Icon({
  size = '1.25em',
  title,
  children,
  ...props
}: IconProps & { children?: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}
