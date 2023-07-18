import { ReactNode } from "react"
import { StyleProp, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export type SafeAreaContainerProps = {
  style?: StyleProp<ViewStyle>
  children: ReactNode
}

export function SafeAreaContainer({ style, children }: SafeAreaContainerProps) {
  return <SafeAreaView style={style}>{children}</SafeAreaView>
}
