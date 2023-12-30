import { StyleSheet } from 'react-native';

const PREVIEW_IMAGE_HEIGTH = 150;
const PREVIEW_IMAGE_WIDTH = 150;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    borderRadius: 150,
    elevation: 4,
    width: PREVIEW_IMAGE_WIDTH,
    height: PREVIEW_IMAGE_HEIGTH,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
});
