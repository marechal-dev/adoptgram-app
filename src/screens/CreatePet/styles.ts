import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  innerViewContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  heading: {
    fontFamily: 'Poppins',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  formContainer: {
    rowGap: 32,
  },
  switchsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 64,
  },
  singleSwitchContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
