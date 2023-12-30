import { View } from 'react-native';

type ListItemSeparatorProps = {
  horizontal?: boolean;
  size: `${number}%` | number;
  color?: string;
};

export function ListItemSeparator({
  horizontal,
  size,
  color,
}: ListItemSeparatorProps) {
  const separatorStyle = horizontal
    ? {
        height: size,
        borderWidth: 1,
        borderColor: !color ? 'transparent' : color,
        backgroundColor: !color ? 'transparent' : color,
        borderRadius: 50,
      }
    : {
        width: size,
        borderWidth: 1,
        borderColor: !color ? 'transparent' : color,
        backgroundColor: !color ? 'transparent' : color,
        borderRadius: 50,
      };

  return <View style={separatorStyle} />;
}
