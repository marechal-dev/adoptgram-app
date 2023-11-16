import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  SignIn: undefined;
  OrganizationLogin: undefined;
};

export type StackNavigatorRoutes =
  NativeStackNavigationProp<RootStackParamList>;
