import { Theme } from '@react-navigation/native';

import { colors } from './colors';

export const appTheme: Theme = {
  colors: {
    primary: colors.brand.orange500,
    background: colors.brand.orange100,
    text: colors.text.main,
    border: 'black',
    card: colors.brand.blue300,
    notification: 'transparent',
  },
  dark: false,
};
