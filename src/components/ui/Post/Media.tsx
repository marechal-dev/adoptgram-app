import { Image } from 'expo-image';
import { View } from 'react-native';

import { styles } from './styles';
import { IMedia } from './types';

interface IMediaProps extends IMedia {}

export function Media({ url, type }: IMediaProps) {
  return (
    <View>
      <Image style={styles.mediaImage} source={url} />
    </View>
  );
}
