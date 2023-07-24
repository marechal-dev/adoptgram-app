import { StyleSheet } from "react-native"
import { colors } from "../../theme/colors"

export const styles = StyleSheet.create({
  innerContainer: {
    paddingTop: 82,
    paddingHorizontal: 36,
  },
  headingText: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 24,
    color: colors.text.mainText90,
  },
  formToggleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 66,
    marginVertical: 24,
  },
})
