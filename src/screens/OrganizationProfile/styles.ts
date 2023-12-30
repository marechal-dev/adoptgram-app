import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Poppins',
  },
  verticalSeparator: {
    width: 1,
    borderWidth: 1,
    borderColor: 'white',
  },
  horizontalSeparatorContainer: {
    alignItems: 'center',
  },
  horizontalSeparator: {
    height: 1,
    width: '80%',
    borderWidth: 1,
    borderColor: colors.brand.blue800,
  },

  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },

  profileContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.brand.blue800,
    padding: 24,
    borderRadius: 20,
    marginBottom: 32,
  },
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 150,
  },
  profileTitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  headerDetailsSection: {
    justifyContent: 'center',
  },
  followersCount: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },

  bodyContainer: {
    flex: 1,
  },
  bodyTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  activeProfileBodyContainer: {
    flex: 1,
    marginTop: 14,
  },
});
