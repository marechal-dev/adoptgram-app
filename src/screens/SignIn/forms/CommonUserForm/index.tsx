import { View, Text, Alert } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigation } from "@react-navigation/native"

import { styles } from "../styles"

import { axiosSocialApiClient } from "@Lib/axios"
import { BrandButton } from "@Components/core/brand/BrandButton/BrandButton"
import { BrandInput } from "@Components/core/brand/BrandInput"

import {
  registerCommonUserFormSchema,
  RegisterCommonUserFormData,
} from "../../schemas/register-common-user-schema"
import { CreateCommonUserPayload } from "../../payloads/create-common-user-payload"

export function CommonUserForm() {
  const navigation = useNavigation()

  const { control, handleSubmit } = useForm<RegisterCommonUserFormData>({
    resolver: zodResolver(registerCommonUserFormSchema),
  })

  async function handleCommonUserRegister(data: CreateCommonUserPayload) {
    const response = await axiosSocialApiClient.post("/common-users", data)

    if (response.status === 201) {
      Alert.alert(
        "Cadastro concluído",
        "O cadastro foi bem-sucedido!",
        [
          {
            text: "Voltar para Login",
            style: "default",
            onPress: () => navigation.goBack(),
          },
        ],
        {
          cancelable: false,
          onDismiss: () => navigation.goBack(),
        },
      )
    } else {
      Alert.alert(
        "Erro",
        `Houve um erro no cadastro! Erro: ${
          response.data?.message ?? "Erro desconhecido"
        }`,
      )
    }
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formStepTitle}>Dados Básicos</Text>

      <View style={styles.inputsContainer}>
        <Controller
          name="firstName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Nome"
                keyboardType="default"
                autoCapitalize="sentences"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="surname"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Sobrenome"
                keyboardType="default"
                autoCapitalize="sentences"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="cpf"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.InputWithMask
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                ]}
                placeholder="CPF"
                keyboardType="numeric"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Nome de Usuário"
                keyboardType="default"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Email"
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
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Senha"
                keyboardType="default"
                autoCapitalize="none"
                returnKeyType="next"
                secureTextEntry
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Confirmar Senha"
                keyboardType="default"
                autoCapitalize="none"
                returnKeyType="done"
                secureTextEntry
              />
            </BrandInput.Root>
          )}
        />
      </View>

      <BrandButton
        onPressHandler={handleSubmit(
          async ({ firstName, surname, username, email, password, cpf }) =>
            await handleCommonUserRegister({
              firstName,
              surname,
              username,
              email,
              password,
              cpf,
            }),
        )}
      >
        Enviar
      </BrandButton>
    </View>
  )
}
