import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  buttonPressableContainer: {
    backgroundColor: colors.brand.orange500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    color: colors.text.main,
    textAlign: 'center',
  },
});
