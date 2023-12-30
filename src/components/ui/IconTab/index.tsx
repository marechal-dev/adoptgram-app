import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, PressableAndroidRippleConfig, View } from 'react-native';

import { styles } from './styles';

type IconTabProps = {
  iconProps: {
    iconName: keyof typeof Feather.glyphMap;
    size: number;
    color: string;
  };
  longPressLabel: string;
  onPress: () => void;
};

const ANDROID_RIPPLE_EFFECT_CONFIGS: PressableAndroidRippleConfig = {
  color: '#7A7264',
};

export function IconTab({ iconProps, longPressLabel, onPress }: IconTabProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityLabel={longPressLabel}
        accessibilityHint={longPressLabel}
        android_ripple={ANDROID_RIPPLE_EFFECT_CONFIGS}
        style={styles.pressableContainer}
        onPress={onPress}
      >
        <Feather
          name={iconProps.iconName}
          size={iconProps.size}
          color={iconProps.color}
        />
      </Pressable>
    </View>
  );
}
