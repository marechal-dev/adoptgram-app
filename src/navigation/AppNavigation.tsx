import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { useAuth } from '@Hooks/use-auth';
import { appTheme } from '@Theme/app-theme';

import { DrawerRoutes } from './drawer';
import { StackRoutes } from './stack';

interface IAppNavigationProps {
  onReady: () => void;
}

type IsFirstTime = 'true' | 'false';
type DefaultRoute = 'Onboarding' | 'Login';

export function AppNavigation({ onReady }: IAppNavigationProps) {
  const { isAuthenticated } = useAuth();

  const [defaultRoute, setDefaultRoute] = useState<DefaultRoute>('Onboarding');

  useEffect(() => {
    const getDefaultRoute = async () => {
      const isFirstTime = (await AsyncStorage.getItem(
        'adoptgram:isFirstTime',
      )) as IsFirstTime;

      setDefaultRoute(
        !isFirstTime || isFirstTime === 'true' ? 'Onboarding' : 'Login',
      );
    };

    if (!isAuthenticated) {
      getDefaultRoute();
    }
  }, [isAuthenticated]);

  return (
    <NavigationContainer onReady={onReady} theme={appTheme}>
      {!isAuthenticated ? (
        <StackRoutes defaultRoute={defaultRoute} />
      ) : (
        <DrawerRoutes />
      )}
    </NavigationContainer>
  );
}
