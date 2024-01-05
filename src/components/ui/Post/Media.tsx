import { Image } from 'expo-image';
import { View } from 'react-native';

import { styles } from './styles';
import { IMedia } from './types';

interface IMediaProps extends IMedia {}

export function Media({ url, type }: IMediaProps) {
  const mediaSource = `https://pub-c4a5b57b9f444b199cecadd2c07022b7.r2.dev/${url}`;

  return (
    <View>
      <Image style={styles.mediaImage} source={mediaSource} />
    </View>
  );
}
