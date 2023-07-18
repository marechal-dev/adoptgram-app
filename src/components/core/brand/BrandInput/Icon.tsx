import Feather from "@expo/vector-icons/Feather"

interface BrandInputIconProps {
  iconName: keyof typeof Feather.glyphMap
  size: number
  color: string
}

export function Icon({ iconName, size, color }: BrandInputIconProps) {
  return <Feather name={iconName} size={size} color={color} />
}
