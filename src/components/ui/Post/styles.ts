import { StyleSheet } from 'react-native';

import { colors } from '@Theme/colors';

export const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    backgroundColor: colors.brand.blue300,
    padding: 14,
    borderRadius: 15,
  },
  headerContainer: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomColor: colors.brand.orange500,
    borderBottomWidth: 2,
  },
  pressableHeaderContainer: {
    flexDirection: 'row',
    columnGap: 10,
  },
  headerProfilePicture: {
    height: 40,
    width: 40,
    borderRadius: 150,
  },
  headerUsername: {
    textAlign: 'left',
  },
  headerPublishedAt: {
    fontSize: 10,
  },
  mediasCarrouselContainer: {
    width: '100%',
    alignItems: 'center',
  },
  mediaImage: {
    height: 340,
    width: 340,
    borderRadius: 12,
  },
  textBase: {
    fontFamily: 'Poppins',
    color: colors.brand.orange100,
  },
  textContentContainer: {
    marginTop: 8,
  },
  textContent: {
    textAlign: 'justify',
  },
  actionBarContainer: {
    borderBottomWidth: 2,
    borderBottomColor: colors.brand.orange500,
    paddingVertical: 8,
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    columnGap: 12,
  },
  actionContainer: {
    flexDirection: 'row',
    columnGap: 6,
    alignItems: 'center',
  },
  actionText: {
    color: colors.brand.orange500,
  },
  separator: {
    height: 8,
  },
  imageSeparator: {
    width: 8,
  },
});
