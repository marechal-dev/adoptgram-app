import "react-native-gesture-handler"

import { useCallback, useEffect, useState } from "react"

import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import { loadAsync } from "expo-font"

import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
// import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { appTheme } from "@Theme/app-theme"
// import { removeHeader, removeHeaderTitle } from "@Theme/screen-options"
// import { RootStackParamList } from "@Types/navigator-types"

import { AppShell } from "@Components/core/primitives/AppShell"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StackNavigator } from "@Navigation/stack"
// import { StackNavigator } from "@Navigation/stack"

// const Stack = createNativeStackNavigator<RootStackParamList>()

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
        console.error(error)
      } finally {
        setAppIsReady(true)
      }
    }

    const getDefaultRoute = async () => {
      const isFirstTime = (await AsyncStorage.getItem(
        "isFirstTime",
      )) as IsFirstTime

      setDefaultRoute(
        !isFirstTime || isFirstTime === "true" ? "Onboarding" : "Login",
      )
    }

    loadFonts()
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

            {/* <Stack.Navigator initialRouteName={defaultRoute}>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{
                  headerTitle: removeHeaderTitle,
                }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  headerTitle: removeHeaderTitle,
                }}
              />
              <Stack.Screen
                name="OrganizationLogin"
                component={OrganizationLoginScreen}
                options={{
                  headerTitle: removeHeaderTitle,
                }}
              />
            </Stack.Navigator> */}
          </NavigationContainer>
        </AppShell>
      </SafeAreaProvider>
    </>
  )
}
