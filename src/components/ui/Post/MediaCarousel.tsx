import React from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { Media } from './Media';
import { styles } from './styles';
import { IMediaCarrouselProps } from './types';

export function MediaCarousel({ medias }: IMediaCarrouselProps) {
  return (
    <View style={styles.mediasCarrouselContainer}>
      <Carousel
        loop={false}
        height={340}
        width={340}
        data={medias}
        renderItem={({ item }) => <Media url={item.url} type={item.type} />}
      />
    </View>
  );
}
