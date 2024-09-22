import { icons, IconName } from '@/assets/icons'

interface IconProps {
  name: IconName
  className?: string
}

export function Icon({ name, className }: IconProps) {
  const IconComponent = icons[name]
  if (!IconComponent) {
    return <Icon name="unknown" className={className} />
  }
  return <IconComponent className={className} />
}
