import { Image } from 'expo-image';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

import SNIFFING_DOG from '@Assets/images/dog.svg';
import { BrandButton } from '@Components/core/brand/BrandButton/BrandButton';
import { BrandInput } from '@Components/core/brand/BrandInput';
import { Container } from '@Components/core/primitives/Container';
import { ForgotPasswordScreenProps } from '@Navigation/PublicStack/types';
import { colors } from '@Theme/colors';

import { styles } from './styles';

export function ForgotPasswordScreen({
  navigation,
}: ForgotPasswordScreenProps) {
  const [emailInputError, setEmailInputError] = useState('');
  const [emailValue, setEmailValue] = useState('');

  function handleOnChangeEmailInputValue(text: string) {
    setEmailValue(text);
  }

  function isInputValid(value: string) {
    if (!value) {
      setEmailInputError('Por favor, informe o E-mail.');
      return false;
    }

    if (!value.includes('@')) {
      setEmailInputError('Por favor, informe um E-mail válido.');
      return false;
    }

    return true;
  }

  function handleSendForgotPasswordEmail() {
    if (!isInputValid(emailValue)) {
      return;
    }

    Alert.alert(
      'Sucesso',
      `Caso ${emailValue} esteja na nossa base de dados, um email será enviado logo logo!`,
    );

    navigation.pop();
  }

  return (
    <Container.AvoidKeyboard behavior="position">
      <Container.SafeArea style={styles.container}>
        <Image style={styles.forgotPasswordImage} source={SNIFFING_DOG} />

        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionTitle}>
            Perdeu sua senha? Te ajudamos a encontrar!
          </Text>
          <Text style={styles.instructionText}>
            Insira o endereço de e-mail associado a sua conta e, caso ele seja
            encontrado na nossa base de dados, enviaremos uma mensagem com
            instruções para recuperá-la {'\u{1F601}'}
          </Text>
        </View>

        <View style={styles.interactionsContainer}>
          <BrandInput.Root error={emailInputError}>
            <BrandInput.Icon
              iconName="at-sign"
              size={24}
              color={colors.text.main}
            />
            <BrandInput.Input
              onChangeText={handleOnChangeEmailInputValue}
              value={emailValue}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="done"
              placeholder="Digite seu E-mail"
            />
          </BrandInput.Root>

          <BrandButton onPressHandler={handleSendForgotPasswordEmail}>
            Enviar
          </BrandButton>
        </View>
      </Container.SafeArea>
    </Container.AvoidKeyboard>
  );
}
