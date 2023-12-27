import { ScrollView, Text } from 'react-native';

import { CreatePetForm } from './forms/CreatePetForm';
import { styles } from './styles';

export function CreatePetScreen() {
  return (
    <ScrollView
      style={styles.viewContainer}
      contentContainerStyle={[styles.viewContainer, styles.innerViewContainer]}
    >
      <Text style={styles.heading}>Cadastrar novo Pet</Text>

      <CreatePetForm />
    </ScrollView>
  );
}
