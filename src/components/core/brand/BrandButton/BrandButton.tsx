import { ReactNode } from 'react';
import {
  Pressable,
  PressableAndroidRippleConfig,
  Text,
  View,
} from 'react-native';

import { styles } from './styles';

interface IBrandButtonProps {
  onPressHandler: () => void;
  children: ReactNode;
  paddingOverride?: {
    paddingVertical?: number;
    paddingHorizontal?: number;
  };
  fontSizeOverride?: {
    fontSize: number;
  };
}

const ANDROID_RIPPLE_EFFECT_CONFIGS: PressableAndroidRippleConfig = {
  color: '#7A7264',
};

export function BrandButton({
  onPressHandler,
  children,
  paddingOverride,
  fontSizeOverride,
}: IBrandButtonProps) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPressHandler}
        android_ripple={ANDROID_RIPPLE_EFFECT_CONFIGS}
        style={[styles.buttonPressableContainer, paddingOverride || null]}
      >
        <Text style={[styles.buttonText, fontSizeOverride || null]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}
