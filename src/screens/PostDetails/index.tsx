import { Text, View } from 'react-native';

import { PostDetailsScreenProps } from '@Navigation/DetailsStack/types';

export function PostDetailsScreen({ route }: PostDetailsScreenProps) {
  return (
    <View>
      <Text>{route.params.id}</Text>
    </View>
  );
}
