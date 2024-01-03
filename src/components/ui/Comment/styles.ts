import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.brand.blue800,
    borderRadius: 12,
    padding: 12,
  },
  baseText: {
    fontFamily: 'Poppins',
    color: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    columnGap: 8,
    marginBottom: 8,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 20,
  },
  username: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
});
