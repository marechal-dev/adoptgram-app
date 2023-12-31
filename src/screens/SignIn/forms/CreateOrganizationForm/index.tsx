import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';

import { BrandButton } from '@Components/core/brand/BrandButton/BrandButton';
import { Input } from '@Components/ui/Input';
import { MaskedInput } from '@Components/ui/MaskedInput';
import { SelectInput } from '@Components/ui/SelectInput';
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

type AvailableCity = 'RG' | 'PEL';
type AvailableState = 'RS';

type AvailableCityOption = {
  label: string;
  value: AvailableCity;
};

type AvailableStateOption = {
  label: string;
  value: AvailableState;
};

const CITY_OPTIONS: AvailableCityOption[] = [
  {
    label: 'Rio Grande',
    value: 'RG',
  },
  {
    label: 'Pelotas',
    value: 'PEL',
  },
];
const STATE_OPTIONS: AvailableStateOption[] = [
  {
    label: 'Rio Grande do Sul',
    value: 'RS',
  },
];

export function CreateOrganizationForm() {
  const navigation = useNavigation();

  const { control, handleSubmit, setFocus } =
    useForm<RegisterOrganizationFormData>({
      resolver: zodResolver(registerOrganizationFormSchema),
      defaultValues: {
        city: 'RG',
        state: 'RS',
      },
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
      address: () => setFocus('address'),
      cep: () => setFocus('cep'),
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
      endpoint: OrganizationService.RESOURCE_ENDPOINT,
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
      SentryService.captureException(error);

      if (axios.isAxiosError(error)) {
        Alert.alert(
          'Erro',
          `Erro ao cadastrar nova conta: ${
            error.response?.data?.message ?? 'Erro desconhecido'
          }`,
        );
      }

      if (error instanceof Error) {
        Alert.alert('Erro', `Erro inesperado: ${error.message}`);
      }
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
              onSubmitEditing={focusOnNext.address}
              inputRef={ref}
              error={error?.message}
            />
          )}
        />
      </View>

      <Text style={styles.formStepTitle}>Endereço</Text>

      <View style={styles.inputsContainer}>
        <Controller
          name="address"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Endereço Completo"
              keyboardType="default"
              autoCapitalize="words"
              returnKeyType="next"
              error={error?.message}
              inputRef={ref}
              onSubmitEditing={focusOnNext.cep}
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
              placeholder="CEP"
              keyboardType="number-pad"
              autoCapitalize="none"
              returnKeyType="done"
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              items={CITY_OPTIONS}
              label="Cidade"
              onChangeValue={onChange}
              currentValue={value}
            />
          )}
        />
        <Controller
          name="state"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              items={STATE_OPTIONS}
              label="Estado"
              onChangeValue={onChange}
              currentValue={value}
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
