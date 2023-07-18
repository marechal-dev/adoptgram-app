import { StyleSheet } from "react-native"
import { colors } from "../../../../theme/colors"

export const styles = StyleSheet.create({
  buttonOuterContainer: {
    width: "100%",
    minHeight: 42,
    maxHeight: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 4,
  },
  buttonPressableContainer: {
    width: "100%",
    backgroundColor: colors.brand.orange500,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 60,
  },
  buttonText: {
    fontFamily: "Poppins",
    fontSize: 18,
    color: colors.text.mainText90,
    textAlign: "center",
  },
})
