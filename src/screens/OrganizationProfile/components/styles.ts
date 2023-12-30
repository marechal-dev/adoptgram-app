import { StyleSheet } from 'react-native';

export const profileDetailsStyles = StyleSheet.create({
  baseText: {
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  heading: {
    fontSize: 18,
  },
  centerText: {
    textAlign: 'center',
  },
  mainTitle: {
    marginBottom: 14,
  },
  subHeading: {
    marginBottom: 4,
  },

  container: {
    flex: 1,
  },
  contentContainer: {
    rowGap: 16,
  },
  bio: {
    textAlign: 'justify',
  },
  pixContainer: {
    flexDirection: 'row',
    columnGap: 8,
  },
  generalDetailsSection: {
    marginBottom: 4,
  },
});

export const profilePostsStyles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export const profilePetsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
});
