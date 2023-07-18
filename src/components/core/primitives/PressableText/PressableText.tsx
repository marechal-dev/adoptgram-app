import { ReactNode } from "react";
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";

type PressableTextProps = {
  onPressHandler: () => void;
  pressableStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  children: ReactNode;
};

export function PressableText({
  onPressHandler,
  pressableStyle,
  textStyle,
  children,
}: PressableTextProps) {
  return (
    <Pressable
      onPress={onPressHandler}
      style={({ pressed }) =>
        pressed ? [pressableStyle, { opacity: 0.6 }] : pressableStyle
      }
    >
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
}
