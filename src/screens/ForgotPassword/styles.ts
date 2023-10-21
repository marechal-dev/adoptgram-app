import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  forgotPasswordImage: {
    minWidth: 253,
    minHeight: 183,
    marginBottom: 16,
  },
  instructionsContainer: {
    rowGap: 8,
    width: '100%',
  },
  instructionTitle: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.text.main,
    textAlign: 'center',
  },
  instructionText: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    color: colors.text.main,
    fontSize: 16,
  },
  interactionsContainer: {
    rowGap: 64,
    width: '100%',
    marginTop: 16,
  },
});
