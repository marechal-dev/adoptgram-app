import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ForgotPasswordScreen } from '@Screens/ForgotPassword';
import { LoginScreen } from '@Screens/Login';
import { OnboardingScreen } from '@Screens/Onboarding';
import { OrganizationLoginScreen } from '@Screens/OrganizationLogin';
import { SignInScreen } from '@Screens/SignIn';
import { headerDefaults } from '@Theme/app-theme';

import { RootStackParamList } from './types/stack-navigator-types';

const Stack = createNativeStackNavigator<RootStackParamList>();

type StackRoutesProps = {
  defaultRoute: keyof RootStackParamList;
};

export function StackRoutes({ defaultRoute }: StackRoutesProps) {
  return (
    <Stack.Navigator initialRouteName={defaultRoute}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          headerBackButtonMenuEnabled: false,
        }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: 'Esqueci minha senha',
          ...headerDefaults,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />

      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          ...headerDefaults,
          title: '',
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />

      <Stack.Screen
        name="OrganizationLogin"
        component={OrganizationLoginScreen}
        options={{
          ...headerDefaults,
          title: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
