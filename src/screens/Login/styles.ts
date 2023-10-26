import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    width: '100%',
    marginBottom: 30,
  },
  loginImage: {
    minWidth: 280,
    minHeight: 108,
    maxWidth: 300,
    maxHeight: 128,
    marginBottom: 36,
  },
  loginHeading: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 22,
    lineHeight: 30,
    color: colors.text.main,
  },
  emphasizedHeadingSpan: {
    fontStyle: 'italic',
    color: colors.text.main,
  },
  inputsContainer: {
    width: '100%',
    alignItems: 'center',
    rowGap: 6,
    marginBottom: 20,
  },
  forgotPasswordWrapper: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 30,
    textAlign: 'right',
    color: colors.brand.blue800,
  },
  otherOptionsContainer: {
    alignItems: 'center',
    rowGap: 12,
  },
  otherOptionsTextsContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 0,
  },
  otherOptionsText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 20,
    color: colors.text.main,
  },
  otherOptionsPressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherOptionsPressableText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 20,
    color: colors.brand.blue800,
  },
});
