import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import PLACEHOLDER from '@Assets/images/placeholder-profile-picture.jpg';
import { useAuth } from '@Hooks/use-auth';
import { IPet } from '@Models/pet';

import { ListItemSeparator } from '../ListItemSeparator';
import { PressableIcon } from '../PressableIcon';

import { styles } from './styles';

type PetListItemProps = {
  pet: IPet;
  onPressAdopt: () => void;
  onPressDelete: (petID: string) => void;
};

function matchSize(size: 'Small' | 'Medium' | 'Big') {
  switch (size) {
    case 'Small':
      return 'Pequeno Porte';
    case 'Medium':
      return 'Médio Porte';
    case 'Big':
      return 'Grande Porte';
    default:
      return '-';
  }
}

function matchEnergyLevel(
  energyLevel: 'VeryLow' | 'Low' | 'Medium' | 'High' | 'VeryHigh',
) {
  switch (energyLevel) {
    case 'VeryLow':
      return 'Muito Quieto';
    case 'Low':
      return 'Quietinho';
    case 'Medium':
      return 'Tranquilo';
    case 'High':
      return 'Agitado';
    case 'VeryHigh':
      return 'Muito Agitado';
    default:
      return '-';
  }
}

export function PetListItem({
  pet,
  onPressAdopt,
  onPressDelete,
}: PetListItemProps) {
  const { role, currentUserID } = useAuth();

  const currentUserIsOrganization = role === 'Organization';
  const petIsOwnedByCurrentUser = currentUserID === pet.ownerOrganizationID;
  const canShowDestructiveActions =
    currentUserIsOrganization && petIsOwnedByCurrentUser;

  function onPressDeleteButton() {
    onPressDelete(pet.id);
  }

  const imageSource = pet.profilePictureURL
    ? `https://pub-c4a5b57b9f444b199cecadd2c07022b7.r2.dev/${pet.profilePictureURL}`
    : PLACEHOLDER;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={imageSource} />

      <ListItemSeparator color="white" size="90%" />

      <View style={styles.detailsContainer}>
        <View>
          <Text style={[styles.baseText, styles.petName]}>{pet.name}</Text>
          <Text style={[styles.baseText, styles.petAge]}>
            {pet.age === 1 ? `${pet.age} ano` : `${pet.age} anos`}
          </Text>
        </View>

        <View style={styles.extraDetailsContainer}>
          <Text style={[styles.baseText]}>{matchSize(pet.size)}</Text>
          <Text style={[styles.baseText]}>
            Energia: {matchEnergyLevel(pet.energyLevel)}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          {currentUserIsOrganization ? null : (
            <PressableIcon
              iconProps={{
                color: 'white',
                size: 24,
                iconName: 'plus-circle',
              }}
              onPress={onPressAdopt}
            />
          )}
          {canShowDestructiveActions ? (
            <PressableIcon
              iconProps={{
                color: 'red',
                size: 24,
                iconName: 'trash',
              }}
              onPress={onPressDeleteButton}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}
