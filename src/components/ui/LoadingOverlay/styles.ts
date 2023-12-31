import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20,
  },
  baseText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    color: colors.text.main,
    marginBottom: 12,
    textAlign: 'center',
  },
});
