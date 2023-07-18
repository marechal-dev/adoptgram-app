import { StyleSheet } from "react-native"
import { colors } from "../../theme/colors"

export const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 82,
    paddingHorizontal: 42,
  },
  loginImage: {
    minWidth: 280,
    minHeight: 108,
    maxWidth: 300,
    maxHeight: 128,
    marginBottom: 36,
  },
  headingContainer: {
    minWidth: 190,
    minHeight: 60,
    maxWidth: 200,
    marginBottom: 30,
  },
  loginHeading: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 22,
    lineHeight: 30,
    color: colors.text.mainText90,
  },
  emphasizedHeadingSpan: {
    fontStyle: "italic",
    color: colors.text.mainText90,
  },
  inputsContainer: {
    width: "100%",
    rowGap: 12,
    marginBottom: 20,
  },
  forgotPasswordWrapper: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontFamily: "Poppins",
    fontSize: 12,
    lineHeight: 30,
    textAlign: "right",
    color: colors.brand.blue800,
  },
  otherOptionsContainer: {
    alignItems: "center",
    rowGap: 12,
  },
  otherOptionsTextsContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 0,
  },
  otherOptionsText: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 14,
    lineHeight: 20,
    color: colors.text.mainText90,
  },
  otherOptionsPressable: {
    justifyContent: "center",
    alignItems: "center",
  },
  otherOptionsPressableText: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 14,
    lineHeight: 20,
    color: colors.brand.blue800,
  },
})
