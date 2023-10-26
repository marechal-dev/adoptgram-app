import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useCallback, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';

import { BrandButton } from '@Components/core/brand/BrandButton/BrandButton';
import { PressableText } from '@Components/core/primitives/PressableText/PressableText';
import { IconInput } from '@Components/ui/IconInput';
import { AuthContext } from '@Contexts/AuthContext';
import { AuthService } from '@Services/auth-service';
import { SentryService } from '@Services/sentry-service';
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

  const { control, handleSubmit, setFocus } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const focusOnNextInput = useCallback(() => setFocus('password'), [setFocus]);

  async function handleLoginFormSubmit(data: LoginPayload) {
    const authService = new AuthService();

    const loginTransaction = SentryService.startHttpTransaction({
      name: 'adoptgram:mobile:request:organization:authenticate',
      payload: {
        email: data.email,
      },
      method: 'POST',
      route: authService.ORGANIZATIONS_ENDPOINT,
      description: 'Request for Organizations authentication',
    });

    try {
      const response = await authService.authenticateOrganization(data);

      if (response.status === 200) {
        authenticate({
          token: response.data.accessToken,
          userID: response.data.userID,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert('Erro', `${error.response?.data?.message}`);
      } else {
        Alert.alert('Erro', 'Erro desconhecido');
      }

      SentryService.captureException(error);
    }

    loginTransaction.finish();
  }

  return (
    <View style={styles.inputsContainer}>
      <Controller
        name="email"
        control={control}
        render={({
          field: { onChange, onBlur, ref, value },
          fieldState: { error },
        }) => (
          <IconInput
            iconProps={{
              iconName: 'at-sign',
              size: 24,
              color: error?.message ? colors.brand.error : colors.brand.blue300,
            }}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={error?.message}
            inputRef={ref}
            onSubmitEditing={focusOnNextInput}
            placeholder="Digite seu E-mail"
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
          field: { onChange, onBlur, ref, value },
          fieldState: { error },
        }) => (
          <IconInput
            iconProps={{
              iconName: 'lock',
              size: 24,
              color: error?.message ? colors.brand.error : colors.brand.blue300,
            }}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            inputRef={ref}
            error={error?.message}
            placeholder="Digite sua Senha"
            autoCapitalize="none"
            returnKeyType="done"
            secureTextEntry
          />
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
