import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  baseText: {
    fontFamily: 'Poppins',
    color: colors.text.main,
  },
  heading: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  creatorText: {
    textAlign: 'center',
    fontSize: 18,
  },
  textContainer: {
    marginTop: 16,
  },
  creditsText: {
    textAlign: 'justify',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 12,
    marginTop: 12,
  },
});
