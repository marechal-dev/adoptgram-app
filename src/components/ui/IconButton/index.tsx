import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { styles } from './styles';

type IconButtonProps = {
  iconProps: {
    iconName: keyof typeof Feather.glyphMap;
    size: number;
    color: string;
  };
  onPress: () => void;
};

export function IconButton({ iconProps, onPress }: IconButtonProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Feather
          name={iconProps.iconName}
          size={iconProps.size}
          color={iconProps.color}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
