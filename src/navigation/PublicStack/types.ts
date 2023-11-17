import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type PublicStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  SignIn: undefined;
  OrganizationLogin: undefined;
};

export type PublicStackNavigator =
  NativeStackNavigationProp<PublicStackParamList>;

export type LoginScreenProps = NativeStackScreenProps<
  PublicStackParamList,
  'Login'
>;
export type OrganizationLoginScreenProps = NativeStackScreenProps<
  PublicStackParamList,
  'OrganizationLogin'
>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<
  PublicStackParamList,
  'ForgotPassword'
>;
export type SignInScreenProps = NativeStackScreenProps<
  PublicStackParamList,
  'SignIn'
>;
