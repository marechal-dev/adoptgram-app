import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Poppins',
    color: 'white',
    textAlign: 'center',
  },

  container: {
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.brand.blue800,
    flexDirection: 'column',
    padding: 24,
    columnGap: 16,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  detailsContainer: {
    marginTop: 12,
  },
  petName: {
    fontSize: 18,
  },
  petAge: {
    fontSize: 16,
  },
  actionsContainer: {
    alignItems: 'center',
  },
  extraDetailsContainer: {
    marginBottom: 8,
  },
});
