import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';

import { BrandButton } from '@Components/core/brand/BrandButton/BrandButton';
import { BrandInput } from '@Components/core/brand/BrandInput';
import { PressableText } from '@Components/core/primitives/PressableText/PressableText';
import { AuthContext } from '@Contexts/AuthContext';
import { axiosSocialApiClient } from '@Lib/axios';
import { colors } from '@Theme/colors';

import { LoginPayload } from '../payloads/login-payload';
import { LoginFormData, loginFormSchema } from '../schemas/login-schema';
import { styles } from '../styles';

type LoginFormProps = {
  onForgotPasswordPressHandler: () => void;
};

export function OrganizationLoginForm({
  onForgotPasswordPressHandler,
}: LoginFormProps) {
  const { authenticate } = useContext(AuthContext);

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      kind: 'CommonUser',
    },
  });

  async function handleLoginFormSubmit(data: LoginPayload) {
    try {
      const response = await axiosSocialApiClient.post('/auth/sessions', data);

      if (response.status === 200) {
        authenticate(response.data.token);

        Alert.alert(
          'Login bem-sucedido',
          `${JSON.stringify(response.data.token)}`,
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert('Erro', `${error.response?.data?.message}`);
      } else {
        Alert.alert('Erro', 'Erro desconhecido');
      }
    }
  }

  return (
    <View style={styles.inputsContainer}>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <BrandInput.Root error={error?.message}>
            <BrandInput.Icon
              iconName="at-sign"
              size={24}
              color={error?.message ? colors.brand.error : colors.brand.blue300}
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
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <BrandInput.Root error={error?.message}>
            <BrandInput.Icon
              iconName="lock"
              size={24}
              color={error?.message ? colors.brand.error : colors.brand.blue300}
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
  );
}
