import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';

import { styles } from './styles';

type IconButtonProps = {
  iconProps: {
    iconName: keyof typeof Feather.glyphMap;
    size: number;
    color: string;
  };
};

export function IconButton({ iconProps }: IconButtonProps) {
  return (
    <View style={styles.container}>
      <Feather
        name={iconProps.iconName}
        size={iconProps.size}
        color={iconProps.color}
      />
    </View>
  );
}
