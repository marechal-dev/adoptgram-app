import { ReactNode } from "react"
import { View } from "react-native"

import { styles } from "./style"

interface BrandInputRootProps {
  children: ReactNode
}

export function Root({ children }: BrandInputRootProps) {
  return <View style={styles.brandInputRoot}>{children}</View>
}
