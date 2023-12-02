import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { DrawerRoutesProps } from '@Navigation/PrivateStack/types';

import { styles } from './styles';

type SearchItemProps = {
  profilePictureURL: string;
  title: string;
  username: string;
};

export function SearchItem({
  profilePictureURL,
  title,
  username,
}: SearchItemProps) {
  const { navigate } = useNavigation<DrawerRoutesProps['navigation']>();

  function handleOnTouchSearchItem() {
    navigate('DetailsStack', {
      screen: 'OrganizationProfile',
      params: {
        username,
      },
    });
  }

  return (
    <Pressable onPress={handleOnTouchSearchItem}>
      <View style={styles.searchItemContainer}>
        <Image style={styles.searchItemImage} source={profilePictureURL} />
        <View style={styles.searchItemTextContainer}>
          <Text style={styles.searchItemText}>{title}</Text>
          <Text style={styles.searchItemText}>{username}</Text>
        </View>
      </View>
    </Pressable>
  );
}
