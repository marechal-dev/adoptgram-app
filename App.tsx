import 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { loadAsync } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from 'sentry-expo';

import { AppShell } from '@Components/core/primitives/AppShell';
import { env } from '@Constants/env';
import { AuthContextProvider } from '@Contexts/AuthContext';
import { StackRoutes } from '@Navigation/stack';
import { appTheme } from '@Theme/app-theme';
import { SentryService } from 'src/services/sentry-service';

SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: env.EXPO_PUBLIC_SENTRY_DSN,
  enableInExpoDevelopment: true,
  tracesSampleRate: 1.0,
  debug: true,
});

type IsFirstTime = 'true' | 'false';
type DefaultRoute = 'Onboarding' | 'Login';

export default function App() {
  const [defaultRoute, setDefaultRoute] = useState<DefaultRoute>('Onboarding');
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await loadAsync({
          Poppins: require('@Assets/fonts/Poppins.ttf'),
        });
      } catch (error) {
        SentryService.captureException(error);
      } finally {
        setAppIsReady(true);
      }
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const getDefaultRoute = async () => {
      const isFirstTime = (await AsyncStorage.getItem(
        'isFirstTime',
      )) as IsFirstTime;

      setDefaultRoute(
        !isFirstTime || isFirstTime === 'true' ? 'Onboarding' : 'Login',
      );
    };

    getDefaultRoute();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar translucent style="dark" />
      <AuthContextProvider>
        <SafeAreaProvider>
          <AppShell>
            <NavigationContainer onReady={onLayoutRootView} theme={appTheme}>
              <StackRoutes defaultRoute={defaultRoute} />
            </NavigationContainer>
          </AppShell>
        </SafeAreaProvider>
      </AuthContextProvider>
    </>
  );
}
