import { Feather } from '@expo/vector-icons';
import { Pressable } from 'react-native';

type PressableIconProps = {
  iconProps: {
    iconName: keyof typeof Feather.glyphMap;
    size: number;
    color: string;
  };
  onPress: () => void;
};

export function PressableIcon({ iconProps, onPress }: PressableIconProps) {
  return (
    <Pressable onPress={onPress}>
      <Feather
        name={iconProps.iconName}
        color={iconProps.color}
        size={iconProps.size}
      />
    </Pressable>
  );
}
