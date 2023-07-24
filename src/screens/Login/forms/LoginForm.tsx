import { Alert, View } from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { AxiosError } from "axios"

import { colors } from "../../../theme/colors"

import { styles } from "../style"

import { loginFormSchema, LoginFormData } from "../schemas/login-schema"
import { LoginPayload } from "../payloads/login-payload"

import { BrandButton } from "../../../components/core/brand/BrandButton/BrandButton"
import { BrandInput } from "../../../components/core/brand/BrandInput"
import { PressableText } from "../../../components/core/primitives/PressableText/PressableText"
import { axiosSocialApiClient } from "../../../lib/axios"

type LoginFormProps = {
  onForgotPasswordPressHandler: () => void
}

export function LoginForm({ onForgotPasswordPressHandler }: LoginFormProps) {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      kind: "CommonUser",
    },
  })

  async function handleLoginFormSubmit(data: LoginPayload) {
    try {
      const response = await axiosSocialApiClient.post("/auth/sessions", data)

      if (response.status === 200) {
        await AsyncStorage.setItem("token", response.data.token)
        Alert.alert(
          "Login bem-sucedido",
          `${JSON.stringify(response.data.token)}`,
        )
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert("Erro", `${error.response?.data?.message}`)
      } else {
        Alert.alert("Erro", "Erro desconhecido")
      }
    }
  }

  return (
    <View style={styles.inputsContainer}>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <BrandInput.Root>
            <BrandInput.Icon
              iconName="at-sign"
              size={24}
              color={colors.brand.blue300}
            />
            <BrandInput.Input
              onChangeText={onChange}
              value={value}
              placeholder="Digite seu E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </BrandInput.Root>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <BrandInput.Root>
            <BrandInput.Icon
              iconName="lock"
              size={24}
              color={colors.brand.blue300}
            />
            <BrandInput.Input
              onChangeText={onChange}
              value={value}
              placeholder="Digite sua Senha"
              autoCapitalize="none"
              returnKeyType="done"
              secureTextEntry
            />
          </BrandInput.Root>
        )}
      />

      <PressableText
        onPressHandler={onForgotPasswordPressHandler}
        pressableStyle={styles.forgotPasswordWrapper}
        textStyle={styles.forgotPasswordText}
      >
        Esqueci minha senha
      </PressableText>

      <BrandButton
        paddingOverride={{
          paddingHorizontal: 10,
        }}
        onPressHandler={handleSubmit(async (data) =>
          handleLoginFormSubmit(data),
        )}
      >
        Entrar
      </BrandButton>
    </View>
  )
}
