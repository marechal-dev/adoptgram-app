import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import PLACEHOLDER from '@Assets/images/placeholder-profile-picture.jpg';

import { styles } from './styles';

type CommentProps = {
  profilePicture?: string;
  username: string;
  content: string;
};

export function Comment({ profilePicture, username, content }: CommentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={profilePicture || PLACEHOLDER} style={styles.image} />
        <Text style={[styles.baseText, styles.username]}>{username}</Text>
      </View>
      <Text style={[styles.baseText]}>{content}</Text>
    </View>
  );
}
