import { Image } from 'expo-image';
import { useMemo } from 'react';
import { Text, View } from 'react-native';

import HERO_IMAGE from '@Assets/images/cat.svg';
import { Container } from '@Components/core/primitives/Container';
import { PressableText } from '@Components/core/primitives/PressableText/PressableText';
import { HorizontalTextDivider } from '@Components/ui/HorizontalTextDivider';
import { LoginScreenProps } from '@Navigation/stack/types/screen-types';

import { LoginForm } from './forms/LoginForm';
import { styles } from './styles';

export function LoginScreen({ navigation }: LoginScreenProps) {
  const navigateTo = useMemo(
    () => ({
      forgotPassword: () => navigation.navigate('ForgotPassword'),
      signIn: () => navigation.navigate('SignIn'),
      organizationLogin: () => navigation.navigate('OrganizationLogin'),
    }),
    [navigation],
  );

  return (
    <Container.SafeArea style={styles.safeAreaContainer}>
      <View style={styles.headingContainer}>
        <Image style={styles.loginImage} source={HERO_IMAGE} />

        <Text style={styles.loginHeading}>
          Olá! Bem-vindo ao{' '}
          <Text style={styles.emphasizedHeadingSpan}>AdoptGram</Text>!
        </Text>
      </View>

      <LoginForm onForgotPasswordPressHandler={navigateTo.forgotPassword} />

      <View style={styles.otherOptionsContainer}>
        <HorizontalTextDivider>ou</HorizontalTextDivider>

        <View style={styles.otherOptionsTextsContainer}>
          <Text style={styles.otherOptionsText}>Não tem uma conta?</Text>
          <PressableText
            onPressHandler={navigateTo.signIn}
            pressableStyle={styles.otherOptionsPressable}
            textStyle={styles.otherOptionsPressableText}
          >
            Cadastre-se agora
          </PressableText>
        </View>

        <View style={styles.otherOptionsTextsContainer}>
          <Text style={styles.otherOptionsText}>É uma ONG?</Text>
          <PressableText
            onPressHandler={navigateTo.organizationLogin}
            pressableStyle={styles.otherOptionsPressable}
            textStyle={styles.otherOptionsPressableText}
          >
            Toque aqui
          </PressableText>
        </View>
      </View>
    </Container.SafeArea>
  );
}
