import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "./stack-navigator-types"

export type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding"
>
export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>
export type OrganizationLoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "OrganizationLogin"
>
export type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPassword"
>
export type SignInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SignIn"
>
