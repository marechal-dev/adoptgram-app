import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  pressableContainer: {
    backgroundColor: colors.brand.blue800,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
});
