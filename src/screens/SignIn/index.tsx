import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Container } from '@Components/core/primitives/Container';

import { FormToggleButton } from './components/FormToggleButton';
import { CreateCommonUserForm } from './forms/CreateCommonUserForm';
import { CreateOrganizationForm } from './forms/CreateOrganizationForm';
import { styles } from './styles';

type CurrentForm = 'CommonUser' | 'ORG';

export function SignInScreen() {
  const [currentForm, setCurrentForm] = useState<CurrentForm>('CommonUser');

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollContainer}
    >
      <Container.SafeArea style={styles.innerContainer}>
        <Text style={styles.headingText}>Cadastro</Text>

        <View style={styles.formToggleContainer}>
          <FormToggleButton
            icon="user"
            text="Não sou ONG"
            isSelected={currentForm === 'CommonUser'}
            onPressHandler={() => setCurrentForm('CommonUser')}
          />
          <FormToggleButton
            icon="heart"
            text="Sou ONG"
            isSelected={currentForm === 'ORG'}
            onPressHandler={() => setCurrentForm('ORG')}
          />
        </View>

        {currentForm === 'CommonUser' ? (
          <CreateCommonUserForm />
        ) : (
          <CreateOrganizationForm />
        )}
      </Container.SafeArea>
    </ScrollView>
  );
}
