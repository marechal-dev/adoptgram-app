import { View, Text, Pressable } from "react-native"
import { styles } from "./style"
import { colors } from "../../../../theme/colors"
import Feather from "@expo/vector-icons/Feather"

interface FormToggleButtonProps {
  icon: keyof typeof Feather.glyphMap
  text: string
  isSelected: boolean
  onPressHandler: () => void
}

export function FormToggleButton({
  icon,
  text,
  isSelected,
  onPressHandler,
}: FormToggleButtonProps) {
  return (
    <Pressable style={styles.pressableContainer} onPress={onPressHandler}>
      <View
        style={[
          styles.roundedContainer,
          {
            backgroundColor: isSelected
              ? colors.brand.blue800
              : colors.brand.orange500,
            elevation: isSelected ? 0 : 10,
          },
        ]}
      >
        <Feather
          name={icon}
          size={38}
          color={isSelected ? colors.brand.orange500 : colors.brand.blue800}
        />
      </View>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  )
}
