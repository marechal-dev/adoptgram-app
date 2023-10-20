import { Theme } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { colors } from './colors';

export const headerDefaults: NativeStackNavigationOptions = {
  headerShadowVisible: false,
  headerBackTitle: 'Voltar',
};

export const appTheme: Theme = {
  colors: {
    primary: colors.brand.orange500,
    background: colors.brand.orange100,
    text: colors.text.mainText90,
    border: 'black',
    card: colors.brand.blue300,
    notification: 'transparent',
  },
  dark: false,
};
