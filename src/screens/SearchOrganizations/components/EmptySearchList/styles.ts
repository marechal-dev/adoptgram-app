import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Poppins',
    color: colors.text.main,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
  },
  emptyText: {
    fontSize: 16,
  },
});
