import { StyleSheet } from "react-native"

import { colors } from "../../../theme/colors"

export const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 6,
  },
  horizontalLine: {
    height: 0,
    width: 90,
    borderWidth: 1,
    borderColor: colors.brand.blue300,
    backgroundColor: colors.brand.blue300,
  },
  textBetweenLines: {
    fontFamily: "Poppins",
    fontSize: 10,
    color: colors.brand.blue300,
  },
})
