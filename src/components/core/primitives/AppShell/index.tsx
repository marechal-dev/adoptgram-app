import { ReactNode } from "react"
import { View } from "react-native"

import { styles } from "./styles"

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return <View style={styles.shell}>{children}</View>
}
