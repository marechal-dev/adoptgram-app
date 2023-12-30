import * as Linking from 'expo-linking';
import { FlatList, Text, View } from 'react-native';

import { ListItemSeparator } from '@Components/ui/ListItemSeparator';
import { PetListItem } from '@Components/ui/PetListItem';
import { IPet } from '@Models/pet';

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

  return (
    <View style={profilePetsStyles.container}>
      <Text style={profilePetsStyles.title}>Pets disponíveis para adoção</Text>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PetListItem pet={item} onPressAdopt={onPressAdopt} />
        )}
        ItemSeparatorComponent={() => <ListItemSeparator size={1} />}
      />
    </View>
  );
}
