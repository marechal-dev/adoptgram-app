import { TextInput, TextInputProps } from "react-native"

import MaskInput, { Mask, MaskInputProps } from "react-native-mask-input"

import { styles } from "./style"
import { colors } from "../../../../theme/colors"

export type BrandInputInputWithMaskProps = Omit<
  MaskInputProps,
  "style" | "cursorColor" | "placeholderTextColor"
>

export function InputWithMask(props: BrandInputInputWithMaskProps) {
  return (
    <MaskInput
      style={styles.input}
      cursorColor={colors.text.mainText90}
      placeholderTextColor={colors.text.mainText90}
      {...props}
    />
  )
}
