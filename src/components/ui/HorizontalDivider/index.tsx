import { ReactNode } from "react"
import { View } from "react-native"

import { HorizontalLine } from "./HorizontalLine"
import { MiddleText } from "./MiddleText"
import { styles } from "./styles"

export type HorizontalDividerProps = {
  children: ReactNode
}

export function HorizontalDivider({ children }: HorizontalDividerProps) {
  return (
    <View style={styles.container}>
      <HorizontalLine />
      <MiddleText>{children}</MiddleText>
      <HorizontalLine />
    </View>
  )
}
