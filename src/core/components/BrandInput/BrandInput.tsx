import { TextInput, TextInputProps, View } from "react-native"

import { styles } from "./style"
import { colors } from "../../../theme/colors"

export type BrandInputProps = TextInputProps

export function BrandInput(props: BrandInputProps) {
  return (
    <View style={styles.brandInputContainer}>
      <TextInput
        style={styles.brandInputText}
        cursorColor={colors.text.mainText90}
        placeholderTextColor={colors.text.mainText90}
        textAlign="left"
        multiline={false}
        {...props}
      />
    </View>
  )
}
