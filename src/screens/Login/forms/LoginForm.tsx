import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useCallback, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';

import { PressableText } from '@Components/core/primitives/PressableText/PressableText';
import { Button } from '@Components/ui/Button';
import { IconInput } from '@Components/ui/IconInput';
import { AuthContext } from '@Contexts/AuthContext';
import { colors } from '@Theme/colors';
import { AuthService } from 'src/services/auth-service';
import { SentryService } from 'src/services/sentry-service';

import { LoginPayload } from '../payloads/login-payload';
import { LoginFormData, loginFormSchema } from '../schemas/login-schema';
import { styles } from '../styles';

type LoginFormProps = {
  onForgotPasswordPressHandler: () => void;
};

export function LoginForm({ onForgotPasswordPressHandler }: LoginFormProps) {
  const { authenticate } = useContext(AuthContext);

  const { control, handleSubmit, setFocus } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const focusOnNextInput = useCallback(() => setFocus('password'), [setFocus]);

  const handleLoginFormSubmit = async (data: LoginPayload) => {
    const loginTransaction = SentryService.startHttpTransaction({
      context: 'common-user:login',
      payload: data,
      description: 'Login Request for a Common User',
      microservice: 'social',
      endpoint: AuthService.COMMON_USERS_ENDPOINT,
      method: 'POST',
    });

    try {
      const response = await AuthService.authenticateCommonUser(data);

      if (response.status === 200) {
        authenticate({
          token: response.data.accessToken,
          userID: response.data.userID,
          userRole: 'CommonUser',
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
  };

  return (
    <View style={styles.inputsContainer}>
      <Controller
        name="email"
        control={control}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <IconInput
            iconProps={{
              iconName: 'at-sign',
              size: 24,
              color: error ? colors.brand.error : colors.brand.blue300,
            }}
            inputRef={ref}
            onChangeText={onChange}
            onBlur={onBlur}
            onSubmitEditing={focusOnNextInput}
            value={value}
            error={error?.message}
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
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <IconInput
            iconProps={{
              iconName: 'lock',
              size: 24,
              color: error ? colors.brand.error : colors.brand.blue300,
            }}
            inputRef={ref}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
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

      <Button onPressHandler={handleSubmit(handleLoginFormSubmit)}>
        Entrar
      </Button>
    </View>
  );
}
