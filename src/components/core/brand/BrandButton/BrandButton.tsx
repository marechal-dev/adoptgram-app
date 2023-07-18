import { ReactNode } from "react";
import {
  View,
  Pressable,
  Text,
  PressableAndroidRippleConfig,
} from "react-native";

import { styles } from "./style";

interface BrandButtonProps {
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
  color: "#7A7264",
};

export function BrandButton({
  onPressHandler,
  children,
  paddingOverride,
  fontSizeOverride,
}: BrandButtonProps) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPressHandler}
        android_ripple={ANDROID_RIPPLE_EFFECT_CONFIGS}
        style={[
          styles.buttonPressableContainer,
          paddingOverride ? paddingOverride : null,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            fontSizeOverride ? fontSizeOverride : null,
          ]}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
}
