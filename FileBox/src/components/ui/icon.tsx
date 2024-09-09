import { icons, IconName } from '@/assets/icons'

interface IconProps {
  name: IconName
  className?: string
}

export function Icon({ name, className }: IconProps) {
  const IconComponent = icons[name]
  return <IconComponent className={className} />
}
