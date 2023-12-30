import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { styles } from './styles';

type PostPreviewProps = {
  firstMediaURL: string;
  onPress: () => void;
};

export function PostPreview({ firstMediaURL, onPress }: PostPreviewProps) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Image source={firstMediaURL} style={styles.image} />
      </Pressable>
    </View>
  );
}
