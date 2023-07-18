import { View, Text } from "react-native"

import { Image } from "expo-image"

import { LoginScreenProps } from "../../types/screens-types"

import { styles } from "./style"

import { PressableText } from "../../components/core/primitives/PressableText/PressableText"
import { Container } from "../../components/core/primitives/Container"
import { HorizontalDivider } from "../../components/ui/HorizontalDivider"

import { LoginForm } from "./LoginForm"

import HERO_IMAGE from "../../../assets/images/cat.svg"

export function LoginScreen({ navigation }: LoginScreenProps) {
  // const { width, height } = useWindowDimensions()

  return (
    <Container.SafeArea style={styles.outerContainer}>
      <Image style={styles.loginImage} source={HERO_IMAGE} />

      <View style={styles.headingContainer}>
        <Text style={styles.loginHeading}>
          Olá! Bem-vindo ao{" "}
          <Text style={styles.emphasizedHeadingSpan}>AdoptGram</Text>!
        </Text>
      </View>

      <LoginForm
        onForgotPasswordPressHandler={() =>
          navigation.navigate("ForgotPassword")
        }
      />

      <HorizontalDivider>ou</HorizontalDivider>

      <View style={styles.otherOptionsContainer}>
        <View style={styles.otherOptionsTextsContainer}>
          <Text style={styles.otherOptionsText}>Não tem uma conta?</Text>
          <PressableText
            onPressHandler={() => navigation.navigate("SignIn")}
            pressableStyle={styles.otherOptionsPressable}
            textStyle={styles.otherOptionsPressableText}
          >
            Cadastre-se agora
          </PressableText>
        </View>
        <View style={styles.otherOptionsTextsContainer}>
          <Text style={styles.otherOptionsText}>É uma ONG?</Text>
          <PressableText
            onPressHandler={() => navigation.navigate("OrgLogin")}
            pressableStyle={styles.otherOptionsPressable}
            textStyle={styles.otherOptionsPressableText}
          >
            Toque aqui
          </PressableText>
        </View>
      </View>
    </Container.SafeArea>
  )
}
