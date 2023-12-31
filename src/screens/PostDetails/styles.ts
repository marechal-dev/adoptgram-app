import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontFamily: 'Poppins',
    color: colors.text.main,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
  },
  heading: {
    fontSize: 22,
    marginVertical: 8,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  footerContainer: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'column',
    rowGap: 8,
  },
});
