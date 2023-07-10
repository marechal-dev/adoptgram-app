import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"
import { styles } from "./style"
import { ReactNode } from "react"

interface ContainerProps {
  innerContainerStyleOverride?: ViewStyle
  children: ReactNode
}

export function Container({
  innerContainerStyleOverride,
  children,
}: ContainerProps) {
  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.keyboardAvoidingContainerDefault}
      style={styles.keyboardAvoidingContainerDefault}
      behavior="position"
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[styles.innerContainerDefault, innerContainerStyleOverride]}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
