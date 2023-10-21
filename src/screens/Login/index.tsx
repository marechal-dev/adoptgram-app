import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import HERO_IMAGE from '@Assets/images/cat.svg';
import { Container } from '@Components/core/primitives/Container';
import { PressableText } from '@Components/core/primitives/PressableText/PressableText';
import { HorizontalTextDivider } from '@Components/ui/HorizontalTextDivider';
import { LoginScreenProps } from '@Navigation/stack/types/screen-types';

import { LoginForm } from './forms/LoginForm';
import { styles } from './styles';

export function LoginScreen({ navigation }: LoginScreenProps) {
  return (
    <Container.SafeArea style={styles.outerContainer}>
      <Image style={styles.loginImage} source={HERO_IMAGE} />

      <View style={styles.headingContainer}>
        <Text style={styles.loginHeading}>
          Olá! Bem-vindo ao{' '}
          <Text style={styles.emphasizedHeadingSpan}>AdoptGram</Text>!
        </Text>
      </View>

      <LoginForm
        onForgotPasswordPressHandler={() =>
          navigation.navigate('ForgotPassword')
        }
      />

      <HorizontalTextDivider>ou</HorizontalTextDivider>

      <View style={styles.otherOptionsContainer}>
        <View style={styles.otherOptionsTextsContainer}>
          <Text style={styles.otherOptionsText}>Não tem uma conta?</Text>
          <PressableText
            onPressHandler={() => navigation.navigate('SignIn')}
            pressableStyle={styles.otherOptionsPressable}
            textStyle={styles.otherOptionsPressableText}
          >
            Cadastre-se agora
          </PressableText>
        </View>
        <View style={styles.otherOptionsTextsContainer}>
          <Text style={styles.otherOptionsText}>É uma ONG?</Text>
          <PressableText
            onPressHandler={() => navigation.navigate('OrganizationLogin')}
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
