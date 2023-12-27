import 'react-native-gesture-handler';

import { GluestackUIProvider } from '@gluestack-ui/themed';
import { loadAsync } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppShell } from '@Components/core/primitives/AppShell';
import { AuthContextProvider } from '@Contexts/AuthContext';
import { AppRoutes } from '@Navigation/Routes';
import { SentryService } from '@Services/sentry-service';

SplashScreen.preventAutoHideAsync();

SentryService.setup();

export default function App() {
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
          <GluestackUIProvider>
            <AppShell>
              <AppRoutes onReady={onLayoutRootView} />
            </AppShell>
          </GluestackUIProvider>
        </SafeAreaProvider>
      </AuthContextProvider>
    </>
  );
}
