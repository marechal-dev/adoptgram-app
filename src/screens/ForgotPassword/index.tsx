import { useState } from "react"
import { View, Text, Alert } from "react-native"
import { Image } from "expo-image"

import SNIFFING_DOG from "@Assets/images/dog.svg"

import { Container } from "@Components/core/primitives/Container"
import { BrandInput } from "@Components/core/brand/BrandInput"
import { colors } from "@Theme/colors"
import { BrandButton } from "@Components/core/brand/BrandButton/BrandButton"
import { ForgotPasswordScreenProps } from "@Navigation/stack/types/screen-types"
import { styles } from "./style"

export function ForgotPasswordScreen({
  navigation,
}: ForgotPasswordScreenProps) {
  const [emailValue, setEmailValue] = useState("")

  function handleOnChangeEmailInputValue(text: string) {
    if (!text) {
      return
    }

    setEmailValue(text)
  }

  function handleSendForgotPasswordEmail() {
    Alert.alert(
      "Sucesso",
      `Caso ${emailValue} esteja na nossa base de dados, um email será enviado logo logo!`,
    )
  }

  return (
    <Container.AvoidKeyboard behavior="position">
      <Container.SafeArea style={styles.container}>
        <Image style={styles.forgotPasswordImage} source={SNIFFING_DOG} />

        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionTitle}>
            Perdeu sua senha? Te ajudamos a encontrar!
          </Text>
          <Text style={styles.instructionText}>
            Insira o endereço de e-mail associado a sua conta e, caso ele seja
            encontrado na nossa base de dados, enviaremos uma mensagem com
            instruções para recuperá-la {"\u{1F601}"}
          </Text>
        </View>

        <View style={styles.interactionsContainer}>
          <BrandInput.Root>
            <BrandInput.Icon
              iconName="at-sign"
              size={24}
              color={colors.text.mainText90}
            />
            <BrandInput.Input
              onChangeText={handleOnChangeEmailInputValue}
              value={emailValue}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="done"
              placeholder="Digite seu E-mail"
            />
          </BrandInput.Root>

          <BrandButton onPressHandler={handleSendForgotPasswordEmail}>
            Enviar
          </BrandButton>
        </View>
      </Container.SafeArea>
    </Container.AvoidKeyboard>
  )
}
