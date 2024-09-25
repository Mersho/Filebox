import { icons, IconName } from '@/assets/icons'
import { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = icons[name]
  if (!IconComponent) {
    return <Icon name="unknown" {...props} />
  }
  return <IconComponent {...props} />
}
