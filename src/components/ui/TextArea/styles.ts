import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  inputRoot: {
    rowGap: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    minHeight: 100,
    maxHeight: 200,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    fontFamily: 'Poppins',
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'left',
  },
  focusedInputBorder: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.brand.blue800,
    borderRadius: 12,
  },
  errorMessage: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: colors.brand.error,
  },
});
