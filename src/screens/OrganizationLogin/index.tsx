import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import HERO_IMAGE from '@Assets/images/dog-standing.svg';
import { Container } from '@Components/core/primitives/Container';
import { PressableText } from '@Components/core/primitives/PressableText/PressableText';
import { HorizontalTextDivider } from '@Components/ui/HorizontalTextDivider';
import { OrganizationLoginScreenProps } from '@Navigation/stack/types/screen-types';

import { OrganizationLoginForm } from './forms/OrganizationLoginForm';
import { styles } from './styles';

export function OrganizationLoginScreen({
  navigation,
}: OrganizationLoginScreenProps) {
  return (
    <Container.SafeArea style={styles.outerContainer}>
      <Image style={styles.loginImage} source={HERO_IMAGE} />

      <View style={styles.headingContainer}>
        <Text style={styles.loginTypeIndicator}>ORG</Text>

        <Text style={styles.loginHeading}>Você faz o AdoptGram acontecer!</Text>
      </View>

      <OrganizationLoginForm
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
          <Text style={styles.otherOptionsText}>Não é uma ONG?</Text>
          <PressableText
            onPressHandler={() => navigation.pop()}
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
