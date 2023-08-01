import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 82,
    paddingHorizontal: 36,
  },
  innerOnboardingInformationContainer: {
    minWidth: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  onboardingImage: {
    minWidth: 244,
    minHeight: 200,
    maxWidth: 288,
    maxHeight: 244,
    marginBottom: 12,
  },
  onboardingText: {
    fontFamily: "Poppins",
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'center',
    color: colors.text.mainText90,
  },
  onboardingTextSpan: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.text.mainText90,
  },
})