import React from 'react';
import { ScrollView, Text } from 'react-native';

import { CreatePetForm } from './forms/CreatePetForm';
import { styles } from './styles';

export function CreatePetScreen() {
  return (
    <ScrollView contentContainerStyle={styles.innerViewContainer}>
      <Text style={styles.heading}>Cadastrar novo Pet</Text>

      <CreatePetForm />
    </ScrollView>
  );
}
