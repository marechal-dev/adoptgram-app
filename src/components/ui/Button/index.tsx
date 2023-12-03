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
  size?: 'default' | 'slim';
}

const ANDROID_RIPPLE_EFFECT_CONFIGS: PressableAndroidRippleConfig = {
  color: '#7A7264',
};

export function Button({
  onPressHandler,
  children,
  size = 'default',
}: IButtonProps) {
  const outerContainerSize: StyleProp<ViewStyle> =
    size === 'slim'
      ? {
          width: '80%',
        }
      : {
          width: '100%',
        };

  const pressableContainerSize: StyleProp<ViewStyle> =
    size === 'slim'
      ? {
          paddingVertical: 8,
        }
      : {
          paddingVertical: 16,
          paddingHorizontal: 60,
        };

  return (
    <View style={[styles.buttonOuterContainer, outerContainerSize]}>
      <Pressable
        onPress={onPressHandler}
        android_ripple={ANDROID_RIPPLE_EFFECT_CONFIGS}
        style={[styles.buttonPressableContainer, pressableContainerSize]}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}
