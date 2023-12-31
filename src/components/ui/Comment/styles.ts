import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.brand.blue800,
    borderRadius: 12,
    padding: 8,
  },
  baseText: {
    fontFamily: 'Poppins',
    color: 'white',
  },
  username: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
});
