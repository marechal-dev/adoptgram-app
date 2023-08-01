import { StyleSheet } from "react-native"

import { colors } from "@Theme/colors"

export const styles = StyleSheet.create({
  inputRoot: {
    width: "100%",
    rowGap: 8,
  },
  brandInputRoot: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    minWidth: 280,
    minHeight: 56,
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 4,
  },
  input: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    fontFamily: "Poppins",
    fontSize: 16,
    color: colors.text.mainText90,
    textAlign: "left",
    textAlignVertical: "center",
  },
  focusedInputBorder: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.brand.blue800,
    borderRadius: 12,
  },
  errorMessage: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: colors.brand.red600,
  },
})
