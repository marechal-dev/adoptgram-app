import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "./navigator-types"

export type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding"
>
export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>
export type OrgLoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "OrgLogin"
>
export type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPassword"
>
export type SignInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SignIn"
>
