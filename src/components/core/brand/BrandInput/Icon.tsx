import Feather from '@expo/vector-icons/Feather';

interface IBrandInputIconProps {
  iconName: keyof typeof Feather.glyphMap;
  size: number;
  color: string;
}

export function Icon({ iconName, size, color }: IBrandInputIconProps) {
  return <Feather name={iconName} size={size} color={color} />;
}
