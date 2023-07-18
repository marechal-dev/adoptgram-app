import { useCallback, useEffect, useState } from "react"

import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import { loadAsync } from "expo-font"

import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { appTheme } from "./src/theme/app-theme"
import { RootStackParamList } from "./src/types/navigator-types"
import { navigatorScreenOptions } from "./src/theme/screen-options"

import { AppShell } from "./src/components/core/primitives/AppShell"

import { OnboardingScreen } from "./src/screens/Onboarding/OnboardingScreen"
import { LoginScreen } from "./src/screens/Login/LoginScreen"
import { ForgotPasswordScreen } from "./src/screens/ForgotPassword/ForgotPasswordScreen"
import { OrgLoginScreen } from "./src/screens/OrgLogin/NgoLoginScreen"
import { SignInScreen } from "./src/screens/SignIn"

const Stack = createNativeStackNavigator<RootStackParamList>()

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false)

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await loadAsync({
          Poppins: require("./assets/fonts/Poppins.ttf"),
        })
      } catch (error) {
        console.error(error)
      } finally {
        setAppIsReady(true)
      }
    }

    loadFonts()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaProvider>
        <AppShell onLayout={onLayoutRootView}>
          <NavigationContainer theme={appTheme}>
            <Stack.Navigator
              screenOptions={navigatorScreenOptions}
              initialRouteName="Onboarding"
            >
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
              />
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="OrgLogin" component={OrgLoginScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppShell>
      </SafeAreaProvider>
    </>
  )
}
