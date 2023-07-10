import { StyleSheet } from "react-native";
import { colors } from "../../../../theme/colors";

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  pressableContainer: {
    flexDirection: "column",
    rowGap: 8,
    alignItems: "center",
    maxWidth: 56,
  },
  roundedContainer: {
    width: 58,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: colors.brand.orange500
  },
  buttonText: {
    width: "100%",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Poppins",
  },
})
