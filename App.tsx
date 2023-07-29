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

import { sentryDsn } from "@Constants/index"
import { AppShell } from "@Components/core/primitives/AppShell"
import { StackNavigator } from "@Navigation/stack"

Sentry.init({
  dsn: sentryDsn,
  enableInExpoDevelopment: true,
  debug: true,
})

SplashScreen.preventAutoHideAsync()

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
      <SafeAreaProvider>
        <AppShell onLayout={onLayoutRootView}>
          <NavigationContainer theme={appTheme}>
            <StackNavigator defaultRoute={defaultRoute} />
          </NavigationContainer>
        </AppShell>
      </SafeAreaProvider>
    </>
  )
}
