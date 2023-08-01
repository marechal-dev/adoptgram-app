import { View, ViewProps } from "react-native"

import { styles } from "./styles"

type AppShellProps = ViewProps

export function AppShell({ onLayout, children }: AppShellProps) {
  return (
    <View style={styles.shell} onLayout={onLayout}>
      {children}
    </View>
  )
}
