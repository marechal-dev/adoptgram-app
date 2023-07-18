import { View } from "react-native"

import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { PressableText } from "../../components/core/primitives/PressableText/PressableText"
import { BrandButton } from "../../components/core/brand/BrandButton/BrandButton"

import { styles } from "./style"
import { colors } from "../../theme/colors"
import { BrandInput } from "../../components/core/brand/BrandInput"

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
type LoginFormData = z.infer<typeof loginFormSchema>

type LoginFormProps = {
  onForgotPasswordPressHandler: () => void
}

export function LoginForm({ onForgotPasswordPressHandler }: LoginFormProps) {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  function handleLoginFormSubmit(data: LoginFormData) {
    console.log(data)
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
        onPressHandler={handleSubmit(handleLoginFormSubmit)}
      >
        Entrar
      </BrandButton>
    </View>
  )
}
