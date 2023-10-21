import { ReactNode } from 'react';
import {
  Pressable,
  PressableAndroidRippleConfig,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { styles } from './styles';

interface IButtonProps {
  onPressHandler: () => void;
  children: ReactNode;
  size?: 'slim' | 'default';
}

const ANDROID_RIPPLE_EFFECT_CONFIGS: PressableAndroidRippleConfig = {
  color: '#7A7264',
};

export function BrandButton({
  onPressHandler,
  children,
  size = 'default',
}: IButtonProps) {
  const outerContainerSize: StyleProp<ViewStyle> =
    size === 'slim'
      ? {
          height: 42,
        }
      : {
          height: 58,
        };

  return (
    <View style={[styles.buttonOuterContainer, outerContainerSize]}>
      <Pressable
        onPress={onPressHandler}
        android_ripple={ANDROID_RIPPLE_EFFECT_CONFIGS}
        style={styles.buttonPressableContainer}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}
