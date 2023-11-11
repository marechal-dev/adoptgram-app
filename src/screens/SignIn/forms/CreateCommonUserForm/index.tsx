import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';

import { BrandButton } from '@Components/core/brand/BrandButton/BrandButton';
import { Input } from '@Components/ui/Input';
import { MaskedInput } from '@Components/ui/MaskedInput';
import { CommonUserService } from '@Services/common-user-service';
import { SentryService } from '@Services/sentry-service';
import { cpfMask } from '@Utils/masks';

import {
  RegisterCommonUserFormData,
  registerCommonUserFormSchema,
} from '../../schemas/register-common-user-schema';
import { styles } from '../styles';

export function CreateCommonUserForm() {
  const navigation = useNavigation();

  const { control, handleSubmit, setFocus } =
    useForm<RegisterCommonUserFormData>({
      resolver: zodResolver(registerCommonUserFormSchema),
    });

  const focusOnNext = useMemo(
    () => ({
      cpf: () => setFocus('cpf'),
      username: () => setFocus('username'),
      email: () => setFocus('email'),
      password: () => setFocus('password'),
      confirmPassword: () => setFocus('confirmPassword'),
    }),
    [setFocus],
  );

  async function handleCommonUserRegister(data: RegisterCommonUserFormData) {
    const commonUserService = new CommonUserService();

    const createCommonUserTransaction = SentryService.startHttpTransaction({
      context: 'common-user:create',
      description: 'Transaction for Common User creation',
      payload: data,
      microservice: 'social',
      endpoint: commonUserService.CREATE_ENDPOINT,
      method: 'POST',
    });

    try {
      const response = await commonUserService.create(data);

      if (response.status === 201) {
        Alert.alert(
          'Cadastro concluído',
          'O cadastro foi bem-sucedido!',
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

    createCommonUserTransaction.finish();
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formStepTitle}>Dados Básicos</Text>

      <View style={styles.inputsContainer}>
        <Controller
          name="name"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              inputRef={ref}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
              onSubmitEditing={focusOnNext.cpf}
              placeholder="Nome Completo"
              keyboardType="default"
              autoCapitalize="words"
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="cpf"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <MaskedInput
              inputRef={ref}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              mask={cpfMask}
              error={error?.message}
              onSubmitEditing={focusOnNext.username}
              placeholder="CPF"
              keyboardType="number-pad"
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
              inputRef={ref}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
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
              inputRef={ref}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
              onSubmitEditing={focusOnNext.password}
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
              inputRef={ref}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
              onSubmitEditing={focusOnNext.confirmPassword}
              placeholder="Senha"
              keyboardType="default"
              autoCapitalize="none"
              returnKeyType="next"
              secureTextEntry
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
              inputRef={ref}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={error?.message}
              placeholder="Confirmar Senha"
              keyboardType="default"
              autoCapitalize="none"
              returnKeyType="done"
              secureTextEntry
            />
          )}
        />
      </View>

      <BrandButton onPressHandler={handleSubmit(handleCommonUserRegister)}>
        Enviar
      </BrandButton>
    </View>
  );
}
