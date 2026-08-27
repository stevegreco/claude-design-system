import { Icon, type IconProps } from '../Icon.js'

export function WarningIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5 2.5 20h19L12 3.5Z" />
      <path d="M12 9.5v5" />
      <path d="M12 17.5h.01" />
    </Icon>
  )
}
