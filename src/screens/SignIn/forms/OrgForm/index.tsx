import { View, Text, Alert } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigation } from "@react-navigation/native"

import { axiosSocialApiClient } from "../../../../lib/axios"

import { styles } from "../styles"

import { BrandInput } from "../../../../components/core/brand/BrandInput"
import { BrandButton } from "../../../../components/core/brand/BrandButton/BrandButton"
import {
  RegisterOrganizationFormData,
  registerOrganizationFormSchema,
} from "../../schemas/register-organization-schema"
import { CreateOrganizationPayload } from "../../payloads/create-organization-payload"

export function OrgForm() {
  const navigation = useNavigation()

  const { control, handleSubmit } = useForm<RegisterOrganizationFormData>({
    resolver: zodResolver(registerOrganizationFormSchema),
  })

  async function handleOrgRegister(data: CreateOrganizationPayload) {
    const response = await axiosSocialApiClient.post("/organizations", data)

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
          name="title"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Título/Razão Social"
                keyboardType="default"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="representativeName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Nome do Representante"
                keyboardType="default"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="whatsapp"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.InputWithMask
                onChangeText={(masked) => onChange(masked)}
                onBlur={onBlur}
                value={value}
                mask={[
                  "(",
                  /\d/,
                  /\d/,
                  ")",
                  " ",
                  /9/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                placeholder="WhatsApp"
                keyboardType="phone-pad"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="residentialPhone"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.InputWithMask
                onChangeText={(masked) => onChange(masked)}
                onBlur={onBlur}
                value={value}
                mask={[
                  "(",
                  /\d/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                placeholder="Telefone Residencial (Opcional)"
                keyboardType="phone-pad"
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
        <Controller
          name="pixKey"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Chave Pix (Opcional)"
                keyboardType="default"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
      </View>

      <Text style={styles.formStepTitle}>Endereço</Text>

      <View style={styles.inputsContainer}>
        <Controller
          name="firstLine"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Endereço"
                keyboardType="default"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="secondLine"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Complemento (Opcional)"
                keyboardType="default"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="number"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Número"
                keyboardType="default"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="cep"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.InputWithMask
                onChangeText={(masked) => onChange(masked)}
                onBlur={onBlur}
                value={value}
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                placeholder="CEP"
                keyboardType="number-pad"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="neighborhood"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Bairro"
                keyboardType="default"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Cidade"
                keyboardType="default"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </BrandInput.Root>
          )}
        />
        <Controller
          name="state"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <BrandInput.Root>
              <BrandInput.Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Estado"
                keyboardType="default"
                autoCapitalize="words"
                returnKeyType="done"
              />
            </BrandInput.Root>
          )}
        />
      </View>

      <BrandButton
        onPressHandler={handleSubmit(
          async ({
            username,
            email,
            password,
            title,
            representativeName,
            whatsapp,
            residentialPhone,
            pixKey,
            firstLine,
            secondLine,
            number,
            cep,
            neighborhood,
            city,
            state,
          }) =>
            await handleOrgRegister({
              username,
              email,
              password,
              title,
              representativeName,
              whatsapp,
              residentialPhone,
              pixKey,
              address: {
                firstLine,
                secondLine,
                number,
                cep,
                neighborhood,
                city,
                state,
              },
            }),
        )}
      >
        Enviar
      </BrandButton>
    </View>
  )
}
