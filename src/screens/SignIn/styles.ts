import { StyleSheet } from "react-native"

import { colors } from "@Theme/colors"

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 36,
    paddingBottom: 42,
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
