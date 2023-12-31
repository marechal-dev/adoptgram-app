import { AxiosError } from 'axios';
import * as Linking from 'expo-linking';
import { Alert, FlatList, Text, View } from 'react-native';

import { ListItemSeparator } from '@Components/ui/ListItemSeparator';
import { PetListItem } from '@Components/ui/PetListItem';
import { IPet } from '@Models/pet';
import { PetService } from '@Services/pet-service';

import { profilePetsStyles } from './styles';

type ProfilePetsProps = {
  pets: IPet[];
  whatsapp: string;
};

export function ProfilePets({ pets, whatsapp }: ProfilePetsProps) {
  async function onPressAdopt() {
    const normalizedWhatsAppNumber = whatsapp
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '');

    await Linking.openURL(
      `https://wa.me/${normalizedWhatsAppNumber}?text=Estou%20interessado%20em%20adotar%20um%20pet!`,
    );
  }

  async function onPressDelete(petID: string) {
    try {
      const response = await PetService.delete(petID);

      if (response.status === 204) {
        Alert.alert('Sucesso!', 'Pet deletado com sucesso!');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert(
          'Erro',
          'Erro ao deletar Pet. Por favor, tente novamente mais tarde.',
        );
      }

      if (error instanceof Error) {
        Alert.alert('Erro', 'Erro desconhecido.');
      }
    }
  }

  return (
    <View style={profilePetsStyles.container}>
      <Text style={profilePetsStyles.title}>Pets disponíveis para adoção</Text>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PetListItem
            pet={item}
            onPressAdopt={onPressAdopt}
            onPressDelete={onPressDelete}
          />
        )}
        ItemSeparatorComponent={() => <ListItemSeparator size={1} />}
      />
    </View>
  );
}
