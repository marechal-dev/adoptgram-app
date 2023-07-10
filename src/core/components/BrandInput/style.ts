import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

export const styles = StyleSheet.create({
  brandInputRoot: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    minWidth: 280,
    width: "100%",
    minHeight: 48,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 4,
  },
  brandInputInput: {
    flex: 1,
    height: "100%",
    fontFamily: "Poppins",
    fontSize: 14,
    color: colors.text.mainText90,
    textAlign: "left",
  },
});
