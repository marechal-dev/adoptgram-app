import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';

import { BrandButton } from '@Components/core/brand/BrandButton/BrandButton';
import { PressableText } from '@Components/core/primitives/PressableText/PressableText';
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

  const focusOnNextInput = () => setFocus('password');

  const handleLoginFormSubmit = async (data: LoginPayload) => {
    const authService = new AuthService();

    const loginTransaction = SentryService.startHttpTransaction({
      name: 'adoptgram:mobile:request:authenticate-common-user',
      payload: {
        email: data.email,
      },
      description: 'Login Request for a Common User',
      route: authService.COMMON_USERS_ENDPOINT,
      method: 'POST',
    });

    try {
      const response = await authService.authenticateOrganization(data);

      if (response.status === 200) {
        authenticate(response.data.accessToken);

        Alert.alert(
          'Login bem-sucedido',
          `${JSON.stringify(response.data.accessToken)}`,
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert('Erro', `${error.response?.data?.message}`);
      } else {
        SentryService.captureException(error);
        Alert.alert('Erro', 'Erro desconhecido');
      }
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
