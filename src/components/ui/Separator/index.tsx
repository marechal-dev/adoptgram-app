import { View } from 'react-native';

type SeparatorProps = {
  size?: number;
  color?: string;
};

export function HorizontalSeparator({
  size = 1,
  color = 'transparent',
}: SeparatorProps) {
  const style = {
    height: size,
    backgroundColor: color,
  };

  return <View style={style} />;
}

export function VerticalSeparator({
  size = 1,
  color = 'transparent',
}: SeparatorProps) {
  const style = {
    width: size,
    backgroundColor: color,
  };

  return <View style={style} />;
}
