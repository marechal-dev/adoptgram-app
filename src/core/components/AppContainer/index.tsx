import { StyleSheet, View, ViewProps } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { styles } from "./styles"

type AppContainerProps = ViewProps

export function AppContainer({ onLayout, children }: AppContainerProps) {
  const insets = useSafeAreaInsets()

  const insetsStyle = StyleSheet.create({
    insets: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingBottom: insets.bottom,
      paddingRight: insets.right,
    },
  })

  return (
    <View style={[styles.appContainer, insetsStyle.insets]} onLayout={onLayout}>
      {children}
    </View>
  )
}
