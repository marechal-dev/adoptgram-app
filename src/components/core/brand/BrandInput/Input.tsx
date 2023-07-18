import { TextInput, TextInputProps } from "react-native"

import { styles } from "./style"
import { colors } from "../../../../theme/colors"

export type BrandInputInputProps = Omit<
  TextInputProps,
  "style" | "cursorColor" | "placeholderTextColor"
>

export function Input(props: BrandInputInputProps) {
  return (
    <TextInput
      style={styles.input}
      cursorColor={colors.text.mainText90}
      placeholderTextColor={colors.text.mainText90}
      {...props}
    />
  )
}
