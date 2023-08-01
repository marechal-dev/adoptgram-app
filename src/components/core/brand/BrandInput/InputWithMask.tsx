import MaskInput, { MaskInputProps } from "react-native-mask-input"

import { styles } from "./styles"
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
