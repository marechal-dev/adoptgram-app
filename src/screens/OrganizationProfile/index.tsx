import { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';

import { OrganizationProfileScreenProps } from '@Navigation/DetailsStack/types';

export function OrganizationProfileScreen({
  navigation,
  route,
}: OrganizationProfileScreenProps) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.username,
    });
  }, [navigation, route]);

  return (
    <View>
      <Text>{route.params.username}</Text>
    </View>
  );
}
