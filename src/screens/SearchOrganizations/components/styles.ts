import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  searchItemContainer: {
    flexDirection: 'row',
    backgroundColor: colors.brand.blue800,
    borderRadius: 40,
  },
  searchItemImage: {
    height: 80,
    width: 80,
    objectFit: 'contain',
    marginRight: 14,
    borderRadius: 40,
  },
  searchItemTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  searchItemText: {
    fontFamily: 'Poppins',
    color: 'white',
    fontSize: 18,
  },
});
