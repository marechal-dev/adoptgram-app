import {
  View,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native"

import { Image } from "expo-image"

import { LoginScreenProps } from "../../types/screens-types"

import { styles } from "./style"
import { PressableText } from "../../core/components/PressableText/PressableText"
import { LoginForm } from "./LoginForm"

import IMAGE from "../../../assets/images/cat.svg"
import { Container } from "../../core/components/Container"

export function LoginScreen({ navigation }: LoginScreenProps) {
  // const { width, height } = useWindowDimensions()

  return (
    <Container innerContainerStyleOverride={styles.outerContainer}>
      <Image style={styles.loginImage} source={IMAGE} />

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

      <View style={styles.horizontalLinesContainer}>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.textBetweenLines}>ou</Text>
        <View style={styles.horizontalLine}></View>
      </View>

      <View style={styles.otherOptionsContainer}>
        <View style={styles.otherOptionsTextsContainer}>
          <Text style={styles.otherOptionsText}>Não tem uma conta?</Text>
          <PressableText
            onPressHandler={() => navigation.navigate("RegisterNewAccount")}
            pressableStyle={styles.otherOptionsPressable}
            textStyle={styles.otherOptionsPressableText}
          >
            Cadastre-se agora
          </PressableText>
        </View>
        <View style={styles.otherOptionsTextsContainer}>
          <Text style={styles.otherOptionsText}>É uma ONG?</Text>
          <PressableText
            onPressHandler={() => navigation.navigate("NgoLogin")}
            pressableStyle={styles.otherOptionsPressable}
            textStyle={styles.otherOptionsPressableText}
          >
            Toque aqui
          </PressableText>
        </View>
      </View>
    </Container>
  )
}
