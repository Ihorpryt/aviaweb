import { icons, type IconName } from "./index"

type IconProps = {
  name: IconName
  className?: string
  title?: string
}

export function Icon({ name, className, title }: IconProps) {
  const Svg = icons[name]

  return (
    <Svg
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      title={title}
    />
  )
}

