import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigator-types";

export type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>
export type NgoLoginScreenProps = NativeStackScreenProps<RootStackParamList, 'NgoLogin'>
export type ForgotPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>
export type RegisterNewAccountScreenProps = NativeStackScreenProps<RootStackParamList, 'RegisterNewAccount'>
