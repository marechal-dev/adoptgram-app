import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';

import { BrandButton } from '@Components/core/brand/BrandButton/BrandButton';
import { Input } from '@Components/ui/Input';
import { MaskedInput } from '@Components/ui/MaskedInput';
import { OrganizationService } from '@Services/organization-service';
import { SentryService } from '@Services/sentry-service';
import {
  cellphoneNumberMask,
  cepMask,
  residentialPhoneNumberMask,
} from '@Utils/masks';

import {
  RegisterOrganizationFormData,
  registerOrganizationFormSchema,
} from '../../schemas/register-organization-schema';
import { styles } from '../styles';

export function CreateOrganizationForm() {
  const navigation = useNavigation();

  const { control, handleSubmit, setFocus } =
    useForm<RegisterOrganizationFormData>({
      resolver: zodResolver(registerOrganizationFormSchema),
    });

  const focusOnNext = useMemo(
    () => ({
      representativeName: () => setFocus('representativeName'),
      whatsapp: () => setFocus('whatsapp'),
      residentialPhone: () => setFocus('residentialPhone'),
      username: () => setFocus('username'),
      email: () => setFocus('email'),
      password: () => setFocus('password'),
      confirmPassword: () => setFocus('confirmPassword'),
      pixKey: () => setFocus('pixKey'),
      firstLine: () => setFocus('firstLine'),
      secondLine: () => setFocus('secondLine'),
      number: () => setFocus('number'),
      cep: () => setFocus('cep'),
      neighborhood: () => setFocus('neighborhood'),
      city: () => setFocus('city'),
      state: () => setFocus('state'),
    }),
    [setFocus],
  );

  async function handleOrganizationRegister(
    data: RegisterOrganizationFormData,
  ) {
    const registerOrganizationTransaction = SentryService.startHttpTransaction({
      context: 'organization:create',
      description: 'Request for creating a new Organization',
      microservice: 'social',
      endpoint: OrganizationService.CREATE_ENDPOINT,
      method: 'POST',
      payload: data,
    });

    try {
      const response = await OrganizationService.createOrganization(data);

      if (response.status === 201) {
        Alert.alert(
          'Cadastro concluído',
          'Seu cadastro foi bem-sucedido!',
          [
            {
              text: 'Voltar para Login',
              style: 'default',
              onPress: () => navigation.goBack(),
            },
          ],
          {
            cancelable: false,
            onDismiss: () => navigation.goBack(),
          },
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          'Erro',
          `Houve um erro no cadastro! Erro: ${
            error.response?.data?.message ?? 'Erro desconhecido'
          }`,
        );
      }

      SentryService.captureException(error);
    }

    registerOrganizationTransaction.finish();
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formStepTitle}>Dados Básicos</Text>

      <View style={styles.inputsContainer}>
        <Controller
          name="title"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
              inputRef={ref}
              onSubmitEditing={focusOnNext.representativeName}
              placeholder="Título/Razão Social"
              keyboardType="default"
              autoCapitalize="words"
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="representativeName"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
              inputRef={ref}
              onSubmitEditing={focusOnNext.whatsapp}
              placeholder="Nome do Representante"
              keyboardType="default"
              autoCapitalize="words"
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="whatsapp"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <MaskedInput
              onChangeText={(masked) => onChange(masked)}
              onBlur={onBlur}
              value={value}
              mask={cellphoneNumberMask}
              error={error?.message}
              inputRef={ref}
              onSubmitEditing={focusOnNext.residentialPhone}
              placeholder="WhatsApp"
              keyboardType="phone-pad"
              autoCapitalize="none"
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="residentialPhone"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <MaskedInput
              onChangeText={(masked) => onChange(masked)}
              onBlur={onBlur}
              value={value}
              mask={residentialPhoneNumberMask}
              inputRef={ref}
              onSubmitEditing={focusOnNext.username}
              error={error?.message}
              placeholder="Telefone Residencial (Opcional)"
              keyboardType="phone-pad"
              autoCapitalize="none"
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
              inputRef={ref}
              onSubmitEditing={focusOnNext.email}
              placeholder="Nome de Usuário"
              keyboardType="default"
              autoCapitalize="none"
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              inputRef={ref}
              onSubmitEditing={focusOnNext.password}
              error={error?.message}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Senha"
              keyboardType="default"
              autoCapitalize="none"
              returnKeyType="next"
              secureTextEntry
              inputRef={ref}
              onSubmitEditing={focusOnNext.confirmPassword}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Confirmar Senha"
              keyboardType="default"
              autoCapitalize="none"
              returnKeyType="done"
              secureTextEntry
              inputRef={ref}
              onSubmitEditing={focusOnNext.pixKey}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="pixKey"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Chave Pix (Opcional)"
              keyboardType="default"
              autoCapitalize="none"
              returnKeyType="next"
              inputRef={ref}
              onSubmitEditing={focusOnNext.firstLine}
              error={error?.message}
            />
          )}
        />
      </View>

      <Text style={styles.formStepTitle}>Endereço</Text>

      <View style={styles.inputsContainer}>
        <Controller
          name="firstLine"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Endereço"
              keyboardType="default"
              autoCapitalize="words"
              returnKeyType="next"
              error={error?.message}
              inputRef={ref}
              onSubmitEditing={focusOnNext.secondLine}
            />
          )}
        />
        <Controller
          name="secondLine"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Complemento (Opcional)"
              keyboardType="default"
              autoCapitalize="words"
              returnKeyType="next"
              inputRef={ref}
              onSubmitEditing={focusOnNext.number}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="number"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Número"
              keyboardType="default"
              autoCapitalize="none"
              returnKeyType="next"
              inputRef={ref}
              onSubmitEditing={focusOnNext.cep}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="cep"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <MaskedInput
              onChangeText={(masked) => onChange(masked)}
              onBlur={onBlur}
              value={value}
              error={error?.message}
              mask={cepMask}
              inputRef={ref}
              onSubmitEditing={focusOnNext.neighborhood}
              placeholder="CEP"
              keyboardType="number-pad"
              autoCapitalize="none"
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="neighborhood"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Bairro"
              keyboardType="default"
              autoCapitalize="words"
              returnKeyType="next"
              inputRef={ref}
              onSubmitEditing={focusOnNext.city}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Cidade"
              keyboardType="default"
              autoCapitalize="words"
              returnKeyType="next"
              inputRef={ref}
              onSubmitEditing={focusOnNext.state}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="state"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Estado"
              keyboardType="default"
              autoCapitalize="words"
              returnKeyType="done"
              inputRef={ref}
              error={error?.message}
            />
          )}
        />
      </View>

      <BrandButton
        onPressHandler={handleSubmit((data) =>
          handleOrganizationRegister(data),
        )}
      >
        Enviar
      </BrandButton>
    </View>
  );
}
