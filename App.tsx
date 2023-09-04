import "react-native-gesture-handler"

import { useCallback, useEffect, useState } from "react"

import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import { loadAsync } from "expo-font"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"

import * as Sentry from "sentry-expo"
import * as SentryNative from "@sentry/react-native"

import { appTheme } from "@Theme/app-theme"

import { env } from "@Constants/env"
import { AppShell } from "@Components/core/primitives/AppShell"
import { StackRoutes } from "@Navigation/stack"

import { AuthContextProvider } from "@Store/AuthContext"

SplashScreen.preventAutoHideAsync()

Sentry.init({
  dsn: env.EXPO_PUBLIC_SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: true,
})

type IsFirstTime = "true" | "false"
type DefaultRoute = "Onboarding" | "Login"

export default function App() {
  const [defaultRoute, setDefaultRoute] = useState<DefaultRoute>("Onboarding")
  const [appIsReady, setAppIsReady] = useState<boolean>(false)

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await loadAsync({
          Poppins: require("@Assets/fonts/Poppins.ttf"),
        })
      } catch (error) {
        SentryNative.captureException(error)
      } finally {
        setAppIsReady(true)
      }
    }

    loadFonts()
  }, [])

  useEffect(() => {
    const getDefaultRoute = async () => {
      const isFirstTime = (await AsyncStorage.getItem(
        "isFirstTime",
      )) as IsFirstTime

      setDefaultRoute(
        !isFirstTime || isFirstTime === "true" ? "Onboarding" : "Login",
      )
    }

    getDefaultRoute()
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
  )
}

9
